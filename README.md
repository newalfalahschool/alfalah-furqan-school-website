# Al-Falah Furqan High School — Complete Website & School Management

This project contains the responsive public school website, Firebase-backed school management dashboard, Firestore rules, and secure ImageKit media management.

## Included
- Public school website (`index.html`) with responsive layout and multilingual interface.
- School logo and image/video asset folders.
- Admission enquiry and teacher job application forms connected to Firestore.
- Secure Firebase Authentication dashboard (`school-management.html`).
- Student, teacher, exam result, admission, job application and notice record management.
- Media Gallery: upload, replace and delete photos/videos; add title and note; replace homepage cover.
- Public gallery and homepage cover load from Firestore.
- Cloudflare Worker backend (`cloudflare-worker/`) for secure ImageKit signatures and deletion.
- Firestore and Storage rules.

## First-time setup
1. Extract the ZIP to a normal folder.
2. Make sure Node.js LTS and Firebase CLI are installed and that you are signed in to the correct Firebase account.
3. Double-click `setup-cloudflare.cmd`. Sign in to Cloudflare, add the ImageKit Private Key when prompted, and paste the Worker URL when requested. The script connects the Worker URL to the website automatically.
4. Double-click `deploy.cmd` to publish the website and Firestore rules to `alfalah-furqan-school`.
5. Open the live website → **School Management** and sign in with an authorized Firebase admin account.

Detailed steps are in `IMAGEKIT-FIREBASE-SETUP.md` and `FIREBASE-SETUP.md`.

## ImageKit configuration
- Endpoint: `https://ik.imagekit.io/iusn2zz5p`
- Public key: configured in the Cloudflare Worker settings.
- Private key: must be entered directly into Cloudflare as the `IMAGEKIT_PRIVATE_KEY` secret by running `setup-cloudflare.cmd`. It is intentionally not included in this ZIP or any frontend file.

## Firebase free plan
Media signing/deletion is handled by Cloudflare Workers, not Firebase Functions. The deployment script publishes only Hosting and Firestore rules, so this workflow does not require enabling Firebase Blaze billing.

## Photos and videos
You can add your own local photos to `assets/images/` and videos to `assets/videos/`. For live gallery uploads, use the administrator dashboard's **Media Gallery** tab. The upload size limit in the dashboard is 20 MB per file. Obtain permission before publishing identifiable student photographs.

## Important
- The `Demo Admin` panel on the public homepage is a local demonstration only. Use **School Management** for real Firebase administrator access.
- Firebase client configuration and ImageKit public key are public identifiers. Never place ImageKit Private Key, Firebase service-account JSON, or admin passwords in website files.
- Cloudflare account login, the ImageKit Private Key, and the final Worker URL are account-specific and must be supplied by the owner during the one-time setup. No assistant can safely invent or pre-fill those account credentials.
