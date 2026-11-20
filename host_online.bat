@echo off
title Cyber Deception Platform - Live Unified Host
cd /d "%~dp0"

echo ====================================================================
echo   CYBER DECEPTION FRAMEWORK - PRODUCTION UNIFIED HOST
echo ====================================================================
echo.
echo Starting Unified Server (React Frontend + Express + MongoDB)...
echo.
start "Cyber Deception - Unified Server" cmd /k "cd server && node server.js"

timeout /t 3 /nobreak >nul

echo.
echo ====================================================================
echo   HOSTING STATUS:
echo ====================================================================
echo   [Local Access]   : http://localhost:5000
echo   [Wi-Fi / LAN]    : http://172.100.2.71:5000
echo   [Decoy Portal]   : http://172.100.2.71:5000/superadmin/portal
echo.
echo Generating Free Public Internet Tunnel (World-Wide Access)...
echo ====================================================================
echo.
npx --yes localtunnel --port 5000
pause
