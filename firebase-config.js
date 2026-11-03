// Firebase Web App configuration for Al-Falah Furqan School.
// These are public client identifiers. Protect data with Firebase Authentication
// and Firestore Security Rules; never add a service-account private key here.
export const firebaseConfig = {
  apiKey: "AIzaSyBgdxCoa8YGXh07whqhnSK-d3VfZWjeU8s",
  authDomain: "alfalah-furqan-school.firebaseapp.com",
  projectId: "alfalah-furqan-school",
  storageBucket: "alfalah-furqan-school.firebasestorage.app",
  messagingSenderId: "841652815233",
  appId: "1:841652815233:web:c2d52ddaffdc87ac195480",
  measurementId: "G-XFPKBPPSNG"
};
export const isFirebaseConfigured = () => Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);
