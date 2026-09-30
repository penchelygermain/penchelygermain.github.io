/* ==========================================================================
   Penchely Germain — Application
   Lit les fichiers de /data et construit l'interface.
   Vous n'avez normalement PAS besoin de modifier ce fichier pour ajouter
   du contenu : modifiez plutôt les fichiers du dossier /data.
   ========================================================================== */
(function () {
  "use strict";

  var PG = window.PG, D = PG.data, S = PG.site;
  var ROOT = PG.root || "";

  /* ------------------------------------------------------------------
     1. Utilitaires
     ------------------------------------------------------------------ */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var LANG = (function () {
    try { return localStorage.getItem("pg-lang") || S.lang || "fr"; } catch (e) { return S.lang || "fr"; }
  })();
  var t = function (k) {
    var d = (PG.i18n && PG.i18n[LANG]) || {}, f = (PG.i18n && PG.i18n.fr) || {};
    return d[k] != null ? d[k] : (f[k] != null ? f[k] : k);
  };
  // Préfixe les chemins locaux par la racine du site (utile pour les sous-dossiers).
  var url = function (p) {
    if (!p) return "";
    if (/^(https?:|mailto:|tel:|#|data:|\/)/.test(p)) return p;
    return ROOT + p;
  };
  var isExternal = function (p) { return /^https?:/.test(p || ""); };
  var ext = function (p) { return isExternal(p) ? ' target="_blank" rel="noopener"' : ""; };
  var list = function (v) { return Array.isArray(v) ? v : (v ? [v] : []); };
  var cat = function (k) { return (D.categories && D.categories[k]) || k; };
  var showPh = S.showPlaceholders !== false;
  // Retire les brouillons, et les exemples si le mode configuration est désactivé.
  var visible = function (arr) {
    return list(arr).filter(function (x) { return x && !x.draft && (showPh || !x.placeholder); });
  };
  var phCls = function (x) { return x && x.placeholder ? " is-placeholder" : ""; };
  var phNote = function (x) { return x && x.placeholder ? ' <span class="ph-note">Exemple</span>' : ""; };
  var fmtDate = function (d) {
    if (!d) return "";
    var parts = String(d).split("-");
    if (parts.length < 2) return d;
    try {
      var dt = new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
      var opts = parts.length === 3 ? { day: "numeric", month: "long", year: "numeric" } : { month: "long", year: "numeric" };
      return dt.toLocaleDateString(LANG === "ht" ? "fr" : LANG, opts);
    } catch (e) { return d; }
  };
  var ytThumb = function (id) { return "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/hqdefault.jpg"; };
  var ytEmbed = function (id) {
    return '<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
      '?rel=0" title="Vidéo YouTube" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
  };
  var img = function (src, alt, cls) {
    if (!src) return "";
    return '<img src="' + esc(url(src)) + '" alt="' + esc(alt || "") + '" loading="lazy" decoding="async"' + (cls ? ' class="' + cls + '"' : "") + ">";
  };
  var param = function (k) { return new URLSearchParams(location.search).get(k); };

  /* ------------------------------------------------------------------
     2. Icônes (SVG en ligne, aucune bibliothèque externe)
     ------------------------------------------------------------------ */
  var ICONS = {
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/>',
    languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/><path d="M8 22h8"/>',
    play: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m10 9 5 3-5 3z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1.03V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    book: '<path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    sprout: '<path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6Z"/><path d="M12 14c0-3-2-5-6-5 0 3 2 5 6 5Z"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/>'
  };
  var icon = function (n, cls) {
    return '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[n] || "") + "</svg>";
  };
  PG.icon = icon;

  /* ------------------------------------------------------------------
     3. En-tête, navigation et pied de page (communs à toutes les pages)
     ------------------------------------------------------------------ */
  var PAGE = document.body.getAttribute("data-page") || "";
  var LOGO = '<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><rect x="1" y="1" width="46" height="46" rx="14" fill="var(--primary)"/>' +
    '<path d="M11 35V13h5.5a5.5 5.5 0 0 1 0 11H11" fill="none" stroke="var(--on-primary)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M37.6 19.4A7.5 7.5 0 1 0 39.4 26H33" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function navLink(href, label, key) {
    var cur = key && key === PAGE ? ' aria-current="page"' : "";
    return '<a href="' + url(href) + '"' + cur + ">" + label + "</a>";
  }
  function subLink(href, ic, label, sub, key) {
    var cur = key && key === PAGE ? ' aria-current="page"' : "";
    return '<a href="' + url(href) + '"' + cur + ">" + icon(ic) + "<span>" + esc(label) + (sub ? "<small>" + esc(sub) + "</small>" : "") + "</span></a>";
  }
  function group(id, label, links) {
    return '<div class="nav-group"><button class="nav-trigger" aria-expanded="false" aria-controls="sub-' + id + '">' + label + icon("chevron") +
      '</button><div class="nav-sub" id="sub-' + id + '">' + links + "</div></div>";
  }
  function langSwitch() {
    return '<div class="lang-switch" role="group" aria-label="Langue">' + (S.languages || []).map(function (l) {
      return '<button type="button" data-lang="' + l.code + '" aria-pressed="' + (l.code === LANG) + '"' +
        (l.enabled ? "" : ' disabled title="' + esc(t("ui.langSoon")) + '"') + ">" + l.label + "</button>";
    }).join("") + "</div>";
  }

  function buildHeader() {
    var pillars = (D.pillars || []).map(function (p) {
      return subLink(p.page, p.icon, p.title, p.role, p.id);
    }).join("") + subLink("pole-geo-hagri.html", "sprout", "POLE GEO-HAGRI", "Semer le savoir, pour une agriculture durable", "geo-hagri");

    var html =
      '<a class="skip-link" href="#main">Aller au contenu</a>' +
      '<header class="site-header" id="top"><div class="container header-inner">' +
      '<a class="brand" href="' + url("index.html") + '" aria-label="' + esc(S.name) + ' — accueil">' + LOGO +
      '<span class="brand-name">' + esc(S.name) + "<small>" + esc(S.tagline) + "</small></span></a>" +
      '<nav class="nav" id="main-nav" aria-label="Navigation principale">' +
      navLink("index.html", t("nav.home"), "home").replace("<a ", '<a class="nav-home" ') +
      group("about", t("nav.about"),
        subLink("a-propos.html", "users", t("nav.about"), "Biographie, mission, compétences", "about") +
        subLink("parcours.html", "compass", t("nav.journey"), "Expériences, diplômes, certifications", "journey") +
        subLink("cv.html", "file", t("nav.cv"), "Version web de mon CV", "cv") +
        subLink("media-kit.html", "award", t("nav.mediakit"), "Bio courte, photos, contacts presse", "mediakit")) +
      group("expertise", t("nav.expertise"), pillars) +
      navLink("projets.html", t("nav.projects"), "projects") +
      navLink("publications.html", t("nav.publications"), "publications") +
      group("resources", t("nav.resources"),
        subLink("contenus.html", "play", t("nav.content"), "Vidéos, podcasts, infographies", "content") +
        subLink("blog.html", "pen", t("nav.blog"), "Articles et réflexions", "blog") +
        subLink("mediatheque.html", "eye", t("nav.media"), "Photos, vidéos, événements", "media") +
        subLink("documents.html", "book", t("nav.documents"), "Bibliothèque téléchargeable", "documents")) +
      navLink("services.html", t("nav.services"), "services") +
      '<a class="btn btn-primary btn-sm nav-cta" href="' + url("contact.html") + '">' + t("nav.contact") + "</a>" +
      langSwitch() +
      "</nav>" +
      '<div class="header-tools">' +
      '<button class="icon-btn search-btn" type="button" data-open-search aria-label="' + esc(t("ui.search")) + ' (Ctrl+K)">' + icon("search") + "</button>" +
      '<button class="icon-btn theme-toggle" type="button" aria-label="' + esc(t("ui.theme")) + '">' + icon("sun", "i-sun") + icon("moon", "i-moon") + "</button>" +
      '<button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="' + esc(t("ui.menu")) + '">' + icon("menu") + "</button>" +
      "</div></div></header>";
    document.body.insertAdjacentHTML("afterbegin", html);
  }

  function buildFooter() {
    var y = new Date().getFullYear();
    var years = y > 2026 ? "2026–" + y : "2026";
    var pillars = (D.pillars || []).map(function (p) { return "<li>" + navLink(p.page, esc(p.title)) + "</li>"; }).join("");
    var html =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
      '<div><a class="brand" href="' + url("index.html") + '">' + LOGO + '<span class="brand-name">' + esc(S.name) + "</span></a>" +
      '<p class="muted" style="margin-top:16px;max-width:380px">' + esc(S.roles.join(" | ")) + "</p>" +
      '<p class="muted" style="font-size:.9rem;max-width:380px">Transformer les connaissances en compétences, en projets et en impact.</p>' +
      '<div class="btn-row" style="margin-top:18px">' +
      (S.email ? '<a class="btn btn-ghost btn-sm" href="mailto:' + esc(S.email) + '">' + icon("mail") + "Email me</a>" : "") +
      '<a class="btn btn-ghost btn-sm" data-cv href="#">' + icon("download") + "CV</a></div></div>" +
      "<div><h4>" + t("footer.explore") + "</h4><ul>" +
      "<li>" + navLink("index.html", t("nav.home")) + "</li><li>" + navLink("a-propos.html", t("nav.about")) + "</li>" +
      "<li>" + navLink("projets.html", t("nav.projects")) + "</li><li>" + navLink("publications.html", t("nav.publications")) + "</li>" +
      "<li>" + navLink("services.html", t("nav.services")) + "</li><li>" + navLink("blog.html", t("nav.blog")) + "</li>" +
      "<li>" + navLink("contact.html", "Contact") + "</li></ul></div>" +
      "<div><h4>" + t("footer.pillars") + "</h4><ul>" + pillars + "<li>" + navLink("pole-geo-hagri.html", "POLE GEO-HAGRI") + "</li></ul></div>" +
      "<div><h4>" + t("footer.follow") + '</h4><div class="socials" data-render="socials" data-compact="1"></div></div>' +
      "</div>" +
      '<div class="footer-bottom"><span>Copyright © ' + years + " " + esc(S.name) + ". " + t("footer.rights") + "</span>" +
      "<nav aria-label=\"Liens légaux\">" + navLink("confidentialite.html", t("footer.privacy")) + navLink("mentions-legales.html", t("footer.legal")) +
      '<a href="' + url("sitemap.xml") + '">Plan du site</a></nav></div>' +
      "</div></footer>";
    document.body.insertAdjacentHTML("beforeend", html);
  }

  function buildDialogs() {
    document.body.insertAdjacentHTML("beforeend",
      '<dialog id="detail" aria-labelledby="detail-title"><div class="dlg"><button class="icon-btn dlg-close" data-close aria-label="' + t("ui.close") + '">' + icon("x") + '</button><div class="dlg-content"></div></div></dialog>' +
      '<dialog id="lightbox" aria-label="Visionneuse"><div class="dlg"><button class="icon-btn dlg-close" data-close aria-label="' + t("ui.close") + '">' + icon("x") + '</button><div class="lb-content"></div></div></dialog>' +
      '<dialog id="search-dialog" aria-label="' + t("ui.search") + '"><div class="dlg"><div class="search-top">' + icon("search") +
      '<label for="global-search" class="sr-only">' + t("ui.search") + '</label><input id="global-search" type="search" autocomplete="off" placeholder="' + esc(t("ui.searchPlaceholder")) + '"><kbd>Esc</kbd></div>' +
      '<ul class="search-results" role="listbox"></ul></div></dialog>');
    $$("dialog").forEach(function (d) {
      d.addEventListener("click", function (e) { if (e.target === d || e.target.closest("[data-close]")) close(d); });
      d.addEventListener("close", function () {
        $$("iframe", d).forEach(function (f) { f.remove(); }); // stoppe les vidéos
        document.documentElement.style.overflow = "";
      });
    });
  }
  function open(d) { if (!d.open) { d.showModal(); document.documentElement.style.overflow = "hidden"; } }
  function close(d) { if (d.open) d.close(); }

  /* ------------------------------------------------------------------
     4. Comportements globaux : thème, menu, en-tête, langue
     ------------------------------------------------------------------ */
  function initChrome() {
    var root = document.documentElement;
    $(".theme-toggle").addEventListener("click", function () {
      var cur = root.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("pg-theme", next); } catch (e) { /* stockage indisponible */ }
    });

    var nav = $("#main-nav"), tog = $(".menu-toggle");
    tog.addEventListener("click", function () {
      var o = nav.classList.toggle("open");
      tog.setAttribute("aria-expanded", o);
      tog.innerHTML = icon(o ? "x" : "menu");
      document.documentElement.style.overflow = o ? "hidden" : "";
    });
    $$(".nav-trigger").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = b.parentNode, o = !g.classList.contains("open");
        $$(".nav-group.open").forEach(function (x) { if (x !== g) { x.classList.remove("open"); $(".nav-trigger", x).setAttribute("aria-expanded", "false"); } });
        g.classList.toggle("open", o);
        b.setAttribute("aria-expanded", o);
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-group") && window.innerWidth > 1180) {
        $$(".nav-group.open").forEach(function (x) { x.classList.remove("open"); $(".nav-trigger", x).setAttribute("aria-expanded", "false"); });
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") $$(".nav-group.open").forEach(function (x) { x.classList.remove("open"); });
    });

    var header = $(".site-header");
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    $$("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem("pg-lang", b.getAttribute("data-lang")); } catch (e) { /* ignore */ }
        location.reload();
      });
    });
    root.setAttribute("lang", LANG);

    // Textes d'interface traduisibles : <span data-i18n="nav.home"></span>
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });

    // Liens dynamiques issus de la configuration
    $$("[data-cv]").forEach(function (a) {
      if (S.cvPdf) { a.href = url(S.cvPdf); a.setAttribute("download", ""); } else { a.href = url("cv.html"); }
    });
    $$("[data-email]").forEach(function (a) {
      if (S.email) { a.href = "mailto:" + S.email; if (!a.children.length && !a.textContent.trim()) a.textContent = S.email; }
    });
    $$("[data-geo-link]").forEach(function (a) {
      if (S.geoHagriUrl) { a.href = S.geoHagriUrl; a.target = "_blank"; a.rel = "noopener"; }
      else if (showPh) { a.classList.add("is-placeholder"); a.href = "#"; a.title = "Ajoutez l'adresse dans data/site.js (geoHagriUrl)"; a.addEventListener("click", function (e) { e.preventDefault(); }); }
      else { a.style.display = "none"; }
    });
    $$("[data-site]").forEach(function (el) { var v = S[el.getAttribute("data-site")]; if (v) el.textContent = v; });
    $$("[data-photo]").forEach(function (el) { el.src = url(S.photo); el.alt = S.photoAlt || S.name; });
  }

  /* ------------------------------------------------------------------
     5. Composants de rendu
     ------------------------------------------------------------------ */
  var R = {}; // registre des rendus : data-render="nom"

  // Barre de filtres réutilisable
  function filterBar(host, options, opts, onChange) {
    opts = opts || {};
    var state = { f: "all", q: "" };
    var bar = document.createElement("div");
    bar.className = "toolbar";
    var html = '<div class="filters" role="group" aria-label="Filtres">' +
      '<button class="filter-btn" type="button" aria-pressed="true" data-f="all">' + t("ui.all") + "</button>" +
      options.map(function (o) { return '<button class="filter-btn" type="button" aria-pressed="false" data-f="' + esc(o.k) + '">' + esc(o.l) + "</button>"; }).join("") +
      "</div>";
    if (opts.search) {
      var sid = "q-" + Math.random().toString(36).slice(2, 7);
      html += '<div class="search-field">' + icon("search") + '<label class="sr-only" for="' + sid + '">' + t("ui.search") + '</label><input id="' + sid + '" type="search" placeholder="' + t("ui.search") + '…"></div>';
    }
    bar.innerHTML = html;
    host.parentNode.insertBefore(bar, host);
    $$(".filter-btn", bar).forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".filter-btn", bar).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        state.f = b.getAttribute("data-f"); onChange(state);
      });
    });
    var inp = $("input", bar);
    if (inp) inp.addEventListener("input", function () { state.q = inp.value.trim().toLowerCase(); onChange(state); });
    // Filtre initial via l'URL : projets.html?cat=agriculture
    var pre = param("cat");
    if (pre) { var pb = $('[data-f="' + pre + '"]', bar); if (pb) { pb.click(); return; } }
    onChange(state);
  }
  var matches = function (obj, q) { return !q || JSON.stringify(obj).toLowerCase().indexOf(q) > -1; };
  var emptyBox = function (msg) { return '<div class="empty">' + esc(msg || t("ui.empty")) + "</div>"; };

  /* ---- Métiers affichés en haut de l'accueil (Réglages → Mes métiers) ---- */
  R.roles = function (el) {
    if (list(S.roles).length) el.innerHTML = list(S.roles).map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("");
  };

  /* ---- Piliers ---- */
  R.pillars = function (el) {
    el.innerHTML = (D.pillars || []).map(function (p) {
      var n = visible(D.projects).filter(function (x) { return list(x.category).indexOf(p.category) > -1 && !x.placeholder; }).length;
      return '<a class="pillar reveal" href="' + url(p.page) + '" style="--tint:' + p.tint + '">' +
        '<span class="icon-tile">' + icon(p.icon) + "</span>" +
        '<span class="num">' + p.no + " · " + esc(p.role) + "</span>" +
        "<h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + "</p>" +
        '<span class="chips">' + p.skills.map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; }).join("") + "</span>" +
        (n ? '<span class="pillar-stats">' + n + " " + t("ui.projectsLinked") + "</span>" : "") +
        '<span class="go">' + t("ui.discover") + " " + icon("arrow") + "</span></a>";
    }).join("");
  };

  /* ---- Chiffres clés ---- */
  R.achievements = function (el) {
    el.innerHTML = visible(D.achievements).map(function (a) {
      return '<div class="stat reveal' + phCls(a) + '"><div class="value">' + esc(a.value) + '</div><div class="label">' + esc(a.label) + "</div><p>" + esc(a.text) + "</p></div>";
    }).join("");
  };

  /* ---- Projets ---- */
  function projectCard(p) {
    return '<article class="card hover reveal' + phCls(p) + '" id="p-' + esc(p.id) + '">' +
      '<div class="card-media">' + (p.image ? img(p.image, p.title) : "") +
      '<span class="badge">' + esc(cat(list(p.category)[0])) + "</span></div>" +
      '<div class="card-body"><div class="card-meta"><span>' + esc(p.year) + "</span>" +
      (list(p.category).length > 1 ? "<span>" + list(p.category).slice(1).map(cat).map(esc).join(" · ") + "</span>" : "") + "</div>" +
      "<h3>" + esc(p.title) + phNote(p) + "</h3><p>" + esc(p.summary) + "</p>" +
      '<div class="card-foot"><button class="btn btn-link" type="button" data-project="' + esc(p.id) + '">' + t("ui.details") + " " + icon("arrow") + "</button></div></div></article>";
  }
  R.projects = function (el) {
    var items = visible(D.projects);
    var c = el.getAttribute("data-category");
    if (c) items = items.filter(function (p) { return list(p.category).indexOf(c) > -1; });
    if (el.hasAttribute("data-featured")) items = items.filter(function (p) { return p.featured; });
    var lim = +el.getAttribute("data-limit"); if (lim) items = items.slice(0, lim);
    var draw = function (st) {
      var arr = items.filter(function (p) { return (st.f === "all" || list(p.category).indexOf(st.f) > -1) && matches(p, st.q); });
      el.innerHTML = arr.length ? arr.map(projectCard).join("") : emptyBox();
      reveal(el);
    };
    if (el.hasAttribute("data-filters")) {
      var keys = ["agriculture", "education", "translation", "leadership", "digital", "research", "content"];
      filterBar(el, keys.map(function (k) { return { k: k, l: cat(k) }; }), { search: true }, draw);
    } else draw({ f: "all", q: "" });
  };
  function showProject(id) {
    var p = (D.projects || []).filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var sec = function (title, arr) {
      arr = list(arr).filter(Boolean);
      return arr.length ? "<h4>" + title + "</h4><ul>" + arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "";
    };
    var chips = function (title, arr) {
      arr = list(arr).filter(Boolean);
      return arr.length ? "<h4>" + title + '</h4><div class="chips">' + arr.map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div>" : "";
    };
    var gal = list(p.gallery);
    var docs = list(p.documents);
    var html = (p.image ? '<div class="dlg-hero">' + img(p.image, p.title) + "</div>" : "") +
      '<div class="dlg-body"><div class="card-meta" style="margin-bottom:8px"><span>' + esc(p.year) + "</span><span>" + list(p.category).map(cat).map(esc).join(" · ") + "</span></div>" +
      '<h2 id="detail-title">' + esc(p.title) + "</h2>" +
      '<p class="lead">' + esc(p.description || p.summary) + "</p>" +
      (p.role ? "<h4>" + t("ui.role") + "</h4><p>" + esc(p.role) + "</p>" : "") +
      sec(t("ui.objectives"), p.objectives) + sec(t("ui.results"), p.results) +
      chips(t("ui.tech"), p.tech) + chips(t("ui.skills"), p.skills) +
      (p.youtube ? "<h4>Vidéo</h4>" + ytEmbed(p.youtube) : "") +
      (gal.length ? "<h4>" + t("ui.gallery") + '</h4><div class="thumbs">' + gal.map(function (g, i) {
        return '<button type="button" data-lb="' + esc(url(g.src)) + '" data-cap="' + esc(g.alt || "") + '">' + img(g.src, g.alt) + "</button>";
      }).join("") + "</div>" : "") +
      (docs.length ? "<h4>" + t("ui.documents") + '</h4><div class="btn-row">' + docs.map(function (d) {
        return '<a class="btn btn-ghost btn-sm" href="' + esc(url(d.url)) + '" target="_blank" rel="noopener">' + icon("file") + esc(d.title) + "</a>";
      }).join("") + "</div>" : "") +
      (p.link ? '<div class="btn-row" style="margin-top:28px"><a class="btn btn-primary" href="' + esc(url(p.link)) + '"' + ext(p.link) + ">" + t("ui.more") + " " + icon("arrow") + "</a></div>" : "") +
      "</div>";
    var d = $("#detail");
    $(".dlg-content", d).innerHTML = html;
    open(d);
    try { history.replaceState(null, "", "?p=" + encodeURIComponent(id)); } catch (e) { /* ignore */ }
    d.addEventListener("close", function () { try { history.replaceState(null, "", location.pathname); } catch (e) { /* ignore */ } }, { once: true });
  }

  /* ---- Formations ---- */
  R.courses = function (el) {
    var items = visible(D.courses);
    var pf = el.getAttribute("data-platform"); if (pf) items = items.filter(function (c) { return c.platform === pf; });
    el.innerHTML = items.length ? items.map(function (c) {
      var meta = [cat(c.category)];
      if (c.modules) meta.push(c.modules + " " + t("ui.modules"));
      if (c.lessons) meta.push(c.lessons + " " + t("ui.lessons"));
      var btns = (c.youtube ? '<button class="btn btn-ghost btn-sm" type="button" data-video="' + esc(c.youtube) + '">' + icon("play") + t("ui.watch") + "</button>" : "") +
        (c.pdf ? '<a class="btn btn-ghost btn-sm" href="' + esc(url(c.pdf)) + '" target="_blank" rel="noopener">' + icon("file") + "PDF</a>" : "") +
        (c.link ? '<a class="btn btn-primary btn-sm" href="' + esc(url(c.link)) + '"' + ext(c.link) + ">" + t("ui.visit") + " " + icon("external") + "</a>" : "");
      return '<article class="card reveal' + phCls(c) + '" id="c-' + esc(c.id) + '">' +
        (c.image ? '<div class="card-media" style="aspect-ratio:16/8">' + img(c.image, "") + '<span class="badge">' + (c.platform === "geo-hagri" ? "POLE GEO-HAGRI" : "Formation") + "</span></div>" : "") +
        '<div class="card-body"><div class="card-meta">' + meta.map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("") + "</div>" +
        "<h3>" + esc(c.title) + "</h3><p>" + esc(c.description) + "</p>" +
        (list(c.objectives).length ? "<details><summary>" + t("ui.objectives") + "</summary><ul>" + list(c.objectives).map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ul></details>" : "") +
        (list(c.skills).length ? '<div class="chips">' + list(c.skills).map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; }).join("") + "</div>" : "") +
        (btns ? '<div class="card-foot">' + btns + "</div>" : "") + "</div></article>";
    }).join("") : emptyBox();
  };

  /* ---- Publications ---- */
  var PUB_ICON = { "Livre": "book", "Chapitre": "book", "Rapport": "file", "Document pédagogique": "cap", "Blog": "pen" };
  function pubItem(p) {
    var btns = (p.link ? '<a class="btn btn-primary btn-sm" href="' + esc(url(p.link)) + '"' + ext(p.link) + ">" + icon("eye") + t("ui.read") + "</a>" : "") +
      (p.pdf ? '<a class="btn btn-ghost btn-sm" href="' + esc(url(p.pdf)) + '" target="_blank" rel="noopener" download>' + icon("download") + t("ui.download") + "</a>" : "") +
      (p.doi ? '<a class="btn btn-ghost btn-sm" href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">DOI</a>' : "");
    return '<article class="pub reveal' + phCls(p) + '" id="pub-' + esc(p.id) + '">' +
      '<div class="pub-cover">' + (p.cover ? img(p.cover, "Couverture : " + p.title) :
        '<div style="height:100%;display:grid;place-items:center;color:var(--accent-ink)">' + icon(PUB_ICON[p.type] || "file") + "</div>") + "</div>" +
      '<div><div class="card-meta"><span class="badge gold">' + esc(p.type) + "</span><span>" + esc(p.year) + "</span></div>" +
      "<h3>" + esc(p.title) + phNote(p) + "</h3>" +
      (p.authors ? '<div class="muted" style="font-size:.88rem">' + esc(p.authors) + "</div>" : "") +
      "<p>" + esc(p.summary) + "</p>" + (btns ? '<div class="btn-row">' + btns + "</div>" : "") + "</div></article>";
  }
  R.publications = function (el) {
    var items = visible(D.publications).sort(function (a, b) { return String(b.year).localeCompare(String(a.year)); });
    if (el.hasAttribute("data-featured")) items = items.filter(function (p) { return p.featured; });
    var lim = +el.getAttribute("data-limit"); if (lim) items = items.slice(0, lim);
    var draw = function (st) {
      var arr = items.filter(function (p) { return (st.f === "all" || p.type === st.f) && matches(p, st.q); });
      el.innerHTML = arr.length ? arr.map(pubItem).join("") : emptyBox();
      reveal(el);
    };
    if (el.hasAttribute("data-filters")) {
      var types = ["Article", "Article scientifique", "Livre", "Chapitre", "Rapport", "Document pédagogique", "Blog"];
      filterBar(el, types.map(function (k) { return { k: k, l: k }; }), { search: true }, draw);
    } else draw({ f: "all", q: "" });
    // Données structurées pour les moteurs de recherche
    jsonLd(items.filter(function (p) { return !p.placeholder; }).map(function (p) {
      return { "@context": "https://schema.org", "@type": /scientifique/i.test(p.type) ? "ScholarlyArticle" : (p.type === "Livre" ? "Book" : "CreativeWork"),
        name: p.title, datePublished: p.year, author: { "@type": "Person", name: p.authors || S.name }, abstract: p.summary,
        url: p.link || undefined, identifier: p.doi ? "https://doi.org/" + p.doi : undefined };
    }));
  };

  /* ---- Contenus ---- */
  R.contents = function (el) {
    var items = visible(D.contents).sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
    var lim = +el.getAttribute("data-limit"); if (lim) items = items.slice(0, lim);
    var card = function (c) {
      var thumb = c.image ? img(c.image, c.title) : (c.youtube ? img(ytThumb(c.youtube), c.title) : "");
      var btns = (c.youtube ? '<button class="btn btn-primary btn-sm" type="button" data-video="' + esc(c.youtube) + '">' + icon("play") + t("ui.watch") + "</button>" : "") +
        (c.link ? '<a class="btn btn-ghost btn-sm" href="' + esc(url(c.link)) + '"' + ext(c.link) + ">" + t("ui.view") + " " + icon("external") + "</a>" : "") +
        (c.pdf ? '<a class="btn btn-ghost btn-sm" href="' + esc(url(c.pdf)) + '" target="_blank" rel="noopener">' + icon("file") + "PDF</a>" : "");
      return '<article class="card hover reveal' + phCls(c) + '" id="ct-' + esc(c.id) + '">' +
        '<div class="card-media">' + thumb + '<span class="badge">' + esc(c.category) + "</span></div>" +
        '<div class="card-body"><div class="card-meta"><span>' + esc(fmtDate(c.date)) + "</span>" + (c.author ? "<span>" + esc(c.author) + "</span>" : "") + "</div>" +
        "<h3>" + esc(c.title) + phNote(c) + "</h3><p>" + esc(c.description) + "</p>" +
        (list(c.tags).length ? '<div class="chips">' + list(c.tags).map(function (x) { return '<span class="chip">#' + esc(x) + "</span>"; }).join("") + "</div>" : "") +
        (btns ? '<div class="card-foot">' + btns + "</div>" : "") + "</div></article>";
    };
    var draw = function (st) {
      var arr = items.filter(function (c) { return (st.f === "all" || c.category === st.f) && matches(c, st.q); });
      el.innerHTML = arr.length ? arr.map(card).join("") : emptyBox();
      reveal(el);
    };
    if (el.hasAttribute("data-filters")) {
      var cats = ["Articles", "Vidéos", "Podcasts", "Formations", "Infographies", "Présentations", "Publications scientifiques", "Contenus éducatifs", "Agriculture"];
      filterBar(el, cats.map(function (k) { return { k: k, l: k }; }), { search: true }, draw);
    } else draw({ f: "all", q: "" });
  };

  /* ---- Blog ---- */
  function postCard(p) {
    return '<a class="card hover reveal" href="' + url("article.html?a=" + encodeURIComponent(p.slug)) + '">' +
      '<div class="card-media">' + (p.image ? img(p.image, "") : "") + '<span class="badge">' + esc(p.category) + "</span></div>" +
      '<div class="card-body"><div class="card-meta"><span>' + esc(fmtDate(p.date)) + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" +
      '<div class="card-foot"><span class="btn btn-link">' + t("ui.read") + " " + icon("arrow") + "</span></div></div></a>";
  }
  R.posts = function (el) {
    var items = visible(D.posts).sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
    var lim = +el.getAttribute("data-limit"); if (lim) items = items.slice(0, lim);
    var draw = function (st) {
      var arr = items.filter(function (p) { return (st.f === "all" || p.category === st.f) && matches(p, st.q); });
      el.innerHTML = arr.length ? arr.map(postCard).join("") : emptyBox();
      reveal(el);
    };
    if (el.hasAttribute("data-filters")) {
      var cats = ["Agriculture", "Environnement", "Education", "Leadership", "Communication", "Translation", "Technology"];
      filterBar(el, cats.map(function (k) { return { k: k, l: k }; }), { search: true }, draw);
    } else draw({ f: "all", q: "" });
  };

  // Mini-convertisseur Markdown (titres, listes, citations, gras, italique, liens, images)
  // Texte en ligne : **gras**, *italique*, [lien](url), ![image](url)
  function mdInline(s) {
    var keep = [];
    // Caractères échappés par l'éditeur (\* \_ \# …) : protégés puis restitués
    s = String(s == null ? "" : s).replace(/\\([\\`*_{}\[\]()#+\-.!>|~])/g, function (_, c) { keep.push(c); return "\u0000" + (keep.length - 1) + "\u0000"; });
    return esc(s)
      .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, function (_, a, u) { return '<img src="' + url(u) + '" alt="' + a + '" loading="lazy">'; })
      .replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, function (_, a, u) { return '<a href="' + url(u) + '"' + ext(u) + ">" + a + "</a>"; })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/__([^_]+)__/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/(^|[\s(>])_([^_]+)_(?=[\s).,;:!?<]|$)/g, "$1<em>$2</em>")
      .replace(/\u0000(\d+)\u0000/g, function (_, i) { return esc(keep[+i]); });
  }
  PG.mdInline = mdInline;
  function md(src) {
    var inline = mdInline;
    return String(src || "").replace(/\r\n/g, "\n").trim().split(/\n\s*\n/).map(function (block) {
      var b = block.trim();
      var yt = b.match(/^https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})\S*$/);
      if (yt) return ytEmbed(yt[1]);
      if (/^####\s/.test(b)) return "<h4>" + inline(b.replace(/^####\s/, "")) + "</h4>";
      if (/^###\s/.test(b)) return "<h3>" + inline(b.replace(/^###\s/, "")) + "</h3>";
      if (/^#{1,2}\s/.test(b)) return "<h2>" + inline(b.replace(/^#{1,2}\s/, "")) + "</h2>";
      if (/^>\s?/.test(b)) return "<blockquote>" + inline(b.replace(/^>\s?/gm, "")) + "</blockquote>";
      if (/^[-*+]\s/.test(b)) return "<ul>" + b.split(/\n/).map(function (l) { return "<li>" + inline(l.replace(/^\s*[-*+]\s/, "")) + "</li>"; }).join("") + "</ul>";
      if (/^\d+\.\s/.test(b)) return "<ol>" + b.split(/\n/).map(function (l) { return "<li>" + inline(l.replace(/^\d+\.\s/, "")) + "</li>"; }).join("") + "</ol>";
      if (/^!\[/.test(b)) return inline(b);
      return "<p>" + inline(b).replace(/\n/g, "<br>") + "</p>";
    }).join("\n");
  }
  R.article = function (el) {
    var slug = param("a");
    var p = visible(D.posts).filter(function (x) { return x.slug === slug; })[0];
    if (!p) { el.innerHTML = emptyBox("Article introuvable."); return; }
    document.title = p.title + " — " + S.name;
    var md_ = document.querySelector('meta[name="description"]'); if (md_) md_.setAttribute("content", p.summary);
    var share = encodeURIComponent(location.href), title = encodeURIComponent(p.title);
    el.innerHTML =
      '<nav class="breadcrumb"><a href="' + url("blog.html") + '">' + t("nav.blog") + "</a> / " + esc(p.category) + "</nav>" +
      '<div class="card-meta" style="margin-bottom:10px"><span class="badge">' + esc(p.category) + "</span><span>" + esc(fmtDate(p.date)) + "</span><span>" + esc(S.name) + "</span></div>" +
      "<h1>" + esc(p.title) + '</h1><p class="lead">' + esc(p.summary) + "</p>" +
      (p.image ? '<div style="margin:32px 0;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--line)">' + img(p.image, "") + "</div>" : "") +
      '<div class="prose">' + md(p.body) + "</div>" +
      (list(p.tags).length ? '<div class="chips" style="margin-top:32px">' + list(p.tags).map(function (x) { return '<span class="chip">#' + esc(x) + "</span>"; }).join("") + "</div>" : "") +
      '<div class="btn-row" style="margin-top:28px;padding-top:24px;border-top:1px solid var(--line)"><strong style="align-self:center;margin-right:6px">' + t("ui.share") + " :</strong>" +
      '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=' + share + '">LinkedIn</a>' +
      '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + share + '">Facebook</a>' +
      '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://wa.me/?text=' + title + "%20" + share + '">WhatsApp</a>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-copy>' + icon("share") + "Copier le lien</button></div>";
    var cp = $("[data-copy]", el);
    cp.addEventListener("click", function () {
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { cp.textContent = t("ui.copied"); });
    });
    jsonLd([{ "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, datePublished: p.date, description: p.summary,
      author: { "@type": "Person", name: S.name }, image: p.image ? new URL(url(p.image), location.href).href : undefined, keywords: list(p.tags).join(", ") }]);
  };

  /* ---- Documents ---- */
  R.documents = function (el) {
    var items = visible(D.documents).filter(function (d) { return d.public !== false; });
    var cats = []; items.forEach(function (d) { if (cats.indexOf(d.category) < 0) cats.push(d.category); });
    var card = function (d) {
      var ok = !!d.url;
      return '<article class="doc reveal' + phCls(d) + '" id="doc-' + esc(d.id) + '"><div class="doc-type" aria-hidden="true">' + esc(d.format || "FILE") + "</div>" +
        '<div><div class="card-meta" style="margin-bottom:4px"><span>' + esc(d.category) + "</span><span>" + esc(fmtDate(d.date)) + "</span></div>" +
        "<h3>" + esc(d.title) + phNote(d) + "</h3><p>" + esc(d.description) + "</p>" +
        '<div class="btn-row"><a class="btn btn-ghost btn-sm" ' + (ok ? 'href="' + esc(url(d.url)) + '" target="_blank" rel="noopener"' : 'aria-disabled="true"') + ">" + icon("eye") + t("ui.view") + "</a>" +
        '<a class="btn btn-primary btn-sm" ' + (ok ? 'href="' + esc(url(d.url)) + '" download' : 'aria-disabled="true"') + ">" + icon("download") + t("ui.download") + "</a></div></div></article>";
    };
    filterBar(el, cats.map(function (k) { return { k: k, l: k }; }), { search: true }, function (st) {
      var arr = items.filter(function (d) { return (st.f === "all" || d.category === st.f) && matches(d, st.q); });
      el.innerHTML = arr.length ? arr.map(card).join("") : emptyBox();
      reveal(el);
    });
  };

  /* ---- Médiathèque ---- */
  R.media = function (el) {
    var items = visible(D.media);
    var fixed = el.getAttribute("data-category");
    if (fixed) items = items.filter(function (m) { return m.category === fixed; });
    var lim = +el.getAttribute("data-limit"); if (lim) items = items.slice(0, lim);
    var tile = function (m) {
      var src = m.src || (m.youtube ? ytThumb(m.youtube) : "");
      var attr = m.type === "video" ? (m.youtube ? 'data-video="' + esc(m.youtube) + '"' : "disabled") : 'data-lb="' + esc(url(m.src)) + '" data-cap="' + esc(m.caption || "") + '"';
      return '<button type="button" class="gallery-item reveal' + phCls(m) + '" ' + attr + ' aria-label="' + esc(m.caption || m.alt || "") + '">' +
        img(src, m.alt) + (m.type === "video" ? '<span class="play"><span>' + '<svg class="icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></span>' : "") +
        (m.caption ? '<span class="cap">' + esc(m.caption) + "</span>" : "") + "</button>";
    };
    var draw = function (st) {
      var arr = items.filter(function (m) { return st.f === "all" || m.category === st.f; });
      el.innerHTML = arr.length ? arr.map(tile).join("") : emptyBox();
      reveal(el);
    };
    if (el.hasAttribute("data-filters")) {
      var keys = ["agriculture", "education", "leadership", "events", "projects", "speaking", "branding"];
      filterBar(el, keys.map(function (k) { return { k: k, l: cat(k) }; }), {}, draw);
    } else draw({ f: "all" });
  };

  /* ---- Parcours ---- */
  R.experiences = function (el) {
    var items = visible(D.experiences);
    var pl = el.getAttribute("data-pillar"); if (pl) items = items.filter(function (x) { return x.pillar === pl; });
    var ul = function (title, arr) {
      arr = list(arr).filter(Boolean);
      return arr.length ? "<h4 style=\"margin:12px 0 4px\">" + title + "</h4><ul>" + arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "";
    };
    el.innerHTML = items.length ? items.map(function (x) {
      return '<li class="reveal' + (x.current ? " current" : "") + '"><div class="tl-card' + phCls(x) + '"><div class="when">' + esc(x.period) + "</div>" +
        "<h3>" + esc(x.role) + '</h3><div class="org">' + esc(x.org) + (x.place ? " · " + esc(x.place) : "") + "</div>" +
        "<p>" + esc(x.description) + "</p>" +
        ((list(x.responsibilities).length || list(x.achievements).length) ? "<details><summary>" + t("ui.more") + "</summary>" +
          ul(t("ui.responsibilities"), x.responsibilities) + ul(t("ui.achievements"), x.achievements) + "</details>" : "") +
        (list(x.skills).length ? '<div class="chips" style="margin-top:12px">' + list(x.skills).map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; }).join("") + "</div>" : "") +
        "</div></li>";
    }).join("") : emptyBox();
  };
  R.education = function (el) {
    var items = visible(D.education);
    el.innerHTML = items.length ? items.map(function (x) {
      return '<li class="reveal"><div class="tl-card' + phCls(x) + '"><div class="when">' + esc(x.year) + " · " + esc(x.type) + "</div>" +
        "<h3>" + esc(x.title) + '</h3><div class="org">' + (x.url ? '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.institution) + "</a>" : esc(x.institution)) + "</div>" +
        (x.description ? "<p>" + esc(x.description) + "</p>" : "") +
        (x.pdf ? '<a class="btn btn-ghost btn-sm" href="' + esc(url(x.pdf)) + '" target="_blank" rel="noopener">' + icon("award") + "Certificat</a>" : "") +
        "</div></li>";
    }).join("") : emptyBox();
  };

  /* ---- Compétences ---- */
  R.skills = function (el) {
    var groups = D.skills || {}, names = Object.keys(groups);
    if (!names.length) { el.innerHTML = emptyBox(); return; }
    var dots = function (n) {
      var s = ""; for (var i = 1; i <= 4; i++) s += '<i class="' + (i <= n ? "on" : "") + '"></i>';
      return '<span class="level" title="' + t("level." + n) + '"><span class="dots" aria-hidden="true">' + s + "</span>" + t("level." + n) + "</span>";
    };
    el.innerHTML = '<div class="tabs" role="tablist">' + names.map(function (n, i) {
      return '<button class="filter-btn" role="tab" type="button" aria-pressed="' + (i === 0) + '" aria-selected="' + (i === 0) + '" data-tab="' + i + '">' + esc(n) + "</button>";
    }).join("") + '</div><div class="grid" role="tabpanel"></div>';
    var panel = $(".grid", el);
    var show = function (i) {
      panel.innerHTML = groups[names[i]].map(function (s) {
        return '<div class="skill"><div class="skill-top"><strong>' + esc(s.name) + "</strong>" + dots(s.level) + "</div>" + (s.text ? "<p>" + esc(s.text) + "</p>" : "") + "</div>";
      }).join("");
    };
    $$("[data-tab]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        $$("[data-tab]", el).forEach(function (x) { x.setAttribute("aria-pressed", x === b); x.setAttribute("aria-selected", x === b); });
        show(+b.getAttribute("data-tab"));
      });
    });
    show(0);
  };
  R.languages = function (el) {
    el.innerHTML = list(D.languages).map(function (l) {
      return '<div class="skill"><div class="skill-top"><strong>' + esc(l.name) + '</strong><span class="level">' + esc(l.level) + "</span></div></div>";
    }).join("");
  };
  R.tools = function (el) {
    el.innerHTML = list(D.tools).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("");
  };

  /* ---- Témoignages ---- */
  R.testimonials = function (el) {
    var items = visible(D.testimonials);
    var sec = el.closest("[data-section]");
    if (!items.length || S.showTestimonials === false) { (sec || el).hidden = true; return; }
    el.innerHTML = items.map(function (x) {
      var ini = String(x.name || "?").split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2);
      return '<figure class="card testimonial reveal' + phCls(x) + '" style="margin:0">' + icon("quote", "") +
        "<blockquote>« " + esc(x.quote) + " »</blockquote>" +
        '<figcaption class="person">' + (x.photo ? img(x.photo, x.name) : '<span class="avatar">' + esc(ini) + "</span>") +
        "<span><strong>" + esc(x.name) + "</strong><span>" + esc([x.role, x.org].filter(Boolean).join(", ")) + "</span></span></figcaption></figure>";
    }).join("");
  };

  /* ---- Services ---- */
  R.services = function (el) {
    var items = visible(D.services);
    var lim = +el.getAttribute("data-limit"); if (lim) items = items.slice(0, lim);
    var compact = el.hasAttribute("data-compact");
    el.innerHTML = items.map(function (s) {
      var q = url("contact.html?sujet=" + encodeURIComponent("Demande de devis — " + s.title));
      return '<article class="card pad reveal" id="srv-' + esc(s.id) + '" style="--tint:' + (s.tint || "var(--primary)") + '">' +
        '<span class="icon-tile">' + icon(s.icon || "briefcase") + "</span><h3>" + esc(s.title) + '</h3><p class="muted" style="margin:0">' + esc(s.description) + "</p>" +
        (compact ? "" :
          '<div style="font-size:.92rem"><strong>' + t("ui.audience") + ' :</strong> <span class="muted">' + esc(s.audience) + "</span></div>" +
          '<div style="font-size:.92rem"><strong>' + t("ui.deliverables") + ' :</strong><ul style="margin:6px 0 0;color:var(--muted)">' + list(s.deliverables).map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul></div>") +
        '<div class="card-foot"><a class="btn ' + (compact ? "btn-link" : "btn-primary btn-sm") + '" href="' + q + '">' + t("ui.quote") + " " + icon("arrow") + "</a></div></article>";
    }).join("");
  };

  /* ---- Leadership ---- */
  R["leadership-timeline"] = function (el) {
    var L = D.leadership || {};
    el.innerHTML = list(L.timeline).map(function (x) {
      return '<li class="reveal' + (x.current ? " current" : "") + '"><div class="when">' + esc(x.year) + "</div><h3>" + esc(x.title) + '</h3><p class="muted">' + esc(x.text) + "</p></li>";
    }).join("");
  };
  R.philosophy = function (el) {
    var L = D.leadership || {};
    if (!L.philosophy) { el.hidden = true; return; }
    el.innerHTML = '<figure class="quote-block reveal' + (L.philosophyIsPlaceholder && showPh ? " is-placeholder" : "") + '" style="margin:0">' + icon("quote") +
      "<blockquote>« " + esc(L.philosophy) + " »</blockquote><figcaption>— " + esc(S.name) +
      (L.philosophyIsPlaceholder && showPh ? ' <span class="ph-note">Citation à personnaliser</span>' : "") + "</figcaption></figure>";
  };

  /* ---- Traduction ---- */
  R["translation-pairs"] = function (el) {
    var tr = D.translation || {};
    el.innerHTML = visible(tr.pairs).map(function (p) {
      return '<div class="skill' + phCls(p) + '"><div class="skill-top"><strong>' + esc(p.from) + " → " + esc(p.to) + '</strong><span class="level">' + icon("languages") + "</span></div></div>";
    }).join("") || emptyBox("Langues de travail à confirmer.");
  };
  R["translation-samples"] = function (el) {
    var tr = D.translation || {};
    el.innerHTML = visible(tr.samples).map(function (s) {
      return '<article class="card pad reveal">' +
        '<div class="card-meta"><span class="badge' + (s.confidential ? "" : " gold") + '">' + esc(s.type) + "</span><span>" + esc(s.pair) + "</span></div>" +
        "<h3>" + esc(s.title) + "</h3>" +
        (s.confidential ? '<p class="muted" style="display:flex;gap:8px;align-items:center;margin:0">' + icon("lock") + t("ui.confidential") + "</p>" :
          (s.image ? img(s.image, s.title) : "") + '<p class="muted" style="margin:0">' + esc(s.note || "Exemple anonymisé") + "</p>") +
        "</article>";
    }).join("");
  };

  /* ---- Réseaux sociaux ---- */
  var SOCIAL = {
    linkedin: ["LinkedIn", "in"], facebook: ["Facebook", "f"], instagram: ["Instagram", "IG"], youtube: ["YouTube", "YT"],
    tiktok: ["TikTok", "TT"], x: ["X", "X"], researchgate: ["ResearchGate", "RG"], scholar: ["Google Scholar", "GS"], github: ["GitHub", "GH"]
  };
  R.socials = function (el) {
    var so = S.socials || {};
    var out = Object.keys(SOCIAL).map(function (k) {
      var u = so[k];
      if (!u && !showPh) return "";
      return u ? '<a class="social" href="' + esc(u) + '" target="_blank" rel="noopener me"><span class="sq">' + SOCIAL[k][1] + "</span>" + SOCIAL[k][0] + "</a>"
        : '<span class="social is-placeholder" title="Ajoutez le lien dans data/site.js"><span class="sq">' + SOCIAL[k][1] + "</span>" + SOCIAL[k][0] + "</span>";
    }).join("");
    if (S.email && !el.hasAttribute("data-compact")) out += '<a class="social" href="mailto:' + esc(S.email) + '"><span class="sq">@</span>Email me</a>';
    el.innerHTML = out;
  };

  /* ---- CV (version web) ---- */
  R["cv-experiences"] = function (el) {
    el.innerHTML = visible(D.experiences).map(function (x) {
      return '<div class="cv-item"><div class="muted">' + esc(x.period) + "</div><div><strong>" + esc(x.role) + "</strong> — " + esc(x.org) +
        (x.place ? ", " + esc(x.place) : "") + '<div class="muted" style="font-size:.95rem">' + esc(x.description) + "</div></div></div>";
    }).join("");
  };
  R["cv-education"] = function (el) {
    el.innerHTML = visible(D.education).map(function (x) {
      return '<div class="cv-item"><div class="muted">' + esc(x.year) + "</div><div><strong>" + esc(x.title) + "</strong> — " + esc(x.institution) + "</div></div>";
    }).join("");
  };
  R["cv-skills"] = function (el) {
    var g = D.skills || {};
    el.innerHTML = Object.keys(g).map(function (k) {
      return '<div class="cv-item"><div class="muted">' + esc(k) + "</div><div>" + g[k].map(function (s) { return esc(s.name); }).join(" · ") + "</div></div>";
    }).join("") + '<div class="cv-item"><div class="muted">Langues</div><div>' + list(D.languages).map(function (l) { return esc(l.name) + " (" + esc(l.level) + ")"; }).join(" · ") + "</div></div>";
  };

  /* ---- Vidéo de présentation ---- */
  R["featured-video"] = function (el) {
    if (S.featuredVideo) { el.innerHTML = ytEmbed(S.featuredVideo); return; }
    if (!showPh) { var s = el.closest("[data-section]"); (s || el).hidden = true; return; }
    el.innerHTML = '<div class="video-placeholder is-placeholder"><div>' + icon("play") +
      '<strong style="font-size:1.15rem">« Bonjour, je suis Penchely Germain… »</strong>' +
      '<p style="margin:8px 0 0;opacity:.85;font-size:.92rem">Vidéo de présentation de 60 à 90 secondes — ajoutez son identifiant YouTube dans data/site.js</p></div></div>';
  };

  /* ------------------------------------------------------------------
     6. Lightbox, vidéos, détails de projet
     ------------------------------------------------------------------ */
  function initDelegation() {
    document.addEventListener("click", function (e) {
      var b;
      if ((b = e.target.closest("[data-project]"))) { showProject(b.getAttribute("data-project")); return; }
      if ((b = e.target.closest("[data-lb]"))) {
        var lb = $("#lightbox");
        $(".lb-content", lb).innerHTML = '<img src="' + esc(b.getAttribute("data-lb")) + '" alt="' + esc(b.getAttribute("data-cap")) + '">' +
          (b.getAttribute("data-cap") ? '<div class="lb-cap">' + esc(b.getAttribute("data-cap")) + "</div>" : "");
        open(lb); return;
      }
      if ((b = e.target.closest("[data-video]"))) {
        var lb2 = $("#lightbox");
        $(".lb-content", lb2).innerHTML = '<div style="padding:48px 12px 12px">' + ytEmbed(b.getAttribute("data-video")) + "</div>";
        open(lb2); return;
      }
      if ((b = e.target.closest("[data-open-search]"))) { openSearch(); return; }
      if ((b = e.target.closest("[data-print]"))) { window.print(); return; }
    });
    // « Lire la suite »
    $$("[data-more]").forEach(function (btn) {
      var target = document.getElementById(btn.getAttribute("data-more"));
      if (!target) return;
      btn.setAttribute("aria-controls", target.id);
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var o = target.hidden;
        target.hidden = !o;
        btn.setAttribute("aria-expanded", o);
        btn.innerHTML = (o ? t("ui.readLess") : t("ui.readMore")) + " " + icon("chevron");
        $("svg", btn).style.transform = o ? "rotate(180deg)" : "";
      });
    });
    var pid = param("p"); if (pid) showProject(pid);
  }

  /* ------------------------------------------------------------------
     7. Recherche globale (Ctrl+K ou « / »)
     ------------------------------------------------------------------ */
  var INDEX = null;
  function buildIndex() {
    var ix = [];
    var add = function (type, title, text, href) { ix.push({ type: type, title: title || "", text: text || "", href: href, hay: (title + " " + text).toLowerCase() }); };
    visible(D.projects).forEach(function (p) { add("project", p.title, p.summary + " " + list(p.category).map(cat).join(" ") + " " + list(p.skills).join(" "), "projets.html?p=" + p.id); });
    visible(D.courses).forEach(function (c) { add("course", c.title, c.description + " " + list(c.skills).join(" "), (c.platform === "geo-hagri" ? "pole-geo-hagri.html" : "formation.html") + "#c-" + c.id); });
    visible(D.publications).forEach(function (p) { add("publication", p.title, p.type + " " + p.summary, "publications.html#pub-" + p.id); });
    visible(D.posts).forEach(function (p) { add("post", p.title, p.summary + " " + list(p.tags).join(" "), "article.html?a=" + p.slug); });
    visible(D.contents).forEach(function (c) { add("content", c.title, c.category + " " + c.description + " " + list(c.tags).join(" "), "contenus.html#ct-" + c.id); });
    visible(D.documents).filter(function (d) { return d.public !== false; }).forEach(function (d) { add("document", d.title, d.description + " " + d.category, "documents.html#doc-" + d.id); });
    visible(D.services).forEach(function (s) { add("service", s.title, s.description, "services.html#srv-" + s.id); });
    Object.keys(D.skills || {}).forEach(function (g) { D.skills[g].forEach(function (s) { add("skill", s.name, g + " " + (s.text || ""), "a-propos.html#competences"); }); });
    (D.pillars || []).forEach(function (p) { add("page", p.title, p.role + " " + p.text + " " + p.skills.join(" "), p.page); });
    [["À propos", "biographie mission valeurs", "a-propos.html"], ["Mon parcours", "expériences diplômes certifications timeline", "parcours.html"],
     ["POLE GEO-HAGRI", "plateforme formation agriculture durable Haïti", "pole-geo-hagri.html"], ["CV", "curriculum vitae resume", "cv.html"],
     ["Media kit", "presse biographie photo", "media-kit.html"], ["Contact", "email message devis collaboration", "contact.html"],
     ["Médiathèque", "photos vidéos galerie événements", "mediatheque.html"]].forEach(function (p) { add("page", p[0], p[1], p[2]); });
    return ix;
  }
  function openSearch() {
    var d = $("#search-dialog"), inp = $("#global-search"), res = $(".search-results", d);
    if (!INDEX) INDEX = buildIndex();
    var norm = function (s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); };
    var run = function () {
      var q = norm(inp.value.trim().toLowerCase());
      if (q.length < 2) { res.innerHTML = '<li class="search-hint">' + t("ui.searchHint") + "</li>"; return; }
      var words = q.split(/\s+/);
      var hits = INDEX.filter(function (x) { var h = norm(x.hay); return words.every(function (w) { return h.indexOf(w) > -1; }); }).slice(0, 12);
      res.innerHTML = hits.length ? hits.map(function (x) {
        return '<li><a href="' + url(x.href) + '"><span class="badge">' + t("type." + x.type) + "</span><span><strong>" + esc(x.title) + "</strong><small>" + esc(x.text.slice(0, 110)) + "</small></span></a></li>";
      }).join("") : '<li class="search-hint">' + t("ui.searchEmpty") + "</li>";
    };
    inp.oninput = run;
    // Échap ferme directement la recherche (au lieu de seulement vider le champ)
    inp.onkeydown = function (e) { if (e.key === "Escape") { e.preventDefault(); close(d); } };
    run();
    open(d);
    setTimeout(function () { inp.focus(); }, 30);
  }
  document.addEventListener("keydown", function (e) {
    var typing = /input|textarea|select/i.test((e.target.tagName || "")) || e.target.isContentEditable;
    if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) { e.preventDefault(); openSearch(); }
  });

  /* ------------------------------------------------------------------
     8. Formulaire de contact (Formspree ou équivalent, sans serveur)
     ------------------------------------------------------------------ */
  function initForm() {
    var f = $("#contact-form"); if (!f) return;
    var st = $(".form-status", f);
    var sujet = param("sujet"); if (sujet) $("#f-subject").value = sujet;
    var configured = S.formEndpoint && S.formEndpoint.indexOf("VOTRE_ID") < 0;
    f.action = configured ? S.formEndpoint : "#";
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      if (!configured) { st.className = "form-status err"; st.textContent = t("form.notConfigured"); return; }
      var btn = $("button[type=submit]", f), label = btn.innerHTML;
      btn.disabled = true; btn.textContent = t("form.sending");
      fetch(S.formEndpoint, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          st.className = "form-status ok"; st.textContent = t("form.ok"); f.reset();
        })
        .catch(function () { st.className = "form-status err"; st.textContent = t("form.err"); })
        .then(function () { btn.disabled = false; btn.innerHTML = label; });
    });
  }

  /* ------------------------------------------------------------------
     9. SEO, animations, statistiques
     ------------------------------------------------------------------ */
  function jsonLd(arr) {
    list(arr).forEach(function (o) {
      var s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(o);
      document.head.appendChild(s);
    });
  }
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;
  function reveal(scope) {
    $$(".reveal:not(.in)", scope).forEach(function (x, i) {
      if (!io) { x.classList.add("in"); return; }
      x.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      io.observe(x);
    });
  }
  function analytics() {
    var a = S.analytics; if (!a) return;
    var s = document.createElement("script"); s.async = true;
    if (a.provider === "goatcounter" && a.code) { s.src = "https://gc.zgo.at/count.js"; s.setAttribute("data-goatcounter", "https://" + a.code + ".goatcounter.com/count"); }
    else if (a.provider === "cloudflare" && a.token) { s.src = "https://static.cloudflareinsights.com/beacon.min.js"; s.setAttribute("data-cf-beacon", JSON.stringify({ token: a.token })); }
    else return;
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------------
     10. Démarrage
     ------------------------------------------------------------------ */
  /* Textes des pages modifiables depuis /admin (data/pages/*.json).
     <p data-text="home.hero_intro">texte par défaut</p>
     data-md="block" : paragraphes, titres, listes ; sinon texte en ligne. */
  function pageText(key) {
    var i = key.indexOf("."), o = PG.pages && PG.pages[key.slice(0, i)];
    return o ? o[key.slice(i + 1)] : undefined;
  }
  function applyTexts() {
    $$("[data-text]").forEach(function (el) {
      var v = pageText(el.getAttribute("data-text"));
      if (v === undefined || v === null) return;          // garde le texte par défaut
      if (String(v).trim() === "") { el.hidden = true; return; }
      el.innerHTML = el.getAttribute("data-md") === "block" ? md(v) : mdInline(v);
    });
    $$("[data-list]").forEach(function (el) {
      var v = pageText(el.getAttribute("data-list"));
      if (!Array.isArray(v)) return;
      el.innerHTML = v.filter(Boolean).map(function (x) { return '<span class="chip" style="font-size:.95rem;padding:8px 16px">' + mdInline(x) + "</span>"; }).join("");
    });
    // Titre de l'onglet et description (SEO) personnalisés
    var seoT = pageText(PAGE + ".seo_titre"), seoD = pageText(PAGE + ".seo_description");
    if (seoT) document.title = seoT;
    if (seoD) { var m = document.querySelector('meta[name="description"]'); if (m) m.setAttribute("content", seoD); }
  }

  function start() {
    if (!showPh) document.documentElement.classList.add("no-ph");
    applyTexts();
    buildHeader();
    buildFooter();
    buildDialogs();
    initChrome();
    $$("[data-render]").forEach(function (el) {
      var fn = R[el.getAttribute("data-render")];
      if (fn) { try { fn(el); } catch (err) { console.error("Rendu impossible :", el.getAttribute("data-render"), err); } }
    });
    // Liens CV ajoutés dans le pied de page
    $$("[data-cv]").forEach(function (a) { if (S.cvPdf) { a.href = url(S.cvPdf); a.setAttribute("download", ""); } });
    initDelegation();
    initForm();
    reveal(document);
    analytics();
    // Faire défiler jusqu'à l'ancre après le rendu dynamique
    if (location.hash) { var tgt = document.getElementById(location.hash.slice(1)); if (tgt) setTimeout(function () { tgt.scrollIntoView(); }, 60); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
