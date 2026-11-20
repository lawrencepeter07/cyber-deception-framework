@echo off
title Launch Dual Server Cyber Deception System
echo ===================================================
echo [1/2] Starting Defender Console on Port 5000...
echo ===================================================
start "Cyber Deception SOC (Port 5000)" cmd /k "cd /d "%~dp0server" && node server.js"

timeout /t 2 /nobreak >nul

echo ===================================================
echo [2/2] Starting Genuine Company Portal on Port 8000...
echo ===================================================
start "Apex Company Portal (Port 8000)" cmd /k "cd /d "%~dp0server" && node portal-server.js"

echo.
echo ===================================================
echo Both servers are live!
echo 👉 Defender Console: http://localhost:5000
echo 👉 Company Portal:   http://localhost:8000
echo ===================================================
pause
