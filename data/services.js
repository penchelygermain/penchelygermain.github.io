/* ==========================================================================
   SERVICES PROFESSIONNELS
   Le bouton « Demander un devis » ouvre le formulaire de contact avec
   le sujet déjà rempli.
   ========================================================================== */
PG.data.services = [
  {
    id: "conseil-agricole", icon: "leaf", tint: "var(--p1)",
    title: "Conseil et expertise agricole",
    description: "Diagnostic, accompagnement technique et recommandations pour des systèmes agricoles durables.",
    audience: "ONG, coopératives, projets de développement, exploitants",
    deliverables: ["Diagnostic de terrain", "Rapport de recommandations", "Cartographie SIG si pertinent"]
  },
  {
    id: "formation", icon: "cap", tint: "var(--p2)",
    title: "Formation & animation",
    description: "Conception et animation de formations en agriculture durable, communication, leadership ou numérique.",
    audience: "Organisations, universités, écoles, associations",
    deliverables: ["Programme de formation", "Animation (présentiel / en ligne)", "Supports et évaluation"]
  },
  {
    id: "conception-pedagogique", icon: "book", tint: "var(--p2)",
    title: "Conception pédagogique",
    description: "Transformation de votre expertise en parcours d'apprentissage clairs et engageants.",
    audience: "Organismes de formation, plateformes e-learning, experts",
    deliverables: ["Architecture de cours", "Scénarios pédagogiques", "Quiz et activités"]
  },
  {
    id: "traduction", icon: "languages", tint: "var(--p3)",
    title: "Traduction, révision & relecture",
    description: "Traduction fidèle et confidentielle de documents académiques, administratifs, professionnels et web.",
    audience: "Particuliers, étudiants, entreprises, institutions",
    deliverables: ["Document traduit mis en forme", "Révision terminologique", "Confidentialité garantie"]
  },
  {
    id: "prise-de-parole", icon: "mic", tint: "var(--p4)",
    title: "Prise de parole & communication",
    description: "Interventions, animation d'événements et coaching en communication et en leadership.",
    audience: "Événements, conférences, équipes, jeunes leaders",
    deliverables: ["Intervention / keynote", "Atelier de prise de parole", "Coaching individuel"]
  },
  {
    id: "creation-contenu", icon: "play", tint: "var(--p5)",
    title: "Création de contenu",
    description: "Articles, vidéos éducatives, infographies et contenus de vulgarisation agricole et environnementale.",
    audience: "Organisations, projets, médias, plateformes éducatives",
    deliverables: ["Scripts et vidéos", "Articles et fiches", "Infographies"]
  }
];
