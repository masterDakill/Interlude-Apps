# 🔥 Firebase - Où Sont Stockées vos Données?

## 📍 Localisation des Données

### ✅ OUI, Firebase Conserve TOUTES vos Données!

**Vos données sont stockées dans:**
- ☁️ **Cloud Google** (serveurs sécurisés)
- 🌍 **Région choisie** (ex: europe-west1, us-central1)
- 💾 **Base de données Firestore** (NoSQL)
- 🔐 **Backup automatique** par Google

---

## 🔍 Comment Consulter vos Données?

### Méthode 1: Firebase Console (Recommandé) 👀

#### Étapes pour Voir vos Données:

1. **Ouvrir Firebase Console**
   ```
   🔗 https://console.firebase.google.com/
   ```

2. **Sélectionner votre Projet**
   - Cliquez sur "interlude-apps" (ou votre nom de projet)

3. **Aller dans Firestore Database**
   - Menu latéral gauche
   - Cliquez sur "Firestore Database"
   - Onglet "Data"

4. **Voir vos Collections**
   ```
   Vous verrez:
   📁 musicians (vos musiciens)
   📁 songs (vos chansons)
   📁 shows (vos spectacles - si migrés)
   📁 setlists (vos setlists - si migrés)
   ```

5. **Explorer les Documents**
   - Cliquez sur une collection (ex: `musicians`)
   - Vous verrez tous les documents (musiciens)
   - Cliquez sur un document pour voir tous les champs

#### Exemple Visuel de la Structure:

```
Firestore Database
│
├─ 📁 musicians (collection)
│  │
│  ├─ 📄 abc123xyz (document/musicien)
│  │  ├─ firstName: "Jean"
│  │  ├─ lastName: "Dupont"
│  │  ├─ instrument: "Piano"
│  │  ├─ isStudent: false
│  │  ├─ needsMic: true
│  │  ├─ needsDI: false
│  │  ├─ email: "jean@example.com"
│  │  └─ createdAt: 2025-11-09T20:30:00Z
│  │
│  ├─ 📄 def456uvw (document/musicien)
│  │  ├─ firstName: "Marie"
│  │  ├─ lastName: "Martin"
│  │  └─ ...
│  │
│  └─ ...
│
├─ 📁 songs (collection)
│  │
│  ├─ 📄 song001 (document/chanson)
│  │  ├─ title: "Imagine"
│  │  ├─ artist: "John Lennon"
│  │  ├─ key: "C"
│  │  ├─ tempo: 76
│  │  ├─ duration: 183
│  │  ├─ difficulty: "medium"
│  │  ├─ status: "ready"
│  │  └─ ...
│  │
│  └─ ...
│
└─ ...
```

---

### Méthode 2: Dans votre Application 📱

**Vos données apparaissent automatiquement dans l'app:**

1. **Musiciens**
   - Menu "Musiciens"
   - Tous vos musiciens s'affichent
   - Triés par prénom

2. **Chansons**
   - Menu "Chansons" (ou "Répertoire")
   - Toutes vos chansons s'affichent
   - Triées par titre

**C'est la même donnée** que dans Firebase Console!

---

### Méthode 3: Export JSON 📥

**Pour sauvegarder localement:**

1. **Via l'Application**
   - Menu "Import" → Onglet "Sauvegarde"
   - Cliquer "Exporter les Données"
   - Télécharge un fichier JSON avec TOUTES vos données

2. **Via Firebase Console**
   - Firestore Database → ⋮ (menu 3 points)
   - "Export data"
   - Choisir les collections
   - Export vers Google Cloud Storage

---

## 🗂️ Structure de vos Données

### Collection "musicians"

**Chaque musicien contient:**
```json
{
  "id": "abc123xyz",
  "firstName": "Jean",
  "lastName": "Dupont",
  "instrument": "Piano",
  "isStudent": false,
  "email": "jean@example.com",
  "phone": "+33612345678",
  "notes": "Disponible les weekends",
  "needsMic": true,
  "needsDI": false,
  "needsInputMic": false,
  "createdAt": "2025-11-09T20:30:00.000Z"
}
```

**Nombre de musiciens:** Illimité (gratuit jusqu'à 1GB)

---

### Collection "songs"

**Chaque chanson contient:**
```json
{
  "id": "song001",
  "title": "Imagine",
  "artist": "John Lennon",
  "key": "C",
  "tempo": 76,
  "duration": 183,
  "difficulty": "medium",
  "status": "ready",
  "lyrics": "Imagine there's no heaven...",
  "chords": "C Cmaj7 F C...",
  "notes": "Intro piano seul",
  "tags": ["classique", "piano", "anglais"],
  "audioFiles": [],
  "sheetMusic": [],
  "musicians": [],
  "keyboardPatches": [],
  "practiceLog": [],
  "createdAt": "2025-11-09T20:35:00.000Z",
  "updatedAt": "2025-11-09T20:35:00.000Z"
}
```

**Nombre de chansons:** Illimité (gratuit jusqu'à 1GB)

---

## 🔐 Sécurité des Données

### Où Sont Physiquement vos Données?

**Datacenters Google Cloud:**
- 🏢 **Multiple datacenters** (redondance)
- 🌍 **Région choisie** lors de la création
- 🔒 **Cryptage au repos** (AES-256)
- 🔐 **Cryptage en transit** (TLS/SSL)
- 💾 **Backup automatique** quotidien

### Qui Peut Accéder?

**Actuellement (Mode Test):**
- ✅ Tout le monde peut lire
- ✅ Tout le monde peut écrire
- ⚠️ Seulement temporaire (30 jours)

**Après Sécurisation:**
- ✅ Tout le monde peut lire
- 🔐 Seulement utilisateurs authentifiés peuvent écrire
- 👤 Vous contrôlez les accès

---

## 📊 Statistiques de Stockage

### Voir l'Utilisation

**Firebase Console → Firestore Database → Usage:**

Vous verrez:
- 📏 **Taille des données** (ex: 2.5 MB / 1 GB)
- 📈 **Nombre de lectures** (ex: 1,234 / 50,000 par jour)
- 📝 **Nombre d'écritures** (ex: 456 / 20,000 par jour)
- 🗑️ **Nombre de suppressions** (ex: 12)

**Exemple pour Interlude:**
```
Stockage utilisé:
├─ musicians: ~10 KB (pour 50 musiciens)
├─ songs: ~100 KB (pour 100 chansons)
├─ shows: ~5 KB (pour 10 spectacles)
└─ Total: ~115 KB / 1 GB (0.01% utilisé!)
```

---

## 🔄 Synchronisation des Données

### Comment ça Fonctionne?

**Temps Réel:**
```
Vous ajoutez un musicien
        ↓
    Envoyé à Firebase
        ↓
    Stocké dans le cloud
        ↓
    Visible dans Firebase Console
        ↓
    Synchronisé sur tous vos appareils
```

**Temps de synchronisation:** < 1 seconde

---

## 🗑️ Suppression des Données

### Comment Supprimer?

**Via l'Application:**
1. Aller dans Musiciens/Chansons
2. Cliquer l'icône poubelle 🗑️
3. Confirmer
4. ✅ Supprimé de Firebase immédiatement

**Via Firebase Console:**
1. Firestore Database → Data
2. Trouver le document
3. Cliquer ⋮ (menu 3 points)
4. "Delete document"
5. Confirmer

**⚠️ Attention:** Suppression = PERMANENTE!
(Sauf si vous avez un backup)

---

## 📥 Backup et Restauration

### Backup Automatique Google

**Google fait des backups automatiques:**
- 📅 **Fréquence:** Quotidien
- 🔙 **Rétention:** 7 jours
- 🔐 **Crypté:** Oui
- 💰 **Coût:** Gratuit (plan Firebase)

**Pour restaurer:**
1. Contacter support Firebase
2. Indiquer la date de restauration
3. Google restore vos données

---

### Backup Manuel (Recommandé)

**Via votre Application:**
1. Menu "Import" → "Sauvegarde"
2. Cliquer "Exporter les Données"
3. Fichier JSON téléchargé localement
4. **Conserver ce fichier précieusement!**

**Fréquence recommandée:**
- 📅 **Quotidien** si vous modifiez beaucoup
- 📅 **Hebdomadaire** pour usage normal
- 📅 **Avant changements majeurs** (toujours!)

**Restaurer:**
1. Menu "Import" → "Sauvegarde"
2. Cliquer "Importer depuis une Sauvegarde"
3. Sélectionner votre fichier JSON
4. ✅ Données restaurées

---

## 🌍 Accès Multi-Appareils

### Vos Données Partout!

**Même compte Firebase = Mêmes données:**

```
📱 Téléphone
   ↓
☁️ Firebase (cloud)
   ↑
💻 Ordinateur
   ↓
☁️ Firebase (cloud)
   ↑
🖥️ Tablette
```

**Pour accéder:**
1. Ouvrir l'app sur n'importe quel appareil
2. Les données se chargent automatiquement
3. Modifications synchronisées instantanément

**Pas besoin de:**
- ❌ Se connecter avec un compte
- ❌ Transférer des fichiers
- ❌ Synchroniser manuellement

**Juste:** Même URL Vercel = Mêmes données!

---

## 📈 Limites du Plan Gratuit

### Ce que Vous Avez GRATUITEMENT:

| Ressource | Limite Gratuite | Suffisant pour Interlude? |
|-----------|----------------|---------------------------|
| **Stockage** | 1 GB | ✅ Oui (10,000+ chansons) |
| **Lectures/jour** | 50,000 | ✅ Oui (50+ utilisateurs) |
| **Écritures/jour** | 20,000 | ✅ Oui |
| **Suppressions/jour** | 20,000 | ✅ Oui |
| **Bande passante** | 10 GB/mois | ✅ Oui |

**Estimation pour Interlude:**
- 50 musiciens = ~10 KB
- 100 chansons = ~100 KB
- 20 spectacles = ~10 KB
- **Total: ~120 KB** (0.01% du quota!)

**Vous ne paierez JAMAIS** avec usage normal!

---

## 🔍 Chercher dans vos Données

### Via Firebase Console

**Recherche simple:**
1. Firestore Database → Data
2. Ouvrir collection `musicians`
3. Ctrl+F (recherche navigateur)
4. Taper le nom du musicien

**Recherche avancée:**
1. Utiliser les filtres Firestore
2. Cliquer "Add filter"
3. Choisir champ (ex: `instrument`)
4. Opérateur (ex: `==`)
5. Valeur (ex: `Piano`)

---

### Via l'Application

**Recherche intégrée** (si implémentée):
- Barre de recherche dans Musiciens
- Filtrer par instrument
- Trier par nom, date, etc.

---

## 📊 Monitoring des Données

### Voir l'Activité en Temps Réel

**Firebase Console → Firestore → Usage:**

**Graphiques disponibles:**
- 📈 Lectures au fil du temps
- 📝 Écritures au fil du temps
- 🗑️ Suppressions au fil du temps
- 💾 Croissance du stockage

**Alertes:**
- ⚠️ Si vous approchez des limites
- 📧 Email automatique de Firebase
- 🔔 Notifications dans la console

---

## 🔒 Règles de Sécurité Actuelles

### Mode Test (Actuel)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // TOUT LE MONDE peut lire et écrire
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Expire le:** Date affichée dans la console

**Risques:**
- ✅ Facile pour tester
- ⚠️ N'importe qui peut modifier vos données
- ⚠️ Pas pour production

---

### Mode Production (Recommandé)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Musiciens: Lecture publique, écriture authentifiée
    match /musicians/{musicianId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Chansons: Lecture publique, écriture authentifiée
    match /songs/{songId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Shows: Lecture publique, écriture authentifiée
    match /shows/{showId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Setlists: Lecture publique, écriture authentifiée
    match /setlists/{setlistId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

**À appliquer:**
1. Firebase Console → Firestore → Rules
2. Copier-coller les règles ci-dessus
3. Cliquer "Publish"

---

## 🎯 Résumé Rapide

### Questions Fréquentes

**Q: Où sont mes données?**  
R: ☁️ Cloud Google, région choisie (ex: Europe)

**Q: Peuvent-elles disparaître?**  
R: ❌ Non, backup automatique quotidien par Google

**Q: Combien de temps sont-elles conservées?**  
R: ♾️ Indéfiniment (tant que projet Firebase existe)

**Q: Puis-je les voir?**  
R: ✅ Oui, Firebase Console → Firestore Database → Data

**Q: Puis-je les télécharger?**  
R: ✅ Oui, Export JSON dans l'app ou Firebase Console

**Q: Puis-je les supprimer?**  
R: ✅ Oui, via l'app ou Firebase Console

**Q: Sont-elles sécurisées?**  
R: 🔐 Oui, cryptage AES-256, TLS/SSL

**Q: Combien ça coûte?**  
R: 💰 Gratuit (plan généreux suffit pour Interlude)

**Q: Limite de stockage?**  
R: 📏 1GB gratuit = ~10,000 chansons

**Q: Accessible partout?**  
R: ✅ Oui, tous vos appareils avec même URL

---

## 🎊 Conclusion

### ✅ Vos Données Firebase sont:

| Caractéristique | Status |
|----------------|--------|
| **Stockées** | ☁️ Cloud Google sécurisé |
| **Consultables** | 👀 Console Firebase + App |
| **Sauvegardées** | 💾 Backup auto quotidien |
| **Sécurisées** | 🔐 Cryptage AES-256 |
| **Synchronisées** | 🔄 Tous appareils temps réel |
| **Exportables** | 📥 JSON à tout moment |
| **Illimitées** | ♾️ 1GB gratuit (largement suffisant) |
| **Permanentes** | ⏰ Conservées indéfiniment |

### 🔗 Liens Utiles

**Voir vos données:**  
🔗 https://console.firebase.google.com/ → Votre projet → Firestore Database

**Documentation Firebase:**  
🔗 https://firebase.google.com/docs/firestore

**Règles de sécurité:**  
🔗 https://firebase.google.com/docs/firestore/security/get-started

---

**Date:** 2025-11-09  
**Guide:** Conservation et Consultation des Données Firebase  
**Status:** ✅ Complet et Détaillé
