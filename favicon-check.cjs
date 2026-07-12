const fs = require('fs');
const path = require('path');

const iconPath = path.join(__dirname, 'public', 'icon.png');
if (!fs.existsSync(iconPath)) {
  console.log('MISSING_ICON');
  process.exit(0);
}

const data = fs.readFileSync(iconPath);
const isPng = data.readUInt32BE(0) === 0x89504e47;
const width = isPng ? data.readUInt32BE(16) : null;
const height = isPng ? data.readUInt32BE(20) : null;
console.log(JSON.stringify({
  exists: true,
  format: isPng ? 'PNG' : 'UNKNOWN',
  sizeBytes: data.length,
  width,
  height,
}, null, 2));

const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log(JSON.stringify({ stale: [], error: 'NO_DIST' }, null, 2));
  process.exit(0);
}

function walk(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (entry.isFile() && full.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const stale = [];
for (const file of walk(distPath)) {
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('favicon.svg')) {
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (line.includes('favicon.svg')) {
        stale.push({ file, line: i + 1, text: line.trim() });
      }
    });
  }
}
console.log(JSON.stringify({ stale }, null, 2));
