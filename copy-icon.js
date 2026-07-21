const fs = require('fs');
const path = require('path');

const srcLogo = path.join(__dirname, 'src', 'PHUMCINE.png');
const pubLogo = path.join(__dirname, 'public', 'PHUMCINE.png');
const pubIcon = path.join(__dirname, 'public', 'icon.png');

fs.copyFileSync(srcLogo, pubLogo);
console.log('Copied to public/PHUMCINE.png');

fs.copyFileSync(srcLogo, pubIcon);
console.log('Copied to public/icon.png');

// Clean up this script
fs.unlinkSync(__filename);
console.log('Done! Script self-deleted.');
