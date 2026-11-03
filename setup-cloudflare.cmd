@echo off
setlocal
cd /d "%~dp0cloudflare-worker"
echo ================================================
echo Al-Falah Furqan - Secure ImageKit Worker Setup
echo ================================================
echo.
echo Step 1 of 4: Sign in to your Cloudflare account.
npx wrangler@latest login
if errorlevel 1 goto :error

echo.
echo Step 2 of 4: Create the Worker on Cloudflare.
npx wrangler@latest deploy
if errorlevel 1 goto :error

echo.
echo Step 3 of 4: Add your ImageKit PRIVATE key securely.
echo The key is entered into Cloudflare as a secret. Do NOT send it in ChatGPT or add it to a file.
npx wrangler@latest secret put IMAGEKIT_PRIVATE_KEY
if errorlevel 1 goto :error

echo.
echo Applying the secret and publishing the Worker...
npx wrangler@latest deploy
if errorlevel 1 goto :error

echo.
echo Step 4 of 4: Copy the Worker URL shown above.
echo It usually looks like https://alfalah-furqan-imagekit.YOUR-SUBDOMAIN.workers.dev
set /p WORKER_URL=Paste the complete Worker URL here and press Enter: 
if "%WORKER_URL%"=="" goto :error
cd /d "%~dp0"
node set-worker-url.cjs "%WORKER_URL%"
if errorlevel 1 goto :error

echo.
echo SUCCESS: Worker URL saved in imagekit-worker-config.js
 echo Now run deploy.cmd to publish the website and Firestore rules.
echo You do not need to edit the website code manually.
pause
exit /b 0
:error
echo.
echo Setup stopped because a step failed. Read the error above and send me a screenshot or the last error lines.
pause
exit /b 1
