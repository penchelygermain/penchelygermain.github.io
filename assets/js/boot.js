/* ==========================================================================
   CHARGEUR — lit les contenus (dossier /data, modifiables depuis /admin)
   puis lance l'application. Aucune modification nécessaire pour ajouter
   du contenu : utilisez l'espace d'administration (/admin).
   ========================================================================== */
(function () {
  "use strict";
  var me = document.currentScript;
  var src = (me && me.getAttribute("src")) || "assets/js/boot.js";
  var ROOT = src.replace(/assets\/js\/boot\.js.*$/, "");
  var V = me && me.dataset.v ? "?v=" + me.dataset.v : "";
  var PAGE = document.body ? document.body.getAttribute("data-page") : null;

  window.PG = window.PG || { data: {} };
  var PG = window.PG;
  PG.root = ROOT;
  PG.pages = {};

  // Fichiers de contenu (JSON) — chaque fichier correspond à une section de /admin
  var FILES = ["site", "pillars", "projects", "courses", "publications", "contents", "posts",
    "documents", "media", "career", "skills", "services", "highlights"];

  function loadScript(path) {
    return new Promise(function (ok, ko) {
      var s = document.createElement("script");
      s.src = ROOT + path + V;
      s.onload = ok; s.onerror = ko;
      document.head.appendChild(s);
    });
  }
  // "no-cache" : le navigateur vérifie toujours s'il existe une version plus récente,
  // pour que les modifications faites dans /admin apparaissent rapidement.
  function getJSON(path, optional) {
    return fetch(ROOT + path, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) { if (optional) return {}; throw new Error(path + " : " + r.status); }
      return r.json();
    }).catch(function (e) { if (optional) return {}; throw e; });
  }

  function assemble(res) {
    var d = {};
    FILES.forEach(function (f, i) { d[f] = res[i] || {}; });
    PG.site = Object.assign({
      lang: "fr",
      languages: [
        { code: "fr", label: "FR", enabled: true },
        { code: "en", label: "EN", enabled: false },
        { code: "ht", label: "KR", enabled: false }
      ],
      roles: [], socials: {}
    }, d.site);
    if (PG.site.analytics && !PG.site.analytics.provider) PG.site.analytics = null;
    var D = PG.data;
    D.pillars = d.pillars.pillars || [];
    D.categories = {};
    (d.pillars.categories || []).forEach(function (c) { D.categories[c.key] = c.label; });
    D.projects = d.projects.projects || [];
    D.courses = d.courses.courses || [];
    D.publications = d.publications.publications || [];
    D.contents = d.contents.contents || [];
    D.posts = d.posts.posts || [];
    D.documents = d.documents.documents || [];
    D.media = d.media.media || [];
    D.experiences = d.career.experiences || [];
    D.education = d.career.education || [];
    D.skills = {};
    (d.skills.groups || []).forEach(function (g) { D.skills[g.group] = g.items || []; });
    D.languages = d.skills.languages || [];
    D.tools = d.skills.tools || [];
    D.services = d.services.services || [];
    D.achievements = d.highlights.achievements || [];
    D.testimonials = d.highlights.testimonials || [];
    D.leadership = d.highlights.leadership || {};
    D.translation = d.highlights.translation || {};
    PG.pages.commun = res[FILES.length] || {};
    if (PAGE) PG.pages[PAGE] = res[FILES.length + 1] || {};
  }

  function fail(err) {
    console.error(err);
    var local = location.protocol === "file:";
    var box = document.createElement("div");
    box.setAttribute("role", "alert");
    box.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:999;padding:16px 18px;border-radius:14px;background:#7E1F1F;color:#fff;font:15px/1.5 system-ui,sans-serif";
    box.textContent = local
      ? "Aperçu local : ouvrez le site avec un petit serveur (VS Code → Live Server) ou consultez-le en ligne. Les contenus ne peuvent pas être lus par double-clic."
      : "Un contenu n'a pas pu être chargé (" + err.message + "). Vérifiez la dernière modification faite dans /admin.";
    document.body.appendChild(box);
  }

  var jobs = FILES.map(function (f) { return getJSON("data/" + f + ".json"); });
  jobs.push(getJSON("data/pages/commun.json", true));
  var NO_TEXT = { article: 1, "404": 1 };
  jobs.push(PAGE && !NO_TEXT[PAGE] ? getJSON("data/pages/" + PAGE + ".json", true) : Promise.resolve({}));

  Promise.all([loadScript("i18n/fr.js")].concat(jobs))
    .then(function (res) { assemble(res.slice(1)); return loadScript("assets/js/app.js"); })
    .catch(fail);
})();
