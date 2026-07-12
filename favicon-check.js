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
  size: data.length,
  width,
  height,
}, null, 2));

const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('NO_DIST');
  process.exit(0);
}

function findHtmlFiles(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...findHtmlFiles(full));
    else if (entry.isFile() && full.endsWith('.html')) result.push(full);
  }
  return result;
}

const htmlFiles = findHtmlFiles(distPath);
const stale = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('favicon.svg')) {
    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].includes('favicon.svg')) {
        stale.push({ file, line: i + 1, text: lines[i].trim() });
      }
    }
  }
}

console.log(JSON.stringify({ stale }, null, 2));
