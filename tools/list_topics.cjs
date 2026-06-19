var genData = require('./generate-data.cjs');
var courses = genData.courses;

var out = {};
courses.forEach(function(c) {
  out[c.id] = c.topics.map(function(t) { return t.name; });
});
require('fs').writeFileSync('C:\\Users\\TestAccount\\Desktop\\CodeRio 2.0\\js\\topics.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
