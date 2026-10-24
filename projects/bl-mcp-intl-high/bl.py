#!/usr/bin/env python3
"""Minimal client for the Blender MCP addon socket (mcp-for-blender)."""
import json
import socket
import sys

HOST = "127.0.0.1"
PORT = 9876


def send(payload, timeout=1800):
    s = socket.create_connection((HOST, PORT), timeout=timeout)
    try:
        s.sendall(json.dumps(payload).encode("utf-8"))
        buf = b""
        while True:
            try:
                chunk = s.recv(1 << 16)
            except socket.timeout:
                return {"status": "error", "message": "timeout waiting for response"}
            if not chunk:
                break
            buf += chunk
            try:
                return json.loads(buf.decode("utf-8"))
            except Exception:
                continue
        return {"status": "error", "message": "connection closed", "raw": buf.decode("utf-8", "replace")}
    finally:
        s.close()


def run(code, timeout=1800):
    return send({"type": "execute_code", "params": {"code": code}}, timeout=timeout)


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "ping"
    if mode == "ping":
        print(json.dumps(send({"type": "ping", "params": {}}), ensure_ascii=False))
    elif mode == "scene":
        print(json.dumps(send({"type": "get_scene_info", "params": {}}), ensure_ascii=False)[:4000])
    elif mode == "run":
        code = open(sys.argv[2], "r", encoding="utf-8").read()
        r = run(code)
        print(json.dumps(r, ensure_ascii=False))
    else:
        code = sys.stdin.read()
        r = run(code)
        print(json.dumps(r, ensure_ascii=False))


if __name__ == "__main__":
    main()
