/* ==========================================================================
   BIBLIOTHÈQUE DE DOCUMENTS
   format   : "PDF", "DOCX", "PPTX", "IMG", "ZIP"…
   url      : chemin local (assets/documents/…) ou lien externe (Google Drive,
              Zenodo…) pour les fichiers lourds (> 10 Mo).
   public   : false = jamais affiché (sécurité pour documents personnels).
   ⚠ Ne publiez JAMAIS de pièces d'identité, relevés, certificats nominatifs
     de tiers ou documents confidentiels de clients.
   ========================================================================== */
PG.data.documents = [
  {
    id: "cv",
    title: "Curriculum vitæ — Penchely Germain",
    description: "Version PDF à jour de mon CV.",
    category: "Profil",
    date: "2026-09",
    format: "PDF",
    url: "assets/documents/CV-Penchely-Germain.pdf",
    public: true
  },
  {
    id: "exemple-fiche",
    title: "Exemple — Fiche technique : compostage",
    description: "Exemple d'entrée : un support pédagogique téléchargeable.",
    category: "Formation",
    date: "2025-03",
    format: "PDF",
    url: "",
    public: true,
    placeholder: true
  },
  {
    id: "exemple-presentation",
    title: "Exemple — Présentation : introduction à la télédétection",
    description: "Exemple d'entrée : un support de présentation (PPTX ou lien externe).",
    category: "Agronomie",
    date: "2025-05",
    format: "PPTX",
    url: "",
    public: true,
    placeholder: true
  }
];
