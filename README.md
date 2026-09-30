# Portfolio de Penchely Germain

**Agronome | Formateur | Traducteur | Communicateur & Leader | Créateur de contenu**

Site : **https://penchelygermain.github.io** — Administration : **https://penchelygermain.github.io/admin**

Site personnel 100 % gratuit (HTML, CSS, JavaScript), hébergé sur GitHub Pages, avec un **espace d'administration** (Sveltia CMS, gratuit et open source) pour tout modifier sans toucher au code.

---

## 1. L'espace d'administration

### Première connexion (une seule fois)

1. Sur GitHub, créez une **clé d'accès personnelle** :
   photo de profil → **Settings** → **Developer settings** (tout en bas à gauche) → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
   - *Token name* : `Admin portfolio`
   - *Expiration* : la durée maximale proposée (vous en recréerez une à l'échéance)
   - *Repository access* : **Only select repositories** → `penchelygermain.github.io`
   - *Permissions* → *Repository permissions* → **Contents : Read and write**
   - Cliquez **Generate token** et **copiez** la clé (elle ne s'affiche qu'une fois).
2. Ouvrez **https://penchelygermain.github.io/admin**, cliquez **Sign In with Token**, collez la clé.
   Votre navigateur la mémorise : les fois suivantes, vous êtes connecté directement.

> Cette clé donne le droit de modifier votre site : ne la partagez jamais. En cas de doute, supprimez-la sur GitHub et créez-en une autre.

### Utilisation

| Rubrique | Ce que vous y modifiez |
|---|---|
| ⚙️ **Réglages** | Nom, métiers, e-mail, localisation, photo, CV (PDF), vidéo de présentation, POLE GEO-HAGRI, formulaire de contact, réseaux sociaux, mode « site prêt » |
| 📚 **Contenus** | Projets · Blog · Formations · Publications · Création de contenu · Médiathèque · Documents · Parcours & diplômes · Compétences & langues · Services · Chiffres clés, témoignages, Toastmasters, traduction |
| ✏️ **Textes des pages** | Pour chaque page : titre, introduction, biographie, textes fixes, et le titre / la description vus par Google |
| 🧩 **Structure** | Les 5 piliers et les catégories des filtres (à modifier avec précaution) |

1. Choisissez une rubrique, puis un élément (par ex. *Contenus → Projets*).
2. Modifiez les champs. Dans une liste, **Add** ajoute un élément ; la flèche ou le glisser-déposer change l'ordre ; la corbeille supprime.
3. Ajoutez photos et PDF directement depuis les champs *Image* / *Fichier* (ils sont rangés dans `assets/uploads`).
4. Cliquez **Save** (Enregistrer). Le site en ligne est mis à jour en **1 à 2 minutes** (rechargez avec Cmd + Maj + R).

### Astuces

- **Vidéos YouTube** : indiquez seulement l'identifiant (`AbC123xyz` pour `youtube.com/watch?v=AbC123xyz`). Dans un article de blog, collez le lien complet seul sur une ligne : la vidéo s'intègre.
- **Exemple à remplacer** : les entrées cochées ainsi sont encadrées en pointillés. Remplacez-les par vos vraies informations ou supprimez-les.
- **Site prêt** : dans *Réglages*, décochez **Afficher les éléments « À COMPLÉTER »**. Les exemples et notes disparaissent du site.
- **Brouillon** : cochez *Brouillon* pour masquer un élément sans le supprimer.
- **Mise en forme des textes** : `**gras**`, `*italique*`, `[texte du lien](https://…)`. Dans les grands champs (biographie, articles), l'éditeur propose des boutons.
- **Images** : préférez des photos de moins de 300 Ko (compressez-les gratuitement sur [squoosh.app](https://squoosh.app)). Les vidéos vont toujours sur YouTube.
- **Fichiers de plus de 10 Mo** : déposez-les sur Google Drive ou [Zenodo](https://zenodo.org) et collez le lien dans le champ *Fichier*.
- **Retour en arrière** : chaque enregistrement est conservé dans l'historique GitHub (onglet *Commits* du dépôt). Rien n'est jamais perdu.

---

## 2. Formulaire de contact (gratuit)

1. Créez un compte sur [formspree.io](https://formspree.io) → **New form** → copiez l'adresse (`https://formspree.io/f/…`).
2. Dans l'admin : **Réglages → Adresse du formulaire de contact** → collez → **Save**.

---

## 3. Statistiques de visite (facultatif)

[GoatCounter](https://www.goatcounter.com) (gratuit, sans cookie) : créez un compte avec un code (ex. `penchely`), puis dans **Réglages → Statistiques** : *Service* = `goatcounter`, *Code* = `penchely`.

---

## 4. Référencement Google

Créez un compte [Google Search Console](https://search.google.com/search-console), ajoutez `https://penchelygermain.github.io`, puis soumettez `sitemap.xml`.
Ajoutez le lien du site sur LinkedIn, dans votre signature e-mail et sur polegeohagri.com.

---

## 5. Pour aller plus loin

- **Domaine personnalisé** (ex. penchelygermain.com, ~10 $/an) : GitHub → dépôt → **Settings → Pages → Custom domain**.
- **Anglais / créole** : le site est prêt pour le multilingue (fichier `i18n/fr.js` pour les textes de l'interface). Demandez de l'aide pour activer une nouvelle langue.
- **Modifier le design** (couleurs, polices) : variables en haut de `assets/css/style.css`.

---

## 6. Structure des fichiers

```
/
├── index.html, a-propos.html, …        Pages (structure et mise en page)
├── admin/                              Espace d'administration
│   ├── index.html                      Sveltia CMS
│   └── config.yml                      Formulaires de l'administration
├── data/                               CONTENUS (modifiés par l'admin)
│   ├── site.json                       Réglages
│   ├── projects.json, posts.json, …    Contenus
│   └── pages/*.json                    Textes des pages
├── assets/
│   ├── css/style.css                   Identité visuelle
│   ├── js/boot.js, js/app.js           Moteur du site (ne pas modifier)
│   ├── images/, icons/, brand/         Images, logo, icônes
│   ├── documents/                      CV et documents
│   └── uploads/                        Fichiers envoyés depuis l'admin
├── i18n/fr.js                          Textes de l'interface (boutons, menus)
├── docs/ARCHITECTURE.md                Analyse, architecture, identité visuelle
└── sitemap.xml, robots.txt, 404.html, site.webmanifest
```

**Aperçu sur votre ordinateur** : les contenus étant chargés depuis `data/`, le site ne s'ouvre plus par simple double-clic. Utilisez le site en ligne, ou VS Code + extension *Live Server*.

---

## 7. Dépannage

| Problème | Solution |
|---|---|
| Une modification n'apparaît pas | Attendez 2 minutes, puis rechargez avec Cmd + Maj + R. Vérifiez l'onglet *Actions* du dépôt GitHub (coche verte = publié). |
| « Un contenu n'a pas pu être chargé » | Un fichier de `data/` a été abîmé par une modification manuelle. Dans GitHub, onglet *Commits*, ouvrez la dernière modification et annulez-la, ou demandez de l'aide. |
| L'admin refuse la connexion | La clé a expiré ou n'a pas la permission *Contents : Read and write* sur ce dépôt : créez-en une nouvelle. |
| Une image ne s'affiche pas | Vérifiez qu'elle a bien été envoyée (Médias dans l'admin) et que son nom n'a pas d'espace. |
