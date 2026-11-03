@echo off
cd /d "%~dp0"
echo Selecting Firebase project...
firebase.cmd use alfalah-furqan-school
if errorlevel 1 goto :error
echo Deploying Firestore rules and website (no Firebase Functions / no Blaze upgrade)...
firebase.cmd deploy --only firestore:rules,hosting
if errorlevel 1 goto :error
echo.
echo Website and Firestore rules deployed successfully.
pause
exit /b 0
:error
echo.
echo Deployment failed. Read the error above.
pause
exit /b 1
