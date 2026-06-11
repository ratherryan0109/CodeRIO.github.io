var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');
function esc(s) { s = String(s); return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }
var concepts = [
  ['python', 'Pathlib', 'Intermediate', 'Object-oriented filesystem paths', ['Path objects replace os.path', 'Path.glob(), Path.rglob()', 'Cross-platform path handling']],
  ['javascript', 'Atomics & SharedArrayBuffer', 'Advanced', 'Shared memory for concurrent threads', ['Atomics.add, Atomics.load, etc.', 'SharedArrayBuffer for workers', 'Sequential consistency guarantees']],
  ['java', 'CompletableFuture', 'Advanced', 'Async programming with futures', ['thenApply, thenCompose', 'supplyAsync, runAsync', 'exceptionally, handle for errors']],
  ['react', 'Error Boundaries', 'Intermediate', 'Catching render errors in React', ['componentDidCatch lifecycle', 'static getDerivedStateFromError', 'Cannot catch event handler errors']],
  ['sql', 'Window Functions RANK vs DENSE_RANK', 'Intermediate', 'Ranking with gaps vs no gaps', ['RANK: gaps in ties', 'DENSE_RANK: no gaps', 'ROW_NUMBER: unique per row']],
  ['html', 'Picture Element', 'Intermediate', 'Responsive images with sources', ['<picture> with <source> children', 'media / type / srcset attributes', 'Art direction use case']],
  ['css', 'CSS Grid vs Flexbox', 'Intermediate', 'When to use which layout system', ['Grid: 2D layouts', 'Flexbox: 1D layouts', 'Grid for page, Flex for components']],
  ['git', 'Bisect', 'Advanced', 'Binary search on commit history', ['git bisect start + bad/good', 'Automated: git bisect run', 'Finds introducing commit in O(log N)']],
  ['docker', 'Non-Root Container', 'Advanced', 'Running containers as non-root user', ['USER instruction in Dockerfile', 'Avoid privilege escalation', '--user flag at runtime']],
  ['dsa', 'Bloom Filter', 'Advanced', 'Space-efficient probabilistic data structure', ['No false negatives', 'Tunable false positive rate', 'k hash functions, m bits']],
  ['cpp', 'RAII (Resource Acquisition Is Initialization)', 'Intermediate', 'Binds resource lifetime to object lifetime', ['Constructor acquires, destructor releases', 'std::unique_ptr, std::lock_guard', 'Exception-safe resource mgmt']],
  ['typescript', 'Template Literal Types', 'Advanced', 'String manipulation at type level', ['`hello_${World}` union expansion', 'Uppercase, Lowercase, Capitalize', 'Parsing with infer + template']],
  ['go', 'Embedded Structs', 'Intermediate', 'Composition over inheritance', ['Anonymous struct fields', 'Method promotion to outer struct', 'Override promoted methods']],
  ['rust', 'Closures & Captures', 'Intermediate', 'Anonymous functions capturing environment', ['Fn, FnMut, FnOnce traits', 'move keyword for ownership', 'Closures implement function traits']],
  ['linux', 'Job Control (bg, fg, jobs)', 'Beginner', 'Background and foreground process mgmt', ['Ctrl+Z suspends foreground', 'bg resumes in background', 'fg brings to foreground']],
  ['mongodb', 'TTL Indexes', 'Intermediate', 'Auto-expire documents after a time', ['expireAfterSeconds option', 'Background thread checks every 60s', 'Good for session data, logs']],
  ['c', 'Typedef', 'Beginner', 'Creating type aliases in C', ['typedef existing_type new_name', 'Common: typedef struct', 'Improves readability']],
  ['csharp', 'LINQ Methods', 'Intermediate', 'LINQ extension methods on IEnumerable', ['Where, Select, OrderBy', 'GroupBy, Join, Aggregate', 'Deferred vs immediate execution']],
  ['kotlin', 'Extension Functions', 'Intermediate', 'Adding methods to existing classes', ['fun String.reverse(): String', 'Statically dispatched', 'Cannot access private members']],
  ['swift', 'Optionals & Unwrapping', 'Beginner', 'Safe nil handling in Swift', ['if let, guard let', '?? nil coalescing', 'Optional chaining ?.']],
];
concepts.forEach(function(c) {
  var courseId = c[0], term = c[1], diff = c[2], def = c[3], kps = c[4];
  var cs = "        { term: '" + esc(term) + "',\n            difficulty: '" + diff + "',\n            definition: '" + esc(def) + "',\n            keyPoints: " + JSON.stringify(kps) + "\n        },";
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
  src = src.slice(0, closePos - 1) + ',\n' + cs + '\n' + src.slice(closePos);
});
fs.writeFileSync(__dirname + '/interview-data.js', src, 'utf8');
console.log('DONE');
