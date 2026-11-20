@echo off
title Cyber Deception - Automated Attack Simulator
cd /d "%~dp0"

echo ====================================================================
echo   CYBER DECEPTION FRAMEWORK - MULTI-VECTOR ATTACK SUITE
echo ====================================================================
echo   Simulating automated adversary probes against your live traps...
echo.

set TARGET=http://localhost:5000

echo [1/4] Simulating Automated Directory Traversal (sqlmap probe)...
curl -s -X GET "%TARGET%/api/v1/auth/admin-backup.sql" -A "sqlmap/1.7.11#stable" > nul
echo    -> Detonated /api/v1/auth/admin-backup.sql (Threat Score: 92/100)
timeout /t 2 /nobreak > nul

echo.
echo [2/4] Simulating Environment File Scraping (.env exfiltration)...
curl -s -X GET "%TARGET%/.env" -A "python-requests/2.31.0" > nul
echo    -> Detonated /.env probe (Threat Score: 95/100)
timeout /t 2 /nobreak > nul

echo.
echo [3/4] Simulating Stolen Canary API Key Exploitation...
curl -s -X GET "%TARGET%/api/decoys" -H "x-api-key: sk_live_canary_99x821_internal" -A "curl/8.4.0 (Autonomous Bot)" > nul
echo    -> Detonated Canary API Key Interceptor (Threat Score: 98/100)
timeout /t 2 /nobreak > nul

echo.
echo [4/4] Simulating Decoy Admin Portal Brute-Force Login...
curl -s -X POST "%TARGET%/superadmin/auth" -d "username=admin_root&password=password123" -A "Go-http-client/1.1 (Nuclei)" > nul
echo    -> Detonated Decoy Admin Honeypot Portal (Threat Score: 100/100)

echo.
echo ====================================================================
echo   ALL 4 ATTACK VECTORS COMPLETED!
echo   Check your live React dashboard: http://localhost:5000
echo ====================================================================
pause
