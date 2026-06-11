var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');
function esc(s) { s = String(s); return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }

var concepts = [
  ['python', 'Functools (lru_cache, partial)', 'Intermediate', 'Functional utilities for memoization and partial application', ['lru_cache caches results', 'partial fixes arguments', 'wraps preserves metadata']],
  ['python', 'Pathlib', 'Intermediate', 'Object-oriented filesystem paths', ['Path objects replace os.path', 'Path.glob(), Path.rglob()', 'Cross-platform path handling']],
  ['python', 'Collections Module', 'Intermediate', 'Specialized container data types', ['Counter, defaultdict, namedtuple', 'deque for O(1) appends/pops', 'OrderedDict keeps insertion order']],
  ['javascript', 'WeakMap & WeakSet', 'Advanced', 'Garbage-collectible key-value pairs', ['Keys must be objects', 'No iteration methods', 'Prevents memory leaks']],
  ['javascript', 'Atomics & SharedArrayBuffer', 'Advanced', 'Shared memory for concurrent threads', ['Atomics.add, Atomics.load', 'SharedArrayBuffer for workers', 'Sequential consistency']],
  ['javascript', 'Proxy & Reflect', 'Advanced', 'Meta-programming with traps and reflection', ['Proxy wraps objects with traps', 'Reflect for default behavior', 'Useful for validation, logging']],
  ['java', 'Records (Java 14+)', 'Intermediate', 'Compact class declarations for data carriers', ['Auto: constructor, equals, toString', 'Immutable by default', 'Can add methods and constructors']],
  ['java', 'CompletableFuture', 'Advanced', 'Async programming with futures', ['thenApply, thenCompose', 'supplyAsync, runAsync', 'exceptionally, handle for errors']],
  ['java', 'Stream API', 'Intermediate', 'Functional operations on collections', ['map, filter, reduce, collect', 'Lazy evaluation pipeline', 'Parallel streams for performance']],
  ['react', 'SyntheticEvent', 'Intermediate', 'React cross-browser event wrapper', ['Wraps native event', 'Event pooling (pre-17)', 'e.persist() to access async']],
  ['react', 'Render Props', 'Intermediate', 'Sharing code between components via props', ['Function as child pattern', 'Prop called with data', 'Less common since hooks']],
  ['react', 'HOC (Higher-Order Component)', 'Intermediate', 'Function returning wrapped component', ['withAuth, withLogging pattern', 'Wraps WrappedComponent', 'Props name collisions risk']],
  ['sql', 'EXISTS vs IN', 'Intermediate', 'Subquery semantics comparison', ['EXISTS: early exit on match', 'IN: collect results first', 'EXISTS faster for large subqueries']],
  ['sql', 'Date/Time Functions', 'Beginner', 'Working with dates in SQL', ['NOW(), CURRENT_DATE, EXTRACT()', 'DATE_ADD, DATEDIFF', 'TIMESTAMP vs DATETIME types']],
  ['sql', 'Views', 'Beginner', 'Virtual tables from SELECT queries', ['Simplifies complex queries', 'Updatable views with restrictions', 'Can limit column access']],
  ['html', 'ContentEditable', 'Intermediate', 'Making elements editable in browser', ['contenteditable="true" attribute', 'document.execCommand legacy', 'contenteditable API modern']],
  ['html', 'Dialog Element', 'Intermediate', 'Native modal dialog', ['<dialog> for modals', 'showModal() for open', '::backdrop for styling']],
  ['html', 'Forms & Validation', 'Beginner', 'Native HTML form validation', ['required, pattern, min, max attrs', ':valid / :invalid CSS', 'Constraint Validation API']],
  ['css', 'Specificity Calculator', 'Intermediate', 'How CSS specificity is calculated', ['Inline > ID > Class > Element', '!important overrides all', 'Selector weight calculation']],
  ['css', 'Inheritance in CSS', 'Beginner', 'Property inheritance behavior', ['Text properties inherit (color)', 'Box properties dont (margin)', 'inherit, initial, unset values']],
  ['css', 'CSS Grid vs Flexbox', 'Intermediate', 'When to use which layout system', ['Grid: 2D layouts', 'Flexbox: 1D layouts', 'Grid for page, Flex for components']],
  ['git', 'Reflog', 'Advanced', 'Recovery log for all ref changes', ['git reflog shows all HEAD moves', 'Recover lost commits', 'Local only, not shared']],
  ['git', 'Worktrees', 'Intermediate', 'Multiple working directories in one repo', ['git worktree add ../other feature', 'Work on branches simultaneously', 'Shared objects directory']],
  ['git', 'Stashing', 'Beginner', 'Temporarily saving uncommitted changes', ['git stash push -m "msg"', 'git stash pop, apply, drop', 'git stash list']],
  ['docker', 'Container Resource Limits', 'Intermediate', 'Limiting CPU memory for containers', ['--memory, --cpus flags', 'Docker compose deploy.resources', 'OOM kills exceed memory']],
  ['docker', 'Docker Secrets', 'Intermediate', 'Managing sensitive data in swarm', ['docker secret create', 'Mounted as tmpfs in container', 'Swarm mode only']],
  ['docker', 'Networking', 'Intermediate', 'Docker network types', ['bridge, host, overlay, none', '--network flag for container', 'Custom networks for isolation']],
  ['dsa', 'Quickselect', 'Advanced', 'Finding kth smallest element in O(n) avg', ['Partition + recursive select', 'O(n) average, O(n^2) worst', 'In-place algorithm']],
  ['dsa', 'Radix Sort', 'Intermediate', 'Non-comparison sort for integers', ['O(nk) time, O(n+k) space', 'Sorts by digits from LSD to MSD', 'Stable sorting algorithm']],
  ['dsa', 'Bloom Filter', 'Advanced', 'Space-efficient probabilistic data structure', ['No false negatives', 'Tunable false positive rate', 'k hash functions, m bits']],
  ['cpp', 'RTTI (typeid)', 'Advanced', 'Runtime type information', ['typeid operator', 'dynamic_cast for safe downcast', 'Requires virtual function']],
  ['cpp', 'Type Casting', 'Intermediate', 'C++ type casting operators', ['static_cast: compile-time', 'dynamic_cast: runtime RTTI', 'reinterpret_cast: bit patterns']],
  ['cpp', 'Const Correctness', 'Intermediate', 'Using const for immutability guarantees', ['const member functions', 'const references for params', 'constexpr for compile-time']],
  ['typescript', 'satisfies Operator', 'Intermediate', 'Type checking without widening', ['satisfies checks type without changing it', 'Preserves literal types', 'Introduced in TS 4.9']],
  ['typescript', 'typeof & keyof Operators', 'Intermediate', 'Type query and key extraction', ['typeof val gives type of value', 'keyof T gives keys of type', 'Combined for mapped types']],
  ['typescript', 'Decorators', 'Advanced', 'Annotations for class members', ['@decorator syntax', 'Class, method, accessor decorators', 'Experimental in TS 5.x']],
  ['go', 'JSON Encoding', 'Intermediate', 'Marshaling/unmarshaling JSON', ['json.Marshal / json.Unmarshal', 'Struct tags: json:"field"', 'Custom MarshalJSON']],
  ['go', 'Goroutine Leaks Prevention', 'Advanced', 'Avoiding goroutine leaks', ['Always use context cancellation', 'Select with ctx.Done()', 'Ensure channels are closed']],
  ['go', 'Embedded Structs', 'Intermediate', 'Composition over inheritance', ['Anonymous struct fields', 'Method promotion', 'Override promoted methods']],
  ['rust', 'HashMap & Collections', 'Intermediate', 'Standard library collection types', ['HashMap, BTreeMap, HashSet', 'Vec, String, VecDeque', 'Entry API for maps']],
  ['rust', 'Closures & Captures', 'Intermediate', 'Anonymous functions capturing environment', ['Fn, FnMut, FnOnce traits', 'move keyword for ownership', 'Closures implement function traits']],
  ['rust', 'Pattern Matching', 'Intermediate', 'Destructuring with match and if let', ['match arms exhaustive', 'Pattern: tuple, struct, enum', 'Guards with if condition']],
  ['mysql', 'Transactions', 'Intermediate', 'BEGIN, COMMIT, ROLLBACK', ['Atomic group of operations', 'ROLLBACK on error', 'Implicit commit on DDL']],
  ['mysql', 'Stored Procedures', 'Intermediate', 'Server-side SQL routines', ['CREATE PROCEDURE syntax', 'IN, OUT, INOUT params', 'Reduces network round-trips']],
  ['mysql', 'Views', 'Beginner', 'Virtual tables for query simplification', ['CREATE VIEW AS SELECT', 'Simplifies complex joins', 'Limited DML on views']],
  ['linux', 'SSH Key Management', 'Intermediate', 'Managing SSH keys for passwordless auth', ['ssh-keygen, ssh-copy-id', 'authorized_keys file', 'ssh-agent for key forwarding']],
  ['linux', 'Environment Variables', 'Beginner', 'Shell environment variable management', ['export VAR=value', '$VAR, ${VAR:-default}', 'env, printenv, set commands']],
  ['linux', 'Job Control', 'Beginner', 'Background and foreground process mgmt', ['Ctrl+Z suspends foreground', 'bg resumes in background', 'fg brings to foreground']],
  ['mongodb', 'Geospatial Queries', 'Intermediate', 'Location-based queries with GeoJSON', ['2dsphere index for geo data', '$near, $geoWithin', 'GeoJSON point/polygon format']],
  ['mongodb', 'Bulk Operations', 'Intermediate', 'Batch inserts, updates, deletes', ['bulkWrite with ordered option', 'insertMany, updateMany', 'Ordered vs unordered']],
  ['mongodb', 'TTL Indexes', 'Intermediate', 'Auto-expire documents after a time', ['expireAfterSeconds option', 'Background thread every 60s', 'Good for session data, logs']],
  ['c', 'Variadic Functions', 'Intermediate', 'Functions accepting variable arguments', ['stdarg.h for variable args', 'va_list, va_start, va_arg', 'printf family implementation']],
  ['c', 'Enums', 'Beginner', 'Named integer constants', ['enum keyword for constants', 'Auto-incrementing values', 'Type-safe in C++, not C']],
  ['c', 'Typedef', 'Beginner', 'Creating type aliases in C', ['typedef existing_type new_name', 'Common: typedef struct', 'Improves readability']],
  ['csharp', 'Null-Conditional Operators', 'Intermediate', 'Safe navigation and default value operators', ['?. operator for safe chaining', '?? operator for defaults', '??= for conditional assignment']],
  ['csharp', 'Yield Return', 'Intermediate', 'Iterator method with lazy evaluation', ['yield return for IEnumerable', 'yield break to stop', 'Deferred execution pattern']],
  ['csharp', 'LINQ Methods', 'Intermediate', 'LINQ extension methods on IEnumerable', ['Where, Select, OrderBy', 'GroupBy, Join, Aggregate', 'Deferred vs immediate']],
  ['kotlin', 'Type Aliases', 'Beginner', 'Alternative names for existing types', ['typealias provides semantic names', 'Compile-time only', 'Improves code readability']],
  ['kotlin', 'Destructuring Declarations', 'Beginner', 'Unpacking objects into variables', ['val (name, age) = person', 'component1() to component5()', 'Data classes auto-generate']],
  ['kotlin', 'Extension Functions', 'Intermediate', 'Adding methods to existing classes', ['fun String.reverse(): String', 'Statically dispatched', 'Cannot access private members']],
  ['swift', 'Access Control', 'Intermediate', 'Access levels for encapsulation', ['open, public, internal, fileprivate, private', 'Module-based access control', 'Default is internal']],
  ['swift', 'Result Type', 'Intermediate', 'Success/failure enum for async ops', ['Result<Success, Failure> enum', '.success(value), .failure(error)', 'Combine with async/await']],
  ['swift', 'Optionals & Unwrapping', 'Beginner', 'Safe nil handling in Swift', ['if let, guard let', '?? nil coalescing', 'Optional chaining ?.']],
  ['pandas', 'Categorical Data', 'Intermediate', 'Efficient encoding for repeated string values', ['astype("category") conversion', 'Memory reduction for strings', 'Ordered categories for sorting']],
  ['pandas', 'Reshaping (stack/unstack/melt)', 'Intermediate', 'Reshaping between wide and long format', ['pivot, melt, stack, unstack', 'Wide to long format', 'Tidy data principles']],
  ['pandas', 'Time Series', 'Intermediate', 'Working with datetime-indexed data', ['pd.to_datetime(), pd.date_range', 'resample() for frequency change', 'rolling() for window functions']],
  ['security', 'Rate Limiting', 'Intermediate', 'Limiting request rates to APIs', ['Token bucket, sliding window', '429 Too Many Requests', 'Redis-based rate limiting']],
  ['security', 'Input Validation', 'Beginner', 'Validating and sanitizing user inputs', ['Whitelist vs blacklist validation', 'Sanitize on output not input', 'Context-specific validation']],
  ['security', 'Authentication vs Authorization', 'Beginner', 'Verifying identity vs permissions', ['AuthN: who you are (login)', 'AuthZ: what you can do (roles)', 'JWT for both']],
  ['dbms', 'Denormalization', 'Intermediate', 'Read optimization with data redundancy', ['Read optimization, write cost', 'Data redundancy for speed', 'Used in data warehouses']],
  ['dbms', 'Data Warehousing Concepts', 'Intermediate', 'Designing analytical databases', ['Star schema, snowflake schema', 'ETL vs ELT', 'OLTP vs OLAP differences']],
  ['dbms', 'Sharding', 'Advanced', 'Horizontal partitioning across servers', ['Hash-based, range-based sharding', 'Consistent hashing for rebalancing', 'Cross-shard queries complex']],
  ['oop', 'Law of Demeter', 'Intermediate', 'Principle of least knowledge', ['Only talk to immediate friends', 'Reduces coupling', 'Also: dont chain too deep']],
  ['oop', 'Information Hiding', 'Beginner', 'Principle of hiding implementation details', ['Private fields and methods', 'Public API surface', 'Implementation details hidden']],
  ['oop', 'Polymorphism', 'Beginner', 'Many forms: method overriding and overloading', ['Runtime: virtual method dispatch', 'Compile-time: overloading', 'Interfaces for contract polymorphism']],
  ['os', 'Memory-Mapped Files', 'Intermediate', 'mmap() for file I/O', ['Pages loaded on demand', 'Shared memory for IPC', 'Faster than read/write syscalls']],
  ['os', 'Context Switch Cost', 'Advanced', 'Performance cost of switching processes', ['TLB flush overhead', 'Cache pollution', 'Mode switch (user/kernel)']],
  ['os', 'Interrupts vs Polling', 'Intermediate', 'CPU notification mechanisms', ['Interrupts: hardware signals CPU', 'Polling: CPU checks repeatedly', 'Interrupts more efficient for rare events']],
  ['networks', 'ARP Protocol', 'Intermediate', 'IP to MAC address resolution', ['ARP cache, ARP spoofing', 'Broadcast request, unicast reply', 'IPv6 uses NDP instead']],
  ['networks', 'TLS Handshake', 'Intermediate', 'Establishing encrypted connection with TLS', ['ClientHello, ServerHello, cert', '1-RTT for full handshake', 'TLS 1.3: 0-RTT resumption']],
  ['networks', 'Load Balancers', 'Intermediate', 'Distributing traffic across servers', ['Round Robin, Least Connections', 'Layer 4 vs Layer 7', 'Health checks for availability']],
  ['system-design', 'Service Discovery', 'Intermediate', 'Finding service instances dynamically', ['Client-side vs server-side', 'Consul, Eureka, etcd', 'Health checks + registry']],
  ['system-design', 'Back-of-envelope Calculations', 'Intermediate', 'Estimating capacity and QPS', ['QPS estimation from DAU', 'Storage calculation per year', 'Bandwidth estimation']],
  ['system-design', 'Database Scaling', 'Intermediate', 'Vertical vs horizontal scaling', ['Vertical: bigger machine', 'Horizontal: read replicas, sharding', 'CQRS pattern']],
];

concepts.forEach(function(c) {
  var courseId = c[0], term = c[1], diff = c[2], def = c[3], kps = c[4];
  var cs = "        { term: '" + esc(term) + "', difficulty: '" + diff + "',\n            definition: '" + esc(def) + "',\n            keyPoints: " + JSON.stringify(kps) + "\n        },";
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
console.log('DONE - added', concepts.length, 'concepts');
