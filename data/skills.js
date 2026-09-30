/* ==========================================================================
   COMPÉTENCES
   level : 1 = Débutant, 2 = Intermédiaire, 3 = Avancé, 4 = Expert
   ⚠ Niveaux proposés par défaut : ajustez-les selon votre auto-évaluation.
   ========================================================================== */
PG.data.skills = {
  "Agriculture": [
    { name: "Agriculture durable & agroécologie", level: 3, text: "Conception de systèmes de production respectueux des ressources." },
    { name: "Gestion des sols et de l'eau", level: 3, text: "Fertilité, conservation des sols, gestion de l'eau agricole." },
    { name: "Production agricole", level: 3, text: "Itinéraires techniques, maraîchage, jardins potagers." },
    { name: "Biodiversité & changements climatiques", level: 3, text: "Adaptation, résilience et empreinte carbone." }
  ],
  "Éducation": [
    { name: "Conception pédagogique", level: 3, text: "Objectifs, modules, évaluations et supports." },
    { name: "Animation de formations", level: 3, text: "Présentiel et en ligne, adultes et jeunes." },
    { name: "Technologies éducatives", level: 3, text: "Plateformes e-learning, vidéo pédagogique." }
  ],
  "Traduction": [
    { name: "Traduction", level: 3, text: "Documents académiques, administratifs et professionnels." },
    { name: "Révision & relecture", level: 3, text: "Cohérence terminologique, style et exactitude." },
    { name: "Localisation & sous-titrage", level: 2, text: "Adaptation de contenus web et vidéo." }
  ],
  "Communication": [
    { name: "Prise de parole en public", level: 4, text: "Discours, animation d'événements, évaluation." },
    { name: "Communication interpersonnelle", level: 3, text: "Écoute, feedback constructif, médiation." }
  ],
  "Leadership": [
    { name: "Gestion d'équipe", level: 3, text: "Comités exécutifs, bénévoles, équipes projet." },
    { name: "Planification stratégique", level: 3, text: "Objectifs de club et de zone, suivi des résultats." },
    { name: "Mentorat", level: 3, text: "Accompagnement individuel de membres et d'apprenants." }
  ],
  "Numérique": [
    { name: "SIG / QGIS", level: 3, text: "Cartographie et analyse spatiale." },
    { name: "Télédétection", level: 2, text: "Images satellites et indices de végétation." },
    { name: "Création vidéo & graphique", level: 3, text: "Tournage, montage, infographies." }
  ],
  "Recherche": [
    { name: "Méthodologie de recherche", level: 3, text: "Collecte, analyse et restitution de données." },
    { name: "Rédaction scientifique", level: 3, text: "Articles, rapports et documents techniques." }
  ]
};

/* Langues parlées / de travail — À CONFIRMER */
PG.data.languages = [
  { name: "Kreyòl ayisyen", level: "Langue maternelle" },
  { name: "Français", level: "À confirmer" },
  { name: "Anglais", level: "À confirmer" }
];

/* Outils numériques */
PG.data.tools = ["QGIS", "Google Earth Engine (à confirmer)", "Microsoft Office", "Google Workspace", "Canva", "Outils de montage vidéo", "Plateformes e-learning"];
