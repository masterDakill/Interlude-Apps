# 🚀 Guide de Déploiement - Spectacle Interlude

## 📋 Prérequis

L'application est déjà buildée et prête à être déployée!

```bash
npm run build  # Déjà fait - dossier dist/ créé
```

## 🌐 Options de Déploiement

### Option 1: Cloudflare Pages (Recommandé)

**Avantages**: Gratuit, CDN mondial, HTTPS automatique, déploiement Git

#### Via Dashboard Cloudflare:

1. **Connectez-vous** à [Cloudflare Pages](https://pages.cloudflare.com)
2. **Créez un nouveau projet**
3. **Connectez votre repo GitHub**: `masterDakill/Interlude-Apps`
4. **Configurez le build**:
   ```
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave blank)
   ```
5. **Variables d'environnement**: Aucune requise
6. **Déployez!** 🚀

#### Via CLI Wrangler:

```bash
# Installer Wrangler
npm install -g wrangler

# Login Cloudflare
wrangler login

# Déployer
wrangler pages deploy dist --project-name=spectacle-interlude
```

**URL finale**: `https://spectacle-interlude.pages.dev`

---

### Option 2: GitHub Pages

**Avantages**: Gratuit, simple, intégration GitHub

```bash
# 1. Installer gh-pages
npm install --save-dev gh-pages

# 2. Ajouter dans package.json scripts:
"deploy": "gh-pages -d dist"

# 3. Déployer
npm run deploy
```

**URL finale**: `https://masterDakill.github.io/Interlude-Apps`

#### Configuration GitHub Pages:

1. Allez dans **Settings** > **Pages**
2. Source: **Deploy from branch**
3. Branch: **gh-pages** / **root**
4. Save

---

### Option 3: Vercel

**Avantages**: Zero-config, très rapide

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod

# Suivre les prompts
```

**URL finale**: `https://spectacle-interlude.vercel.app`

---

### Option 4: Netlify

**Avantages**: Drag & drop, preview deployments

#### Via Dashboard:

1. Allez sur [Netlify](https://netlify.com)
2. **Drag & drop** le dossier `dist/`
3. Ou connectez le repo GitHub

#### Via CLI:

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Déployer
netlify deploy --prod --dir=dist
```

**URL finale**: `https://spectacle-interlude.netlify.app`

---

## 🎯 Déploiement Simple - Serveur HTTP

Pour tester localement ou sur un serveur:

```bash
# Serveur Python
cd dist && python3 -m http.server 8080

# Serveur Node
npx serve dist -p 8080

# Serveur PHP
cd dist && php -S localhost:8080
```

**URL locale**: `http://localhost:8080`

---

## 📁 Structure du Build

```
dist/
├── index.html           # Page principale
├── assets/
│   ├── index-XXX.js    # JavaScript bundle (293KB)
│   └── index-XXX.css   # Styles (10KB)
├── logo.png            # Logo Spectacle Interlude
├── venue-1.jpg         # Photos de la salle (5 images)
├── venue-2.jpg
├── venue-3.jpg
├── venue-4.jpg
├── venue-5.jpg
└── seat-map.jpg        # Plan de salle
```

**Taille totale**: ~390KB (optimisé pour le web)

---

## ✅ Checklist Déploiement

- [x] Build production créé (`npm run build`)
- [x] Toutes les images incluses
- [x] Assets optimisés (gzip)
- [ ] Choisir plateforme de déploiement
- [ ] Configurer domaine personnalisé (optionnel)
- [ ] Tester l'application déployée

---

## 🔧 Configuration Domaine Personnalisé

### Cloudflare Pages:

1. **Custom domains** > **Set up a custom domain**
2. Entrez: `spectacleinterlude.ca`
3. Suivez les instructions DNS

### GitHub Pages:

1. **Settings** > **Pages** > **Custom domain**
2. Entrez: `spectacleinterlude.ca`
3. Ajoutez un fichier `CNAME` dans `/public/CNAME`:
   ```
   spectacleinterlude.ca
   ```

---

## 📊 Performance

Build optimisé avec:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Compression gzip
- ✅ Lazy loading des composants
- ✅ Images optimisées

**Lighthouse Score attendu**: 95+/100

---

## 🐛 Troubleshooting

### Build échoue:
```bash
# Nettoyer et rebuilder
rm -rf dist node_modules
npm install
npm run build
```

### Images ne chargent pas:
- Vérifiez que le dossier `public/` contient toutes les images
- Les images sont automatiquement copiées dans `dist/`

### Routes ne fonctionnent pas (404):
- Ajoutez un fichier `_redirects` (Netlify) ou `vercel.json` (Vercel)
- Pour GitHub Pages: l'app est SPA, tout fonctionne via index.html

---

## 🎉 Application Déployée!

Une fois déployée, ton application sera accessible 24/7 avec:
- ✅ HTTPS sécurisé
- ✅ CDN mondial (chargement rapide)
- ✅ Déploiement continu (auto-update depuis GitHub)
- ✅ Backups automatiques

---

## 📞 Support

Questions? Contacte l'équipe technique ou consulte:
- [Documentation Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Documentation GitHub Pages](https://pages.github.com/)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Netlify](https://docs.netlify.com/)

---

**Fait avec ❤️ pour Spectacle Interlude 🎭**
