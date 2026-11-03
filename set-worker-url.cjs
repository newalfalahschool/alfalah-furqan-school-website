const fs = require('fs');
const path = require('path');
const value = process.argv[2];
if (!value) { console.error('Worker URL was not provided.'); process.exit(1); }
let parsed;
try { parsed = new URL(value); } catch { console.error('That is not a valid URL.'); process.exit(1); }
if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash) {
  console.error('Please paste the complete HTTPS Worker URL only, without username, password, query, or fragment.'); process.exit(1);
}
const file = path.join(__dirname, 'imagekit-worker-config.js');
fs.writeFileSync(file, `// Worker endpoint created by setup-cloudflare.cmd.\n// Never put the ImageKit Private Key in this file.\nexport const IMAGEKIT_WORKER_URL = ${JSON.stringify(parsed.origin + parsed.pathname.replace(/\/$/, ''))};\n`, 'utf8');
console.log('Saved Worker URL to imagekit-worker-config.js');
