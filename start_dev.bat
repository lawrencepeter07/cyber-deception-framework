@echo off
title Cyber Deception Framework - Full Stack Launcher
cd /d "%~dp0"

echo ==========================================================
echo Starting Cyber Deception Engine (MongoDB + Node.js)...
echo ==========================================================
start "Cyber Deception - Express & MongoDB Backend" cmd /k "cd server && npm start"

echo ==========================================================
echo Starting Cyber Deception Dashboard (React + Vite)...
echo ==========================================================
npm run dev

pause
