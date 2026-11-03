# Firebase setup for Al-Falah Furqan High School

This project is already configured for the Firebase project `alfalah-furqan-school`. The web configuration is in `firebase-config.js`; it is a public client configuration, not a password.

## Confirm Firebase services
1. Open Firebase Console and select `alfalah-furqan-school`.
2. In **Authentication → Sign-in method**, enable **Email/Password**.
3. In **Authentication → Users**, confirm the school administrator account(s) exist.
4. In **Firestore Database → Data**, confirm each administrator has a document in collection `admins` whose document ID is exactly that user's Authentication UID.
5. In **Firestore Database → Rules**, publish the contents of `firestore.rules` if they are not already published.

The dashboard checks that `admins/{UID}` exists after Firebase sign-in. Do not allow browser users to write their own admin documents. Create or manage admin documents only from the Firebase Console.

## Publish the website and rules
Run `deploy.cmd` from the extracted project folder, or use Command Prompt:

```bat
firebase.cmd use alfalah-furqan-school
firebase.cmd deploy --only firestore:rules,hosting
```

This deploys Hosting and Firestore rules only. It does not deploy Firebase Functions and does not require a Blaze upgrade.

## School management dashboard
Open the deployed website, choose **School Management**, and sign in with an authorized administrator account. The dashboard includes student, teacher, exam result, admission enquiry, teacher job application, notice and media gallery management.

## Public forms
Admission enquiries and teacher job applications are stored in Firestore. The Firestore rules validate public form submissions and restrict reading/updating/deleting them to administrators.

## Security and privacy
- Never share administrator passwords or service-account credentials.
- Do not make the `admins` collection publicly writable.
- Only publish student or teacher photographs when the school has the required permission.
- Review `firestore.rules` before changing database permissions.
