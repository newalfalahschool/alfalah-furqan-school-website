# Website Audit Report — Al-Falah Furqan Private High School

## Scope
Reviewed the supplied ZIP files (`index.html`, `styles.css`, `app.js`, README and included assets). Ran a JavaScript syntax check and checked local asset references. This is a static code review, not a live production penetration test or a full device/browser QA session.

## Findings and updates in this revised ZIP

### Fixed / improved
- **Demo media upload controls:** image/video upload inputs now ask the visitor to sign in to the local demo admin panel first. Signing out or closing the panel clears the in-memory demo sign-in state. This is only a UI guard and is NOT secure authentication.
- **Admin panel wording:** removed the password from the visible login hint and made it clearer that the panel is a demo and its password is exposed in client-side JavaScript.
- **Existing header color verified:** the main header and mobile navigation are already dark red (`#8B0000`); no change was necessary.
- **Safe rendering reviewed:** form-record text and uploaded media captions are inserted with `textContent`, rather than concatenating user-provided text into HTML.
- **JavaScript syntax:** `app.js` passed `node --check` after edits.

### Still needs school-provided assets
These expected photos are not included in the ZIP: `assets/images/hero-school.jpg`, `school-campus.jpg`, `students-1.jpg`, `teachers-1.jpg`, and `school-activity.jpg`. The page has a placeholder fallback for the content images and a CSS placeholder background for the hero, so it should not leave those image areas completely blank. However, generic placeholders are not a substitute for real school photographs. Add approved school photos with those exact names to improve the result.

### Important limitations — do not use this demo to collect real data
- Admission and job forms save records to **the current browser's localStorage only**. They do not send anything to school staff or sync between devices.
- The admin password (`admin123`) remains in browser JavaScript. Anyone inspecting the source can discover it. The upload gate does not make the site secure.
- Uploaded media is saved as browser data and can hit browser storage limits; it is not shared online.
- The CV field currently records the selected filename only; it does not upload or preserve the actual CV file.
- No backend/database, server-side validation, real admin authentication, spam protection, backup or privacy workflow is configured.

## Recommended production work
1. Configure a backend (for example, Supabase) with administrator authentication and row-level security.
2. Connect admissions and job applications to server-side database writes; only show success after the server confirms the save.
3. Upload CVs and media to private/controlled storage with file type and size validation.
4. Replace the demo password flow with server-managed authentication; never put secret keys or trusted permissions in front-end code.
5. Add a privacy notice, retention/deletion process, backups, spam protection and HTTPS.
6. Test language switching, all forms, mobile navigation, file uploads and keyboard accessibility on real devices before launch.
7. Confirm the school name, address, phone number and published photos are approved and accurate.
