# 🔧 Firebase - Guide de Débogage

## ⚠️ Problème: Les Chansons Ne S'Ajoutent Pas

### Symptômes
- ✅ Vous pouvez ajouter une chanson
- ❌ Elle ne s'affiche pas dans la liste
- ❌ Pas d'erreur visible

---

## 🔍 Diagnostic Rapide

### Étape 1: Vérifier la Console Navigateur

1. **Ouvrir l'application:**
   🔗 https://5173-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai

2. **Ouvrir Console (F12):**
   - Windows/Linux: `F12` ou `Ctrl+Shift+I`
   - Mac: `Cmd+Option+I`

3. **Onglet "Console"**

4. **Chercher des erreurs Firebase:**
   ```
   Erreurs possibles:
   - "Missing or insufficient permissions"
   - "PERMISSION_DENIED"
   - "Failed to get document"
   - "Network error"
   ```

---

### Étape 2: Test Firebase Direct

**Ouvrir cette page de test:**
🔗 https://5173-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai/test-firebase.html

**Tests à faire:**
1. ✅ Vérifier "Firebase initialisé"
2. ✅ Cliquer "Tester la Connexion"
3. ✅ Cliquer "Ajouter une Chanson Test"
4. ✅ Cliquer "Lire les Chansons"

**Si erreur "PERMISSION_DENIED":**
→ Problème de règles Firestore (voir ci-dessous)

---

## 🔐 Solution: Règles Firestore

### Problème Fréquent: Mode Test Expiré

**Vérifier dans Firebase Console:**

1. Aller sur: https://console.firebase.google.com/
2. Projet: `interludeapp-2ff3f`
3. Menu: **Firestore Database**
4. Onglet: **Règles**

**Si vous voyez:**
```javascript
allow read, write: if request.time < timestamp.date(2025, XX, XX);
```
Et que la date est passée → **C'est le problème!**

---

### Solution: Mettre à Jour les Règles

**Dans Firebase Console → Firestore → Règles:**

**Copiez-collez ces règles:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // MODE DÉVELOPPEMENT - Accès public
    // ⚠️ À sécuriser pour production
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Cliquer "Publier"**

**✅ Résultat:** Accès complet pour tous (parfait pour tests)

---

### Règles Sécurisées (Pour Plus Tard)

**Quand vous voulez sécuriser:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Musiciens: Lecture publique, écriture pour tous (temporaire)
    match /musicians/{musicianId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Chansons: Lecture publique, écriture pour tous (temporaire)
    match /songs/{songId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Shows: Lecture publique, écriture pour tous (temporaire)
    match /shows/{showId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Setlists: Lecture publique, écriture pour tous (temporaire)
    match /setlists/{setlistId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

---

## 🗄️ Vérifier Firestore Database

### Est-ce que Firestore est Activé?

1. **Firebase Console:** https://console.firebase.google.com/
2. **Projet:** interludeapp-2ff3f
3. **Menu:** Firestore Database

**Si vous voyez "Créer une base de données":**
→ Firestore n'est PAS activé!

**Solution:**
1. Cliquer "Créer une base de données"
2. Choisir "Démarrer en mode test"
3. Région: `europe-west1` ou `us-central1`
4. Créer

---

## 🔄 Vérifier les Données

### Dans Firebase Console

1. Firestore Database → **Data**
2. Chercher collection **`songs`**

**Si elle existe:**
- ✅ Firebase fonctionne
- ✅ Les données sont sauvegardées
- → Problème dans l'affichage UI

**Si elle n'existe PAS:**
- ⚠️ Les écritures ne fonctionnent pas
- → Vérifier règles Firestore
- → Vérifier erreurs console navigateur

---

## 🧪 Test Manuel Complet

### Test 1: Ajouter une Chanson

1. Ouvrir: https://5173-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai
2. Menu "Chansons" (ou "Répertoire")
3. Cliquer "Ajouter une chanson"
4. Remplir:
   - Titre: "Test Firebase"
   - Artiste: "Test"
   - Tonalité: "C"
5. Sauvegarder
6. **Ouvrir Console (F12)** → Chercher erreurs

### Test 2: Vérifier dans Firebase

1. Firebase Console → Firestore → Data
2. Collection `songs`
3. **Chercher:** "Test Firebase"

**Si trouvé:**
- ✅ Écriture fonctionne!
- ❌ Lecture a un problème

**Si pas trouvé:**
- ❌ Écriture ne fonctionne pas
- → Vérifier règles Firestore

---

## 🐛 Erreurs Fréquentes et Solutions

### Erreur 1: "PERMISSION_DENIED"

**Cause:** Règles Firestore trop restrictives ou mode test expiré

**Solution:**
1. Firebase Console → Firestore → Règles
2. Mettre à jour les règles (voir ci-dessus)
3. Publier

---

### Erreur 2: "Failed to get document"

**Cause:** Firestore Database pas activé

**Solution:**
1. Firebase Console → Firestore Database
2. "Créer une base de données"
3. Mode test → Créer

---

### Erreur 3: Aucune Erreur mais Pas de Données

**Cause Possible:** Application utilise encore localStorage

**Solution Temporaire:**
1. Ouvrir Console (F12)
2. Taper:
   ```javascript
   localStorage.clear()
   ```
3. Recharger la page (F5)

---

### Erreur 4: "Network error"

**Cause:** Problème de connexion ou Firebase down

**Solution:**
1. Vérifier connexion internet
2. Vérifier Firebase Status: https://status.firebase.google.com/
3. Essayer dans un autre navigateur

---

## ✅ Checklist de Vérification

- [ ] Firestore Database est activé (pas juste "Créer")
- [ ] Règles Firestore permettent read/write
- [ ] Fichier `.env` contient les 6 variables
- [ ] Variables d'environnement correctes
- [ ] Serveur dev redémarré après modification .env
- [ ] Console navigateur (F12) ne montre pas d'erreurs
- [ ] Test Firebase (test-firebase.html) fonctionne
- [ ] Collection `songs` existe dans Firestore

---

## 📞 Si Ça Ne Fonctionne Toujours Pas

### 1. Envoyer Capture d'Écran Console

**Console navigateur (F12):**
- Onglet "Console"
- Capturer toutes les erreurs rouges
- Me les montrer

### 2. Vérifier Règles Firestore

**Firebase Console → Firestore → Règles:**
- Capturer les règles actuelles
- Me les montrer

### 3. Vérifier Data Firestore

**Firebase Console → Firestore → Data:**
- Capturer si collections existent
- Me montrer

---

## 🔧 Commandes Utiles

### Effacer localStorage (Console Navigateur)
```javascript
// Voir ce qui est stocké localement
console.log('Songs:', localStorage.getItem('interlude-songs'));

// Effacer tout
localStorage.clear();

// Recharger
location.reload();
```

### Tester Firebase (Console Navigateur)
```javascript
// Vérifier si Firebase est chargé
console.log('Firebase:', window.firebase);

// Voir erreurs réseau
// Onglet "Network" → Filter "firestore"
```

---

## 🎯 Solution Rapide (Si Urgent)

**Si vous voulez juste que ça marche maintenant:**

1. **Firebase Console** → Firestore → **Règles**
2. **Copier-coller:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. **Publier**
4. **Recharger l'app** (F5)
5. **Essayer d'ajouter une chanson**

**Si ça ne marche toujours pas:**
→ Ouvrir Console (F12) et me montrer les erreurs

---

## 📖 URLs Utiles

**Application:**
🔗 https://5173-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai

**Test Firebase:**
🔗 https://5173-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai/test-firebase.html

**Firebase Console:**
🔗 https://console.firebase.google.com/project/interludeapp-2ff3f

**Firebase Firestore:**
🔗 https://console.firebase.google.com/project/interludeapp-2ff3f/firestore

---

**Date:** 2025-11-10  
**Status:** Mode Débogage Activé  
**Prochaine étape:** Tester et rapporter résultats
