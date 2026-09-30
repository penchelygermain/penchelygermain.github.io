# Architecture et stratégie du portfolio — Penchely Germain

Ce document répond aux étapes 1 à 9 du cahier des charges. Le site décrit ici est **déjà construit** (étape 10) ; ce document sert de référence pour le faire évoluer.

---

## Étape 1 — Analyse du besoin

**Objectif :** un site personnel qui fonctionne comme une marque, pas comme cinq CV juxtaposés.

**Publics cibles**
| Public | Ce qu'il cherche | Où il le trouve |
|---|---|---|
| Recruteurs, universités | Parcours, diplômes, compétences, CV | Parcours, À propos, CV |
| Organisations, ONG, projets | Expertise agricole, formation, preuves | Agronomie, Formation, Projets, Services |
| Clients en traduction | Services, langues, confidentialité | Traduction, Services, Contact |
| Organisateurs d'événements | Prise de parole, leadership | Leadership, Media kit |
| Apprenants, communauté | Contenus, formations gratuites | POLE GEO-HAGRI, Contenus, Blog |

**Contraintes :** gratuit, open source, sans abonnement, maintenable par un non-développeur, évolutif sur plusieurs années.

**Récit du site :** Agronomie → Formation → Traduction → Communication & Leadership → Création de contenu → **Impact**. Chaque page pilier se termine par un lien vers le pilier suivant, ce qui matérialise ce fil.

**Les trois questions implicites :**
- *Qui suis-je ?* → Hero + À propos
- *Que puis-je faire ?* → 5 piliers + Services
- *Quel impact ?* → Bandeau Impact, chiffres clés, projets

**Positionnement retenu :** *Penchely Germain — Agronomy, Education, Communication & Digital Impact*
**Phrase d'accroche :** « Semer le savoir, cultiver les compétences, récolter l'impact. » (écho au slogan de POLE GEO-HAGRI)

---

## Étape 2 — Architecture du site

Site statique multipage + contenus en fichiers de données :

```
                 ┌──────────── data/*.js (contenus) ────────────┐
                 │                                                │
HTML (structure) ─┤  assets/js/app.js lit les données et affiche : │
                 │  cartes, filtres, timelines, recherche, SEO    │
                 └────────────────────────────────────────────────┘
```

**Pourquoi des fichiers `.js` plutôt que `.json` ?** Ils fonctionnent aussi quand on ouvre le site par double-clic (sans serveur), acceptent les commentaires explicatifs en français et restent aussi simples à éditer. C'est la meilleure solution pour une maintenance sans développeur.

**Pourquoi pas de générateur (Jekyll, Hugo, Astro) ?** Ils imposent une étape de compilation et des outils à installer. Ici : on modifie, on publie, c'est en ligne.

---

## Étape 3 — Arborescence

Menu principal volontairement court : **À propos ▾ · Expertises ▾ · Projets · Publications · Ressources ▾ · Services · [Me contacter]**

```
Accueil
├── À propos ▾
│   ├── À propos (bio, mission, valeurs, compétences, langues)
│   ├── Mon parcours (histoire, expériences, diplômes, certifications)
│   ├── CV en ligne (+ PDF)
│   └── Media kit
├── Expertises ▾
│   ├── 01 Ingénieur agronome
│   ├── 02 Formateur
│   ├── 03 Traducteur
│   ├── 04 Communication & Leadership
│   ├── 05 Créateur de contenu
│   └── POLE GEO-HAGRI
├── Projets (filtres par domaine, fiche détaillée)
├── Publications
├── Ressources ▾
│   ├── Création de contenu
│   ├── Blog → Article
│   ├── Médiathèque
│   └── Documents
├── Services (+ FAQ, processus)
└── Contact
Pied de page : Mentions légales · Confidentialité · Plan du site
```

Les 20 sections demandées sont toutes présentes ; les sections secondaires (Compétences, Certifications, Expériences, Témoignages) sont intégrées dans les pages où elles ont du sens plutôt que dans le menu.

---

## Étape 4 — Identité visuelle

**Concept :** « Terre & savoir » — sobre, naturel, académique, sans couleurs criardes.

| Rôle | Clair | Sombre | Usage |
|---|---|---|---|
| Primaire — vert forêt | `#1E4D3A` | `#8BC7A3` | Boutons, liens, titres d'accent, logo |
| Accent — ocre doré | `#B5863A` | `#D8AE62` | Détails, soulignements, décor |
| Ocre lisible (texte) | `#7E5518` | `#E3C081` | Sur-titres, petits textes accentués |
| Fond — crème | `#F7F5EF` | `#0E1411` | Arrière-plan |
| Surface | `#FFFFFF` | `#151D19` | Cartes |
| Encre | `#16201B` | `#E8ECE7` | Texte principal |

**Teintes des piliers** (discrètes, pour la navigation visuelle) : Agronomie `#2E6B4F` · Formation `#2B5F7A` · Traduction `#4B4E8A` · Leadership `#9A4E2F` · Contenu `#85661C`.

**Typographie (gratuite, Google Fonts)**
- Titres : **Fraunces** — serif moderne, chaleureuse, crédible (monde académique et agricole)
- Texte : **Inter** — très lisible à l'écran
- Pour Word / PowerPoint si Fraunces n'est pas installée : *Georgia* + *Calibri* ou *Arial*

**Logo :** monogramme **PG** — P blanc et G ocre dans un carré arrondi vert forêt (`assets/brand/`). Variantes : fond vert (`monogramme-pg.svg`), fond clair (`monogramme-pg-clair.svg`), logo horizontal (`logo-horizontal.svg`).

**Composants :** boutons arrondis (pilule), cartes à coins 22 px avec bordure fine, badges en capitales espacées, icônes au trait (style *Lucide*, libre de droits), portrait en forme d'arche.

**Déclinaisons :** bannière LinkedIn et YouTube (fond crème, monogramme, nom en Fraunces, ligne des 5 rôles), carte de visite (recto vert + monogramme, verso crème + coordonnées + QR code), gabarit PowerPoint (titres Fraunces vert, filet ocre), en-tête de CV et de documents.

---

## Étape 5 — Technologies gratuites

| Besoin | Choix | Coût |
|---|---|---|
| Code | HTML5, CSS3, JavaScript (sans framework) | Gratuit |
| CSS | CSS maison (~25 Ko) — Bootstrap/Tailwind non nécessaires | Gratuit |
| Polices | Google Fonts (Fraunces, Inter) | Gratuit |
| Icônes | SVG intégrés au code (aucune bibliothèque) | Gratuit |
| Code source | GitHub (dépôt public) + GitHub Desktop | Gratuit |
| Hébergement | GitHub Pages **ou** Cloudflare Pages | Gratuit |
| Formulaire | Formspree (ou FormSubmit) | Gratuit |
| Vidéos | YouTube (intégration youtube-nocookie) | Gratuit |
| Gros fichiers | Google Drive, Zenodo, GitHub Releases | Gratuit |
| Statistiques | GoatCounter ou Cloudflare Web Analytics | Gratuit |
| Référencement | Google Search Console | Gratuit |
| Domaine personnalisé | Facultatif | ~10 $/an |

---

## Étape 6 — Structure des fichiers

Voir le README, section 12. Principe : **pages** à la racine (URLs propres et courtes), **contenus** dans `data/`, **médias** dans `assets/`, **textes d'interface** dans `i18n/`.

---

## Étape 7 — Fonctionnalités

**Construites :** navigation fixe intelligente, menu mobile, mode sombre mémorisé, recherche globale (Ctrl + K), filtres + recherche par collection, fiches projet détaillées avec URL partageable, lightbox, vidéos YouTube, « Lire la suite », timelines, compétences par niveaux qualitatifs, témoignages masquables, formulaire gratuit avec anti-spam et sujet pré-rempli, CV HTML imprimable + PDF, partage d'articles, SEO (title, description, Open Graph, Twitter Card, canonical, sitemap, robots, Schema.org Person / WebSite / EducationalOrganization / Course / ProfessionalService / BlogPosting / ScholarlyArticle), accessibilité (lien d'évitement, focus visible, ARIA, contrastes AA, `prefers-reduced-motion`), lazy loading, mode « configuration » qui signale ce qui reste à compléter.

---

## Éléments supplémentaires — classement

### ESSENTIEL (intégrés)
- Featured Projects · Key Achievements · Professional Timeline (My Journey)
- Featured Publications · Download CV très visible · One-page Resume (CV HTML)
- Work With Me (bandeau + page Services) · POLE GEO-HAGRI en projet phare
- Personal mission · Professional philosophy · Areas of expertise
- Languages · Digital tools · Social proof (témoignages)

### RECOMMANDÉ (intégrés, à alimenter)
- Featured Video 60–90 s — *le levier le plus fort pour votre profil de communicateur*
- Speaking Portfolio (galerie leadership + bouton « Inviter à intervenir »)
- Media Kit (page ; PDF à ajouter via `mediaKitPdf`)
- Research interests · Professional affiliations · FAQ
- QR codes vers le portfolio et LinkedIn (voir README)

### OPTIONNEL (à ajouter plus tard si utile)
- **Awards & Recognition** — dès que vous avez des distinctions (ajoutez-les dans `data/career.js`, type « Distinction »)
- **Newsletter** — gratuite via [Buttondown](https://buttondown.com) (jusqu'à 100 abonnés) ou [Substack](https://substack.com) : il suffit d'ajouter un formulaire/lien
- **Booking / demande de consultation** — gratuit via [Cal.com](https://cal.com) ou Calendly (offre gratuite) : un lien sur la page Contact
- **Calendrier de disponibilité** — Google Calendar public intégré, seulement si vous le tenez à jour
- **Downloadable Press Kit** (ZIP photos + logo + bio) — utile quand les invitations à intervenir se multiplient

---

## Étape 8 — Informations à fournir

**Priorité 1 (avant de partager le lien)**
- [ ] Photo professionnelle (portrait vertical, fond neutre)
- [ ] CV à jour en PDF
- [ ] Diplôme d'agronome : intitulé, université, année, spécialisation
- [ ] Liens des réseaux sociaux (LinkedIn en priorité)
- [ ] Adresse Formspree
- [ ] Adresse de la plateforme POLE GEO-HAGRI
- [ ] Langues de travail en traduction (paires de langues)
- [ ] Nom du club et du district Toastmasters

**Priorité 2 (crédibilité)**
- [ ] 3 à 6 projets réels avec images et résultats chiffrés
- [ ] Chiffres clés : personnes formées, documents traduits, événements organisés…
- [ ] Expériences professionnelles hors Toastmasters (organisation, poste, période, missions)
- [ ] Certifications (QGIS, formations en ligne, Pathways…)
- [ ] Publications, rapports, documents pédagogiques
- [ ] Détails des formations : nombre de modules et de leçons, liens
- [ ] 2 ou 3 témoignages autorisés

**Priorité 3 (rayonnement)**
- [ ] Vidéo de présentation (60–90 s) sur YouTube
- [ ] Photos d'événements, de terrain, de formations
- [ ] Citation personnelle sur le leadership
- [ ] Premiers articles de blog

---

## Étape 9 — Maquette textuelle de la page d'accueil (implémentée)

```
[PG] Penchely Germain        À propos▾ Expertises▾ Projets Publications Ressources▾ Services [Me contacter] 🔍 ☀

AGRONOME · FORMATEUR · TRADUCTEUR · COMMUNICATEUR & LEADER · CRÉATEUR DE CONTENU
PENCHELY GERMAIN                                              ╭──────────╮
Semer le savoir, cultiver les compétences, récolter l'impact.  │  PHOTO   │
À l'intersection de l'agriculture durable, de l'éducation…     │          │
[Découvrir mon parcours →] [Me contacter] Voir mes projets →   ╰──────────╯
⬇ Télécharger mon CV · ✉ email · 📍 Haïti            [🌱 Fondateur · POLE GEO-HAGRI]

──────── LES 5 PILIERS DE MON PARCOURS PROFESSIONNEL ────────
[01 Agronome] [02 Formateur] [03 Traducteur] [04 Leadership] [05 Contenu]
                          ╲    ╲    |    ╱    ╱
           [ ◎ IMPACT — transformer les connaissances en compétences… ]

QUELQUES REPÈRES   6+ formations · 4 rôles de leadership · … · …
PROJETS À LA UNE   [carte] [carte] [carte]                 Tous les projets →
POLE GEO-HAGRI     « Semer le savoir, pour une agriculture durable. » [Découvrir] [Visiter]
EN BREF            Qui suis-je ? / Que puis-je faire ? / Quel impact ?   [▶ vidéo]
PUBLICATIONS À LA UNE · DERNIERS ARTICLES
COMMENT JE PEUX VOUS AIDER   6 services → « Demander un devis »
TÉMOIGNAGES (masquable) · RESTONS CONNECTÉS (réseaux)
[ Travaillons ensemble — Me contacter | Voir mes services ]
Pied de page : piliers, liens, réseaux, © 2026, mentions légales, confidentialité
```

---

## Feuille de route suggérée

1. **Semaine 1 :** photo, CV, réseaux, Formspree, diplômes → mise en ligne sur GitHub Pages.
2. **Semaine 2 :** 3 projets réels, chiffres clés, expériences → `showPlaceholders: false`.
3. **Mois 1 :** vidéo de présentation, Google Search Console, lien du site sur LinkedIn et dans la signature e-mail.
4. **Trimestre 1 :** un article de blog par mois, médiathèque d'événements, version anglaise.
5. **Plus tard :** domaine personnalisé, newsletter, version créole, media kit PDF.

---

## Évolution : espace d'administration (septembre 2026)

- Les contenus sont désormais des fichiers **JSON** (`data/*.json`) et les textes des pages sont dans `data/pages/<page>.json`.
- `assets/js/boot.js` charge ces fichiers puis lance `assets/js/app.js`. Les éléments HTML portant `data-text="page.champ"` sont remplis avec les textes modifiés (le texte d'origine reste dans le HTML pour Google et en l'absence de JavaScript).
- L'administration **Sveltia CMS** (`/admin`) écrit directement dans le dépôt GitHub (connexion par clé d'accès personnelle, aucun serveur nécessaire). Chaque enregistrement crée un commit et déclenche la republication de GitHub Pages.
