# 💾 Guide Simple: Sauvegarder vos Données

## 🎯 En 2 Minutes: Où Sont Mes Données?

### Réponse Rapide

```
┌────────────────────────────────────┐
│  VOS DONNÉES SONT ICI:             │
├────────────────────────────────────┤
│                                     │
│  1. 💻 Dans votre navigateur       │
│     └─ Sauvegarde AUTOMATIQUE      │
│                                     │
│  2. 📁 Dans vos Téléchargements    │
│     └─ Sauvegarde MANUELLE         │
│        (si vous exportez)          │
└────────────────────────────────────┘
```

---

## 1️⃣ Sauvegarde Automatique (Dans le Navigateur)

### Comment ça marche?

```
Vous ajoutez un musicien → [SAUVEGARDE AUTOMATIQUE] ✅
Vous créez une chanson → [SAUVEGARDE AUTOMATIQUE] ✅
Vous modifiez un spectacle → [SAUVEGARDE AUTOMATIQUE] ✅
```

**Vous n'avez RIEN à faire!** C'est automatique.

### Où exactement?

Dans la **mémoire de votre navigateur** (localStorage):

```
┌─────────────────────────┐
│   VOTRE NAVIGATEUR      │
│  (Chrome/Firefox/Edge)  │
├─────────────────────────┤
│                          │
│  📦 Données Interlude:  │
│   ├─ 👤 Musiciens       │
│   ├─ 🎵 Chansons        │
│   ├─ 🎭 Spectacles      │
│   └─ 📋 Setlists        │
│                          │
└─────────────────────────┘
```

### Avantages

- ✅ **Automatique** - Aucune action requise
- ✅ **Instantané** - Chaque modification sauvegardée immédiatement
- ✅ **Rapide** - Accès ultra-rapide aux données
- ✅ **Gratuit** - Pas de limite (jusqu'à 5-10 MB)

### ⚠️ Attention!

**Vos données sont PERDUES si:**
- ❌ Vous nettoyez le cache du navigateur
- ❌ Vous changez de navigateur (Chrome → Firefox)
- ❌ Vous changez d'ordinateur
- ❌ Vous utilisez le mode navigation privée

**Solution:** → Voir Section 2 (Export manuel)

---

## 2️⃣ Sauvegarde Manuelle (Fichier JSON)

### Comment ça marche?

```
1. Ouvrir l'app Interlude
2. Cliquer sur "Import" (menu du haut)
3. Cliquer sur "Sauvegarde" (troisième onglet 🗄️)
4. Cliquer sur "Exporter les Données"
5. ✅ Fichier téléchargé dans vos Téléchargements!
```

### À quoi ça ressemble?

```
📁 Téléchargements/
   └─ 📄 interlude-backup-2025-11-09.json
```

**Taille:** Quelques kilobytes (très léger!)

### Que contient le fichier?

```json
{
  "musicians": [ ... tous vos musiciens ... ],
  "songs": [ ... toutes vos chansons ... ],
  "shows": [ ... tous vos spectacles ... ],
  "setlists": [ ... toutes vos setlists ... ],
  "exportDate": "2025-11-09T20:00:00.000Z",
  "version": "1.0"
}
```

### Avantages

- ✅ **Portable** - Copiez-le partout (USB, cloud, email)
- ✅ **Sûr** - Gardez plusieurs copies
- ✅ **Compatible** - Fonctionne sur Windows, Mac, Linux
- ✅ **Partageable** - Envoyez à des collègues

---

## 🔄 Comment Restaurer vos Données?

### Scénario: Vous avez perdu vos données

```
1. Ouvrir l'app Interlude
2. Aller dans "Import" → "Sauvegarde"
3. Cliquer sur "Importer depuis une Sauvegarde"
4. Sélectionner votre fichier interlude-backup-XXXX.json
5. ✅ Données restaurées!
6. La page recharge automatiquement
```

**C'est tout!** Toutes vos données sont de retour.

---

## 📅 Stratégie Simple de Sauvegarde

### Niveau 1: Débutant (Minimum)

```
📅 Exporter 1 fois par mois
📁 Garder le fichier dans Téléchargements
```

**Temps requis:** 30 secondes

### Niveau 2: Intermédiaire (Recommandé)

```
📅 Exporter 1 fois par semaine
📁 Créer un dossier "Backups Interlude"
☁️ Upload sur Google Drive ou Dropbox
```

**Temps requis:** 2 minutes

### Niveau 3: Avancé (Maximum sécurité)

```
📅 Exporter après chaque grande modification
📁 Dossier organisé par date
☁️ Upload sur cloud (Google Drive, OneDrive, iCloud)
📧 Envoi par email (à vous-même)
💾 Copie sur USB/disque externe
```

**Temps requis:** 5 minutes

---

## 🚨 Quand DEVEZ-VOUS Exporter?

### Avant de:

- ❗ Nettoyer le cache de votre navigateur
- ❗ Changer de navigateur
- ❗ Réinstaller votre ordinateur
- ❗ Formater votre disque dur
- ❗ Donner/vendre votre ordinateur

### Après avoir:

- 📝 Ajouté beaucoup de nouvelles données
- 🎵 Importé les chansons Dropbox
- 👥 Créé plusieurs nouveaux musiciens
- 🎭 Préparé plusieurs spectacles

---

## 💡 Exemples Pratiques

### Exemple 1: Changement d'Ordinateur

**Situation:** Vous achetez un nouvel ordinateur

```
Sur l'ancien ordinateur:
1. Ouvrir Interlude
2. Export → Sauvegarde → Exporter les Données
3. Upload le fichier JSON sur Google Drive

Sur le nouvel ordinateur:
1. Installer Chrome/Firefox
2. Ouvrir Interlude
3. Télécharger le fichier JSON depuis Google Drive
4. Import → Sauvegarde → Importer
5. ✅ Toutes vos données sont là!
```

### Exemple 2: Travail Maison + Bureau

**Situation:** Vous travaillez à la maison ET au bureau

```
À la maison (vendredi soir):
1. Exporter les données
2. Envoyer le fichier par email (à vous-même)

Au bureau (lundi matin):
1. Télécharger le fichier depuis votre email
2. Importer dans Interlude
3. ✅ Vous continuez là où vous avez arrêté!
```

### Exemple 3: Partage avec Équipe

**Situation:** Vous voulez partager votre base de données avec votre équipe

```
Vous:
1. Exporter les données
2. Partager le fichier JSON (email, Slack, WeTransfer)

Votre collègue:
1. Télécharger le fichier
2. Ouvrir Interlude
3. Importer le fichier
4. ✅ Il a une copie identique de votre base!
```

---

## 🎓 Voir Vos Données Actuelles

### Dans l'Application

```
1. Ouvrir Interlude
2. Aller dans "Import" → "Sauvegarde"
3. Voir le compteur:
   📊 Musiciens: 15
   📊 Chansons: 42
   📊 Spectacles: 8
   📊 Setlists: 3
```

### Dans le Navigateur (Mode Développeur)

```
1. Appuyer sur F12 (ou Cmd+Option+I sur Mac)
2. Onglet "Application" (Chrome) ou "Storage" (Firefox)
3. Local Storage → Votre URL
4. Voir les clés:
   - musicians
   - songs
   - shows
   - setlists
```

---

## ❓ Questions Rapides

### Q: C'est sécurisé?
**R:** Oui! Les données sont sur VOTRE ordinateur uniquement. Rien n'est envoyé sur Internet.

### Q: Dois-je payer?
**R:** Non! Tout est gratuit. Pas de limite de sauvegarde.

### Q: Ça marche sans Internet?
**R:** Oui! L'application fonctionne 100% hors ligne.

### Q: Je peux ouvrir le fichier JSON?
**R:** Oui! C'est un fichier texte. Ouvrez-le avec Notepad, TextEdit, ou n'importe quel éditeur.

### Q: Combien de temps ça prend?
**R:** Export = 5 secondes. Import = 10 secondes.

### Q: Puis-je avoir plusieurs backups?
**R:** Oui! Exportez autant que vous voulez. Le fichier inclut la date dans le nom.

---

## 🎯 Checklist: Êtes-vous Protégé?

Cochez ce que vous avez fait:

- [ ] J'ai testé l'export de données
- [ ] J'ai le fichier JSON dans mes Téléchargements
- [ ] J'ai copié le fichier sur cloud (Google Drive, Dropbox, etc.)
- [ ] J'ai testé l'import pour vérifier que ça marche
- [ ] Je sais où trouver mes backups
- [ ] J'ai une stratégie (export hebdomadaire/mensuel)

**Si vous avez coché au moins 3 cases, vous êtes bien protégé!** ✅

---

## 🔗 Ressources Complémentaires

### Documentation Complète
- **OU_SONT_LES_DONNEES.md** - Guide technique détaillé
- **BACKUP_INTEGRATION_COMPLETE.md** - Documentation système
- **GUIDE_UTILISATEUR.md** - Guide utilisateur complet

### Aide Rapide
1. Ouvrir l'application
2. Aller dans "Import" → "Sauvegarde"
3. Suivre les instructions à l'écran

---

## 🎉 Résumé en 30 Secondes

```
┌─────────────────────────────────────────┐
│  COMMENT PROTÉGER VOS DONNÉES:          │
├─────────────────────────────────────────┤
│                                          │
│  1. ✅ La sauvegarde est AUTOMATIQUE    │
│     → Rien à faire au quotidien         │
│                                          │
│  2. 💾 Exportez 1x/semaine              │
│     → Import → Sauvegarde → Exporter    │
│                                          │
│  3. ☁️ Gardez une copie sur cloud       │
│     → Google Drive, Dropbox, OneDrive   │
│                                          │
│  ✅ VOS DONNÉES SONT PROTÉGÉES!         │
└─────────────────────────────────────────┘
```

**Temps total requis par semaine:** 2 minutes ⏱️

---

**Date:** 2025-11-09  
**Version:** 1.0  
**Niveau:** Débutant à Intermédiaire
