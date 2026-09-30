/* ==========================================================================
   CHARGEUR — charge la configuration, les contenus puis l'application.
   Si vous créez un nouveau fichier de données dans /data, ajoutez son nom
   dans la liste ci-dessous (c'est la seule modification de code nécessaire).
   ========================================================================== */
(function () {
  var FILES = [
    "data/site.js",
    "i18n/fr.js",
    "data/pillars.js",
    "data/projects.js",
    "data/courses.js",
    "data/publications.js",
    "data/contents.js",
    "data/posts.js",
    "data/documents.js",
    "data/media.js",
    "data/career.js",
    "data/skills.js",
    "data/services.js",
    "data/highlights.js",
    "assets/js/app.js"
  ];
  // Détermine le dossier racine à partir de l'emplacement de ce fichier.
  var me = document.currentScript && document.currentScript.getAttribute("src") || "assets/js/boot.js";
  var root = me.replace(/assets\/js\/boot\.js.*$/, "");
  window.PG = window.PG || { data: {} };
  window.PG.root = root;
  var v = document.currentScript && document.currentScript.dataset.v ? "?v=" + document.currentScript.dataset.v : "";
  FILES.forEach(function (f) {
    var s = document.createElement("script");
    s.src = root + f + v;
    s.async = false; // conserve l'ordre de chargement
    document.head.appendChild(s);
  });
})();
