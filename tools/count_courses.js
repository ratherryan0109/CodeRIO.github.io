var fs = require('fs');
var data = fs.readFileSync('js/interview-data.js', 'utf8');
var courseIds = ['python','javascript','java','react','sql','html','css','git','docker','dsa','cpp','typescript','go','rust','mysql','linux','mongodb','c','csharp','kotlin','swift','pandas','security','dbms','oop','os','networks','system-design'];
courseIds.forEach(function(id){
  var idx = data.search(new RegExp("'" + id + "'\\s*:"));
  if (idx < 0) return;
  var endIdx = data.length;
  for (var j = 0; j < courseIds.length; j++) {
    if (courseIds[j] === id) continue;
    var m = data.slice(idx + 1).search(new RegExp("'" + courseIds[j] + "'\\s*:"));
    if (m >= 0 && idx + 1 + m < endIdx) endIdx = idx + 1 + m;
  }
  var section = data.slice(idx, endIdx);
  var count = (section.match(/\bterm\s*:/g) || []).length;
  console.log(id + ': ' + count);
});
var total = (data.match(/\bterm\s*:/g) || []).length;
console.log('---\nTotal: ' + total);
