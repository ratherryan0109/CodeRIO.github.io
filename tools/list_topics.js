var fs = require('fs');
var path = require('path');
var genCode = fs.readFileSync(path.join(__dirname, 'generate-data.js'), 'utf8');
genCode = genCode.replace(/var output = build\(\);[\s\S]*$/, '');
eval(genCode);

var out = {};
courses.forEach(function(c) {
  out[c.id] = c.topics.map(function(t) { return t.name; });
});
require('fs').writeFileSync('C:\\Users\\TestAccount\\Desktop\\CodeRio 2.0\\js\\topics.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
