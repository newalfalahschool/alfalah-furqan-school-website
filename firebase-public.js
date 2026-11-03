import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';
import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';

// When Firebase is configured, this capture-phase handler replaces the browser-only demo save.
// If config is not set, the original demo behavior remains and the UI says it is local-only.
if (isFirebaseConfigured()) {
  const app = getApps()[0] || initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const savePublicForm = async (formId, collectionName, type) => {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); event.stopImmediatePropagation();
      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector('.form-status');
      const data = Object.fromEntries(new FormData(form).entries());
      delete data.cv;
      if (type === 'Teacher job application') {
        const cvInput = form.querySelector('input[type="file"]');
        if (cvInput?.files?.length) {
          status.textContent = 'CV file upload is not configured yet. Please submit without the file or contact the school.';
          return;
        }
      }
      if (button) button.disabled = true;
      if (status) status.textContent = 'Sending securely…';
      try {
        await addDoc(collection(db, collectionName), { ...data, type, createdAt: serverTimestamp(), status: 'new' });
        if (status) status.textContent = 'Thank you. Your information was sent to the school successfully.';
        form.reset();
      } catch (error) {
        console.error(error);
        if (status) status.textContent = 'Could not send the form. Please check your internet connection or contact the school.';
      } finally { if (button) button.disabled = false; }
    }, true);
  };
  savePublicForm('admissionForm', 'admissions', 'Admission enquiry');
  savePublicForm('jobForm', 'jobApplications', 'Teacher job application');
  document.querySelectorAll('.localNote, [data-i18n="localNote"]').forEach(el => el.textContent = 'Online database is configured. Form submissions are sent to the school database.');
} else {
  console.info('Firebase is not configured yet. Website forms are currently demo/local only.');
}
