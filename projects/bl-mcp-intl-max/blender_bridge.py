"""Blender 桥接工具 — 通过 socket 直连 Blender MCP addon (127.0.0.1:9876)

用法:
    python blender_bridge.py info                    # 场景概览
    python blender_bridge.py run "bpy 代码"          # 执行任意 bpy 代码
    python blender_bridge.py run -f script.py        # 执行脚本文件

前提: Blender 已启动，且 Preferences > Add-ons 里启用了 MCP addon（监听 9876）。
"""

import argparse
import json
import socket
import sys

HOST = "127.0.0.1"
PORT = 9876


def send(payload, timeout=120):
    """发送一条命令到 Blender addon，返回解析后的 result 字符串。"""
    try:
        sock = socket.create_connection((HOST, PORT), timeout=timeout)
    except ConnectionRefusedError:
        raise SystemExit(
            f"[x] 连不上 {HOST}:{PORT}\n"
            "    请确认: 1) Blender 已启动  2) MCP addon 已启用并运行"
        )
    except socket.timeout:
        raise SystemExit(f"[x] 连接 {HOST}:{PORT} 超时")

    sock.sendall((json.dumps(payload) + "\n").encode("utf-8"))
    sock.settimeout(timeout)
    chunks = b""
    try:
        while True:
            block = sock.recv(65536)
            if not block:
                break
            chunks += block
            try:
                json.loads(chunks.decode("utf-8", "replace"))
                break
            except Exception:
                continue
    except socket.timeout:
        raise SystemExit("[x] 等待 Blender 响应超时（脚本可能执行太久）")
    finally:
        sock.close()

    text = chunks.decode("utf-8", "replace")
    try:
        data = json.loads(text)
    except Exception:
        raise SystemExit(f"[x] 返回非 JSON: {text[:500]}")

    if data.get("status") != "success":
        raise SystemExit(f"[x] Blender 报错: {data.get('message', text[:500])}")
    return data.get("result", {})


def run_code(code, timeout=120):
    res = send({"type": "execute_code", "params": {"code": code}}, timeout=timeout)
    return res.get("result", "")


def cmd_info(_args):
    code = r'''
import bpy, json
d = {
    "blender": bpy.app.version_string,
    "file": bpy.data.filepath or "(未保存)",
    "engine": bpy.context.scene.render.engine,
    "objects": len(bpy.data.objects),
    "meshes": len(bpy.data.meshes),
    "materials": len(bpy.data.materials),
    "collections": len(bpy.data.collections),
    "object_list": [
        {"name": o.name, "type": o.type,
         "loc": [round(v, 2) for v in o.location]}
        for o in bpy.data.objects
    ],
}
print(json.dumps(d, ensure_ascii=False))
'''
    print(run_code(code))


def cmd_run(args):
    code = args.code
    if args.file:
        with open(args.file, "r", encoding="utf-8") as f:
            code = f.read()
    if not code:
        raise SystemExit("[x] 需要提供代码，或用 -f 指定脚本文件")
    out = run_code(code, timeout=args.timeout)
    if out:
        print(out)


def main():
    parser = argparse.ArgumentParser(description="Blender socket 桥接")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("info", help="输出场景概览")

    p_run = sub.add_parser("run", help="执行 bpy 代码")
    p_run.add_argument("code", nargs="?", default="", help="要执行的 bpy 代码")
    p_run.add_argument("-f", "--file", help="从文件读取代码")
    p_run.add_argument("--timeout", type=int, default=120, help="超时秒数")

    args = parser.parse_args()
    if args.cmd == "info":
        cmd_info(args)
    else:
        cmd_run(args)


if __name__ == "__main__":
    sys.exit(main())
