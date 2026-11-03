// Public website media loader. Reads only public Firestore documents.
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getFirestore, collection, getDocs, doc, getDoc, query, orderBy } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';
import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';

const app = isFirebaseConfigured() ? (getApps()[0] || initializeApp(firebaseConfig)) : null;
if (app) {
  const db = getFirestore(app);
  const gallery = document.getElementById('galleryGrid');
  const count = document.getElementById('mediaCount');

  function makeCard(item) {
    const card = document.createElement('article');
    card.className = 'media-card cloud-media-card';
    if (item.kind === 'video') {
      const media = document.createElement('video');
      media.src = item.url;
      media.controls = true;
      media.preload = 'metadata';
      card.appendChild(media);
    } else {
      const media = document.createElement('img');
      media.src = item.url;
      media.alt = item.title || 'Alfalah Furqan High School gallery';
      media.loading = 'lazy';
      card.appendChild(media);
    }
    const body = document.createElement('div');
    body.className = 'media-name';
    const title = document.createElement('strong');
    title.textContent = item.title || item.name || 'School media';
    body.appendChild(title);
    if (item.note) {
      const note = document.createElement('div');
      note.className = 'media-note';
      note.textContent = item.note;
      body.appendChild(note);
    }
    card.appendChild(body);
    return card;
  }

  async function loadCloudMedia() {
    if (!gallery) return;
    try {
      const snap = await getDocs(query(collection(db, 'gallery'), orderBy('createdAt', 'desc')));
      gallery.querySelectorAll('.cloud-media-card').forEach(el => el.remove());
      snap.docs.map(d => ({ id: d.id, ...d.data() })).forEach(item => gallery.appendChild(makeCard(item)));
      const localCount = gallery.querySelectorAll('.media-card:not(.cloud-media-card)').length;
      const cloudCount = snap.size;
      if (count) count.textContent = `${localCount + cloudCount} ${localCount + cloudCount === 1 ? 'media item' : 'media items'}`;
      const empty = document.getElementById('galleryEmpty');
      if (empty) empty.hidden = localCount + cloudCount > 0;
    } catch (error) {
      console.warn('Public gallery could not load:', error);
    }
  }

  async function loadCover() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    try {
      const snap = await getDoc(doc(db, 'siteSettings', 'home'));
      const url = snap.exists() ? snap.data().coverUrl : '';
      if (url) hero.style.backgroundImage = `url("${url}"), url("assets/images/campus-placeholder.svg")`;
    } catch (error) {
      console.warn('Homepage cover could not load:', error);
    }
  }

  loadCloudMedia();
  loadCover();
}
