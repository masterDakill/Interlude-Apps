# 📖 Guide Utilisateur - Gestion des Musiciens

## 🎯 Vue d'Ensemble

Votre système de gestion de musiciens dispose maintenant de **TOUTES** les fonctionnalités demandées :

✅ Formulaire avec besoins techniques (Micro, DI, Input Mic)
✅ Import CSV massif
✅ Chatbot en langage naturel
✅ Statistiques automatiques
✅ Badges visuels colorés

---

## 🚀 Démarrage Rapide

### 🌐 Accéder à l'Application

**URL:** https://5173-im44v8hzokemz3ay6okih-5185f4aa.sandbox.novita.ai

---

## 📝 Méthode 1 : Ajouter un Musicien Manuellement

### Étapes :

1. **Naviguer** vers la section "Musiciens"
2. **Cliquer** sur le bouton "Ajouter un musicien" (en haut à droite)
3. **Remplir** le formulaire :
   ```
   Prénom: Jean
   Nom: Martin
   Instrument: Piano
   ☐ Étudiant piano
   ```

4. **Renseigner** les besoins techniques :
   ```
   Besoins techniques:
   ☑ 🎤 Micro nécessaire
   ☑ 📦 DI Boîtier DI nécessaire
   ☐ 🎙️ Input Mic nécessaire
   ```

5. **Ajouter** contacts et notes (optionnel) :
   ```
   Courriel: jean.martin@example.com
   Téléphone: 514-555-0101
   Notes: Besoin d'un tabouret réglable
   ```

6. **Sauvegarder** en cliquant sur "Ajouter"

### Résultat :
Le musicien apparaît dans la liste avec ses badges techniques :
```
┌───────────────────────────────────────┐
│ JM  Jean Martin              ✏️  🗑️  │
│     🎵 Piano                          │
│                                        │
│ 📧 jean.martin@example.com            │
│ 📱 514-555-0101                       │
│                                        │
│ [🎤 Micro]  [DI]                      │
│                                        │
│ Besoin d'un tabouret réglable         │
└───────────────────────────────────────┘
```

---

## 📊 Méthode 2 : Import CSV (Recommandé pour >5 musiciens)

### Étapes :

1. **Cliquer** sur "Importer" (à côté de "Ajouter un musicien")

2. **Choisir** l'onglet "Import CSV"

3. **Option A - Télécharger le template**
   - Cliquer sur "Télécharger le template CSV"
   - Ouvrir avec Excel/LibreOffice/Google Sheets
   - Remplir avec vos données
   - Copier tout le contenu

4. **Option B - Utiliser l'exemple fourni**
   - Fichier disponible : `exemple_musiciens.csv` (10 musiciens)
   - Contenu prêt à importer

5. **Coller** le CSV dans la zone de texte

6. **Cliquer** sur "Importer les musiciens"

### Format CSV Accepté :

```csv
Prénom,Nom,Instrument,Étudiant,Email,Téléphone,Micro,DI,InputMic,Notes
Jean,Martin,Piano,oui,jean@example.com,514-555-0101,non,oui,non,Notes ici
Sophie,Dubois,Violon,non,sophie@example.com,514-555-0102,oui,non,non,
```

### Colonnes Supportées :

| Colonne | Valeurs Acceptées | Obligatoire |
|---------|------------------|-------------|
| Prénom | Texte | ✅ Oui |
| Nom | Texte | ✅ Oui |
| Instrument | Texte | ✅ Oui |
| Étudiant | oui/non/yes/no/true/false/1/0 | ❌ Non (défaut: non) |
| Email | email@example.com | ❌ Non |
| Téléphone | Format libre | ❌ Non |
| Micro | oui/non | ❌ Non (défaut: non) |
| DI | oui/non | ❌ Non (défaut: non) |
| InputMic | oui/non | ❌ Non (défaut: non) |
| Notes | Texte libre | ❌ Non |

### Résultat :
Message de confirmation :
```
✅ 10 musicien(s) importé(s) avec succès!
```

Tous les musiciens apparaissent dans la liste avec leurs badges techniques.

---

## 🤖 Méthode 3 : Chatbot (Rapide et Facile)

### Étapes :

1. **Cliquer** sur "Importer"

2. **Choisir** l'onglet "Chatbot"

3. **Taper** en langage naturel :

### Formats Acceptés :

**Format 1 : Simple avec tiret**
```
Jean Martin - Piano
Sophie Dubois - Violon
Pierre Lambert - Saxophone
```

**Format 2 : "Joue" naturel**
```
Jean Martin joue du piano
Sophie joue du violon
Marie Leclerc joue de la flûte
```

**Format 3 : "Ajoute" impératif**
```
ajoute Jean Martin au piano
add Sophie Dubois au violon
crée Pierre Lambert à la guitare
```

4. **Envoyer** le message

### Résultat :
Conversation affichée :
```
👤 Vous: Jean Martin - Piano

🤖 Assistant: ✅ Musicien ajouté avec succès!
- Prénom: Jean
- Nom: Martin
- Instrument: Piano
```

Le musicien est ajouté immédiatement à la liste.

### 💡 Astuce :
Vous pouvez entrer plusieurs musiciens ligne par ligne :
```
Jean Martin - Piano
Sophie Dubois - Violon
Pierre Lambert - Saxophone
```

Résultat : 3 musiciens ajoutés d'un coup!

---

## 🎨 Badges et Affichage

### Couleurs des Badges

Les besoins techniques s'affichent avec des badges colorés :

| Badge | Couleur | Signification |
|-------|---------|---------------|
| 🎤 Micro | VERT | Microphone nécessaire |
| DI | BLEU | Boîtier DI nécessaire |
| 🎙️ Input Mic | ORANGE | Input Mic nécessaire |

### Exemple Visuel :

```
Musicien avec tous les besoins:
[🎤 Micro]  [DI]  [🎙️ Input Mic]

Musicien avec Micro seulement:
[🎤 Micro]

Musicien avec DI seulement:
[DI]
```

---

## 📊 Statistiques Automatiques

Le dashboard affiche automatiquement :

### Compteurs Principaux
```
┌─────────────────────┐  ┌─────────────────────┐
│ Total musiciens     │  │ Étudiants piano     │
│       10            │  │        4            │
└─────────────────────┘  └─────────────────────┘

┌─────────────────────┐  ┌─────────────────────┐
│ Professionnels      │  │ Micros nécessaires  │
│        6            │  │        7            │
└─────────────────────┘  └─────────────────────┘
```

### Besoins en Microphones
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Micros vocaux   │ Micros violon   │ Micros piano    │
│       3         │       2         │       2         │
└─────────────────┴─────────────────┴─────────────────┘
```

### Répartition par Instrument
```
┌─────────┬─────────┬─────────────┬─────────┐
│ Piano   │ Violon  │ Saxophone   │ Chant   │
│   3     │   2     │     1       │   2     │
└─────────┴─────────┴─────────────┴─────────┘
```

---

## ✏️ Modifier un Musicien

1. **Trouver** le musicien dans la liste
2. **Cliquer** sur l'icône ✏️ (crayon)
3. **Modifier** les champs souhaités
4. **Cocher/Décocher** les besoins techniques
5. **Cliquer** sur "Mettre à jour"

---

## 🗑️ Supprimer un Musicien

1. **Trouver** le musicien dans la liste
2. **Cliquer** sur l'icône 🗑️ (poubelle)
3. **Confirmer** la suppression

---

## 📁 Fichiers Exemples Fournis

### `exemple_musiciens.csv`
Contient 10 musiciens variés avec tous les champs :
- 4 étudiants, 6 professionnels
- Instruments : Piano, Violon, Saxophone, Chant, Guitare, Flûte, Contrebasse, Trompette, Violoncelle
- Besoins techniques variés
- Coordonnées complètes
- Notes détaillées

**Pour l'utiliser :**
```bash
# Ouvrir le fichier
cat exemple_musiciens.csv

# Copier le contenu
# Aller dans l'app > Importer > CSV
# Coller et importer
```

---

## 🎯 Cas d'Usage Recommandés

### Pour un petit groupe (1-5 musiciens)
→ **Méthode Chatbot** (la plus rapide)

### Pour un groupe moyen (5-20 musiciens)
→ **Import CSV** (bien organisé)

### Pour un grand groupe (20+ musiciens)
→ **Import CSV** avec fichier Excel préparé

### Ajouts individuels réguliers
→ **Formulaire manuel** (le plus détaillé)

---

## ⚠️ Notes Importantes

### Import CSV
- ✅ Vérifie que les colonnes ont les bons noms
- ✅ Accepte les accents (Prénom = Prenom)
- ✅ Supporte français ET anglais
- ✅ Les colonnes Email, Téléphone, Notes sont optionnelles

### Chatbot
- ✅ Reconnaît les prénoms/noms composés : "Jean-Pierre Martin"
- ✅ Détecte automatiquement l'instrument
- ✅ Par défaut : pas étudiant, pas de besoins techniques
- ⚠️ Pour besoins techniques : utiliser le formulaire ou CSV

### Formulaire
- ✅ Tous les champs sont modifiables
- ✅ Les besoins techniques se cochent/décochent
- ✅ Les badges s'affichent automatiquement
- ✅ Validation automatique des emails

---

## 🔧 Dépannage

### Problème : Import CSV ne fonctionne pas
**Solution :** Vérifier que :
- Les colonnes Prénom, Nom, Instrument sont présentes
- Pas de lignes vides au début
- Les valeurs "oui/non" pour Étudiant/Micro/DI/InputMic

### Problème : Chatbot ne reconnaît pas
**Solution :** Utiliser un des 3 formats :
- "Prénom Nom - Instrument"
- "Prénom Nom joue du instrument"
- "ajoute Prénom Nom au instrument"

### Problème : Badges ne s'affichent pas
**Solution :** Vérifier que les checkboxes sont cochées dans le formulaire

---

## 📞 Support

Pour toute question ou problème :
1. Consulter ce guide
2. Vérifier les fichiers exemples
3. Tester avec `exemple_musiciens.csv`

---

## 🎉 Récapitulatif

✅ **3 méthodes d'ajout** : Formulaire, CSV, Chatbot
✅ **Besoins techniques** : Micro, DI, Input Mic
✅ **Badges colorés** : Vert, Bleu, Orange
✅ **Statistiques auto** : Compteurs, répartition, micros
✅ **Import massif** : Template CSV fourni
✅ **NLP intelligent** : Chatbot comprend 3 formats
✅ **Modification facile** : Clic sur ✏️
✅ **Suppression rapide** : Clic sur 🗑️

**Tout est prêt et fonctionnel! 🚀**

---

**Version:** 1.0  
**Date:** 2025-11-09  
**Application:** Piano Recital Manager
