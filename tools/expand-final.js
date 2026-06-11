var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');

function esc(s) { s = String(s); return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }

var concepts = [
  ['python', 'Functools (lru_cache, partial)', 'Intermediate', 'Functional utilities for memoization and partial application', ['lru_cache caches results', 'partial fixes arguments', 'wraps preserves metadata']],
  ['javascript', 'WeakMap & WeakSet', 'Advanced', 'Garbage-collectible key-value pairs', ['Keys must be objects', 'No iteration methods', 'Prevents memory leaks']],
  ['java', 'Records (Java 14+)', 'Intermediate', 'Compact class declarations for data carriers', ['Auto: constructor, equals, toString', 'Immutable by default', 'Can add methods and constructors']],
  ['react', 'SyntheticEvent', 'Intermediate', 'React cross-browser event wrapper', ['Wraps native event', 'Event pooling (pre-17)', 'e.persist() to access async']],
  ['sql', 'EXISTS vs IN', 'Intermediate', 'Subquery semantics comparison', ['EXISTS: early exit on match', 'IN: collect results first', 'EXISTS faster for large subqueries']],
  ['html', 'ContentEditable', 'Intermediate', 'Making elements editable in browser', ['contenteditable="true" attribute', 'document.execCommand legacy', 'contenteditable API modern']],
  ['css', 'Inheritance in CSS', 'Beginner', 'Property inheritance behavior', ['Text properties inherit (color, font)', 'Box properties dont (margin, padding)', 'inherit, initial, unset, revert values']],
  ['git', 'Git Worktrees', 'Intermediate', 'Multiple working directories in one repo', ['Work on branches simultaneously', 'git worktree add ../other feature', 'Shared objects directory']],
  ['docker', 'Docker Secrets', 'Intermediate', 'Managing sensitive data in swarm', ['docker secret create', 'Mounted as tmpfs in container', 'Swarm mode only']],
  ['dsa', 'Radix Sort', 'Intermediate', 'Non-comparison sort for integers', ['O(nk) time, O(n+k) space', 'Sorts by digits from LSD to MSD', 'Stable sorting algorithm']],
  ['cpp', 'Type Casting (static_cast, dynamic_cast)', 'Intermediate', 'C++ type casting operators', ['static_cast: compile-time, related types', 'dynamic_cast: runtime, requires RTTI', 'reinterpret_cast: bit pattern reinterpret']],
  ['typescript', 'typeof & keyof Operators', 'Intermediate', 'Type query and key extraction', ['typeof val gives type of value', 'keyof T gives keys of type', 'Combined for mapped types']],
  ['go', 'Goroutine Leaks Prevention', 'Advanced', 'Avoiding goroutine leaks with context', ['Always use context cancellation', 'Select with ctx.Done()', 'Ensure channels are closed']],
  ['rust', 'HashMap & Collections', 'Intermediate', 'Standard library collection types', ['HashMap<K,V>, BTreeMap, HashSet', 'Vec, String, VecDeque', 'Entry API for maps']],
  ['linux', 'Environment Variables', 'Beginner', 'Shell environment variable management', ['export VAR=value', '$VAR, ${VAR:-default}', 'env, printenv, set commands']],
  ['mongodb', 'Bulk Operations', 'Intermediate', 'Batch inserts, updates, deletes', ['bulkWrite with ordered option', 'insertMany, updateMany, deleteMany', 'Ordered vs unordered operations']],
  ['c', 'Enums', 'Beginner', 'Named integer constants', ['enum keyword for constants', 'Auto-incrementing values', 'Type-safe in C++, not in C']],
  ['csharp', 'Yield Return', 'Intermediate', 'Iterator method with lazy evaluation', ['yield return for IEnumerable', 'yield break to stop', 'Deferred execution pattern']],
  ['kotlin', 'Destructuring Declarations', 'Beginner', 'Unpacking objects into variables', ['val (name, age) = person', 'component1() to component5()', 'Data classes auto-generate']],
  ['swift', 'Result Type', 'Intermediate', 'Success/failure enum for async ops', ['Result<Success, Failure> enum', '.success(value), .failure(error)', 'Combine with async/await']],
  ['pandas', 'Reshaping (stack/unstack/melt)', 'Intermediate', 'Reshaping between wide and long format data', ['pivot, melt, stack, unstack', 'Wide to long format', 'Tidy data principles']],
  ['security', 'Input Validation', 'Beginner', 'Validating and sanitizing user inputs', ['Whitelist vs blacklist validation', 'Sanitize on output not input', 'Context-specific validation']],
  ['dbms', 'Data Warehousing Concepts', 'Intermediate', 'Designing analytical databases', ['Star schema, snowflake schema', 'ETL vs ELT', 'OLTP vs OLAP differences']],
  ['oop', 'Information Hiding', 'Beginner', 'Principle of hiding implementation details', ['Private fields and methods', 'Public API surface', 'Implementation details hidden']],
  ['os', 'Context Switch Cost', 'Advanced', 'Performance cost of switching between processes', ['TLB flush overhead', 'Cache pollution', 'Mode switch (user/kernel)']],
  ['networks', 'TLS Handshake', 'Intermediate', 'Establishing encrypted connection with TLS', ['ClientHello, ServerHello, cert, key exchange', '1-RTT for full handshake', 'TLS 1.3: 0-RTT resumption']],
  ['system-design', 'Back-of-envelope Calculations', 'Intermediate', ['QPS estimation', 'Storage calculation', 'Bandwidth estimation']],
];

concepts.forEach(function(c) {
  var courseId = c[0], term = c[1], diff = c[2], def = c[3], kps = c[4];
  var conceptStr = "        { term: '" + esc(term) + "',\n            difficulty: '" + diff + "',\n            definition: '" + esc(def) + "',\n            keyPoints: " + JSON.stringify(kps) + "\n        },";

  var courseStart = "  '" + courseId + "': {";
  var pos = src.indexOf(courseStart);
  if (pos < 0) { console.log('NOT FOUND: ' + courseId); return; }

  // Find the last concept close "        }," or "        }" before the topics close
  // Simpler: find the topics close "    ],\n  }," and insert before it
  var closeMarker = "    ]\n  },";
  var closePos = src.indexOf(closeMarker, pos + courseStart.length);
  if (closePos < 0) {
    closeMarker = "    ]\n  }";
    closePos = src.lastIndexOf(closeMarker);
    if (closePos < 0 || closePos < pos) { console.log('NO CLOSE: ' + courseId); return; }
  }

  src = src.slice(0, closePos - 1) + ',\n' + conceptStr + '\n' + src.slice(closePos);
});

fs.writeFileSync(__dirname + '/interview-data.js', src, 'utf8');
console.log('DONE');
