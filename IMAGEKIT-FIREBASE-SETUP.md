# Secure ImageKit setup (Firebase Spark + Cloudflare Workers)

The website's media dashboard uses ImageKit for file storage, Firestore for gallery records, Firebase Authentication for administrator sign-in, and a Cloudflare Worker for secure signing/deletion. **This setup does not use Firebase Functions and does not require upgrading Firebase to Blaze.**

## What is already prepared
- Firebase project: `alfalah-furqan-school`
- ImageKit URL endpoint: `https://ik.imagekit.io/iusn2zz5p`
- ImageKit public key is configured in the Worker settings.
- The Worker verifies the Firebase ID token signature, checks the Firebase project and verifies that `admins/{uid}` exists before allowing upload-signature or delete actions.
- The ImageKit private key is stored only as a Cloudflare Worker secret. It is never placed in browser code or this project ZIP.
- The management dashboard uses the Worker for both upload signatures and file deletion.

## One-time setup (run one file)
1. Extract this ZIP and open the extracted project folder.
2. Double-click `setup-cloudflare.cmd`.
3. If asked, sign in to your Cloudflare account in the browser and approve Wrangler.
4. When the terminal asks for `IMAGEKIT_PRIVATE_KEY`, paste the **ImageKit Private Key** into that terminal prompt. Do not paste it into ChatGPT, VS Code, a JavaScript file, or GitHub.
5. After deployment, copy the HTTPS Worker URL printed in the terminal and paste it when the setup script asks. The script saves it automatically; you do not need to edit JavaScript.
6. Double-click `deploy.cmd` to publish the website and Firestore rules to the selected Firebase project.

The setup script uses Wrangler through `npx`; Node.js and an internet connection are required. If Windows says `npx` is not recognized, install the current Node.js LTS version, restart the terminal, and run the script again.

## Test
1. Open the deployed school website and go to **School Management**.
2. Sign in with an authorized Firebase administrator account.
3. Open **Media Gallery** and upload a small test image.
4. Confirm it appears in the public website gallery.
5. Test replacing and deleting that test image. Test the homepage cover last.

## Important security notes
- Never share the ImageKit Private Key. If it is ever exposed, rotate it in ImageKit and update the Cloudflare secret by running `npx wrangler secret put IMAGEKIT_PRIVATE_KEY` from the `cloudflare-worker` folder, then deploy again.
- Do not create an open upload-signature endpoint. The included Worker requires a valid Firebase ID token and a readable `admins/{uid}` document.
- The Worker only accepts the configured school website origins and local Live Server origins.
- Firebase web configuration and ImageKit public key are public client identifiers; they are not passwords.
- Keep student photographs private unless the school has permission to publish them.

## Troubleshooting
- **Not an authorized administrator:** confirm the signed-in Firebase Auth user's exact UID has a document at Firestore `admins/{UID}`. The document must exist; its fields are not used for the role check.
- **Website origin is not allowed:** check `ALLOWED_ORIGINS` in `cloudflare-worker/wrangler.toml` and add the exact HTTPS domain shown in the browser address bar, then run `npx wrangler deploy` from that folder.
- **Worker URL not connected:** rerun `setup-cloudflare.cmd` or update the URL by running the setup script again.
- **ImageKit delete failed:** check that the correct private key was saved as the Cloudflare secret.
