# 📍 Où Sont Sauvegardées les Données?

## 🔍 Réponse Simple

**Les données sont sauvegardées à 2 endroits:**

### 1️⃣ **localStorage du Navigateur** (Automatique)
- ✅ **Sauvegarde automatique** à chaque modification
- 📍 **Emplacement:** Dans votre navigateur (Chrome, Firefox, Safari, etc.)
- 💾 **Capacité:** ~5-10 MB par site
- ⚡ **Vitesse:** Instantanée
- 🔒 **Sécurité:** Privée, uniquement sur votre appareil

### 2️⃣ **Fichier JSON Exporté** (Manuel)
- 📥 **Export manuel** via le bouton "Exporter les Données"
- 📍 **Emplacement:** Votre dossier Téléchargements
- 💾 **Format:** Fichier JSON portable
- ⚡ **Utilisation:** Backup, transfert entre appareils/navigateurs
- 🔒 **Sécurité:** Vous contrôlez le fichier

---

## 📊 Schéma Visuel

```
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION INTERLUDE                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Modifications (ajout, édition, suppression)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    SAUVEGARDE AUTOMATIQUE                    │
│                                                               │
│  ⚡ Chaque changement est IMMÉDIATEMENT sauvegardé dans:     │
│                                                               │
│  📦 localStorage du Navigateur                                │
│     ├─ musicians  (Tous vos musiciens)                       │
│     ├─ songs      (Toutes vos chansons)                      │
│     ├─ shows      (Tous vos spectacles)                      │
│     └─ setlists   (Toutes vos setlists)                      │
│                                                               │
│  🌍 Stockage Local - PAS sur Internet                        │
│  💻 Unique à VOTRE navigateur sur CET appareil               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Bouton "Exporter les Données"
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     SAUVEGARDE MANUELLE                      │
│                                                               │
│  📥 Fichier JSON téléchargé dans:                            │
│     📁 /Users/VotreNom/Téléchargements/                      │
│        └─ interlude-backup-2025-11-09.json                   │
│                                                               │
│  ✅ Portable - Vous pouvez le:                               │
│     • Copier sur USB/Cloud (Dropbox, Google Drive, etc.)    │
│     • Envoyer par email                                      │
│     • Ouvrir sur autre appareil                              │
│     • Restaurer en cas de perte                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Bouton "Importer depuis une Sauvegarde"
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    RESTAURATION DES DONNÉES                  │
│                                                               │
│  🔄 Le fichier JSON est RE-CHARGÉ dans localStorage         │
│  ✅ Toutes vos données sont restaurées                       │
│  🔄 Page recharge automatiquement                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Détails Techniques: localStorage

### Qu'est-ce que c'est?

**localStorage** est une technologie de stockage web intégrée dans tous les navigateurs modernes.

### Où exactement?

#### Sur Windows:
```
Chrome:
C:\Users\VotreNom\AppData\Local\Google\Chrome\User Data\Default\Local Storage\

Firefox:
C:\Users\VotreNom\AppData\Roaming\Mozilla\Firefox\Profiles\xxxxx.default\storage\

Edge:
C:\Users\VotreNom\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage\
```

#### Sur Mac:
```
Chrome:
~/Library/Application Support/Google/Chrome/Default/Local Storage/

Firefox:
~/Library/Application Support/Firefox/Profiles/xxxxx.default/storage/

Safari:
~/Library/Safari/LocalStorage/
```

#### Sur Linux:
```
Chrome:
~/.config/google-chrome/Default/Local Storage/

Firefox:
~/.mozilla/firefox/xxxxx.default/storage/
```

### Comment voir les données?

1. Ouvrir l'application dans le navigateur
2. Appuyer sur **F12** (ou Cmd+Option+I sur Mac)
3. Aller dans l'onglet **"Application"** (Chrome) ou **"Storage"** (Firefox)
4. Cliquer sur **"Local Storage"**
5. Voir les clés: `musicians`, `songs`, `shows`, `setlists`

---

## 📥 Détails Techniques: Fichier JSON Exporté

### Nom du Fichier

```
interlude-backup-YYYY-MM-DD.json
```

**Exemple:** `interlude-backup-2025-11-09.json`

### Emplacement par Défaut

```
Windows: C:\Users\VotreNom\Téléchargements\
Mac:     /Users/VotreNom/Downloads/
Linux:   /home/votreNom/Downloads/
```

### Structure du Fichier

```json
{
  "musicians": [
    {
      "id": "1731180000000",
      "name": "Jean Dupont",
      "instrument": "Piano",
      "needsMic": true,
      "needsDI": false,
      "needsInputMic": false,
      "createdAt": "2025-11-09T12:00:00.000Z"
    },
    // ... autres musiciens
  ],
  "songs": [
    {
      "id": "1731180100000",
      "title": "Imagine",
      "artist": "John Lennon",
      "duration": 183,
      "audioUrl": "https://...",
      "createdAt": "2025-11-09T12:01:00.000Z"
    },
    // ... autres chansons
  ],
  "shows": [
    // ... spectacles
  ],
  "setlists": [
    // ... setlists
  ],
  "exportDate": "2025-11-09T12:05:00.000Z",
  "version": "1.0"
}
```

### Taille du Fichier

- **Vide:** ~100 bytes
- **10 musiciens:** ~2-5 KB
- **100 chansons:** ~20-50 KB
- **Données complètes:** Généralement < 100 KB

**Très léger et facile à partager!**

---

## ⚠️ Limitations de localStorage

### Risques de Perte de Données

**localStorage est EFFACÉ dans ces cas:**

1. ❌ **Nettoyage du cache/cookies du navigateur**
   - Solution: Exporter avant de nettoyer

2. ❌ **Mode navigation privée/incognito**
   - Solution: Utiliser en mode normal

3. ❌ **Changement d'appareil**
   - Solution: Exporter et importer sur nouvel appareil

4. ❌ **Changement de navigateur**
   - Chrome → Firefox = données perdues
   - Solution: Exporter depuis Chrome, importer dans Firefox

5. ❌ **Réinstallation du système**
   - Solution: Exporter AVANT la réinstallation

6. ❌ **Suppression manuelle du site**
   - Paramètres → Confidentialité → Supprimer données du site
   - Solution: Exporter régulièrement

### ✅ Ce qui NE supprime PAS les données:

- ✅ Fermer le navigateur
- ✅ Redémarrer l'ordinateur
- ✅ Mise à jour du navigateur
- ✅ Mise à jour du système
- ✅ Navigation normale

---

## 🛡️ Stratégie de Sauvegarde Recommandée

### Option 1: Backup Régulier (Recommandé)

```
1. Exporter les données chaque semaine
2. Renommer le fichier: interlude-backup-2025-11-09-semaine45.json
3. Stocker dans un dossier dédié
4. Optionnel: Upload sur cloud (Google Drive, Dropbox, etc.)
```

### Option 2: Backup Avant Action Critique

```
Exporter AVANT de:
- Nettoyer le cache du navigateur
- Changer de navigateur
- Réinstaller le système
- Supprimer des données importantes
```

### Option 3: Backup Multi-Emplacements

```
1. Export local sur votre ordinateur
2. Copie sur USB/disque externe
3. Upload sur cloud (Google Drive, OneDrive, iCloud, Dropbox)
4. Envoi par email (à vous-même)
```

---

## 🔄 Scénarios d'Utilisation

### Scénario 1: Travail Multi-Appareils

**Problème:** Vous travaillez sur ordinateur de bureau ET laptop

**Solution:**
```
1. Sur ordinateur de bureau:
   - Créer des données
   - Exporter → interlude-backup.json
   - Upload sur Google Drive

2. Sur laptop:
   - Télécharger interlude-backup.json depuis Google Drive
   - Aller dans Import → Sauvegarde
   - Importer le fichier
   - ✅ Données synchronisées!
```

### Scénario 2: Migration de Navigateur

**Problème:** Vous passez de Chrome à Firefox

**Solution:**
```
1. Dans Chrome:
   - Aller dans Import → Sauvegarde
   - Exporter les données
   - Noter l'emplacement du fichier

2. Dans Firefox:
   - Ouvrir l'application Interlude
   - Aller dans Import → Sauvegarde
   - Importer le fichier exporté
   - ✅ Toutes vos données dans Firefox!
```

### Scénario 3: Partage avec Collègue

**Problème:** Vous voulez partager votre base de données avec un collègue

**Solution:**
```
1. Exporter les données
2. Envoyer le fichier JSON par email ou partage de fichier
3. Votre collègue importe le fichier dans sa propre installation
4. ✅ Base de données dupliquée!
```

### Scénario 4: Restauration d'Urgence

**Problème:** Vous avez accidentellement supprimé des données

**Solution:**
```
1. Ne paniquez pas!
2. Ne fermez PAS le navigateur
3. Allez dans Import → Sauvegarde
4. Importez votre dernier backup
5. ✅ Données restaurées!

Note: Si vous aviez exporté avant la suppression
```

---

## 📱 Compatibilité Multi-Plateforme

### Export depuis:
- ✅ Windows (Chrome, Firefox, Edge)
- ✅ Mac (Chrome, Firefox, Safari)
- ✅ Linux (Chrome, Firefox)

### Import vers:
- ✅ Windows (Chrome, Firefox, Edge)
- ✅ Mac (Chrome, Firefox, Safari)
- ✅ Linux (Chrome, Firefox)

**Le fichier JSON est 100% compatible entre tous les systèmes!**

---

## 🔐 Sécurité et Confidentialité

### Données locales (localStorage)
- 🔒 **Privées:** Uniquement sur votre appareil
- 🔒 **Isolées:** Autres sites ne peuvent pas y accéder
- 🔒 **Non cryptées:** Lisibles si quelqu'un accède à votre ordinateur
- 🔒 **Pas d'envoi:** Aucune donnée envoyée sur Internet

### Fichier JSON exporté
- 🔒 **Contrôle total:** Vous décidez où le stocker
- 🔒 **Portable:** Copiez-le où vous voulez
- 🔒 **Non crypté:** Lisible avec n'importe quel éditeur de texte
- ⚠️ **Attention:** Ne partagez pas si données sensibles

### Pour plus de sécurité:
```
Option 1: Stocker dans dossier protégé par mot de passe
Option 2: Crypter le fichier avec un outil comme 7-Zip
Option 3: Utiliser un service cloud avec authentification (Google Drive, OneDrive)
```

---

## 🚀 Évolution Future: Sauvegarde Cloud

**Actuellement:** Stockage local uniquement (localStorage + export JSON)

**Prochaine version possible:**
- ☁️ Sauvegarde automatique sur cloud (Firebase/Supabase)
- 🔄 Synchronisation temps réel entre appareils
- 👥 Partage avec plusieurs utilisateurs
- 📧 Notifications par email
- 🔐 Authentification sécurisée

**Pour l'instant:**
- Export/Import JSON = Solution robuste et fiable
- Aucune dépendance externe
- Contrôle total sur vos données

---

## 📞 Questions Fréquentes

### Q: Mes données sont-elles sur Internet?
**R:** Non! Elles sont uniquement dans votre navigateur (localStorage) jusqu'à ce que vous les exportiez.

### Q: Si je perds mon ordinateur?
**R:** Vos données sont perdues SAUF si vous avez exporté un backup JSON sur cloud ou USB.

### Q: Puis-je travailler hors ligne?
**R:** Oui! L'application fonctionne 100% hors ligne. Toutes les données sont locales.

### Q: Combien de données puis-je stocker?
**R:** localStorage permet ~5-10 MB. Pour Interlude, cela représente des milliers de musiciens et chansons.

### Q: Le fichier JSON est-il compatible avec Excel?
**R:** Pas directement, mais vous pouvez utiliser des convertisseurs JSON→CSV en ligne, puis ouvrir dans Excel.

### Q: Puis-je éditer le fichier JSON manuellement?
**R:** Oui, mais attention à la syntaxe! Une erreur empêchera l'import. Utilisez un validateur JSON en ligne.

### Q: Les exports sont-ils versionnés?
**R:** Oui, le nom du fichier inclut la date: `interlude-backup-2025-11-09.json`

### Q: Puis-je automatiser l'export?
**R:** Pas actuellement. C'est manuel via le bouton "Exporter". Une future version pourrait ajouter l'auto-export.

---

## 🎯 Résumé en 3 Points

### 1️⃣ Sauvegarde Automatique
**localStorage** → Dans votre navigateur → Automatique à chaque changement

### 2️⃣ Backup Manuel
**Export JSON** → Dans vos Téléchargements → Clic sur "Exporter les Données"

### 3️⃣ Recommandation
**Exportez régulièrement** (1x/semaine) pour éviter toute perte de données!

---

## 📚 Fichiers Associés

- **BACKUP_INTEGRATION_COMPLETE.md** - Guide complet du système de sauvegarde
- **GUIDE_UTILISATEUR.md** - Guide d'utilisation général
- **IMPLEMENTATION_SUMMARY.md** - Vue d'ensemble du projet

---

**Date:** 2025-11-09  
**Version:** 1.0  
**Auteur:** Documentation Interlude
