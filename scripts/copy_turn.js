const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'node_modules', 'turn.js', 'index.js');
const dest = path.join(__dirname, '..', 'js', 'turn.real.js');
let s = fs.readFileSync(src, 'utf8');
s = s.replace("var $ = require('jquery');", "var $ = window.jQuery || jQuery;");
fs.writeFileSync(dest, s, 'utf8');
console.log('copied to', dest);
