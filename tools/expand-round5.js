var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }

function mk(term, difficulty, definition, kps) {
  return "        { term: '" + esc(term) + "',\n            difficulty: '" + difficulty + "',\n            definition: '" + esc(String(definition)) + "',\n            keyPoints: " + JSON.stringify(kps || []) + "\n        }";
}

var extras = {
  python: ['__slots__ Memory Optimization', 'Intermediate', 'Using __slots__ to reduce instance memory overhead', ['Prevents __dict__ creation', 'Faster attribute access', 'Useful for many instances']],
  javascript: ['Async Generators', 'Advanced', 'Generator functions with async iteration', ['async function* with yield', 'for await...of loop', 'Stream processing pattern']],
  java: ['Method References', 'Intermediate', 'Shorthand lambda syntax with :: operator', ['ClassName::staticMethod', 'instance::method', 'ClassName::new for constructors']],
  react: ['Controlled vs Uncontrolled', 'Intermediate', 'Form input management strategies', ['Controlled: state drives value', 'Uncontrolled: refs access DOM', 'Controlled preferred for validation']],
  sql: ['Date/Time Functions', 'Beginner', 'Working with dates in SQL', ['NOW(), CURRENT_DATE, EXTRACT()', 'DATE_ADD, DATEDIFF, DATE_FORMAT', 'TIMESTAMP vs DATETIME types']],
  html: ['Dialog Element', 'Intermediate', 'Native modal dialog', ['<dialog> for modals', 'showModal() for open', '::backdrop for styling']],
  css: ['Specificity Calculator', 'Intermediate', 'How CSS specificity is calculated', ['Inline > ID > Class > Element', '!important overrides all', 'Selector weight calculation']],
  git: ['Reflog', 'Advanced', 'Recovery log for all ref changes', ['git reflog shows all HEAD moves', 'Recover lost commits', 'Local only, not shared']],
  docker: ['Container Resource Limits', 'Intermediate', 'Limiting CPU memory for containers', ['--memory, --cpus flags', 'Docker compose deploy.resources', 'OOM kills exceed memory']],
  dsa: ['Quickselect', 'Advanced', 'Finding kth smallest element in O(n) avg', ['Partition + recursive select', 'O(n) average, O(n^2) worst', 'In-place algorithm']],
  cpp: ['RTTI (typeid)', 'Advanced', 'Runtime type information', ['typeid operator', 'dynamic_cast for safe downcast', 'Requires virtual function']],
  typescript: ['satisfies Operator', 'Intermediate', 'Type checking without widening', ['satisfies checks type without changing it', 'Preserves literal types', 'Introduced in TS 4.9']],
  go: ['JSON Encoding', 'Intermediate', 'Marshaling/unmarshaling JSON', ['json.Marshal / json.Unmarshal', 'Struct tags: json:"field"', 'Custom MarshalJSON/UnmarshalJSON']],
  rust: ['Modules & Visibility', 'Intermediate', 'Organizing code with modules and pub visibility', ['pub for public visibility', 'mod, use, super, crate paths', 'File as module convention']],
  linux: ['SSH Key Management', 'Intermediate', 'Managing SSH keys for passwordless authentication', ['ssh-keygen, ssh-copy-id, authorized_keys', 'Public key authentication', 'ssh-agent for key forwarding']],
  mongodb: ['Geospatial Queries', 'Intermediate', 'Location-based queries with GeoJSON', ['2dsphere index for geo data', '$near, $geoWithin, $geoIntersects', 'GeoJSON point/polygon format']],
  c: ['Variadic Functions', 'Intermediate', 'Functions accepting variable number of arguments', ['stdarg.h for variable args', 'va_list, va_start, va_arg, va_end', 'printf family implementation']],
  csharp: ['Null-Conditional Operators', 'Intermediate', 'Safe navigation and default value operators', ['?. operator for safe chaining', '?? operator for defaults', '??= for conditional assignment']],
  kotlin: ['Type Aliases', 'Beginner', 'Alternative names for existing types', ['typealias provides semantic names', 'Compile-time only, no runtime cost', 'Improves code readability']],
  swift: ['Access Control', 'Intermediate', 'Access levels for encapsulation', ['open, public, internal, fileprivate, private', 'Module-based access control', 'Default is internal']],
  pandas: ['Categorical Data', 'Intermediate', ['astype(\'category\') for efficiency', 'Memory reduction for strings', 'Ordered categories for sorting']],
  security: ['Rate Limiting', 'Intermediate', ['Token bucket, sliding window', '429 Too Many Requests', 'Redis-based rate limiting']],
  dbms: ['Denormalization', 'Intermediate', ['Read optimization, write cost', 'Data redundancy for speed', 'Used in data warehouses']],
  oop: ['Law of Demeter', 'Intermediate', ['Principle of least knowledge', 'Only talk to immediate friends', 'Reduces coupling']],
  os: ['Memory-Mapped Files', 'Intermediate', ['mmap() for file I/O', 'Pages loaded on demand', 'Shared memory for IPC']],
  networks: ['ARP Protocol', 'Intermediate', ['IP to MAC address resolution', 'ARP cache, ARP spoofing', 'Broadcast request, unicast reply']],
  'system-design': ['Service Discovery', 'Intermediate', ['Client-side vs server-side discovery', 'Consul, Eureka, etcd', 'Health checks + registry']],
};

var courseIds = Object.keys(extras);
courseIds.sort().reverse();

courseIds.forEach(function(courseId) {
  var c = extras[courseId];
  var conceptsText = mk(c[0], c[1], c[2], c[3]);

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

  src = src.slice(0, closePos - 1) + ',\n        ' + conceptsText + '\n' + src.slice(closePos);
  console.log('OK: ' + courseId);
});

fs.writeFileSync(__dirname + '/interview-data.js', src, 'utf8');
console.log('DONE');
