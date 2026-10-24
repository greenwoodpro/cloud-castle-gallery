@echo off
cd /d "%~dp0"
echo Starting the castle server at http://localhost:8123 ...
echo Close this window to stop the server.
start "" cmd /c "timeout /t 1 >nul & start http://localhost:8123"
python -m http.server 8123
pause