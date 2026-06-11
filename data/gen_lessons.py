import json, os

path = os.path.join(os.path.dirname(__file__), "lessons.json")

def M(id, title, diff, dur, obj, con, ex, qz, vid):
    return {"id":id,"title":title,"difficulty":diff,"duration":dur,"objectives":obj,"content":con,"exercises":ex,"quiz":qz,"videos":vid}
def C(title, lang, code, exp):
    return {"type":"code","title":title,"language":lang,"code":code,"explanation":exp}
def E(code, desc):
    return {"code":code,"desc":desc}
def Q(q, opts, a):
    return {"question":q,"options":opts,"answer":a}
def V(t, c, u):
    return {"title":t,"creator":c,"url":u}
def P(v):
    return {"type":"paragraph","value":v}
def A(v):
    return {"type":"analogy","value":v}

html_modules = [
  M(1, "Introduction to HTML", "Beginner", "30 min", ["Understand what HTML is","Learn HTML history","Set up environment","Create first HTML doc"], [
    P("HTML (HyperText Markup Language) is the standard language for creating web pages. Think of HTML as the skeleton of a website - it provides the structure and foundation upon which everything else is built."),
    A("Imagine building a house. HTML is the framework - the walls, floors, and roof. CSS is the paint and decorations. JavaScript is the electricity and plumbing."),
    P("HTML was created by Tim Berners-Lee in 1991 at CERN. HTML5, released in 2014, is the current standard."),
    C("Basic HTML Document", "html", "<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is my first HTML page.</p>\n</body>\n</html>", [
      E("<!DOCTYPE html>", "Declares HTML5 document"),
      E("<html>", "Root element wrapping all content"),
      E("<head>", "Contains meta-information and title"),
      E("<title>", "Sets browser tab title"),
      E("<body>", "Contains visible page content"),
      E("<h1>", "Main heading element"),
      E("<p>", "Paragraph element for text"),
    ]),
    P("HTML uses paired tags: <tagname>content</tagname>. Self-closing tags like <br> don't need a closing tag."),
  ], ["Create first HTML doc","Add paragraph about yourself","Create headings h1 to h6 page"], [
    Q("What does HTML stand for?", ["HyperText Markup Language","High Tech Modern Language","HyperTransfer Markup Language","Home Tool Markup Language"], 0),
    Q("Which tag is used for the main heading?", ["<heading>","<h1>","<head>","<h>"], 1),
    Q("Who created HTML?", ["Bill Gates","Tim Berners-Lee","Steve Jobs","Larry Page"], 1),
  ], [V("HTML Full Course","freeCodeCamp","https://www.youtube.com/embed/mN6lpB0b3lc"),V("HTML Tutorial","CodeWithHarry","https://www.youtube.com/embed/BsDoLVMnZbM")]),
  M(2, "HTML Document Structure", "Beginner", "35 min", ["Understand HTML document structure","Learn head section elements","Master body section","Use proper formatting"], [
    P("Every HTML document follows a specific structure: doctype, html, head, and body elements. This ensures consistent rendering across browsers."),
    A("An HTML document is like a book. The DOCTYPE tells the language. The head is the table of contents. The body is the actual story."),
    C("Document Structure", "html", "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <title>My Page</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <header><h1>Welcome</h1></header>\n  <main><p>Content</p></main>\n  <footer><p>&copy; 2026</p></footer>\n</body>\n</html>", [
      E("<html lang=\"en\">", "Root with language attribute"),
      E("<meta charset>", "Character encoding declaration"),
      E("<meta name=\"viewport\">", "Mobile scaling control"),
      E("<link rel=\"stylesheet\">", "External CSS link"),
      E("<header>,<main>,<footer>", "Semantic layout elements"),
    ]),
  ], ["Create complete HTML document","Add meta tags for charset/viewport","Link external CSS in head"], [
    Q("Which element contains meta-info?", ["<body>","<head>","<html>","<meta>"], 1),
    Q("What does viewport meta do?", ["Sets title","Controls mobile scaling","Adds description","Links CSS"], 1),
    Q("Where to link CSS?", ["Body","Head","After html","Footer"], 1),
  ], [V("HTML Document Structure","Traversy Media","https://www.youtube.com/embed/UB1O30fR-EE")]),
  M(3, "Text Elements & Headings", "Beginner", "40 min", ["Master h1-h6 headings","Use paragraph formatting","Understand semantic text","Create structured content"], [
    P("HTML provides six heading levels from h1 to h6. Headings create a clear information hierarchy crucial for SEO and accessibility."),
    A("Headings work like newspaper sections. h1 is the main headline, h2 are section headers, h3 are article titles - each level gets more specific."),
    C("Headings and Text", "html", "<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>\n<p>Text with <strong>bold</strong> and <em>italic</em>.</p>\n<blockquote>Quoted text</blockquote>\n<pre>Preformatted\n  text</pre>", [
      E("<h1> to <h6>", "Heading hierarchy h1 most important"),
      E("<strong>", "Strong importance - bold"),
      E("<em>", "Emphasis - italic"),
      E("<blockquote>", "Quoted content citation"),
      E("<pre>", "Preserves whitespace spacing"),
    ]),
  ], ["Create all six heading levels","Write paragraph with bold/italic","Create blockquote and pre element"], [
    Q("Most important heading?", ["<h6>","<h1>","<heading>","<h>"], 1),
    Q("What does <em> mean?", ["Emphasized text","Embedded media","Empty element","External link"], 0),
    Q("Tag that preserves spaces?", ["<p>","<code>","<pre>","<blockquote>"], 2),
  ], [V("HTML Text Formatting","Programming with Mosh","https://www.youtube.com/embed/qz0aGYrrlhU")]),
  M(4, "Links & Navigation", "Beginner", "35 min", ["Create hyperlinks with anchor","Understand URLs","Build navigation menus","Use target/rel attributes"], [
    P("The <a> tag creates hyperlinks for navigating pages, downloading files, or jumping to sections. Links connect the web together."),
    A("Links are like doorways. Each has a destination (URL). Some doors open in the same tab, others open in new tabs. The link text tells you where it goes."),
    C("Creating Links", "html", "<a href=\"https://example.com\">Visit</a>\n<a href=\"about.html\">About</a>\n<a href=\"#section2\">Jump</a>\n<a href=\"mailto:hello@example.com\">Email</a>\n<a href=\"https://google.com\" target=\"_blank\" rel=\"noopener\">Google</a>\n<nav><a href=\"index.html\">Home</a> | <a href=\"about.html\">About</a></nav>", [
      E("href attribute", "Specifies link destination"),
      E("#section2", "Hash link to element with that id"),
      E("mailto:", "Opens email client"),
      E("target=\"_blank\"", "Opens in new tab"),
      E("rel=\"noopener\"", "Security for new tab links"),
    ]),
  ], ["Create navigation menu with 3 links","Add new tab link with security","Build table of contents with hash links"], [
    Q("Link destination attribute?", ["src","href","link","url"], 1),
    Q("What does target=\"_blank\" do?", ["Same tab","New tab","Iframe","Blocks link"], 1),
    Q("Why use rel=\"noopener\"?", ["Styling","Security","Speed","SEO"], 1),
  ], [V("HTML Links","freeCodeCamp","https://www.youtube.com/embed/pQN-pnXPaVg")]),
  M(5, "Images & Media", "Beginner", "40 min", ["Embed images with img","Use alt text","Add video and audio","Understand image formats"], [
    P("The <img> tag embeds images, <video> and <audio> add multimedia. Each element has attributes for controlling display and providing fallbacks."),
    A("Alt text is like a painting description for someone who can't see it. If the image doesn't load, alt text describes what's missing."),
    C("Embedding Media", "html", "<img src=\"photo.jpg\" alt=\"Sunset\" loading=\"lazy\">\n<picture>\n  <source srcset=\"image.webp\" type=\"image/webp\">\n  <img src=\"fallback.jpg\" alt=\"View\">\n</picture>\n<video controls width=\"640\">\n  <source src=\"video.mp4\" type=\"video/mp4\">\n</video>", [
      E("alt attribute", "Accessibility description text"),
      E("loading=\"lazy\"", "Defers offscreen image loading"),
      E("<picture>/<source>", "Multiple image format options"),
      E("controls", "Play/pause video controls"),
    ]),
  ], ["Add image with alt and lazy loading","Create responsive <picture> element","Embed video with controls"], [
    Q("What does alt provide?", ["Animation","Alternative source","Accessibility","Alignment"], 2),
    Q("What does loading=\"lazy\" do?", ["Loads quickly","Delays until needed","Low quality","Locks size"], 1),
    Q("Multiple image formats element?", ["<img>","<picture>","<figure>","<source>"], 1),
  ], [V("HTML Images and Media","Traversy Media","https://www.youtube.com/embed/hkHHwIQH1So")]),
  M(6, "Lists & Tables", "Beginner", "40 min", ["Create ordered/unordered lists","Build data tables semantically","Use nested lists","Style with headers and captions"], [
    P("HTML provides three list types: unordered (<ul>) with bullets, ordered (<ol>) with numbers, and description lists (<dl>). Tables organize data in rows and columns."),
    A("Unordered lists are like grocery lists. Ordered lists are like recipes (sequence matters). Tables are like spreadsheets for easy comparison."),
    C("Lists and Tables", "html", "<ul><li>Apples</li><li>Bananas</li></ul>\n<ol><li>First</li><li>Second</li></ol>\n<table>\n  <caption>Sales</caption>\n  <thead><tr><th>Month</th><th>Sales</th></tr></thead>\n  <tbody><tr><td>Jan</td><td>$5,000</td></tr></tbody>\n</table>", [
      E("<ul>/<ol>", "Unordered (bullets) or ordered (numbers)"),
      E("<table>", "Tabular data container"),
      E("<caption>", "Table title"),
      E("<thead>/<th>", "Header with bold labels"),
      E("<tbody>/<td>", "Body with data cells"),
    ]),
  ], ["Create ordered recipe list","Build schedule table","Create nested list"], [
    Q("Ordered list tag?", ["<ul>","<ol>","<li>","<dl>"], 1),
    Q("What does <th> represent?", ["Table header","Horizontal rule","Thin border","Total height"], 0),
    Q("Table title element?", ["<title>","<heading>","<caption>","<legend>"], 2),
  ], [V("HTML Lists and Tables","freeCodeCamp","https://www.youtube.com/embed/9kRgVx0T7Y4")]),
  M(7, "Forms & Inputs", "Beginner", "50 min", ["Create forms with inputs","Use validation attributes","Handle form submission","Build accessible labels"], [
    P("Forms collect user input. HTML provides many input types from text to date pickers. Labels and validation make forms accessible and user-friendly."),
    A("A form is like a paper application. Inputs are blanks to fill, labels tell you what to write, submit button hands it to the server."),
    C("Building Forms", "html", "<form action=\"/submit\" method=\"POST\">\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\" required>\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" required>\n  <label for=\"password\">Password:</label>\n  <input type=\"password\" id=\"password\" minlength=\"8\">\n  <label><input type=\"checkbox\"> Subscribe</label>\n  <button type=\"submit\">Submit</button>\n</form>", [
      E("<form>", "Form container for data submission"),
      E("<label for>", "Accessible label linked to input"),
      E("type=\"email\"", "Validates email format"),
      E("type=\"password\"", "Masks characters for privacy"),
      E("required", "Makes field mandatory"),
      E("type=\"submit\"", "Submits form data"),
    ]),
  ], ["Create sign-up form with validation","Add required attributes","Build survey with checkboxes and dropdown"], [
    Q("Links label to input?", ["for","id","name","href"], 0),
    Q("Masks characters input?", ["text","hidden","password","secure"], 2),
    Q("What does required do?", ["Read-only","Mandatory field","Requires server","Default value"], 1),
  ], [V("HTML Forms","Web Dev Simplified","https://www.youtube.com/embed/fNcJuPIZ2WE")]),
  M(8, "Semantic HTML5", "Beginner", "40 min", ["Understand semantic HTML5","Use header, nav, main, section, article, aside, footer","Improve accessibility","Compare div vs semantic"], [
    P("Semantic HTML5 elements clearly describe their meaning. Instead of generic divs, elements like <header>, <nav>, <main>, <article>, <section> tell everyone what each part represents."),
    A("Using semantic elements is like labeling boxes: Kitchen, Bedroom, Bathroom instead of 'Stuff'. Labels make organization clear."),
    C("Semantic Layout", "html", "<body>\n  <header><h1>My Site</h1><nav><a href=\"#\">Home</a></nav></header>\n  <main>\n    <article><h2>Article</h2><section><h3>Intro</h3><p>Content</p></section></article>\n    <aside><h3>Related</h3><ul><li>Post 1</li></ul></aside>\n  </main>\n  <footer><p>&copy; 2026</p></footer>\n</body>", [
      E("<header>", "Introductory content (logo, nav)"),
      E("<nav>", "Navigation links area"),
      E("<main>", "Primary page content - use once"),
      E("<article>", "Self-contained composable content"),
      E("<section>", "Thematic content grouping"),
      E("<aside>", "Tangentially related (sidebar)"),
      E("<footer>", "Copyright, links, metadata"),
    ]),
  ], ["Convert div layout to semantic","Create blog page with article/section","Build page with main and aside"], [
    Q("Self-contained content element?", ["<section>","<article>","<div>","<content>"], 1),
    Q("How many <main> per page?", ["Many","One","Two","None"], 1),
    Q("What does <nav> represent?", ["Network","Navigation","Nested view","Negative"], 1),
  ], [V("HTML5 Semantic","Traversy Media","https://www.youtube.com/embed/kGW8Al_cga4")]),
  M(9, "Accessibility", "Beginner", "45 min", ["Understand a11y principles","Use ARIA attributes","Ensure keyboard navigation","Write accessible forms"], [
    P("Web accessibility ensures people with disabilities can use websites - screen readers, keyboard-only users, and those with visual/hearing impairments."),
    C("Accessible HTML", "html", "<button aria-label=\"Close\" onclick=\"close()\"><i class=\"fas fa-times\" aria-hidden=\"true\"></i></button>\n<nav aria-label=\"Main\"><a href=\"#\" aria-current=\"page\">Home</a></nav>\n<img src=\"chart.png\" alt=\"Sales chart 2026\">\n<form>\n  <label for=\"search\">Search:</label>\n  <input id=\"search\" aria-describedby=\"hint\">\n  <p id=\"hint\">Enter keywords</p>\n</form>", [
      E("aria-label", "Accessible name for elements"),
      E("aria-hidden", "Hides decorative elements from screen readers"),
      E("aria-current", "Indicates current page in nav"),
      E("aria-describedby", "Links to descriptive hint text"),
    ]),
  ], ["Add ARIA to navigation","Create accessible form with hints","Test keyboard-only navigation"], [
    Q("ARIA stands for?", ["Accessible Rich Internet Applications","Advanced Rendering","Automated Response","Accessible Response"], 0),
    Q("Hides decorative elements?", ["aria-label","aria-hidden","role=presentation","hidden"], 1),
    Q("aria-live=polite?", ["Announces immediately","Waits until idle","Repeats","Loud"], 1),
  ], [V("Web Accessibility","freeCodeCamp","https://www.youtube.com/embed/e2nkq3h1P68")]),
  M(10, "SEO Best Practices", "Intermediate", "40 min", ["Optimize HTML for SEO","Use meta tags","Implement structured data","SEO-friendly structure"], [
    P("SEO makes websites more visible in search results. Clean semantic HTML with proper meta tags helps search engines understand and rank content."),
    C("SEO HTML", "html", "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <title>Learn HTML - Guide 2026</title>\n  <meta name=\"description\" content=\"HTML guide\">\n  <link rel=\"canonical\" href=\"https://example.com/guide\">\n  <meta property=\"og:title\" content=\"Learn HTML\">\n  <meta property=\"og:image\" content=\"thumb.jpg\">\n  <script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Learn HTML\"}</script>\n</head>", [
      E("<title>", "Most important - search result clickable link"),
      E("meta description", "Page description in search results"),
      E("rel=canonical", "Prevents duplicate content issues"),
      E("og:title/image", "Open Graph for social sharing"),
      E("LD+JSON", "Structured data for search engines"),
    ]),
  ], ["Add title and description meta","Implement Open Graph tags","Add JSON-LD structured data"], [
    Q("Search description meta?", ["keywords","description","title","author"], 1),
    Q("Canonical prevents?", ["Broken links","Duplicate content","Slow loading","Security"], 1),
    Q("Structured data format?", ["XML","JSON-LD","CSV","YAML"], 1),
  ], [V("SEO for Developers","Fireship","https://www.youtube.com/embed/xsVTqzratPs")]),
  M(11, "Multimedia & Embedding", "Intermediate", "35 min", ["Embed YouTube videos","Use iframes safely","Work with canvas/SVG","Create responsive embeds"], [
    P("HTML embeds external content via <iframe> for YouTube, Google Maps, etc. Canvas provides drawing, SVG creates vector graphics."),
    C("Embedding Content", "html", "<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\"\n        title=\"Video\" allowfullscreen>\n</iframe>\n<canvas id=\"c\" width=\"400\" height=\"200\"></canvas>\n<svg width=\"100\" height=\"100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"blue\" /></svg>", [
      E("<iframe>", "Embeds another HTML page"),
      E("allowfullscreen", "Allows fullscreen mode"),
      E("<canvas>", "JavaScript drawing area"),
      E("<svg>", "Scalable Vector Graphics"),
    ]),
  ], ["Embed YouTube video safely","Create SVG with shapes","Draw rectangle on canvas"], [
    Q("Embeds external content?", ["<embed>","<iframe>","<object>","<include>"], 1),
    Q("allowfullscreen does?", ["Fullscreen","Auto-play","Captions","Aspect ratio"], 0),
    Q("Best for vector graphics?", ["<canvas>","<svg>","<img>","<picture>"], 1),
  ], [V("HTML Iframes","Programming with Mosh","https://www.youtube.com/embed/D5P79UKB4DY")]),
  M(12, "HTML5 APIs", "Intermediate", "45 min", ["Use Geolocation API","Implement drag and drop","Work with web storage","Web workers basics"], [
    P("HTML5 has built-in APIs for geolocation, drag-and-drop, web storage, and web workers. These add powerful features without external libraries."),
    C("HTML5 APIs", "html", "<div draggable=\"true\" ondragstart=\"drag(e)\">Drag me</div>\n<button onclick=\"getLocation()\">Get Location</button>\n<script>\nfunction getLocation() {\n  navigator.geolocation.getCurrentPosition(pos => {\n    console.log(pos.coords.latitude);\n  });\n}\nlocalStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme');\n</script>", [
      E("draggable=true", "Makes element draggable"),
      E("navigator.geolocation", "Browser location API"),
      E("localStorage", "Persistent local data storage"),
    ]),
  ], ["Create draggable with drop zone","Build location finder","Save preferences with localStorage"], [
    Q("Makes draggable?", ["draggable","drag","movable","pickable"], 0),
    Q("Location API?", ["Location","Geolocation","GPS","Map"], 1),
    Q("localStorage persists after close?", ["Yes","No","Incognito only","Depends"], 0),
  ], [V("HTML5 APIs","freeCodeCamp","https://www.youtube.com/embed/6O8LTwU3iG0")]),
  M(13, "Best Practices & Performance", "Intermediate", "35 min", ["Follow HTML coding standards","Optimize loading","Use proper outline","Validate HTML"], [
    P("Clean valid HTML is essential for maintainability. Use lowercase tags, quote attributes, close elements, use semantic HTML, and consistent indentation."),
    C("Best Practices", "html", "<img src=\"photo.jpg\" alt=\"Description\" loading=\"lazy\">\n<h1>Title</h1><h2>Section</h2><h3>Sub</h3>\n<script src=\"app.js\" defer></script>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<img src=\"small.jpg\" srcset=\"medium.jpg 768w, large.jpg 1200w\" sizes=\"(max-width:768px) 100vw,50vw\" alt=\"resp\">", [
      E("loading=lazy", "Defers offscreen image loading"),
      E("h1>h2>h3 hierarchy", "Never skip heading levels"),
      E("defer", "Script loads after HTML parsing"),
      E("preconnect", "Warms up external domain connection"),
      E("srcset and sizes", "Responsive image selection"),
    ]),
  ], ["Run W3C validator fix errors","Add preconnect for CDN","Implement responsive images"], [
    Q("What does defer do?", ["Delete script","Delay until HTML parsed","Defers to CDN","Disables"], 1),
    Q("Correct heading hierarchy?", ["Any order","h1>h2>h3","Only h1","h1 then h6"], 1),
    Q("Defers offscreen images?", ["lazy","loading=lazy","defer","async"], 1),
  ], [V("HTML Best Practices","Web Dev Simplified","https://www.youtube.com/embed/QsQkC1aX8Fg")]),
  M(14, "Project: Portfolio Page", "Intermediate", "60 min", ["Apply all HTML concepts","Build complete portfolio","Use semantic layout","Create multi-section page"], [
    P("Building a complete project solidifies your HTML skills. Create a personal portfolio with navigation, hero, about, skills, projects, and contact form."),
    C("Portfolio Structure", "html", "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <title>John Doe | Portfolio</title>\n</head>\n<body>\n  <header><nav aria-label=\"Main\"><a href=\"#\">Home</a></nav></header>\n  <main>\n    <section id=\"hero\"><h1>Hi, I'm John</h1><p>Full-stack dev</p></section>\n    <section id=\"about\"><h2>About</h2><p>Passionate developer...</p></section>\n    <section id=\"contact\">\n      <h2>Contact</h2>\n      <form><label for=\"name\">Name:</label><input id=\"name\" required></form>\n    </section>\n  </main>\n  <footer><p>&copy; 2026</p></footer>\n</body>\n</html>", [
      E("<nav aria-label>", "Accessible navigation labeling"),
      E("section#hero", "Hero section with greeting"),
      E("section#contact form", "Contact form with validation"),
    ]),
  ], ["Build complete portfolio","Add project gallery with 3 items","Create contact form with validation"], [
    Q("Tag for project entries?", ["<section>","<article>","<div>","<project>"], 1),
    Q("Link to page section?", ["href=url#id","href=#id","href=.#id","link=#id"], 1),
    Q("Makes field mandatory?", ["mandatory","required","necessary","must"], 1),
  ], [V("Build a Portfolio","freeCodeCamp","https://www.youtube.com/embed/_xkC7F3VbVY")]),
]

css_modules = [
  M(1, "Introduction to CSS", "Beginner", "30 min", ["What is CSS","CSS syntax","Three ways to add CSS","Create first styles"], [
    P("CSS (Cascading Style Sheets) styles HTML elements. CSS controls layout, colors, fonts, spacing, and more."),
    A("If HTML is a house frame, CSS is the paint, wallpaper, furniture, and decorations that make it look beautiful."),
    C("CSS Syntax", "css", "/* Element selector */\np {\n  color: blue;\n  font-size: 16px;\n}\n\n/* Class selector */\n.highlight {\n  background-color: yellow;\n}\n\n/* ID selector */\n#header {\n  text-align: center;\n}", [
      E("p { }", "Select all paragraph elements"),
      E("color: blue", "Property: value syntax"),
      E(".highlight", "Class selector with dot prefix"),
      E("#header", "ID selector with hash prefix"),
    ]),
  ], ["Style paragraph blue and 18px","Create class for red text","Add ID for background"], [
    Q("CSS stands for?", ["Computer Style Sheets","Cascading Style Sheets","Creative Style System","Colorful Style Sheets"], 1),
    Q("Class selector prefix?", ["#",".","!","@"], 1),
    Q("Inline CSS attribute?", ["class","style","id","css"], 1),
  ], [V("CSS Full Course","freeCodeCamp","https://www.youtube.com/embed/1Rs2ND1ryYc"),V("CSS Basics","CodeWithHarry","https://www.youtube.com/embed/u5-K_ua9sOw")]),
  M(2, "Selectors & Combinators", "Beginner", "40 min", ["Element, class, ID selectors","Combinators: descendant, child, sibling","Pseudo-classes","Specificity"], [
    P("CSS selectors target HTML elements. Combinators define relationships between elements. Pseudo-classes select special states."),
    C("Selectors", "css", "/* Descendant */\ndiv p { color: gray; }\n\n/* Direct child */\ndiv > p { font-weight: bold; }\n\n/* Adjacent sibling */\nh2 + p { margin-top: 0; }\n\n/* Pseudo-class */\na:hover { color: red; }\na:focus { outline: 2px solid blue; }\n\n/* Attribute */\ninput[type=\"text\"] { border: 1px solid; }\n\n/* Grouping */\nh1, h2, h3 { font-family: sans-serif; }", [
      E("div p", "All p inside div (descendant)"),
      E("div > p", "Direct p children of div"),
      E("h2 + p", "p immediately after h2"),
      E(":hover", "On mouse hover"),
      E(":focus", "When focused via keyboard"),
      E("[type=\"text\"]", "Attribute selector"),
    ]),
  ], ["Style links on hover/visited","Select direct list children","Use attribute selector on inputs"], [
    Q("Direct child combinator?", [" ",">","+","~"], 1),
    Q("Hover pseudo-class?", [":click",":hover",":over","::hover"], 1),
    Q("Grouping separator?", [";",",","+","&"], 1),
  ], [V("CSS Selectors","Web Dev Simplified","https://www.youtube.com/embed/l1mER1bV0N0")]),
  M(3, "Box Model", "Beginner", "45 min", ["Content, padding, border, margin","Box-sizing property","Width and height calculations","Collapsing margins"], [
    P("Every HTML element is a box with: content, padding, border, and margin. Understanding the box model is critical for layout."),
    A("The box model is like a framed picture. Content is the photo, padding is the mat, border is the frame, margin is the space to the next picture."),
    C("Box Model", "css", "div {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 15px;\n  box-sizing: border-box;\n}\n\nh1 { margin-bottom: 20px; }\nh2 { margin-top: 10px; }", [
      E("padding", "Space between content and border"),
      E("border", "Border around padding"),
      E("margin", "Space outside border"),
      E("box-sizing: border-box", "Width includes padding+border"),
      E("Margin collapse", "Adjacent margins become one"),
    ]),
  ], ["Create box with 20px padding","Add border with margin","Calculate width with border-box"], [
    Q("Box-sizing: border-box includes?", ["Only content","Content+padding","Content+padding+border","Whole box"], 2),
    Q("Space outside border?", ["padding","margin","outline","gap"], 1),
    Q("Margin collapse means?", ["Margins double","Larger margin wins","Both combine","Centered"], 1),
  ], [V("CSS Box Model","Traversy Media","https://www.youtube.com/embed/7hTq0JmFa9E")]),
  M(4, "Flexbox", "Intermediate", "50 min", ["Flex container and items","Main axis and cross axis","Justify-content and align-items","Flex shorthand"], [
    P("Flexbox is a one-dimensional layout model that distributes space and aligns items. Perfect for nav bars, cards, centering, and responsive grids."),
    A("Flexbox is like a luggage carousel. Items flow in one direction, can be centered, spaced evenly, or wrapped to the next row."),
    C("Flexbox", "css", ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.item {\n  flex: 1 1 200px;\n}\n.item.special {\n  align-self: flex-start;\n  order: -1;\n}", [
      E("display: flex", "Creates flex container"),
      E("justify-content", "Main axis distribution"),
      E("align-items", "Cross axis alignment"),
      E("flex-wrap: wrap", "Items wrap to next line"),
      E("flex: 1 1 200px", "Grow=1, shrink=1, basis=200px"),
      E("order", "Visual order (default 0)"),
    ]),
  ], ["Create centered navbar with flex","Build responsive card grid","Make holy grail layout with flex"], [
    Q("Creates flex container?", ["flex","display: inline","display: flex","flex: true"], 2),
    Q("Wraps items to next line?", ["wrap","nowrap","flex-wrap: wrap","overflow: wrap"], 2),
    Q("Aligns on cross axis?", ["justify-items","justify-content","align-items","item-align"], 2),
  ], [V("CSS Flexbox","Fireship","https://www.youtube.com/embed/4e3AeN0LDEs")]),
  M(5, "CSS Grid", "Intermediate", "50 min", ["Grid container and items","Template columns and rows","Grid areas","Responsive layouts"], [
    P("CSS Grid creates two-dimensional layouts with rows and columns simultaneously. Grid excels at page-level layouts and complex arrangements."),
    A("Flexbox is a strip (1D), Grid is a tray (2D). Grid splits space into cells, items can span multiple cells."),
    C("CSS Grid", "css", ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto;\n  gap: 1rem;\n}\n.header {\n  grid-column: 1 / -1;\n}\n.sidebar {\n  grid-row: 2 / 4;\n}\n\n.auto-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}", [
      E("display: grid", "Creates grid container"),
      E("grid-template-columns: repeat(3, 1fr)", "3 equal columns"),
      E("gap", "Gutter between grid cells"),
      E("grid-column: 1 / -1", "Span from first to last"),
      E("auto-fit / minmax", "Responsive columns"),
    ]),
  ], ["Create 3-column card grid","Build full page layout with grid","Use auto-fit for responsive grid"], [
    Q("Span all columns?", ["span: all","1 / -1","1 / all","full-width"], 1),
    Q("Responsive auto-fit with?", ["minmax()","max-width","flex: 1","repeat(auto)"], 0),
    Q("Grid vs flexbox dimension?", ["Both 1D","Grid 2D, Flex 1D","Both 2D","Grid 1D, Flex 2D"], 1),
  ], [V("CSS Grid","freeCodeCamp","https://www.youtube.com/embed/0xMQfnTU6lM")]),
  M(6, "Typography & Colors", "Beginner", "35 min", ["Font properties","Color systems (hex, rgb, hsl)","Web fonts with @font-face","Text styling"], [
    P("CSS provides extensive font and text controls: family, size, weight, line-height, letter-spacing, and color."),
    C("Typography", "css", "body {\n  font-family: 'Segoe UI', system-ui, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n  color: #333;\n}\n\nh1 {\n  font-weight: 700;\n  letter-spacing: -0.5px;\n  text-align: center;\n}\n\n.text { color: rgb(50, 100, 200); }\n.text { color: hsl(220, 60%, 50%); }\n.text { color: #3366cc; }", [
      E("font-family", "Font stack with fallbacks"),
      E("line-height", "Vertical space between lines"),
      E("hex, rgb, hsl", "Different color notations"),
      E("font-weight", "Thickness: 400=normal, 700=bold"),
    ]),
  ], ["Style body text with good typography","Use hsl for theme colors","Load Google Font with @import"], [
    Q("Default body font-weight?", ["100","400","700","900"], 1),
    Q("HSL hue range?", ["0-100","0-255","0-360","0-1"], 2),
    Q("Line height unitless value?", ["px","%","em","number"], 3),
  ], [V("CSS Typography","Traversy Media","https://www.youtube.com/embed/RNakAX3rVVw")]),
  M(7, "Transitions & Animations", "Intermediate", "40 min", ["CSS transitions","Keyframe animations","Transform property","Performance best practices"], [
    P("CSS transitions smoothly change property values over time. Keyframe animations provide multi-step animations with loops and timing control."),
    C("Transitions & Animations", "css", ".btn {\n  background: blue;\n  color: white;\n  transition: background 0.3s ease, transform 0.2s;\n}\n.btn:hover {\n  background: darkblue;\n  transform: scale(1.05);\n}\n\n@keyframes slideIn {\n  from { transform: translateX(-100%); opacity: 0; }\n  to   { transform: translateX(0);    opacity: 1; }\n}\n.hero { animation: slideIn 0.5s ease-out; }", [
      E("transition", "Animate between states over duration"),
      E("@keyframes", "Define multi-step animation"),
      E("animation", "Apply keyframes to element"),
      E("transform", "Translate, rotate, scale, skew"),
    ]),
  ], ["Create hover card with transition","Build loading spinner animation","Make slide-in hero animation"], [
    Q("Transition shorthand order?", ["duration property","property duration","timing duration","duration timing"], 1),
    Q("@keyframes direction?", ["0% to 100%","from to","start end","begin finish"], 1),
    Q("What does transform: scale(2) do?", ["Move","Rotate","Double size","Half size"], 2),
  ], [V("CSS Animations","Web Dev Simplified","https://www.youtube.com/embed/YszONjKpgg4")]),
  M(8, "Project: Responsive Dashboard", "Intermediate", "60 min", ["Build complete responsive page","Combine flexbox, grid, animations","Use media queries","Implement mobile-first design"], [
    P("Build a responsive admin dashboard using all CSS concepts: Grid for layout, Flexbox for cards, media queries for responsiveness, transitions for interactivity."),
    C("Dashboard", "css", ".dashboard {\n  display: grid;\n  grid-template-areas: 'sidebar header' 'sidebar main';\n  grid-template-columns: 250px 1fr;\n}\n.card {\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.2s;\n}\n.card:hover { transform: translateY(-4px); }\n\n@media (max-width: 768px) {\n  .dashboard { grid-template-areas: 'header' 'main'; grid-template-columns: 1fr; }\n  .sidebar { display: none; }\n}", [
      E("grid-template-areas", "Named grid layout zones"),
      E("@media (max-width)", "Responsive breakpoint"),
      E("transition:", "Smooth hover effect"),
      E("display: none", "Hide sidebar on mobile"),
    ]),
  ], ["Build dashboard with grid layout","Style cards with hover effect","Add mobile breakpoint at 768px"], [
    Q("grid-template-areas value?", ["Names for grid cells","Column sizes","Row sizes","Gap sizes"], 0),
    Q("Mobile-first breakpoint starts?", ["max-width (desktop)","min-width (mobile)","max-device-width","orientation"], 1),
    Q("Hide element on mobile?", ["visibility: hidden","display: none","opacity: 0","hidden: true"], 1),
  ], [V("Responsive Dashboard","freeCodeCamp","https://www.youtube.com/embed/u8h1P5JSW5s")]),
]

js_modules = [
  M(1, "JavaScript Basics", "Beginner", "30 min", ["What is JavaScript","Adding JS to HTML","Console and alerts","Basic syntax"], [
    P("JavaScript is the programming language of the web. It adds interactivity, dynamic content, and logic to web pages."),
    A("HTML is the body (structure). CSS is the clothes (appearance). JavaScript is the brain (behavior and thinking)."),
    C("First JavaScript", "html", "<!DOCTYPE html>\n<html>\n<body>\n  <h1 id=\"title\">Hello</h1>\n  <button onclick=\"changeText()\">Click me</button>\n  <script>\n    console.log('Page loaded!');\n    alert('Welcome!');\n    function changeText() {\n      document.getElementById('title').textContent = 'Changed!';\n    }\n  </script>\n</body>\n</html>", [
      E("<script>", "Embed or link JavaScript"),
      E("console.log()", "Debug output to console"),
      E("alert()", "Simple popup message"),
      E("document.getElementById", "Access HTML element by ID"),
      E("onclick", "Event handler attribute"),
    ]),
  ], ["Create alert on button click","Log user action to console","Change text of element"], [
    Q("Where to put <script> tag?", ["<head> only","End of <body>","Both valid","Separate file only"], 2),
    Q("Debugging output method?", ["alert()","console.log()","prompt()","write()"], 1),
    Q("Access element by ID?", ["getElementByClass","getElementById","querySelectorAll","findById"], 1),
  ], [V("JavaScript for Beginners","freeCodeCamp","https://www.youtube.com/embed/PkZNo7MFNFg")]),
  M(2, "Variables & Data Types", "Beginner", "35 min", ["var, let, const","Strings, numbers, booleans","Type conversion","Template literals"], [
    P("Variables store data. let and const (ES6) are preferred over var. JavaScript has dynamic typing - variables change type at runtime."),
    C("Variables", "js", "const name = 'Alice';\nlet age = 25;\nlet isStudent = true;\nlet hobbies = ['reading', 'coding'];\nlet person = { name, age };\n\nconst greeting = `Hello ${name}, you are ${age}`;\n\nlet num = '42';\nlet converted = Number(num);", [
      E("const", "Cannot be reassigned"),
      E("let", "Block-scoped mutable variable"),
      E("Template literals", "String interpolation with ${}"),
      E("typeof", "Check variable type"),
    ]),
  ], ["Create variables with let and const","Use template literals for greeting","Convert string to number"], [
    Q("Immutable variable keyword?", ["var","let","const","static"], 2),
    Q("Template literal delimiter?", ["'",'"',"`","|"], 2),
    Q("Array type?", ["object","array","list","collection"], 0),
  ], [V("JavaScript Variables","Programming with Mosh","https://www.youtube.com/embed/edlFjlzxk0I")]),
  M(3, "Conditionals", "Beginner", "35 min", ["if/else statements","Ternary operator","Switch statements","Truthy and falsy values"], [
    P("Conditionals execute code based on conditions. JavaScript has if/else, ternary (short form), switch, and truthy/falsy coercion."),
    C("Conditionals", "js", "const score = 85;\n\nif (score >= 90) {\n  console.log('A');\n} else if (score >= 80) {\n  console.log('B');\n} else {\n  console.log('C');\n}\n\nconst status = score >= 60 ? 'Pass' : 'Fail';\n\nswitch (grade) {\n  case 'A': console.log('Excellent'); break;\n  case 'B': console.log('Good'); break;\n  default: console.log('Keep trying');\n}", [
      E("if / else if / else", "Multiple condition branching"),
      E("Ternary: condition ? A : B", "Inline conditional expression"),
      E("switch", "Multiple discrete value matching"),
      E("Falsy: false, 0, '', null, undefined", "Values coerced to false"),
    ]),
  ], ["Write grade calculator with if/else","Use ternary for pass/fail","Build switch for days of week"], [
    Q("Ternary operator symbols?", ["?? ::","? :","if else","?:"], 1),
    Q("Falsy value?", ["[]","{}","'0'","0"], 3),
    Q("Switch needs which keyword?", ["end","break","exit","stop"], 1),
  ], [V("JS Conditionals","Web Dev Simplified","https://www.youtube.com/embed/IsG4XdGSGF0")]),
  M(4, "Loops", "Beginner", "40 min", ["for loops","while loops","Array iteration","Break and continue"], [
    P("Loops repeat code. JavaScript has for, while, do-while, and modern array methods like forEach, map, and filter."),
    C("Loops", "js", "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n\nlet j = 0;\nwhile (j < 3) { console.log(j); j++; }\n\nconst fruits = ['apple', 'banana', 'cherry'];\nfruits.forEach(fruit => console.log(fruit));\nconst upper = fruits.map(f => f.toUpperCase());\nconst short = fruits.filter(f => f.length < 6);\n\nfor (const fruit of fruits) {\n  console.log(fruit);\n}", [
      E("for (init; cond; inc)", "Classic C-style loop"),
      E("while", "Loop while condition true"),
      E("forEach", "Execute for each element"),
      E(".map()", "Transform each element"),
      E(".filter()", "Keep matching elements"),
    ]),
  ], ["Count 1-10 with for loop","Use map to double array values","Build list with forEach"], [
    Q("Executes at least once?", ["while","for","do-while","forEach"], 2),
    Q("Filter returns?", ["New array with matches","Modified original","Boolean","Count"], 0),
    Q("Loop through object properties?", ["for...of","for...in","forEach","map"], 1),
  ], [V("JS Loops","Traversy Media","https://www.youtube.com/embed/s9wW2PpJ3QY")]),
  M(5, "Functions", "Beginner", "40 min", ["Function declarations and expressions","Arrow functions","Parameters and return","Scope and closures"], [
    P("Functions are reusable blocks of code. ES6 introduced arrow functions with concise syntax and lexical this binding."),
    C("Functions", "js", "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst add = (a, b) => a + b;\nconst square = x => x * x;\n\nfunction multiply(a, b = 1) {\n  return a * b;\n}\n\nfunction sum(...numbers) {\n  return numbers.reduce((acc, n) => acc + n, 0);\n}", [
      E("function declaration", "Hoisted function definition"),
      E("Arrow: (params) => expr", "Concise function syntax"),
      E("Default params", "Fallback value for undefined"),
      E("...rest", "Collect remaining arguments"),
    ]),
  ], ["Create arrow function to double","Write function with default params","Build sum function with rest"], [
    Q("Arrow function with single param needs?", ["Parentheses","No parentheses","Curly braces","Return keyword"], 1),
    Q("Rest params operator?", ["...","*","&","$"], 0),
    Q("Are declarations hoisted?", ["Yes","No","Only const","Only let"], 0),
  ], [V("JavaScript Functions","freeCodeCamp","https://www.youtube.com/embed/FOD408pWMm0")]),
  M(6, "Arrays & Objects", "Intermediate", "45 min", ["Array methods (push, pop, slice, splice)","Destructuring","Spread operator","Object methods"], [
    P("Arrays and objects are fundamental data structures. Modern JS provides powerful methods for manipulation."),
    C("Arrays & Objects", "js", "const arr = [1, 2, 3];\narr.push(4);\narr.pop();\narr.slice(0, 2);\narr.splice(1, 1, 99);\n\nconst [first, second] = arr;\nconst { name, age } = person;\n\nconst copy = [...arr];\nconst merged = { ...obj1, ...obj2 };\n\nObject.keys(obj);\nObject.values(obj);\nObject.entries(obj);", [
      E("push/pop", "Add/remove from end"),
      E("slice vs splice", "New array vs mutate"),
      E("Destructuring", "Unpack array/object"),
      E("Spread ...", "Copy and merge"),
    ]),
  ], ["Use map/filter to transform array","Destructure object in function params","Merge two objects with spread"], [
    Q("Mutates original array?", ["map","filter","slice","splice"], 3),
    Q("Copy array with spread?", ["[...arr]","{...arr}","arr.copy()","clone(arr)"], 0),
    Q("Get object value array?", ["Object.keys","Object.values","Object.entries","Object.props"], 1),
  ], [V("JS Array Methods","Fireship","https://www.youtube.com/embed/R8rmfD9Y5-c")]),
  M(7, "DOM Manipulation", "Intermediate", "50 min", ["Select elements","Modify content and styles","Create and remove elements","Event listeners basics"], [
    P("The Document Object Model (DOM) represents HTML as a tree. JavaScript can traverse, read, and modify the DOM dynamically."),
    A("The DOM is like a family tree. Each element is a node with parent, children, and siblings. JavaScript can add, remove, or change any node."),
    C("DOM Manipulation", "js", "const el = document.querySelector('.class');\nconst all = document.querySelectorAll('p');\n\nel.textContent = 'New text';\nel.innerHTML = '<span>HTML</span>';\nel.style.color = 'red';\nel.classList.add('active');\nel.classList.toggle('dark');\n\nconst div = document.createElement('div');\ndiv.textContent = 'Created';\ndocument.body.appendChild(div);\nel.remove();", [
      E("querySelector", "First matching element"),
      E("querySelectorAll", "NodeList of all matches"),
      E("textContent vs innerHTML", "Text only vs HTML parsing"),
      E("classList", "Add, remove, toggle CSS classes"),
    ]),
  ], ["Create dynamic list from array","Toggle dark mode class","Build element with createElement"], [
    Q("Returns NodeList?", ["querySelector","querySelectorAll","getElementById","firstChild"], 1),
    Q("Safe for user input?", ["innerHTML","textContent","outerHTML","insertAdjacentHTML"], 1),
    Q("Adds class if missing?", ["add","remove","toggle","contains"], 2),
  ], [V("DOM Manipulation","Traversy Media","https://www.youtube.com/embed/0ik6X4DJKCc")]),
  M(8, "Events", "Intermediate", "45 min", ["Event types and listeners","Event object","Event delegation","Prevent default and propagation"], [
    P("Events are signals when something happens: clicks, keypresses, form submissions, etc. Event delegation handles dynamic elements efficiently."),
    C("Events", "js", "btn.addEventListener('click', function(e) {\n  console.log(e.target, e.type);\n});\n\ndocument.querySelector('ul').addEventListener('click', e => {\n  if (e.target.tagName === 'LI') {\n    console.log('Item:', e.target.textContent);\n  }\n});\n\ndocument.addEventListener('keydown', e => {\n  if (e.key === 'Enter') submitForm();\n});\n\ne.preventDefault();\ne.stopPropagation();", [
      E("addEventListener", "Attach event handler"),
      E("e.target", "Element that triggered event"),
      E("Event delegation", "Parent handles child events via bubbling"),
      E("preventDefault", "Cancel default behavior"),
      E("stopPropagation", "Prevent event bubbling"),
    ]),
  ], ["Build click counter button","Use event delegation for list","Create keyboard shortcut handler"], [
    Q("Event phase order?", ["Capture > Target > Bubble","Bubble > Target > Capture","Target > Bubble","Capture > Bubble"], 0),
    Q("Third argument true does?", ["Remove listener","Use capture phase","Use bubble phase","Once"], 1),
    Q("Stop all handlers?", ["stopPropagation","stopImmediatePropagation","preventDefault","cancelBubble"], 1),
  ], [V("JS Events","Web Dev Simplified","https://www.youtube.com/embed/0ik6X4DJKCc")]),
  M(9, "Async JavaScript", "Intermediate", "50 min", ["Callbacks","Promises","Async/await","Fetch API and error handling"], [
    P("Asynchronous JavaScript handles operations that take time: API calls, file reading, timers. Promises and async/await make async code readable."),
    A("Async is like ordering coffee. You place the order (call API), get a receipt (Promise), wait, and pick up when ready (resolve)."),
    C("Async JS", "js", "const fetchData = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Data!'), 1000);\n});\nfetchData.then(data => console.log(data)).catch(err => console.error(err));\n\nasync function getData() {\n  try {\n    const res = await fetch('https://api.example.com/data');\n    if (!res.ok) throw new Error('Failed');\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Error:', err);\n  }\n}\n\nconst [users, posts] = await Promise.all([\n  fetch('/users').then(r => r.json()),\n  fetch('/posts').then(r => r.json())\n]);", [
      E("new Promise", "Create async operation"),
      E("await", "Pause execution until promise resolves"),
      E("try/catch", "Handle async errors"),
      E("fetch API", "Modern HTTP requests"),
      E("Promise.all", "Wait for multiple promises"),
    ]),
  ], ["Fetch data from API and display","Handle fetch errors with try/catch","Use Promise.all for parallel requests"], [
    Q("Pauses execution?", ["async","await","Promise","then"], 1),
    Q("Handle promise error?", [".finally",".then",".catch","try"], 2),
    Q("Promise.all behavior?", ["All resolve or first reject","Sequential","Fastest first","Random"], 0),
  ], [V("Async JavaScript","freeCodeCamp","https://www.youtube.com/embed/V_Kr9OSfDeU")]),
  M(10, "Project: Interactive Todo App", "Intermediate", "60 min", ["Build complete todo app","Use DOM and events","Implement CRUD operations","Persist with localStorage"], [
    P("Build a full todo application: add, toggle complete, edit, delete tasks. Use localStorage for persistence, event delegation for efficiency."),
    C("Todo App", "js", "const todo = {\n  todos: JSON.parse(localStorage.getItem('todos')) || [],\n\n  add(text) {\n    this.todos.push({ id: Date.now(), text, done: false });\n    this.save(); this.render();\n  },\n  toggle(id) {\n    const t = this.todos.find(t => t.id === id);\n    if (t) { t.done = !t.done; this.save(); this.render(); }\n  },\n  remove(id) {\n    this.todos = this.todos.filter(t => t.id !== id);\n    this.save(); this.render();\n  },\n  save() { localStorage.setItem('todos', JSON.stringify(this.todos)); },\n\n  render() {\n    const list = document.querySelector('#todo-list');\n    list.innerHTML = this.todos.map(t => `<li class=\"${t.done ? 'done' : ''}\"><span>${t.text}</span></li>`).join('');\n  }\n};\ntodo.render();", [
      E("localStorage", "Persist data across sessions"),
      E("CRUD", "Create, Read, Update, Delete"),
      E("Event delegation", "Single listener for list"),
      E("JSON.stringify/parse", "Serialize/deserialize data"),
    ]),
  ], ["Add task input and button","Toggle task completion with class","Delete task with remove button"], [
    Q("localStorage stores?", ["Objects","Strings","Arrays","Numbers"], 1),
    Q("Add event to many items?", ["Each gets listener","Event delegation","Global listener","Once"], 1),
    Q("Filter returns?", ["Modified original","New filtered array","Boolean","Index"], 1),
  ], [V("Build a Todo App","Traversy Media","https://www.youtube.com/embed/W7FaYfuwu70")]),
]

python_modules = [
  M(1, "Python Introduction", "Beginner", "30 min", ["What is Python","Installing Python","Python REPL","First program"], [
    P("Python is a high-level, interpreted programming language known for readability. Created by Guido van Rossum in 1991."),
    A("Python is like writing instructions in plain English. It reads almost like natural language, making it perfect for beginners."),
    C("First Python", "python", "# This is a comment\nprint('Hello, World!')\nname = input('Enter name: ')\nprint(f'Welcome, {name}')\n\nresult = (5 + 3) * 2\nprint(f'Result: {result}')", [
      E("print()", "Output to console"),
      E("input()", "Read user input"),
      E("f-string", "Formatted string interpolation"),
      E("# comment", "Single-line comment"),
    ]),
  ], ["Print hello world with f-string","Create name greeting program","Use Python as calculator"], [
    Q("Python creator?", ["Dennis Ritchie","Guido van Rossum","Brendan Eich","James Gosling"], 1),
    Q("String interpolation syntax?", ["%s",".format()","f-string","$variable"], 2),
    Q("Comment character?", ["//","#","<!--","/*"], 1),
  ], [V("Python for Beginners","freeCodeCamp","https://www.youtube.com/embed/_uQrJ0TkZls"),V("Python Tutorial","CodeWithHarry","https://www.youtube.com/embed/gfDE2a7MKjA")]),
  M(2, "Variables & Data Types", "Beginner", "35 min", ["Numbers, strings, booleans","Type conversion","String methods","F-strings"], [
    P("Python has dynamic typing. Core types: int, float, str, bool, None. String methods provide powerful text manipulation."),
    C("Variables", "python", "name = 'Alice'\nage = 25\nheight = 5.6\nis_student = True\n\nnum_str = '42'\nnum_int = int(num_str)\n\ntext = '  hello world  '\nprint(text.strip().upper())\nprint(text.replace('world', 'Python'))\nparts = 'a,b,c'.split(',')\n\nprint(f'{name} is {age} years old')\nprint(f'Pi rounded: {3.14159:.2f}')", [
      E("int, float, str, bool", "Core data types"),
      E("strip(), upper(), replace()", "String methods"),
      E("split()", "Split string into list"),
      E("f-string formatting", "f'{var}' and format specifiers"),
    ]),
  ], ["Create variables of each type","Use string methods (upper, split)","Format number to 2 decimal places"], [
    Q("String to int function?", ["strtoint()","int()","parseint()","toint()"], 1),
    Q("Remove whitespace method?", ["trim()","strip()","remove()","clean()"], 1),
    Q("Boolean values?", ["true/false","True/False","TRUE/FALSE","T/F"], 1),
  ], [V("Python Variables","Programming with Mosh","https://www.youtube.com/embed/cQT33yu9pY8")]),
  M(3, "Conditionals", "Beginner", "35 min", ["if/elif/else","Logical operators","Membership operators","Short-circuit evaluation"], [
    P("Python uses indentation for code blocks. Conditions use if, elif, else with and, or, not operators."),
    C("Conditionals", "python", "score = 85\n\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\n\nif 'admin' in roles:\n    print('Has access')\n\nstatus = 'pass' if score >= 60 else 'fail'\n\nif 0 < age < 120:\n    print('Valid age')", [
      E("if/elif/else", "Conditional branching (indented)"),
      E("in operator", "Check containment in sequence"),
      E("Ternary: X if cond else Y", "Inline conditional expression"),
      E("Chained: 0 < x < 10", "Multiple comparison operators"),
    ]),
  ], ["Write grade calculator","Use 'in' to check list membership","Write ternary for even/odd"], [
    Q("elif stands for?", ["elseif","else if","elif","elsif"], 2),
    Q("Chained comparison syntax?", ["0 < x < 10","0<x&&x<10","x>0&&x<10","0<x AND x<10"], 0),
    Q("Ternary returns?", ["Statement","Expression value","Tuple","None"], 1),
  ], [V("Python Conditionals","Corey Schafer","https://www.youtube.com/embed/DZwmZ8Usvnk")]),
  M(4, "Loops", "Beginner", "40 min", ["for loops with range","while loops","break and continue","List comprehensions"], [
    P("Python loops: for iterates sequences, while repeats until condition false. List comprehensions provide concise loop syntax."),
    C("Loops", "python", "for i in range(5):\n    print(i)\n\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\n\nfor idx, fruit in enumerate(['apple', 'banana']):\n    print(idx, fruit)\n\nsquares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]", [
      E("range(n)", "Sequence 0 to n-1"),
      E("enumerate", "Get index and value"),
      E("List comprehension", "[expr for item in iterable]"),
      E("zip", "Pair multiple iterables"),
    ]),
  ], ["Print 1-10 with for loop","Use enumerate with list","Build list comprehension for even squares"], [
    Q("range(5) produces?", ["0-4","1-5","0-5","1-4"], 0),
    Q("List comprehension delimiter?", ["()","[]","{}","<>"], 1),
    Q("zip does what?", ["Combines iterables","Sorts lists","Filters items","Zips files"], 0),
  ], [V("Python Loops","freeCodeCamp","https://www.youtube.com/embed/94UHCEmprCY")]),
  M(5, "Functions", "Intermediate", "40 min", ["def and return","Parameters and defaults","*args and **kwargs","Lambda functions"], [
    P("Functions are first-class objects in Python. They support default arguments, variable arguments, and lambda (anonymous) syntax."),
    C("Functions", "python", "def greet(name, greeting='Hello'):\n    return f'{greeting}, {name}!'\n\ndef sum_all(*numbers):\n    return sum(numbers)\n\ndef print_info(**data):\n    for key, value in data.items():\n        print(f'{key}: {value}')\n\nsquare = lambda x: x ** 2\nsorted(list, key=lambda x: x['age'])", [
      E("def", "Function definition"),
      E("Default params", "Fallback if argument omitted"),
      E("*args", "Variable positional arguments"),
      E("**kwargs", "Variable keyword arguments"),
      E("lambda", "Anonymous inline function"),
    ]),
  ], ["Create function with default param","Use *args to average numbers","Write lambda to sort dicts"], [
    Q("Variable kwargs prefix?", ["**","*","&","%"], 0),
    Q("Lambda body limit?", ["Single expression","Multiple lines","Return required","Any code"], 0),
    Q("Decorator symbol?", ["@","#","$","&"], 0),
  ], [V("Python Functions","Corey Schafer","https://www.youtube.com/embed/9Os0o3wzS_I")]),
  M(6, "Lists & Dictionaries", "Intermediate", "40 min", ["List methods (append, sort, reverse)","Dictionary operations","Set operations","Nested data structures"], [
    P("Lists are ordered sequences (mutable). Dictionaries store key-value pairs. Sets store unique elements for fast membership testing."),
    C("Data Structures", "python", "fruits = ['apple', 'banana', 'cherry']\nfruits.append('date')\nfruits.sort()\n\nperson = {'name': 'Alice', 'age': 25}\nperson['city'] = 'New York'\nfor key, value in person.items():\n    print(key, value)\n\nsquares = {x: x**2 for x in range(5)}\n\nunique = {1, 2, 3, 3, 2}\na = {1, 2, 3}; b = {3, 4, 5}\nprint(a & b)\nprint(a | b)\nprint(a - b)", [
      E("list.append/sort", "Common list operations"),
      E("dict.items()", "Iterate key-value pairs"),
      E("Dictionary comprehension", "Build dict from loop"),
      E("Set operations & | -", "Intersection, union, difference"),
    ]),
  ], ["Build list from user input loop","Create dict with dict comprehension","Union and intersect two sets"], [
    Q("Add to list end?", ["add()","append()","push()","insert()"], 1),
    Q("Set with duplicates?", ["Retains all","Removes duplicates","Error","Sorted"], 1),
    Q("Items() returns?", ["Keys only","Values only","Key-value pairs","Indices"], 2),
  ], [V("Python Data Structures","freeCodeCamp","https://www.youtube.com/embed/R-HLU9Fl5ug")]),
  M(7, "File I/O & Error Handling", "Intermediate", "40 min", ["Open/read/write files","With statement","Try/except/finally","Common exceptions"], [
    P("Python makes file I/O simple with open() and context managers (with). Exception handling uses try/except blocks."),
    C("File I/O", "python", "with open('data.txt', 'r') as file:\n    content = file.read()\n    for line in file:\n        print(line.strip())\n\nwith open('output.txt', 'w') as file:\n    file.write('Hello, World!')\n\nimport json\nwith open('data.json') as f:\n    data = json.load(f)\n\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nexcept Exception as e:\n    print(f'Error: {e}')\nfinally:\n    print('Cleanup runs always')", [
      E("open() with modes", "'r' read, 'w' write, 'a' append"),
      E("with statement", "Automatic resource cleanup"),
      E("json.load/json.dump", "JSON serialization"),
      E("try/except/finally", "Error handling structure"),
    ]),
  ], ["Read file and count lines","Write user input to file","Handle division error gracefully"], [
    Q("Write mode character?", ["r","w","a","x"], 1),
    Q("Context manager keyword?", ["using","with","open","context"], 1),
    Q("Always runs even on error?", ["except","else","finally","catch"], 2),
  ], [V("Python File I/O","Corey Schafer","https://www.youtube.com/embed/Uh2ebFW8OYM")]),
  M(8, "Project: CLI Todo Manager", "Intermediate", "60 min", ["Build CLI application","Use functions and modules","File persistence","User interaction loop"], [
    P("Build a command-line todo manager that adds, lists, completes, and deletes tasks with JSON file persistence."),
    C("CLI Todo", "python", "import json, os\n\nDATA_FILE = 'todos.json'\n\ndef load():\n    if not os.path.exists(DATA_FILE): return []\n    with open(DATA_FILE) as f: return json.load(f)\n\ndef save(todos):\n    with open(DATA_FILE, 'w') as f: json.dump(todos, f, indent=2)\n\ndef show(todos):\n    for i, t in enumerate(todos, 1):\n        status = 'X' if t['done'] else ' '\n        print(f'{i}. [{status}] {t[\"text\"]}')\n\ndef main():\n    todos = load()\n    while True:\n        cmd = input('> ').strip().lower()\n        if cmd == 'add':\n            text = input('Task: ')\n            todos.append({'text': text, 'done': False})\n        elif cmd == 'done':\n            idx = int(input('Number: ')) - 1\n            if 0 <= idx < len(todos):\n                todos[idx]['done'] = True\n        elif cmd == 'quit': break\n        save(todos); show(todos)\n\nif __name__ == '__main__': main()", [
      E("json.load/dump", "Persist data to file"),
      E("os.path.exists", "Check file existence"),
      E("input() in loop", "Interactive CLI prompt"),
      E("__name__ guard", "Run only when executed directly"),
    ]),
  ], ["Build add/list/complete commands","Persist todos to JSON file","Add error handling for invalid input"], [
    Q("__name__ == '__main__' does what?", ["Imports module","Runs on direct execution","Defines main","Sets entry point"], 1),
    Q("Check file exists?", ["os.path.exists","file.exists","path.isFile","os.exist"], 0),
    Q("JSON dump indent param?", ["Pretty print formatting","Encoding","Sort order","File mode"], 0),
  ], [V("Python CLI Apps","freeCodeCamp","https://www.youtube.com/embed/3ZU0vG-dL8U")]),
]

java_modules = [
  M(1, "Java Introduction", "Beginner", "35 min", ["What is Java","JDK, JRE, JVM","First Java program","Compile and run"], [
    P("Java is a compiled, object-oriented language. Write once, run anywhere (WORA) via JVM. Created by James Gosling at Sun Microsystems (1995)."),
    A("Java code is like a recipe (source). The compiler (javac) translates it to a universal cookbook format (bytecode). The JVM is any kitchen that can cook from that cookbook."),
    C("First Java", "java", "public class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}", [
      E("public class Hello", "Class name matches filename"),
      E("public static void main", "Program entry point"),
      E("String[] args", "Command-line arguments"),
      E("System.out.println", "Print output to console"),
    ]),
  ], ["Write and compile Hello.java","Use javac and java commands","Print user input with Scanner"], [
    Q("Java bytecode runs on?", ["Browser","JVM","OS","CPU"], 1),
    Q("Entry point method?", ["main","start","run","execute"], 0),
    Q("Print to console?", ["console.log","System.out.println","cout","printf"], 1),
  ], [V("Java for Beginners","freeCodeCamp","https://www.youtube.com/embed/grEKMHGYyns"),V("Java Tutorial","CodeWithHarry","https://www.youtube.com/embed/UmnCZ7i2eSg")]),
  M(2, "Java Basics", "Beginner", "40 min", ["Primitive types","Operators","Control flow","Scanner input"], [
    P("Java has 8 primitive types (byte, short, int, long, float, double, char, boolean). Variables must be declared with a type."),
    C("Java Basics", "java", "public class Basics {\n    public static void main(String[] args) {\n        int age = 25;\n        double price = 19.99;\n        char grade = 'A';\n        boolean passed = true;\n\n        if (age >= 18) {\n            System.out.println(\"Adult\");\n        } else {\n            System.out.println(\"Minor\");\n        }\n\n        for (int i = 0; i < 5; i++) {\n            System.out.println(i);\n        }\n\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Enter name: \");\n        String name = sc.nextLine();\n        sc.close();\n    }\n}", [
      E("int, double, char, boolean", "Primitive types"),
      E("if/else", "Conditional branching"),
      E("for loop", "C-style iteration"),
      E("Scanner", "Read user input"),
    ]),
  ], ["Create primitive variables","Use if/else for age check","Read name with Scanner"], [
    Q("Scanner package?", ["java.io","java.util","java.lang","java.scanner"], 1),
    Q("Double capacity?", ["32-bit float","64-bit decimal","128-bit","16-bit"], 1),
    Q("Default int size?", ["8-bit","16-bit","32-bit","64-bit"], 2),
  ], [V("Java Basics","Programming with Mosh","https://www.youtube.com/embed/eIrMbTQmNQ0")]),
  M(3, "OOP: Classes & Objects", "Intermediate", "50 min", ["Creating classes","Fields, constructors, methods","Encapsulation with getters/setters","Static members"], [
    P("Java is fundamentally object-oriented. Classes are blueprints, objects are instances. Encapsulation bundles data with methods."),
    C("Classes & Objects", "java", "public class Student {\n    private String name;\n    private int age;\n    public static int count = 0;\n\n    public Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n        count++;\n    }\n\n    public String getName() { return name; }\n    public void setName(String name) { this.name = name; }\n\n    public String introduce() {\n        return \"Hi, I'm \" + name + \" and I'm \" + age;\n    }\n}", [
      E("public class", "Class declaration"),
      E("private fields", "Encapsulation - hide data"),
      E("Constructor", "Initialize new objects"),
      E("static", "Class-level shared member"),
      E("Getters/setters", "Controlled access to fields"),
    ]),
  ], ["Create Person class with name/age","Add getters and introduce method","Use static counter for instances"], [
    Q("Constructor name must match?", ["Package","Class","Method","File"], 1),
    Q("Static belongs to?", ["Class","Instance","Package","Method"], 0),
    Q("this keyword refers to?", ["Superclass","Current instance","Package","Class"], 1),
  ], [V("Java OOP","freeCodeCamp","https://www.youtube.com/embed/8IXgJ3bh6qM")]),
  M(4, "Arrays & Strings", "Intermediate", "40 min", ["Array declaration and initialization","Array methods","String immutability","StringBuilder"], [
    P("Arrays store multiple values of the same type. Strings are immutable in Java - operations create new strings."),
    C("Arrays & Strings", "java", "public class ArraysStrings {\n    public static void main(String[] args) {\n        int[] numbers = {10, 20, 30, 40, 50};\n        String[] names = new String[3];\n        names[0] = \"Alice\";\n\n        for (int num : numbers) {\n            System.out.println(num);\n        }\n\n        String text = \"Hello World\";\n        System.out.println(text.length());\n        System.out.println(text.substring(0, 5));\n        System.out.println(text.split(\" \")[0]);\n\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"Hello\");\n        sb.append(\" \");\n        sb.append(\"World\");\n        System.out.println(sb.toString());\n    }\n}", [
      E("int[] / String[]", "Array declaration syntax"),
      E("Enhanced for (for-each)", "Iterate without index"),
      E("String.length/substring/split", "String manipulation"),
      E("StringBuilder", "Mutable string for efficiency"),
    ]),
  ], ["Create int array find max","Use StringBuilder to concatenate","Iterate with enhanced for loop"], [
    Q("Find array length?", ["size()","count","length","len"], 2),
    Q("StringBuilder benefit?", ["Immutable","Mutable efficient","Thread-safe","Auto-sorted"], 1),
    Q("Enhanced for requires?", ["Index variable","Iterator or array","Size condition","Counter"], 1),
  ], [V("Java Arrays","Coding with John","https://www.youtube.com/embed/ei0X1pM6Zqo")]),
  M(5, "Methods & Overloading", "Intermediate", "35 min", ["Method declaration","Return types","Method overloading","Pass by value"], [
    P("Methods define reusable behavior. Overloading provides multiple versions with different parameters. Java is strictly pass-by-value."),
    C("Methods", "java", "public class Calculator {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n\n    public static double add(double a, double b) {\n        return a + b;\n    }\n\n    public static int sum(int... numbers) {\n        int total = 0;\n        for (int n : numbers) total += n;\n        return total;\n    }\n}", [
      E("return type", "Method returns a value or void"),
      E("Overloading", "Same name, different parameters"),
      E("varargs (int...)", "Variable number of arguments"),
    ]),
  ], ["Create overloaded methods for multiply","Use varargs to find max","Write void method to print array"], [
    Q("Overloading depends on?", ["Return type","Parameter types","Access modifier","Name length"], 1),
    Q("Varargs syntax?", ["int[]","int...","var int","int*"], 1),
    Q("Method without return?", ["null type","empty type","void type","nothing"], 2),
  ], [V("Java Methods","Programming with Mosh","https://www.youtube.com/embed/k1CCe1C3Syo")]),
  M(6, "Inheritance & Polymorphism", "Intermediate", "50 min", ["extends keyword","super and this","Method overriding","Polymorphism"], [
    P("Inheritance creates parent-child class relationships. Subclasses inherit fields and methods, can override behavior."),
    C("Inheritance", "java", "public class Animal {\n    protected String name;\n    public Animal(String name) { this.name = name; }\n    public void speak() { System.out.println(\"...\"); }\n}\n\npublic class Dog extends Animal {\n    public Dog(String name) { super(name); }\n    @Override\n    public void speak() { System.out.println(\"Woof!\"); }\n}\n\npublic class Cat extends Animal {\n    public Cat(String name) { super(name); }\n    @Override\n    public void speak() { System.out.println(\"Meow!\"); }\n}\n\nAnimal pet1 = new Dog(\"Buddy\");\nAnimal pet2 = new Cat(\"Whiskers\");\npet1.speak();\npet2.speak();", [
      E("extends", "Inherit from parent class"),
      E("super(...)", "Call parent constructor"),
      E("@Override", "Redefine parent method"),
      E("Polymorphism", "Parent ref, child object"),
    ]),
  ], ["Create Shape parent and Circle/Rectangle","Override area() method","Use super to call parent constructor"], [
    Q("Override annotation?", ["@Override","@Inherit","@Extends","@OverrideMethod"], 0),
    Q("Polymorphism allows?", ["Only parent methods","Child behavior via parent ref","Multiple inheritance","Private access"], 1),
    Q("Every class extends?", ["Object","Class","Super","Root"], 0),
  ], [V("Java Inheritance","freeCodeCamp","https://www.youtube.com/embed/eIXSuIIb3Fs")]),
  M(7, "Interfaces & Abstract Classes", "Intermediate", "45 min", ["Abstract classes","Interface contracts","implements keyword","Default methods"], [
    P("Abstract classes provide partial implementation. Interfaces define contracts (fully abstract). Java 8+ adds default methods in interfaces."),
    C("Interfaces", "java", "public interface Drawable {\n    void draw();\n    default void print() { System.out.println(\"Printing...\"); }\n}\n\npublic abstract class Shape {\n    protected String color;\n    public Shape(String color) { this.color = color; }\n    public abstract double area();\n    public String getColor() { return color; }\n}\n\npublic class Circle extends Shape implements Drawable {\n    private double radius;\n    public Circle(String color, double r) { super(color); radius = r; }\n    public double area() { return Math.PI * radius * radius; }\n    public void draw() { System.out.println(\"Drawing circle\"); }\n}", [
      E("interface", "Contract with abstract methods"),
      E("implements", "Class satisfies interface"),
      E("abstract class", "Partial implementation (cannot instantiate)"),
      E("default method", "Interface with default implementation"),
    ]),
  ], ["Create Drawable interface with methods","Build abstract Shape class","Implement multiple interfaces"], [
    Q("Interface can have?", ["Only abstract","Abstract and default","Fields only","Constructors"], 1),
    Q("Abstract class vs interface?", ["Same","Abstract has state","Interface has constructors","Abstract is final"], 1),
    Q("Multiple interfaces?", ["Not allowed","Comma-separated","implements A, B","extends A, B"], 2),
  ], [V("Java Interfaces","Coding with John","https://www.youtube.com/embed/HqF2kZqPpkM")]),
  M(8, "Exception Handling", "Intermediate", "40 min", ["Checked vs unchecked exceptions","try-catch-finally","Custom exceptions","try-with-resources"], [
    P("Exceptions represent error conditions. Checked exceptions must be handled; unchecked (RuntimeException) don't require explicit handling."),
    C("Exceptions", "java", "import java.io.*;\n\npublic class ExceptionsDemo {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Cannot divide by zero\");\n        } finally {\n            System.out.println(\"Cleanup\");\n        }\n\n        try (FileReader fr = new FileReader(\"file.txt\");\n             BufferedReader br = new BufferedReader(fr)) {\n            String line = br.readLine();\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n\n        if (age < 0) {\n            throw new InvalidAgeException(\"Age cannot be negative\");\n        }\n    }\n}\n\nclass InvalidAgeException extends Exception {\n    public InvalidAgeException(String msg) { super(msg); }\n}", [
      E("try/catch", "Handle exceptions"),
      E("finally", "Always executes (cleanup)"),
      E("try-with-resources", "Auto-close AutoCloseable"),
      E("throw new", "Create and throw exception"),
      E("Custom exception", "Extend Exception or RuntimeException"),
    ]),
  ], ["Write divide function with try/catch","Create custom exception for validation","Use try-with-resources for file"], [
    Q("Checked exception requires?", ["Handling or declare","Nothing","Runtime only","Logging"], 0),
    Q("try-with-resources requires?", ["Serializable","AutoCloseable","Cloneable","Comparable"], 1),
    Q("Exception base class?", ["Error","Throwable","Exception","RuntimeException"], 2),
  ], [V("Java Exceptions","Programming with Mosh","https://www.youtube.com/embed/_gLhC3wFnDk")]),
]

c_modules = [
  M(1, "C Introduction", "Beginner", "30 min", ["History of C","Compiling with GCC","Basic program structure","printf and comments"], [
    P("C is a procedural language developed by Dennis Ritchie (1972) at Bell Labs. It underlies most operating systems, embedded systems, and modern languages."),
    A("C is like a manual transmission car: you control everything. Higher-level languages are automatics - easier to drive but less control."),
    C("First C", "c", "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}", [
      E("#include <stdio.h>", "Include standard I/O library"),
      E("int main()", "Entry point returning int"),
      E("printf", "Formatted output"),
      E("return 0;", "Exit status (0 = success)"),
    ]),
  ], ["Write and compile Hello.c","Print name using printf","Use escape sequences"], [
    Q("C creator?", ["Ken Thompson","Dennis Ritchie","Brian Kernighan","Bjarne Stroustrup"], 1),
    Q("C -O2 flag does?", ["Debug","Optimize","Output file","Only warnings"], 1),
    Q("Exit success value?", ["1","0","-1","void"], 1),
  ], [V("C for Beginners","freeCodeCamp","https://www.youtube.com/embed/KJgsSFOSQv0"),V("C Tutorial","CodeWithHarry","https://www.youtube.com/embed/7Dh73z3icd8")]),
  M(2, "Variables & Data Types", "Beginner", "35 min", ["int, float, char, double","Format specifiers","Constants with #define","Type conversion"], [
    P("C is statically typed. Common types: int (4 bytes), float (4), double (8), char (1). Use format specifiers in printf/scanf."),
    C("Variables", "c", "#include <stdio.h>\n#define PI 3.14159\n\nint main() {\n    int age = 25;\n    float price = 19.99f;\n    char grade = 'A';\n    double pi = PI;\n\n    printf(\"Age: %d\\n\", age);\n    printf(\"Price: %.2f\\n\", price);\n\n    int input;\n    printf(\"Enter number: \");\n    scanf(\"%d\", &input);\n    return 0;\n}", [
      E("int, float, char, double", "Basic data types"),
      E("%d, %f, %c, %lf", "Format specifiers"),
      E("#define", "Preprocessor constant"),
      E("scanf with &", "Read input with address-of"),
    ]),
  ], ["Use all format specifiers","Create #define constant","Read input with scanf"], [
    Q("scanf needs what prefix?", ["*","&","@","#"], 1),
    Q("Float format specifier?", ["%d","%f","%c","%lf"], 1),
    Q("#define without?", ["Semicolon","Parentheses","Type","Value"], 2),
  ], [V("C Data Types","Portfolio Courses","https://www.youtube.com/embed/7Dh73z3icd8")]),
  M(3, "Pointers & Memory", "Intermediate", "50 min", ["Pointer concepts","Address-of and dereference","Pointer arithmetic","malloc and free"], [
    P("Pointers store memory addresses. They provide direct memory manipulation essential for systems programming, arrays, and dynamic allocation."),
    A("Memory is a row of lockers. Each has a number (address). A pointer is a sticky note saying locker #42. Dereferencing opens locker #42 to see what's inside."),
    C("Pointers", "c", "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int x = 42;\n    int *ptr = &x;\n\n    printf(\"Value: %d\\n\", *ptr);\n    printf(\"Address: %p\\n\", ptr);\n\n    int *arr = malloc(5 * sizeof(int));\n    if (arr == NULL) { return 1; }\n    arr[0] = 10;\n    free(arr);\n    return 0;\n}", [
      E("int *ptr = &x", "Pointer stores address of x"),
      E("*ptr (dereference)", "Access value at address"),
      E("malloc", "Allocates heap memory"),
      E("free", "Deallocates heap memory"),
      E("sizeof", "Size in bytes"),
    ]),
  ], ["Swap two values using pointers","Create dynamic int array with malloc","Write function returning pointer"], [
    Q("Dereference operator?", ["&","*","->",".*"], 1),
    Q("malloc failure returns?", ["0","NULL","-1","void"], 1),
    Q("sizeof(char) on most systems?", ["2","4","1","8"], 2),
  ], [V("C Pointers","freeCodeCamp","https://www.youtube.com/embed/2GDiXstVbns")]),
  M(4, "Arrays & Strings", "Intermediate", "40 min", ["Array declaration","String as char array","String.h functions","Multidimensional arrays"], [
    P("Arrays are contiguous memory blocks. Strings are null-terminated char arrays. C provides string functions in <string.h>."),
    C("Arrays & Strings", "c", "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    for (int i = 0; i < 5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    char name[] = \"Alice\";\n    printf(\"Length: %lu\\n\", strlen(name));\n\n    char dest[20];\n    strcpy(dest, name);\n    strcat(dest, \" Smith\");\n\n    if (strcmp(name, \"Alice\") == 0) {\n        printf(\"Equal\\n\");\n    }\n    return 0;\n}", [
      E("int arr[5]", "Fixed-size array declaration"),
      E("char[] = \"string\"", "Null-terminated string"),
      E("strlen, strcpy, strcat, strcmp", "String library functions"),
      E("\\0 (null terminator)", "String end marker"),
    ]),
  ], ["Reverse a string in place","Find max in int array","Copy and concatenate strings"], [
    Q("String end marker?", ["\\n","\\0","\\t","\\r"], 1),
    Q("strcmp returns 0 on?", ["Equal","First larger","Second larger","Error"], 0),
    Q("strcpy does what?", ["Compare","Copy","Concat","Length"], 1),
  ], [V("C Arrays & Strings","Portfolio Courses","https://www.youtube.com/embed/6qnpYLkDXOU")]),
  M(5, "Functions", "Intermediate", "35 min", ["Return types and parameters","Pass by value","Function prototypes","Recursion"], [
    P("Functions organize code into reusable units. C uses pass-by-value. Function prototypes tell the compiler about functions before use."),
    C("Functions", "c", "#include <stdio.h>\n\nint factorial(int n);\nvoid swap(int *a, int *b);\n\nint main() {\n    printf(\"Factorial(5): %d\\n\", factorial(5));\n    int x = 10, y = 20;\n    swap(&x, &y);\n    return 0;\n}\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}", [
      E("Prototype", "Forward declaration of function"),
      E("Recursion", "Function calling itself"),
      E("Pass by pointer", "Simulate pass-by-reference"),
    ]),
  ], ["Write recursive fibonacci","Create swap function with pointers","Write function using static variable"], [
    Q("Recursion needs?", ["Base case and recursive call","Loop","Static variable","Global"], 0),
    Q("Function prototype ends with?", ["{",":",";","}"], 2),
    Q("Static local variable persists?", ["Between calls","Only in loop","Global scope","Temporary"], 0),
  ], [V("C Functions","freeCodeCamp","https://www.youtube.com/embed/ZqyTc2yWFHo")]),
  M(6, "Project: CLI Calculator", "Intermediate", "45 min", ["Build multipurpose calculator","Use functions and pointers","Handle stdin safely","Memory safety"], [
    P("Build a command-line calculator with add, subtract, multiply, divide using functions and safe input handling."),
    C("CLI Calculator", "c", "#include <stdio.h>\n\ndouble add(double a, double b) { return a + b; }\ndouble sub(double a, double b) { return a - b; }\ndouble mul(double a, double b) { return a * b; }\ndouble divide(double a, double b) {\n    if (b == 0) { printf(\"Error\\n\"); return 0; }\n    return a / b;\n}\n\nint main() {\n    char op; double a, b;\n    while (1) {\n        printf(\"Op (+, -, *, /, q): \");\n        scanf(\" %c\", &op);\n        if (op == 'q') break;\n        printf(\"Two numbers: \");\n        scanf(\"%lf %lf\", &a, &b);\n        switch (op) {\n            case '+': printf(\"%.2f\\n\", add(a,b)); break;\n            case '-': printf(\"%.2f\\n\", sub(a,b)); break;\n            case '*': printf(\"%.2f\\n\", mul(a,b)); break;\n            case '/': printf(\"%.2f\\n\", divide(a,b)); break;\n        }\n    }\n    return 0;\n}", [
      E("switch", "Multiple operation selection"),
      E("function pointers", "Store function in variable"),
      E("scanf %lf", "Read double input"),
    ]),
  ], ["Build calculator with function pointers","Add division by zero check","Implement calculation history"], [
    Q("Read double specifier?", ["%d","%f","%lf","%c"], 2),
    Q("Divide by zero check prevents?", ["Segfault","Infinite loop","Stack overflow","Undefined behavior"], 0),
    Q("Function pointer syntax?", ["ptr()","(*ptr)()","func*","*func()"], 1),
  ], [V("C Project Calculator","Portfolio Courses","https://www.youtube.com/embed/KJgsSFOSQv0")]),
]

cpp_modules = [
  M(1, "C++ Introduction", "Beginner", "35 min", ["C++ vs C","cout and cin","Namespaces","Default parameters"], [
    P("C++ extends C with OOP. Created by Bjarne Stroustrup (1985). Adds classes, templates, STL, references, and more."),
    A("C is a toolbox with basic hand tools. C++ adds power tools (OOP), a workshop organizer (STL), and an assistant (RAII)."),
    C("First C++", "cpp", "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n\n    string name;\n    cout << \"Enter name: \";\n    getline(cin, name);\n    cout << \"Welcome, \" << name << \"!\" << endl;\n    return 0;\n}", [
      E("#include <iostream>", "Input/output stream library"),
      E("using namespace std", "Avoid std:: prefix"),
      E("cout <<", "Console output with stream"),
      E("getline(cin, str)", "Read full line including spaces"),
    ]),
  ], ["Print name and age with cout","Read input with getline","Use endl for newline"], [
    Q("C++ creator?", ["Dennis Ritchie","Bjarne Stroustrup","James Gosling","Guido van Rossum"], 1),
    Q("cout uses which operator?", [">>","<<","::","->"], 1),
    Q("Read full line function?", ["cin >>","getline","scanf","gets"], 1),
  ], [V("C++ Full Course","freeCodeCamp","https://www.youtube.com/embed/vLnPwxZdW4Y"),V("C++ Tutorial","CodeWithHarry","https://www.youtube.com/embed/yGB9jhsEsr8")]),
  M(2, "OOP in C++", "Intermediate", "50 min", ["Classes and objects","Access specifiers","Constructors/destructors","this pointer"], [
    P("C++ classes encapsulate data and methods. Access specifiers: public, private, protected. Constructors initialize, destructors clean up."),
    C("C++ Classes", "cpp", "#include <iostream>\nusing namespace std;\n\nclass Student {\nprivate:\n    string name;\n    int age;\npublic:\n    Student(string n, int a) : name(n), age(a) {\n        cout << \"Student created\" << endl;\n    }\n    ~Student() { cout << \"Student destroyed\" << endl; }\n    void introduce() const {\n        cout << \"I'm \" << name << \", \" << age << endl;\n    }\n};\n\nint main() {\n    Student s(\"Alice\", 20);\n    s.introduce();\n    return 0;\n}", [
      E("class Student { }", "Class definition"),
      E("private:", "Hide implementation details"),
      E("public:", "Interface accessible externally"),
      E("Constructor initializer list", "Efficient member initialization"),
      E("~Destructor", "Cleanup when object is destroyed"),
      E("const method", "Does not modify object"),
    ]),
  ], ["Create Car class with brand/model/year","Add constructor and destructor","Implement const getter methods"], [
    Q("Destructor symbol?", ["~","!","@","#"], 0),
    Q("Initializer list uses?", [":","=","{}","()"], 0),
    Q("const after method does?", ["Returns const","Does not modify object","Const parameters","Static method"], 1),
  ], [V("C++ OOP","Programming with Mosh","https://www.youtube.com/embed/i_8lEmM1w5s")]),
  M(3, "STL: Vectors, Maps, Strings", "Intermediate", "50 min", ["std::vector dynamic arrays","std::map key-value","std::string","Iterators and algorithms"], [
    P("The Standard Template Library (STL) provides generic containers, iterators, and algorithms. Vectors are dynamic arrays, maps are key-value stores."),
    C("STL Containers", "cpp", "#include <iostream>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {3, 1, 4, 1, 5};\n    nums.push_back(9);\n    sort(nums.begin(), nums.end());\n    for (int n : nums) cout << n << \" \";\n    cout << endl;\n\n    map<string, int> ages;\n    ages[\"Alice\"] = 25;\n    ages[\"Bob\"] = 30;\n    for (auto& [name, age] : ages) {\n        cout << name << \": \" << age << endl;\n    }\n\n    string s = \"Hello\";\n    s += \" World\";\n    cout << s.substr(0, 5) << endl;\n    return 0;\n}", [
      E("#include <vector>", "Dynamic array container"),
      E("push_back", "Add element to end"),
      E("#include <algorithm>", "Sort, find, binary_search"),
      E("#include <map>", "Ordered key-value pairs"),
      E("auto&", "Reference in range-based for"),
    ]),
  ], ["Sort vector of names","Use map to count word frequency","Iterate with auto& for efficiency"], [
    Q("Map sorts by?", ["Key","Value","Insertion order","Hash"], 0),
    Q("Vector insert at end?", ["insert","push_back","push","add"], 1),
    Q("auto& avoids?", ["Copy","Memory leak","Null pointer","Type safety"], 0),
  ], [V("C++ STL","freeCodeCamp","https://www.youtube.com/embed/RRnB0V4jGXA")]),
  M(4, "Memory Management", "Advanced", "45 min", ["new and delete","RAII pattern","Smart pointers (unique_ptr, shared_ptr)","Move semantics"], [
    P("C++ gives manual memory control with new/delete. Smart pointers automate ownership. RAII ties resource lifetime to object lifetime."),
    A("new is like renting an apartment (you get keys). delete is returning keys. Smart pointers auto-return when you move out."),
    C("Memory Management", "cpp", "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Resource {\npublic:\n    Resource() { cout << \"Acquired\\n\"; }\n    ~Resource() { cout << \"Released\\n\"; }\n    void work() { cout << \"Working\\n\"; }\n};\n\nint main() {\n    Resource* raw = new Resource();\n    raw->work();\n    delete raw;\n\n    unique_ptr<Resource> uptr = make_unique<Resource>();\n    uptr->work();\n\n    shared_ptr<Resource> sptr1 = make_shared<Resource>();\n    shared_ptr<Resource> sptr2 = sptr1;\n    cout << \"Count: \" << sptr1.use_count() << endl;\n    return 0;\n}", [
      E("new / delete", "Manual heap allocation/deallocation"),
      E("unique_ptr", "Exclusive ownership (cannot copy)"),
      E("shared_ptr", "Shared ownership via reference counting"),
      E("make_unique / make_shared", "Safe factory creation"),
      E("RAII", "Resource Acquisition Is Initialization"),
    ]),
  ], ["Use unique_ptr for exclusive ownership","Use shared_ptr with multiple owners","Prevent memory leak with smart pointers"], [
    Q("unique_ptr can be?", ["Copied","Moved","Both","Neither"], 1),
    Q("make_shared is safer than?", ["new","malloc","auto","shared_ptr(T*)"], 0),
    Q("RAII ties resource to?", ["Function scope","Object lifetime","Program end","Thread"], 1),
  ], [V("C++ Smart Pointers","The Cherno","https://www.youtube.com/embed/XhGmMZ_3cXk")]),
  M(5, "Project: Todo List", "Intermediate", "60 min", ["Build OOP todo application","Use STL containers","File persistence","Modern C++ features"], [
    P("Build a C++ todo app with OOP design, STL containers for storage, file I/O for persistence, and smart pointers for memory safety."),
    C("Todo App", "cpp", "#include <iostream>\n#include <vector>\n#include <string>\n#include <fstream>\n#include <algorithm>\nusing namespace std;\n\nclass Todo {\n    struct Task { string desc; bool done; };\n    vector<Task> tasks;\npublic:\n    void add(const string& d) { tasks.push_back({d, false}); }\n    void toggle(int i) { if (i>=0&&i<tasks.size()) tasks[i].done=!tasks[i].done; }\n    void remove(int i) { if (i>=0&&i<tasks.size()) tasks.erase(tasks.begin()+i); }\n    void display() {\n        for (size_t i=0; i<tasks.size(); i++) {\n            cout << i+1 << \". [\" << (tasks[i].done?'X':' ') << \"] \" << tasks[i].desc << endl;\n        }\n    }\n    void save(const string& file) {\n        ofstream ofs(file);\n        for (auto& t : tasks) ofs << t.desc << \"|\" << t.done << endl;\n    }\n    void load(const string& file) {\n        ifstream ifs(file); string line;\n        while (getline(ifs, line)) {\n            auto sep = line.find('|');\n            if (sep != string::npos)\n                tasks.push_back({line.substr(0,sep), line.substr(sep+1)==\"1\"});\n        }\n    }\n};", [
      E("vector<struct>", "Store task data in container"),
      E("ofstream/ifstream", "File stream I/O"),
      E("string::find/npos", "String parsing"),
      E("size_t", "Unsigned index type"),
    ]),
  ], ["Build todo with add/complete/remove","Persist tasks to CSV file","Use range-based for loops"], [
    Q("ofstream mode?", ["Read","Write","Append","Binary"], 1),
    Q("string::npos means?", ["Null","Not found","End","Error"], 1),
    Q("vector::erase invalidates?", ["All iterators","Nothing","End iterator","References"], 0),
  ], [V("C++ Todo Project","freeCodeCamp","https://www.youtube.com/embed/vLnPwxZdW4Y")]),
]

sql_modules = [
  M(1, "SQL Introduction", "Beginner", "30 min", ["What is SQL","Relational databases","CREATE and INSERT","Basic SELECT"], [
    P("SQL (Structured Query Language) manages relational databases. Used with MySQL, PostgreSQL, SQLite, etc. Declarative language: you say WHAT, not HOW."),
    A("SQL is like a filing system. Tables are file cabinets, rows are individual files, columns are file labels. Queries search through everything."),
    C("Basic SQL", "sql", "CREATE TABLE users (\n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL,\n    email TEXT UNIQUE,\n    age INTEGER\n);\n\nINSERT INTO users (name, email, age)\nVALUES ('Alice', 'alice@example.com', 25);\n\nSELECT * FROM users;\nSELECT name, age FROM users WHERE age > 18 ORDER BY age DESC;\nSELECT COUNT(*) AS total FROM users;", [
      E("CREATE TABLE", "Define table structure"),
      E("PRIMARY KEY", "Unique row identifier"),
      E("INSERT INTO", "Add data to table"),
      E("SELECT...FROM", "Retrieve data"),
      E("WHERE", "Filter condition"),
      E("ORDER BY", "Sort results"),
    ]),
  ], ["Create users table with fields","Insert 3 sample users","Select users over 21 sorted by age"], [
    Q("SQL stands for?", ["Simple Query Language","Structured Query Language","Standard Query Language","Sequential Query Language"], 1),
    Q("Uniquely identifies row?", ["INDEX","UNIQUE","PRIMARY KEY","KEY"], 2),
    Q("Filter clause?", ["WHERE","HAVING","FILTER","MATCH"], 0),
  ], [V("SQL for Beginners","freeCodeCamp","https://www.youtube.com/embed/7S_tz1z_5bA"),V("SQL Tutorial","CodeWithHarry","https://www.youtube.com/embed/2Rp6zMl14XQ")]),
  M(2, "Queries & Filtering", "Beginner", "40 min", ["SELECT with WHERE","LIKE, IN, BETWEEN","NULL handling","DISTINCT and LIMIT"], [
    P("SQL WHERE clause filters rows. Use operators: =, <>, <, >, LIKE (pattern), IN (list), BETWEEN (range), IS NULL."),
    C("Filtering", "sql", "SELECT * FROM products\nWHERE price BETWEEN 10 AND 50\n  AND category IN ('Electronics', 'Books')\n  AND name LIKE '%phone%'\n  AND description IS NOT NULL\nORDER BY price ASC\nLIMIT 10;\n\nSELECT DISTINCT category FROM products;\n\nSELECT category, COUNT(*) AS count, AVG(price) AS avg_price\nFROM products\nGROUP BY category\nHAVING COUNT(*) > 5\nORDER BY count DESC;", [
      E("BETWEEN", "Range inclusive check"),
      E("LIKE '%pattern%'", "Wildcard pattern matching"),
      E("IS NULL", "Null value handling"),
      E("DISTINCT", "Unique values only"),
      E("LIMIT", "Maximum rows returned"),
      E("GROUP BY / HAVING", "Group and filter groups"),
    ]),
  ], ["Filter products by price range","Use LIKE for name search","Group by category with COUNT"], [
    Q("Pattern match operator?", ["MATCH","LIKE","SIMILAR","CONTAINS"], 1),
    Q("Filter groups clause?", ["WHERE","HAVING","FILTER","GROUP"], 1),
    Q("LIMIT does what?", ["Maximum rows","Minimum rows","Sort limit","Group limit"], 0),
  ], [V("SQL Queries","Traversy Media","https://www.youtube.com/embed/HXV3zeQKqyQ")]),
  M(3, "Joins", "Intermediate", "45 min", ["INNER JOIN","LEFT/RIGHT JOIN","Multiple table joins","Self joins"], [
    P("Joins combine data from multiple tables using foreign keys. INNER JOIN shows matches only; LEFT JOIN keeps all left-table rows."),
    A("JOIN is like matching puzzle pieces. INNER JOIN only keeps where pieces fit. LEFT JOIN keeps all pieces from one side and fills gaps with null."),
    C("Joins", "sql", "SELECT o.id, u.name, o.total\nFROM orders o\nINNER JOIN users u ON o.user_id = u.id;\n\nSELECT u.name, o.id AS order_id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;\n\nSELECT u.name, p.title AS product, oi.quantity\nFROM users u\nJOIN orders o ON u.id = o.user_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id;", [
      E("INNER JOIN", "Only matching rows from both"),
      E("LEFT JOIN", "All left rows, null for no match"),
      E("ON condition", "How tables relate"),
      E("Multiple JOINs", "Chain joins together"),
    ]),
  ], ["Join orders with users","Left join showing all customers","Build 3-table join for order details"], [
    Q("Only matching rows on both?", ["INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL JOIN"], 0),
    Q("Foreign key references?", ["Same table","Another table's PK","Any column","Index"], 1),
    Q("Self join uses?", ["Two tables","Same table twice","Subquery","Union"], 1),
  ], [V("SQL Joins","freeCodeCamp","https://www.youtube.com/embed/2HVMiPPuPIM")]),
  M(4, "Functions & Subqueries", "Intermediate", "40 min", ["Scalar and aggregate functions","Date/time functions","Subqueries in WHERE","Correlated subqueries"], [
    P("SQL has built-in functions: strings (UPPER, LENGTH), dates (DATE, YEAR), math (ROUND, ABS). Subqueries nest queries inside other queries."),
    C("Functions & Subqueries", "sql", "SELECT UPPER(name), LENGTH(name), TRIM(email) FROM users;\n\nSELECT DATE('now') AS today,\n    STRFTIME('%Y-%m-%d', order_date) AS formatted\nFROM orders;\n\nSELECT name, price\nFROM products\nWHERE price > (SELECT AVG(price) FROM products);\n\nSELECT name,\n    (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count\nFROM users u;\n\nSELECT * FROM users u\nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);", [
      E("UPPER, LENGTH, TRIM", "String manipulation"),
      E("DATE, STRFTIME", "Date/time functions"),
      E("Subquery in WHERE", "Nested query as condition"),
      E("EXISTS", "Check if subquery returns rows"),
    ]),
  ], ["Format dates with STRFTIME","Use subquery for above-average price","Write correlated subquery for order count"], [
    Q("Correlated subquery refers to?", ["Outer query","Inner query only","Both","Neither"], 0),
    Q("EXISTS returns?", ["Boolean","Count","Rows","Values"], 0),
    Q("AVG is what function type?", ["Scalar","Aggregate","Window","String"], 1),
  ], [V("SQL Functions","Programming with Mosh","https://www.youtube.com/embed/DbypqH2WKvI")]),
  M(5, "Database Design & Normalization", "Intermediate", "50 min", ["Primary/foreign keys","Normal forms (1NF, 2NF, 3NF)","Indexes for performance","Entity-relationship modeling"], [
    P("Database design organizes data to minimize redundancy. Normalization divides large tables into smaller, related tables. Indexes speed up queries."),
    A("Normalization is like organizing a library. Instead of one giant pile (unnormalized), you sort by genre (1NF), author (2NF), then title alphabetically (3NF)."),
    C("Database Design", "sql", "CREATE TABLE authors (\n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL\n);\n\nCREATE TABLE books (\n    id INTEGER PRIMARY KEY,\n    title TEXT NOT NULL,\n    author_id INTEGER,\n    FOREIGN KEY (author_id) REFERENCES authors(id)\n);\n\nCREATE INDEX idx_books_author ON books(author_id);\n\nSELECT a.name, b.title\nFROM authors a\nJOIN books b ON a.id = b.author_id\nORDER BY a.name;", [
      E("FOREIGN KEY", "Reference to another table's PK"),
      E("Normalization", "Reduce redundancy across tables"),
      E("CREATE INDEX", "Speed up query performance"),
      E("Entity-relationship", "Model real-world entities and relations"),
    ]),
  ], ["Design library database with authors/books","Add indexes for performance","Normalize denormalized sales table"], [
    Q("Reduces redundancy?", ["Indexing","Normalization","Joining","Grouping"], 1),
    Q("Foreign key references?", ["Same table","Another table's PK","Any column","Default value"], 1),
    Q("Index speeds up?", ["Inserts","Queries","Deletes","Updates"], 1),
  ], [V("SQL Database Design","freeCodeCamp","https://www.youtube.com/embed/ztHopE5Wnpc")]),
]

data = {}
data["html"] = {"title":"HTML","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg","modules":html_modules}
data["css"] = {"title":"CSS","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg","modules":css_modules}
data["javascript"] = {"title":"JavaScript","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg","modules":js_modules}
data["python"] = {"title":"Python","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg","modules":python_modules}
data["java"] = {"title":"Java","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg","modules":java_modules}
data["c"] = {"title":"C","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg","modules":c_modules}
data["cpp"] = {"title":"C++","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg","modules":cpp_modules}
data["sql"] = {"title":"SQL","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg","modules":sql_modules}
data["html"] = {"title":"HTML","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg","modules":html_modules}
data["css"] = {"title":"CSS","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg","modules":css_modules}
data["javascript"] = {"title":"JavaScript","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg","modules":js_modules}
data["html"] = {"title":"HTML","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg","modules":html_modules}
data["css"] = {"title":"CSS","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg","modules":css_modules}

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print(f"Generated {path}")


