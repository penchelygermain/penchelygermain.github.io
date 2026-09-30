/* ==========================================================================
   RÉALISATIONS CLÉS, TÉMOIGNAGES, LEADERSHIP, TRADUCTION
   ========================================================================== */

/* Chiffres clés affichés sur l'accueil (4 idéalement). Remplacez les « — ». */
PG.data.achievements = [
  { value: "6+",  label: "Formations créées", text: "Sur POLE GEO-HAGRI, en agriculture durable et numérique." },
  { value: "4",   label: "Rôles de leadership", text: "Parcours Toastmasters, de membre à Area Director." },
  { value: "—",   label: "Personnes formées", text: "À COMPLÉTER : nombre d'apprenants ou participants.", placeholder: true },
  { value: "—",   label: "Documents traduits", text: "À COMPLÉTER : volume ou nombre de projets de traduction.", placeholder: true }
];

/* Témoignages : laissez la liste vide [] pour masquer la section. */
PG.data.testimonials = [
  {
    quote: "Exemple — Remplacez ce texte par un vrai témoignage d'un client, partenaire, apprenant ou collègue (avec son accord).",
    name: "Nom Prénom", role: "Fonction", org: "Organisation", photo: "", placeholder: true
  }
];

/* Leadership : parcours Toastmasters et philosophie */
PG.data.leadership = {
  timeline: [
    { year: "2022", title: "Entrée dans Toastmasters", text: "Début du parcours en communication et leadership." },
    { year: "2023 – 2024", title: "VP Education", text: "Responsable du programme éducatif du club." },
    { year: "2024 – 2025", title: "Président de club", text: "Direction du club et de son comité exécutif." },
    { year: "2025 – 2026", title: "Area Director", text: "Accompagnement de plusieurs clubs de la zone.", current: true }
  ],
  // Votre citation personnelle (À PERSONNALISER).
  philosophy: "Le leadership, c'est faire grandir les autres : transmettre, écouter et créer les conditions pour que chacun ose prendre la parole.",
  philosophyIsPlaceholder: true
};

/* Traduction : langues de travail et projets (toujours anonymisés) */
PG.data.translation = {
  pairs: [
    // Exemple : { from: "Anglais", to: "Français" } — À CONFIRMER
    { from: "À confirmer", to: "À confirmer", placeholder: true }
  ],
  // confidential: true affiche « Projet confidentiel — détails disponibles sur demande »
  samples: [
    { title: "Relevés de notes et diplômes", type: "Documents académiques", pair: "À confirmer", confidential: true },
    { title: "Lettres et documents administratifs", type: "Documents administratifs", pair: "À confirmer", confidential: true },
    { title: "Flyer d'événement", type: "Communication", pair: "À confirmer", confidential: false, image: "", note: "Exemple anonymisé" },
    { title: "Contenus web", type: "Localisation", pair: "À confirmer", confidential: false, image: "", note: "Exemple anonymisé" }
  ]
};
