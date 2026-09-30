/* ==========================================================================
   CONFIGURATION GÉNÉRALE DU SITE
   C'est LE fichier à modifier en premier. Tout ce qui est marqué
   « À COMPLÉTER » doit être remplacé par vos vraies informations.
   Laisser une valeur vide ("") masque l'élément sur le site.
   ========================================================================== */
window.PG = window.PG || { data: {} };

PG.site = {
  name: "Penchely Germain",
  roles: ["Agronome", "Formateur", "Traducteur", "Communicateur & Leader", "Créateur de contenu"],
  tagline: "Agronomy, Education, Communication & Digital Impact",

  // Coordonnées publiques — n'y mettez que ce que vous acceptez de rendre public.
  email: "penchely.germain@gmail.com",
  location: "Haïti",                       // Localisation générale (ville/pays), jamais l'adresse exacte.

  // Photo professionnelle (déposez votre photo dans assets/images/ et changez le nom ici).
  photo: "assets/images/portrait.svg",
  photoAlt: "Portrait professionnel de Penchely Germain",

  // CV en PDF : déposez le fichier dans assets/documents/ avec ce nom.
  cvPdf: "assets/documents/CV-Penchely-Germain.pdf",
  mediaKitPdf: "",                           // ex. "assets/documents/Media-Kit-Penchely-Germain.pdf"

  // Vidéo de présentation (60–90 s) : collez seulement l'identifiant YouTube.
  // Exemple : pour https://www.youtube.com/watch?v=AbC123xyz  ->  "AbC123xyz"
  featuredVideo: "",

  // Lien vers la plateforme POLE GEO-HAGRI (À COMPLÉTER).
  geoHagriUrl: "https://polegeohagri.com",

  // Formulaire de contact gratuit : créez un formulaire sur https://formspree.io
  // et collez ici l'adresse fournie (ex. "https://formspree.io/f/xyzabcd").
  formEndpoint: "https://formspree.io/f/VOTRE_ID_FORMSPREE",

  // Réseaux sociaux : collez l'URL complète. Vide = masqué (ou affiché en pointillés
  // tant que showPlaceholders vaut true).
  socials: {
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    x: "",
    researchgate: "",
    scholar: "",
    github: ""
  },

  // Afficher les emplacements « à compléter » en pointillés.
  // Mettez false lorsque le site est prêt à être présenté publiquement.
  showPlaceholders: true,

  // Masquer la section Témoignages tant que vous n'en avez pas.
  showTestimonials: true,

  // Mesure d'audience respectueuse de la vie privée (facultatif) — voir README.
  // Exemple GoatCounter : { provider: "goatcounter", code: "penchely" }
  analytics: null,

  // Langue par défaut. Les langues "en" et "ht" s'activeront quand vous les ajouterez.
  lang: "fr",
  languages: [
    { code: "fr", label: "FR", enabled: true },
    { code: "en", label: "EN", enabled: false },
    { code: "ht", label: "KR", enabled: false }
  ]
};
