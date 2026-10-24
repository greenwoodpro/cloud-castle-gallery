@echo off
rem 启动本地预览服务（ES Module 需要 http 协议），然后用默认浏览器打开
setlocal
cd /d "%~dp0"
set PORT=8123
start "" http://127.0.0.1:%PORT%/index.html
python -m http.server %PORT% --bind 127.0.0.1
