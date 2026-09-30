/* ==========================================================================
   PARCOURS — expériences, diplômes et certifications
   Les entrées sont affichées dans l'ordre de la liste (la plus récente en haut).
   current : true pour mettre en évidence le poste actuel
   ========================================================================== */
PG.data.experiences = [
  {
    org: "Toastmasters International", role: "Area Director", place: "À COMPLÉTER (district / zone)",
    period: "2025 – 2026", current: true, pillar: "leadership",
    description: "Accompagnement de plusieurs clubs de la zone vers l'excellence en communication et en leadership.",
    responsibilities: ["Visites et accompagnement des clubs", "Soutien aux comités de direction", "Organisation de concours de zone"],
    skills: ["Leadership stratégique", "Mentorat", "Planification"],
    achievements: ["À COMPLÉTER"]
  },
  {
    org: "Toastmasters International", role: "Président de club", place: "À COMPLÉTER (nom du club)",
    period: "2024 – 2025", pillar: "leadership",
    description: "Direction du club, animation du comité exécutif et suivi de la progression des membres.",
    responsibilities: ["Présidence du comité exécutif", "Pilotage des objectifs du club", "Représentation du club"],
    skills: ["Gestion d'équipe", "Prise de décision", "Communication"],
    achievements: ["À COMPLÉTER"]
  },
  {
    org: "Toastmasters International", role: "Vice-Président Éducation (VP Education)", place: "À COMPLÉTER (nom du club)",
    period: "2023 – 2024", pillar: "leadership",
    description: "Responsable du programme éducatif du club et de la progression des membres dans les parcours Pathways.",
    responsibilities: ["Planification des réunions", "Suivi des parcours Pathways", "Attribution des rôles et mentorat"],
    skills: ["Planification pédagogique", "Mentorat", "Organisation"],
    achievements: ["À COMPLÉTER"]
  },
  {
    org: "À COMPLÉTER — Organisation", role: "À COMPLÉTER — Poste en agronomie", place: "Haïti",
    period: "Année – Année", pillar: "agronomie", placeholder: true,
    description: "Décrivez votre mission en deux phrases.",
    responsibilities: ["Responsabilité 1", "Responsabilité 2"],
    skills: ["Compétence 1"], achievements: ["Réalisation 1"]
  },
  {
    org: "À COMPLÉTER — Organisation", role: "À COMPLÉTER — Formateur / Enseignant", place: "Haïti",
    period: "Année – Année", pillar: "formation", placeholder: true,
    description: "Décrivez votre expérience d'enseignement ou de formation.",
    responsibilities: ["Responsabilité 1"], skills: ["Compétence 1"], achievements: ["Réalisation 1"]
  }
];

/* type : "Diplôme", "Certification", "Formation courte", "Toastmasters" */
PG.data.education = [
  {
    type: "Diplôme", title: "À COMPLÉTER — Diplôme d'ingénieur agronome", institution: "À COMPLÉTER — Université",
    year: "Année", description: "Spécialisation, mémoire, mention…", pdf: "", url: "", placeholder: true
  },
  {
    type: "Toastmasters", title: "À COMPLÉTER — Niveau / parcours Pathways", institution: "Toastmasters International",
    year: "Année", description: "Parcours Pathways suivi et niveaux validés.", pdf: "", url: "https://www.toastmasters.org", placeholder: true
  },
  {
    type: "Certification", title: "À COMPLÉTER — Certification (ex. SIG / QGIS)", institution: "À COMPLÉTER — Organisme",
    year: "Année", description: "", pdf: "", url: "", placeholder: true
  }
];
