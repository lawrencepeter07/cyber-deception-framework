@echo off
title Apex Global Production Portal - Port 8000
cd /d "%~dp0server"
node portal-server.js
pause
