/* ==========================================================================
   LES 5 PILIERS — utilisés par l'accueil, le menu et les pages piliers.
   "category" relie chaque pilier aux projets/contenus de la même catégorie.
   ========================================================================== */
PG.data.pillars = [
  {
    id: "agronomie", no: "01", icon: "leaf", tint: "var(--p1)", category: "agriculture",
    title: "Ingénieur agronome", page: "agronomie.html",
    role: "Connaissance du terrain et des systèmes agricoles",
    text: "Comprendre les sols, l'eau, la biodiversité et les agroécosystèmes pour bâtir une agriculture durable et résiliente.",
    skills: ["Agroécologie", "Gestion des sols", "SIG / QGIS"]
  },
  {
    id: "formation", no: "02", icon: "cap", tint: "var(--p2)", category: "education",
    title: "Formateur", page: "formation.html",
    role: "Transmission et développement des compétences",
    text: "Concevoir et animer des formations qui transforment les connaissances en compétences concrètes.",
    skills: ["Conception pédagogique", "Animation", "E-learning"]
  },
  {
    id: "traduction", no: "03", icon: "languages", tint: "var(--p3)", category: "translation",
    title: "Traducteur", page: "traduction.html",
    role: "Communication interculturelle et linguistique",
    text: "Faire passer le sens, avec précision et confidentialité, d'une langue et d'une culture à l'autre.",
    skills: ["Traduction", "Révision", "Localisation"]
  },
  {
    id: "leadership", no: "04", icon: "mic", tint: "var(--p4)", category: "leadership",
    title: "Communication & Leadership", page: "leadership.html",
    role: "Capacité à mobiliser et influencer",
    text: "Prendre la parole, fédérer des équipes et conduire des projets collectifs, forgés notamment au sein de Toastmasters.",
    skills: ["Prise de parole", "Mentorat", "Gestion d'équipe"]
  },
  {
    id: "contenu", no: "05", icon: "play", tint: "var(--p5)", category: "content",
    title: "Créateur de contenu", page: "contenus.html",
    role: "Transformation du savoir en ressources accessibles",
    text: "Articles, vidéos, formations et infographies pour rendre le savoir agricole et professionnel accessible à tous.",
    skills: ["Vidéo", "Rédaction", "Contenus éducatifs"]
  }
];

/* Libellés des catégories utilisées dans les filtres (ajoutez-en librement). */
PG.data.categories = {
  agriculture: "Agriculture",
  environment: "Environnement",
  education: "Éducation",
  translation: "Traduction",
  leadership: "Leadership",
  communication: "Communication",
  digital: "Numérique",
  research: "Recherche",
  content: "Création de contenu",
  technology: "Technologie",
  events: "Événements",
  speaking: "Prise de parole",
  branding: "Image professionnelle",
  projects: "Projets"
};
