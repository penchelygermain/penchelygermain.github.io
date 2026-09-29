# Portfolio de Penchely Germain

**Agronome | Formateur | Traducteur | Communicateur & Leader | Créateur de contenu**

Site personnel professionnel, 100 % gratuit, construit en HTML, CSS et JavaScript pur (aucun abonnement, aucune base de données, aucun outil payant). Il fonctionne sur **GitHub Pages** et **Cloudflare Pages**.

> Principe clé : **le contenu est séparé du code.** Pour ajouter un projet, une formation, un article, une publication, un document, une photo ou une vidéo, vous modifiez **un seul fichier** dans le dossier `data/`. Vous n'avez pas besoin de toucher au code.

---

## Sommaire

1. [Aperçu du site](#1-aperçu-du-site)
2. [Voir le site sur votre ordinateur](#2-voir-le-site-sur-votre-ordinateur)
3. [Personnaliser le site (à faire en premier)](#3-personnaliser-le-site-à-faire-en-premier)
4. [Mettre le site en ligne gratuitement](#4-mettre-le-site-en-ligne-gratuitement)
5. [Activer le formulaire de contact (gratuit)](#5-activer-le-formulaire-de-contact-gratuit)
6. [Ajouter du contenu : recettes pas à pas](#6-ajouter-du-contenu--recettes-pas-à-pas)
7. [Images, PDF et fichiers lourds](#7-images-pdf-et-fichiers-lourds)
8. [Langues : ajouter l'anglais et le créole](#8-langues--ajouter-langlais-et-le-créole)
9. [Statistiques de visite (facultatif)](#9-statistiques-de-visite-facultatif)
10. [QR codes](#10-qr-codes)
11. [Sécurité et confidentialité](#11-sécurité-et-confidentialité)
12. [Structure des fichiers](#12-structure-des-fichiers)
13. [Dépannage](#13-dépannage)

---

## 1. Aperçu du site

| Page | Fichier | Rôle |
|---|---|---|
| Accueil | `index.html` | Hero, 5 piliers → Impact, chiffres clés, projets à la une, POLE GEO-HAGRI, vidéo, publications, articles, services, témoignages |
| À propos | `a-propos.html` | Biographie (« Lire la suite »), mission, valeurs, intérêts, compétences, langues, outils |
| Mon parcours | `parcours.html` | L'histoire en 6 étapes, expériences, diplômes et certifications |
| Pilier 1 | `agronomie.html` | Domaines d'expertise, projets et recherches, galerie |
| Pilier 2 | `formation.html` | Rôles, domaines, approche pédagogique, formations |
| Projet phare | `pole-geo-hagri.html` | Signification du nom, mission, formations |
| Pilier 3 | `traduction.html` | Translation Portfolio, langues, services, exemples anonymisés |
| Pilier 4 | `leadership.html` | Timeline Toastmasters, compétences, philosophie, galerie |
| Pilier 5 | `contenus.html` | Médiathèque de contenus avec filtres |
| Projets | `projets.html` | Tous les projets, filtres + recherche, fiches détaillées |
| Publications | `publications.html` | Articles, livres, rapports… avec Lire / Télécharger / DOI |
| Médiathèque | `mediatheque.html` | Galerie photos/vidéos avec lightbox |
| Documents | `documents.html` | Bibliothèque « Voir / Télécharger » |
| Blog | `blog.html` + `article.html` | Articles avec recherche, filtres et partage |
| Services | `services.html` | Services, processus, FAQ, « Demander un devis » |
| Contact | `contact.html` | Formulaire gratuit + coordonnées |
| CV | `cv.html` | CV en HTML (bon pour Google) + bouton PDF + impression |
| Media kit | `media-kit.html` | Bio courte, photo, logo, contact presse |
| Légal | `mentions-legales.html`, `confidentialite.html` | Obligatoires et rassurants |

Fonctions incluses : mode clair/sombre mémorisé, recherche globale (**Ctrl + K** ou **/**), menu mobile, animations légères, lightbox, vidéos YouTube, SEO complet (Open Graph, Twitter Card, Schema.org, sitemap), accessibilité (navigation clavier, contrastes, textes alternatifs).

---

## 2. Voir le site sur votre ordinateur

**Méthode la plus simple :** double-cliquez sur `index.html`. Le site s'ouvre dans votre navigateur.

**Méthode recommandée (plus fidèle à la version en ligne) :**
1. Installez [Visual Studio Code](https://code.visualstudio.com/) (gratuit).
2. Installez l'extension **Live Server**.
3. Ouvrez le dossier du site, clic droit sur `index.html` → **Open with Live Server**.
   Chaque modification enregistrée s'affiche instantanément.

---

## 3. Personnaliser le site (à faire en premier)

Ouvrez **`data/site.js`**. Tout est commenté en français. Remplissez :

| Champ | Exemple |
|---|---|
| `email` | votre adresse publique |
| `location` | `"Port-au-Prince, Haïti"` (jamais l'adresse exacte) |
| `photo` | `"assets/images/portrait.jpg"` |
| `featuredVideo` | identifiant YouTube de votre vidéo de 60–90 s |
| `geoHagriUrl` | adresse de la plateforme POLE GEO-HAGRI |
| `formEndpoint` | adresse Formspree (voir section 5) |
| `socials` | liens LinkedIn, Facebook, Instagram, YouTube, TikTok, X, ResearchGate, Google Scholar, GitHub |

### Le mode « configuration »

Tant que `showPlaceholders: true`, tout ce qui reste à compléter apparaît **encadré en pointillés dorés** avec la mention « Exemple » ou « À COMPLÉTER ». C'est votre liste de travail visuelle.

Quand le site est prêt : passez `showPlaceholders` à `false`. Les exemples et les réseaux sans lien disparaissent automatiquement.

### Votre photo
1. Préparez une photo portrait (format vertical 4:5, par ex. 800 × 1000 px, moins de 300 Ko, format `.jpg` ou `.webp`).
2. Déposez-la dans `assets/images/` sous le nom `portrait.jpg`.
3. Dans `data/site.js`, mettez `photo: "assets/images/portrait.jpg"`.

### Votre CV
Un **CV provisoire** a été généré depuis la page `cv.html` dans `assets/documents/CV-Penchely-Germain.pdf`. Remplacez-le par votre vrai CV en gardant **exactement le même nom**.

### Liste des fichiers de contenu

| Fichier | Contenu |
|---|---|
| `data/site.js` | Configuration générale |
| `data/pillars.js` | Les 5 piliers + libellés des catégories |
| `data/projects.js` | Projets |
| `data/courses.js` | Formations (dont POLE GEO-HAGRI) |
| `data/publications.js` | Publications |
| `data/contents.js` | Vidéos, podcasts, infographies, présentations |
| `data/posts.js` | Articles du blog |
| `data/documents.js` | Bibliothèque de documents |
| `data/media.js` | Médiathèque (photos, vidéos) |
| `data/career.js` | Expériences, diplômes, certifications |
| `data/skills.js` | Compétences, langues, outils |
| `data/services.js` | Services |
| `data/highlights.js` | Chiffres clés, témoignages, Toastmasters, traduction |

---

## 4. Mettre le site en ligne gratuitement

### Option A — GitHub Pages (recommandée pour commencer)

1. Créez un compte gratuit sur [github.com](https://github.com).
2. Créez un nouveau dépôt **public** nommé exactement **`VOTRE-NOM-UTILISATEUR.github.io`**
   (ex. si votre identifiant est `pgermain`, le dépôt s'appelle `pgermain.github.io`).
3. Dans le dépôt : **Add file → Upload files**, glissez **tout le contenu** du dossier du site (pas le dossier lui-même), puis **Commit changes**.
4. Allez dans **Settings → Pages** → *Source* : **Deploy from a branch** → *Branch* : `main` / `(root)` → **Save**.
5. Après 1 à 2 minutes, le site est en ligne à `https://VOTRE-NOM-UTILISATEUR.github.io`.

**Important pour le référencement :** remplacez partout `https://VOTRE-SITE.github.io` par votre vraie adresse.
Dans VS Code : **Édition → Remplacer dans les fichiers** (Ctrl + Maj + H), cherchez `https://VOTRE-SITE.github.io`, remplacez, **Tout remplacer**. Cela met à jour les pages, `sitemap.xml` et `robots.txt`.

> Plus simple encore pour publier des mises à jour : installez **GitHub Desktop** (gratuit). Vous modifiez vos fichiers, puis *Commit* → *Push*. Le site se met à jour tout seul en 1 à 2 minutes.

### Option B — Cloudflare Pages

1. Compte gratuit sur [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Workers & Pages → Create → Pages → Connect to Git**, choisissez votre dépôt GitHub.
3. *Framework preset* : **None**, *Build command* : vide, *Build output directory* : `/`.
4. **Save and Deploy**. Adresse : `https://votre-projet.pages.dev`.
   Le fichier `_headers` ajoute automatiquement des en-têtes de sécurité et de cache.

### Nom de domaine personnalisé (facultatif, payant)
Le site reste gratuit à l'adresse `…github.io` ou `…pages.dev`. Un domaine comme `penchelygermain.com` coûte généralement une dizaine de dollars par an. Une fois acheté : GitHub → **Settings → Pages → Custom domain**, ou Cloudflare → **Custom domains**. Pensez ensuite à refaire le « Remplacer dans les fichiers » avec la nouvelle adresse.

### Faire connaître le site à Google
Créez un compte gratuit [Google Search Console](https://search.google.com/search-console), ajoutez votre site, puis soumettez `sitemap.xml`.

---

## 5. Activer le formulaire de contact (gratuit)

**Formspree** (recommandé, offre gratuite suffisante pour un portfolio) :
1. Créez un compte sur [formspree.io](https://formspree.io).
2. **New form** → nom « Portfolio » → copiez l'adresse fournie, du type `https://formspree.io/f/abcdwxyz`.
3. Collez-la dans `data/site.js` → `formEndpoint`.

C'est tout : les messages arrivent dans votre boîte e-mail. Un champ anti-spam invisible est déjà intégré.

**Alternative :** [FormSubmit](https://formsubmit.co) — mettez `formEndpoint: "https://formsubmit.co/ajax/votre@email.com"` et confirmez l'e-mail d'activation reçu.

Les boutons « Demander un devis » ouvrent le formulaire avec le sujet déjà rempli.

---

## 6. Ajouter du contenu : recettes pas à pas

Règle générale : **copiez un bloc `{ … },` existant, collez-le, modifiez les valeurs, enregistrez, publiez.** Attention à garder les virgules entre les blocs et les guillemets autour des textes.

### Ajouter un projet (`data/projects.js`)
```js
{
  id: "jardin-scolaire-2026",            // unique, sans espace ni accent
  title: "Jardins scolaires de Léogâne",
  year: "2026",
  category: ["agriculture", "education"], // voir data/pillars.js
  featured: true,                          // affiché sur l'accueil
  image: "assets/images/projets/jardin-scolaire.webp",
  summary: "Une phrase qui donne envie de cliquer.",
  description: "L'histoire du projet en quelques phrases.",
  objectives: ["Objectif 1", "Objectif 2"],
  role: "Coordinateur technique et formateur.",
  results: ["120 élèves formés", "8 jardins créés"],
  tech: ["QGIS"],
  skills: ["Maraîchage", "Pédagogie"],
  link: "",                                // lien externe éventuel
  youtube: "AbC123xyz",                    // identifiant YouTube (facultatif)
  gallery: [ { src: "assets/images/projets/jardin-1.webp", alt: "Élèves au jardin" } ],
  documents: [ { title: "Rapport final (PDF)", url: "assets/documents/rapport-jardins.pdf" } ]
},
```
Chaque projet a une adresse directe partageable : `projets.html?p=jardin-scolaire-2026`.

### Ajouter un article de blog (`data/posts.js`)
Copiez un bloc et écrivez le texte dans `body` entre les accents graves `` ` ``, en Markdown simple (`## Titre`, `**gras**`, `- liste`, `[lien](https://…)`, `![image](assets/images/blog/photo.webp)`).
L'article sera à l'adresse `article.html?a=SLUG`.

### Ajouter une formation (`data/courses.js`)
Mettez `platform: "geo-hagri"` pour qu'elle apparaisse aussi sur la page POLE GEO-HAGRI. Renseignez `modules`, `lessons`, `youtube`, `pdf`, `link` si disponibles.

### Ajouter une publication (`data/publications.js`)
Choisissez un `type` parmi : Article, Article scientifique, Livre, Chapitre, Rapport, Document pédagogique, Blog. Indiquez `doi` (identifiant seul), `pdf` et/ou `link`. `featured: true` l'affiche sur l'accueil.

### Ajouter une photo ou une vidéo (`data/media.js`)
- Photo : déposez l'image dans `assets/images/mediatheque/`, puis ajoutez
  `{ id: "m7", type: "image", category: "leadership", src: "assets/images/mediatheque/concours-2026.webp", alt: "Description", caption: "Légende" },`
- Vidéo : `{ id: "m8", type: "video", category: "speaking", youtube: "AbC123xyz", caption: "Discours…" },` (la miniature YouTube s'affiche automatiquement).

### Ajouter un document (`data/documents.js`)
Déposez le fichier dans `assets/documents/`, puis ajoutez une entrée avec `format` (PDF, DOCX, PPTX, IMG, ZIP…). `public: false` le masque totalement.

### Ajouter une expérience ou une certification (`data/career.js`)
Ajoutez un bloc en haut de `experiences` ou `education`. `pillar: "leadership"` (ou `agronomie`, `formation`…) le fait aussi apparaître sur la page du pilier. `current: true` le met en valeur.

### Ajouter un témoignage (`data/highlights.js`)
Uniquement avec l'accord de la personne. Liste vide `[]` = section masquée.

### Masquer temporairement une entrée
Ajoutez `draft: true` dans n'importe quel bloc.

### Ajouter une nouvelle catégorie
Ajoutez-la dans `PG.data.categories` (`data/pillars.js`), par ex. `"sante": "Santé"`.

### Ajouter un nouveau fichier de données
Créez `data/monfichier.js`, puis ajoutez son nom dans la liste de `assets/js/boot.js` (seule modification de code nécessaire).

---

## 7. Images, PDF et fichiers lourds

| Type | Conseil |
|---|---|
| Photos | `.webp` ou `.jpg`, largeur max. 1600 px, idéalement < 300 Ko. Compressez gratuitement avec [Squoosh](https://squoosh.app) ou [TinyPNG](https://tinypng.com). |
| Logos, icônes | `.svg` |
| Captures, certificats | `.webp` / `.png` |
| PDF | < 10 Mo dans `assets/documents/` |
| Vidéos | **Toujours sur YouTube** (ou Vimeo), jamais dans le dépôt |
| Fichiers > 10 Mo | Google Drive (lien « Toute personne disposant du lien »), [Zenodo](https://zenodo.org) (gratuit, DOI inclus, idéal pour les publications), Dropbox, ou les *Releases* GitHub |

Formats acceptés : PDF, JPG, JPEG, PNG, WEBP, SVG, GIF, DOCX, PPTX, ZIP. GitHub refuse les fichiers de plus de 100 Mo et recommande un dépôt total inférieur à 1 Go.

Pour un lien externe, mettez simplement l'adresse complète (`https://…`) dans le champ `url`, `pdf` ou `link`.

---

## 8. Langues : ajouter l'anglais et le créole

Le site est prêt pour le multilingue :
- **Textes de l'interface** (menus, boutons, messages) : dans `i18n/fr.js`. Copiez-le en `i18n/en.js` et `i18n/ht.js`, remplacez `PG.i18n.fr` par `PG.i18n.en` / `PG.i18n.ht` et traduisez les valeurs. Ajoutez ces fichiers dans `assets/js/boot.js`, puis passez `enabled: true` pour la langue dans `data/site.js`. Le sélecteur FR / EN / KR s'active.
- **Pages** : la méthode la plus robuste pour Google consiste à créer des dossiers `/en/` et `/ht/` contenant les pages traduites, avec une balise `<link rel="alternate" hreflang="en" …>` dans chaque page. Les contenus des fichiers `data/` peuvent recevoir des champs traduits (`title_en`, `summary_en`…) le moment venu.

---

## 9. Statistiques de visite (facultatif)

Aucune solution n'est activée par défaut. Options gratuites et respectueuses de la vie privée :

| Solution | Coût | Mise en place |
|---|---|---|
| **GoatCounter** | Gratuit (usage non commercial) | Créez un compte sur goatcounter.com, puis `analytics: { provider: "goatcounter", code: "votrecode" }` |
| **Cloudflare Web Analytics** | Gratuit | Créez un site dans Cloudflare → Web Analytics, puis `analytics: { provider: "cloudflare", token: "VOTRE_TOKEN" }` |
| Umami / Plausible | Payant ou auto-hébergé | Non recommandé ici |

Sans cookie : pas besoin de bannière de consentement.

---

## 10. QR codes

Générez gratuitement des QR codes (site, LinkedIn, CV) avec [qr-code-generator.com](https://www.qr-code-generator.com) (version statique gratuite) ou [goqr.me](https://goqr.me). Téléchargez-les en SVG ou PNG dans `assets/images/qr/` pour vos cartes professionnelles, présentations et affiches.

---

## 11. Sécurité et confidentialité

- **Ne publiez jamais** : mots de passe, clés API, jetons, pièces d'identité, relevés de notes ou certificats de tiers, documents de clients.
- Le fichier `.gitignore` empêche l'envoi des dossiers `prive/`, `private/`, `_brouillons/` et des fichiers `.env`. Gardez vos originaux dans `prive/`.
- Traductions : publiez uniquement des extraits **anonymisés** ou mettez `confidential: true`.
- L'adresse Formspree n'est pas un secret : elle peut être publique.
- Le dépôt GitHub étant public, tout ce qui y est déposé est visible.

---

## 12. Structure des fichiers

```
/
├── index.html, a-propos.html, parcours.html      Pages principales
├── agronomie.html, formation.html, traduction.html,
│   leadership.html, contenus.html                Les 5 piliers
├── pole-geo-hagri.html                           Projet phare
├── projets.html, publications.html, mediatheque.html,
│   documents.html, blog.html, article.html       Collections
├── services.html, contact.html, cv.html, media-kit.html
├── mentions-legales.html, confidentialite.html, 404.html
│
├── data/            ← VOS CONTENUS (à modifier)
├── i18n/            ← Textes de l'interface par langue
├── assets/
│   ├── css/style.css       Identité visuelle (couleurs en haut du fichier)
│   ├── js/boot.js          Chargement des données
│   ├── js/app.js           Moteur du site (à ne pas modifier)
│   ├── images/             Photos (projets/, mediatheque/, blog/, formations/…)
│   ├── icons/              Favicon et icônes
│   ├── brand/              Logo et monogramme PG
│   └── documents/          PDF, présentations, CV
├── docs/ARCHITECTURE.md    Analyse, architecture, identité visuelle, feuille de route
├── sitemap.xml, robots.txt, site.webmanifest
├── _headers                En-têtes Cloudflare Pages
├── .nojekyll               Indique à GitHub Pages de servir les fichiers tels quels
└── .gitignore
```

Quand vous ajoutez une **nouvelle page HTML**, ajoutez-la aussi dans `sitemap.xml`.

---

## 13. Dépannage

| Problème | Solution |
|---|---|
| Une section entière a disparu après une modification | Erreur de syntaxe dans un fichier `data/` : virgule manquante entre deux blocs, guillemet non fermé. Ouvrez la console du navigateur (F12) : le fichier et la ligne sont indiqués. |
| Une apostrophe casse le texte | Utilisez des guillemets doubles `"…"` autour des textes contenant `'`, ou l'apostrophe typographique `’`. |
| L'image ne s'affiche pas | Vérifiez le chemin et la casse (`Photo.JPG` ≠ `photo.jpg` en ligne). |
| Le site en ligne n'a pas changé | Attendez 2 minutes, puis rechargez avec Ctrl + F5. Si besoin, changez `data-v="1"` en `data-v="2"` dans les pages pour forcer le rafraîchissement. |
| Le formulaire affiche « pas encore activé » | Renseignez `formEndpoint` (section 5). |
| Changer les couleurs | Modifiez les variables en haut de `assets/css/style.css` (`--primary`, `--accent`…). |
