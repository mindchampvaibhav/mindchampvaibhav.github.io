/* Renders the site from data/site.js and data/projects.js. You should not need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var P = window.PROJECTS || [];

  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function chips(target, list) {
    target.textContent = "";
    (list || []).forEach(function (t) { target.appendChild(el("li", { text: t })); });
  }
  function hasDemo(p) { return !!(p.demo && p.demo.type); }
  function inPageDemo(p) { return hasDemo(p) && p.demo.type !== "link"; }

  /* ---------- home ---------- */
  function renderHome() {
    $("hero-eyebrow").textContent = S.eyebrow || "";
    $("hero-name").textContent = S.name || "";
    $("hero-headline").textContent = S.headline || "";
    $("hero-intro").textContent = S.intro || "";
    var gh = $("hero-github");
    if (S.github) gh.href = S.github; else gh.hidden = true;
    if (S.cvUrl) { $("hero-cv").href = S.cvUrl; $("hero-cv").hidden = false; }

    var cards = $("project-cards");
    cards.textContent = "";
    P.forEach(function (p) {
      var badges = el("div", { class: "badges" });
      if (hasDemo(p)) badges.appendChild(el("span", { class: "badge live", text: "Live demo" }));
      if (p.repo) badges.appendChild(el("span", { class: "badge", text: "Code on GitHub" }));
      if (!hasDemo(p) && !p.repo) badges.appendChild(el("span", { class: "badge", text: "Write-up" }));
      var a = el("a", { class: "card", href: "#project-" + p.id }, [
        el("div", { class: "card-top" }, [
          el("span", { class: "mono", text: p.context || "" }),
          el("span", { class: "mono", text: p.year || "" }),
        ]),
        el("h3", { text: p.title }),
        el("p", { text: p.summary || "" }),
        el("div", { class: "card-foot" }, [badges, el("span", { class: "card-go", text: "Open →" })]),
      ]);
      cards.appendChild(a);
    });

    var about = $("about-text");
    about.textContent = "";
    (S.about || []).forEach(function (t) { about.appendChild(el("p", { text: t })); });

    var e = S.education || {};
    $("edu-school").textContent = e.school || "";
    $("edu-place").textContent = e.place || "";
    $("edu-programme").textContent = e.programme || "";
    $("edu-grad").textContent = e.graduation || "";
    $("edu-standing").textContent = e.standing || "";
    chips($("edu-coursework"), e.coursework);

    var acts = $("activity-list");
    acts.textContent = "";
    (S.activities || []).forEach(function (g) {
      var ul = el("ul", { class: "act-items" });
      g.items.forEach(function (it) {
        ul.appendChild(el("li", { class: "act" }, [
          el("div", {}, [
            el("p", { class: "act-title", text: it.title }),
            it.role ? el("p", { class: "act-role", text: it.role }) : null,
          ]),
          it.when ? el("p", { class: "act-when", text: it.when }) : null,
          it.text ? el("p", { class: "act-text", text: it.text }) : null,
        ]));
      });
      acts.appendChild(el("div", { class: "act-group" }, [el("h3", { text: g.group }), ul]));
    });

    var sk = $("skill-list");
    sk.textContent = "";
    Object.keys(S.skills || {}).forEach(function (k) {
      var ul = el("ul", { class: "chips" });
      chips(ul, S.skills[k]);
      sk.appendChild(el("div", { class: "skill-group" }, [el("p", { class: "label", text: k }), ul]));
    });

    $("contact-email").textContent = S.email || "";
    var links = $("contact-links");
    links.textContent = "";
    [["GitHub", S.github], ["LinkedIn", S.linkedin], ["CV", S.cvUrl]].forEach(function (l) {
      if (l[1]) links.appendChild(el("li", {}, [el("a", { class: "btn", href: l[1], target: "_blank", rel: "noopener", text: l[0] })]));
    });
    $("contact-place").textContent = S.location || "";
    $("footer-name").textContent = S.name || "";
    $("footer-year").textContent = String(new Date().getFullYear());
    document.title = S.name || document.title;

    drawTrace();
  }

  $("copy-email").addEventListener("click", function () {
    var status = $("copy-status");
    var text = S.email || "";
    function selectIt() {
      var r = document.createRange(); r.selectNodeContents($("contact-email"));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      status.textContent = "Selected. Press Ctrl+C to copy.";
    }
    try {
      navigator.clipboard.writeText(text).then(function () { status.textContent = "Copied"; }, selectIt);
    } catch (err) { selectIt(); }
  });

  /* Hero chart: one recorded session of the quiz (difficulty before each question, answer correct?) */
  function drawTrace() {
    var run = [[1, 1], [2, 1], [3, 1], [4, 0], [3, 1], [4, 1], [5, 1], [5, 1], [5, 0], [4, 1]];
    var svg = document.querySelector(".trace-svg");
    var W = 340, H = 200, L = 34, R = 12, T = 12, B = 30;
    var x = function (i) { return L + i * (W - L - R) / (run.length - 1); };
    var y = function (lv) { return T + (5 - lv) * (H - T - B) / 4; };
    var ns = "http://www.w3.org/2000/svg";
    var grid = svg.querySelector(".trace-grid"); grid.textContent = "";
    for (var lv = 1; lv <= 5; lv++) {
      var ln = document.createElementNS(ns, "line");
      ln.setAttribute("x1", L); ln.setAttribute("x2", W - R); ln.setAttribute("y1", y(lv)); ln.setAttribute("y2", y(lv));
      grid.appendChild(ln);
      var t = document.createElementNS(ns, "text");
      t.setAttribute("x", 0); t.setAttribute("y", y(lv) + 3.5); t.textContent = "L" + lv;
      grid.appendChild(t);
    }
    [0, 4, 9].forEach(function (i) {
      var t = document.createElementNS(ns, "text");
      t.setAttribute("x", x(i)); t.setAttribute("y", H - 8); t.setAttribute("text-anchor", i === 0 ? "start" : i === 9 ? "end" : "middle");
      t.textContent = "Q" + (i + 1);
      grid.appendChild(t);
    });
    var d = "M" + x(0) + " " + y(run[0][0]);
    for (var i = 1; i < run.length; i++) d += " H" + x(i) + " V" + y(run[i][0]);
    var path = svg.querySelector(".trace-line");
    path.setAttribute("d", d);
    try { path.style.setProperty("--len", Math.ceil(path.getTotalLength())); } catch (e) {}
    var dots = svg.querySelector(".trace-dots"); dots.textContent = "";
    run.forEach(function (r, i) {
      var c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", x(i)); c.setAttribute("cy", y(r[0])); c.setAttribute("r", 5);
      c.setAttribute("class", r[1] ? "hit" : "miss");
      dots.appendChild(c);
    });
  }

  /* ---------- project page ---------- */
  var currentFiles = [];

  function renderProject(p) {
    $("p-context").textContent = [p.context, p.year].filter(Boolean).join(" · ");
    $("p-title").textContent = p.title;
    $("p-summary").textContent = p.summary || "";
    chips($("p-tech"), p.tech);
    document.title = p.title + " · " + (S.name || "");

    var actions = $("p-actions"); actions.textContent = "";
    if (hasDemo(p) && !inPageDemo(p)) actions.appendChild(el("a", { class: "btn btn-solid", href: p.demo.url, target: "_blank", rel: "noopener", text: "Open the app \u2197" }));
    if (inPageDemo(p)) {
      var run = el("a", { class: "btn btn-solid", href: "#p-demo", text: "Run live demo" });
      run.addEventListener("click", function (ev) { ev.preventDefault(); $("p-demo").scrollIntoView({ behavior: "smooth", block: "start" }); });
      actions.appendChild(run);
    }
    if (p.repo) actions.appendChild(el("a", { class: "btn", href: p.repo, target: "_blank", rel: "noopener", text: "View repository on GitHub ↗" }));

    // demo
    var demo = $("p-demo");
    demo.hidden = !inPageDemo(p);
    resetDemo();
    if (inPageDemo(p)) {
      var url = demoUrl(p);
      $("p-demo-pop").href = url;
      $("p-demo-label").textContent = p.demo.type === "streamlit-browser" ? "Live demo · Python running in your browser" : "Live demo";
      $("p-demo-note").textContent = p.demo.type === "streamlit-browser"
        ? "This starts a small Python environment inside your browser (WebAssembly) and runs the same Streamlit code that is in the repository. The first start downloads the runtime and takes about 15–30 seconds."
        : "Loads the hosted app inside this page.";
      $("p-demo-start").onclick = function () {
        var stage = $("p-demo-stage");
        $("p-demo-idle").hidden = true;
        var f = el("iframe", { src: url, title: p.title + " live demo", allow: "clipboard-write" });
        stage.appendChild(f);
      };
    }

    // description + highlights
    var desc = $("p-description"); desc.textContent = "";
    (p.description || []).forEach(function (t) { desc.appendChild(el("p", { text: t })); });
    var hl = $("p-highlights"); hl.textContent = "";
    (p.highlights || []).forEach(function (t) { hl.appendChild(el("li", { text: t })); });
    hl.parentNode.hidden = !(p.highlights && p.highlights.length);

    // source viewer
    currentFiles = p.source || [];
    $("p-code").hidden = currentFiles.length === 0;
    $("p-code-note").textContent = p.repo ? "Also on GitHub." : "";
    var tabs = $("p-code-tabs"); tabs.textContent = "";
    currentFiles.forEach(function (f, i) {
      var b = el("button", { class: "code-tab", type: "button", role: "tab", "aria-selected": i === 0 ? "true" : "false", text: f.name });
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(tabs.children, function (c) { c.setAttribute("aria-selected", "false"); });
        b.setAttribute("aria-selected", "true");
        showFile(f, p);
      });
      tabs.appendChild(b);
    });
    if (currentFiles.length) showFile(currentFiles[0], p);

    // run locally
    $("p-run").hidden = !(p.runLocally && p.runLocally.length);
    $("p-run-cmds").textContent = (p.runLocally || []).join("\n");
  }

  function resetDemo() {
    var stage = $("p-demo-stage");
    Array.prototype.slice.call(stage.querySelectorAll("iframe")).forEach(function (f) { f.remove(); });
    $("p-demo-idle").hidden = false;
  }

  function demoUrl(p) {
    if (p.demo.type === "streamlit-browser") return "demo.html#" + p.id;
    return p.demo.url;
  }

  function showFile(f, p) {
    var view = $("p-code-view");
    view.className = "numbered";
    view.textContent = "Loading " + f.name + "…";
    fetch(encodeURI(f.path)).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (text) {
      var lang = /\.py$/.test(f.name) ? "python" : /Dockerfile/.test(f.name) ? "dockerfile" : /\.csv$/.test(f.name) ? "plaintext" : null;
      var html;
      if (window.hljs && lang && hljs.getLanguage(lang)) html = hljs.highlight(text, { language: lang }).value;
      else html = text.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; });
      view.innerHTML = splitLines(html);
    }).catch(function () {
      view.className = "";
      view.textContent = "Could not load " + f.name + " here." + (p.repo ? "\nRead it on GitHub: " + p.repo : "");
    });
  }

  /* wrap each line in a span, keeping highlight spans balanced across line breaks */
  function splitLines(html) {
    var open = [];
    return html.replace(/\n$/, "").split("\n").map(function (line) {
      var prefix = open.join("");
      line.replace(/<span[^>]*>|<\/span>/g, function (tag) {
        if (tag === "</span>") open.pop(); else open.push(tag);
        return tag;
      });
      return '<span class="ln">' + prefix + line + "</span>".repeat(open.length) + "</span>";
    }).join("");
  }

  /* ---------- routing: #project-<id> shows a project, anything else shows home ---------- */
  function route() {
    var h = decodeURIComponent(location.hash.replace(/^#/, ""));
    var m = /^project-(.+)$/.exec(h);
    var p = m && P.filter(function (x) { return x.id === m[1]; })[0];
    $("view-home").hidden = !!p;
    $("view-project").hidden = !p;
    if (p) {
      renderProject(p);
      window.scrollTo(0, 0);
    } else {
      document.title = S.name || document.title;
      resetDemo();
      if (h) { var t = document.getElementById(h); if (t) t.scrollIntoView(); }
    }
  }

  renderHome();
  window.addEventListener("hashchange", route);
  route();
})();
