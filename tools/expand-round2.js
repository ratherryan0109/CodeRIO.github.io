var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }

function makeConcept(term, difficulty, definition, extra) {
  var ex = extra || {};
  var parts = ["        { term: '" + esc(term) + "', difficulty: '" + difficulty + "',"];
  parts.push("            definition: '" + esc(definition) + "',");
  if (ex.codeExample) parts.push("            codeExample: '" + esc(ex.codeExample) + "',");
  if (ex.compareWith) parts.push("            compareWith: '" + esc(ex.compareWith) + "',");
  if (ex.bugCode) parts.push("            bugCode: '" + esc(ex.bugCode) + "',");
  if (ex.keyPoints) parts.push("            keyPoints: " + JSON.stringify(ex.keyPoints) + (ex.commonMistakes||ex.followUps ? ',' : ''));
  if (ex.commonMistakes) parts.push("            commonMistakes: " + JSON.stringify(ex.commonMistakes) + (ex.followUps ? ',' : ''));
  if (ex.followUps) parts.push("            followUps: " + JSON.stringify(ex.followUps));
  parts.push("        }");
  return parts.join('\n');
}

var extras = {
  python: [
    ['Multiprocessing Pool', 'Intermediate', 'Parallel execution with Pool.map for CPU-bound work', {codeExample: 'from multiprocessing import Pool\nwith Pool(4) as p:\n    results = p.map(square, range(100))', keyPoints: ['Bypasses GIL for CPU work', 'Pool.map distributes work', 'Use with CPU-bound tasks']}],
    ['Logging Best Practices', 'Intermediate', 'Structured logging with the logging module', {codeExample: 'import logging\nlogging.basicConfig(level=logging.INFO, format=\'%(asctime)s %(levelname)s %(message)s\')\nlogger = logging.getLogger(__name__)\nlogger.info("Started")', keyPoints: ['Levels: DEBUG to CRITICAL', 'Logger, Handler, Formatter', 'Never use print() for production']}],
    ['Concurrent Futures', 'Intermediate', 'High-level async execution with ThreadPoolExecutor', {codeExample: 'from concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(4) as ex:\n    futures = [ex.submit(fetch, u) for u in urls]\n    results = [f.result() for f in futures]', keyPoints: ['ThreadPool vs ProcessPool', 'submit() returns Future', 'as_completed() for streaming']}],
  ],
  javascript: [
    ['Map & Set', 'Beginner', 'ES6 collection types', {codeExample: 'const m = new Map(); m.set(\'k\',\'v\'); m.get(\'k\');\nconst s = new Set([1,2,3,3]); [...s];', keyPoints: ['Map: any keys, insertion order', 'Set: unique values', 'WeakMap/WeakSet for GC-friendly refs'], compareWith: 'Map vs Object'}],
    ['Local Storage vs Cookies', 'Beginner', 'Client-side storage mechanisms', {codeExample: 'localStorage.setItem(\'pref\', JSON.stringify({t:\'dark\'}));\ndocument.cookie = \'session=abc; Secure; SameSite=Strict\';', keyPoints: ['localStorage: 5-10MB, persistent', 'Cookies: ~4KB, sent with requests', 'sessionStorage: cleared on tab close']}],
    ['Event Bubbling & Capturing', 'Intermediate', 'DOM event propagation phases', {codeExample: 'div.addEventListener(\'click\', () => console.log(\'div\'));\np.addEventListener(\'click\', () => console.log(\'p\'), true); // capture', keyPoints: ['Bubble: child to parent', 'Capture: parent to child', 'stopPropagation() stops cycle']}],
  ],
  java: [
    ['Annotations', 'Intermediate', 'Metadata for code with @interface', {codeExample: '@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\npublic @interface LogExecution {}\n\n@LogExecution\npublic void process() {}', keyPoints: ['@Retention: SOURCE, CLASS, RUNTIME', '@Target: METHOD, FIELD, TYPE', 'Process with reflection or APT']}],
    ['Generics & Wildcards', 'Intermediate', 'Type-safe collections with type parameters', {codeExample: 'List<? extends Number> nums = new ArrayList<Integer>();\nList<? super Integer> ints = new ArrayList<Number>();\npublic <T extends Comparable<T>> T max(T a, T b) { return a.compareTo(b) > 0 ? a : b; }', keyPoints: ['PECS: Producer Extends, Consumer Super', 'Type erasure at runtime', 'Bounded type parameters']}],
    ['Streams API', 'Intermediate', 'Functional operations on collections', {codeExample: 'list.stream()\n    .filter(s -> s.length() > 3)\n    .map(String::toUpperCase)\n    .sorted()\n    .collect(Collectors.toList());', keyPoints: ['Intermediate: filter, map, sorted', 'Terminal: collect, forEach, reduce', 'Lazy evaluation']}],
  ],
};

// Process courses in reverse order
var courseIds = Object.keys(extras);
courseIds.sort().reverse();

courseIds.forEach(function(courseId) {
  var concepts = extras[courseId];
  var conceptsText = concepts.map(function(c) {
    return makeConcept(c[0], c[1], c[2], c[3]);
  }).join(',\n');

  var courseStart = "  '" + courseId + "': {";
  var pos = src.indexOf(courseStart);
  if (pos < 0) { console.log('NOT FOUND: ' + courseId); return; }

  var closeMarker = "    ]\n  },";
  var closePos = src.indexOf(closeMarker, pos + courseStart.length);
  if (closePos < 0) {
    closeMarker = "    ]\n  }";
    closePos = src.lastIndexOf(closeMarker);
    if (closePos < 0 || closePos < pos) { console.log('NO CLOSE: ' + courseId); return; }
  }

  // Find last topic's concepts close "      ]}," within this course before closePos
  // Actually, we'll insert as a NEW TOPIC before topics close
  src = src.slice(0, closePos - 1) + ',\n      { name: \'' + esc(courseId + ' Round 2') + '\', concepts: [\n' + conceptsText + '\n      ]},' + '\n' + src.slice(closePos);
  console.log('OK: ' + courseId);
});

fs.writeFileSync(__dirname + '/interview-data.js', src, 'utf8');
console.log('DONE');
