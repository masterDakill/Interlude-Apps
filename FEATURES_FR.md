# 🎵 Interlude - Guide complet des fonctionnalités

## 📋 Vue d'ensemble

L'application Interlude est maintenant une plateforme complète de gestion de spectacles avec des outils avancés de collaboration et d'analyse technique.

---

## ✨ Nouvelles fonctionnalités majeures

### 👥 **Gestion des musiciens**

Un système complet pour gérer tous les musiciens participant aux spectacles.

#### Fonctionnalités:
- **Ajout de musiciens** avec informations complètes:
  - Prénom, nom
  - Instrument principal
  - Statut (Étudiant piano ou Professionnel)
  - Coordonnées (courriel, téléphone)
  - Notes personnelles

- **Statistiques automatiques**:
  - Nombre total de musiciens
  - Nombre d'étudiants piano
  - Nombre de professionnels
  - Répartition par instrument

- **Calcul automatique des besoins en microphones**:
  - **Micros vocaux** : Compte automatique des chanteurs
  - **Micros violon** : Comptage des violonistes
  - **Micros piano** : Nombre de pianos nécessaires
  - Total des micros requis

#### Utilisation:
1. Accédez à l'onglet **"Musiciens"**
2. Cliquez sur **"Ajouter un musicien"**
3. Remplissez les informations
4. Cochez "Étudiant piano" si applicable
5. Visualisez les statistiques en temps réel

---

### 🎭 **Visualiseur de salle interactif**

Créez et gérez la disposition de votre scène de manière visuelle.

#### Éléments disponibles:
- 🎭 **Scène** : Zone de performance principale
- 🎹 **Piano** : Position des pianos
- 🎵 **Musicien** : Position de chaque musicien
- 🎤 **Micro** : Placement des microphones
- 🔊 **Enceinte** : Système de sonorisation
- 📢 **Retour** : Moniteurs de scène
- 🪑 **Table** : Mobilier et accessoires

#### Fonctionnalités:
- **Glisser-déposer** : Déplacez les éléments librement
- **Personnalisation** :
  - Nom/étiquette pour chaque élément
  - Couleur personnalisable
  - Rotation (0-360°)
  - Dimensions ajustables
  - Notes additionnelles

- **Assignment de musiciens** :
  - Liez un musicien à une position
  - Visualisez qui joue où
  - Planifiez l'espace efficacement

- **Statistiques de disposition** :
  - Total d'éléments sur scène
  - Nombre de musiciens placés
  - Nombre de micros
  - Nombre de pianos

#### Utilisation:
1. Accédez à l'onglet **"Salle"**
2. Nommez votre disposition
3. Cliquez sur les boutons pour ajouter des éléments
4. Glissez-déposez pour positionner
5. Sélectionnez un élément pour modifier ses propriétés
6. Cliquez sur **"Sauvegarder"**

---

### 🎵 **Gestion des médias par chanson**

Attachez directement des fichiers audio, partitions et configurations aux chansons.

#### 1. **Fichiers audio** 🎧

- **Types supportés**:
  - Enregistrements
  - Pistes d'accompagnement
  - Références
  - Pratiques

- **Fonctionnalités**:
  - Liens directs depuis Dropbox
  - URLs externes (SoundCloud, Google Drive, etc.)
  - Nom personnalisable
  - Type de fichier
  - Durée
  - Téléchargement direct

#### 2. **Partitions** 📄

- **Formats supportés**:
  - PDF
  - Images (JPG, PNG)

- **Fonctionnalités**:
  - Liens Dropbox ou URLs directes
  - Spécification de l'instrument
  - Nombre de pages
  - Ouverture dans nouvel onglet
  - Organisation par catégories

#### 3. **Patches clavier** 🎹

Configuration complète des sons de synthétiseur/clavier.

- **Informations stockées**:
  - Nom du patch
  - Modèle de clavier (Yamaha, Roland, etc.)
  - Bank (A, B, GM, etc.)
  - Numéro de programme (0-127)
  - Paramètres additionnels
  - Notes de configuration

- **Utilisation**:
  - Changements de son par section (Intro, Couplet, Refrain)
  - Sauvegarde des configurations
  - Partage avec autres musiciens
  - Reproduction exacte du son

#### 4. **Assignment de musiciens** 👥

Spécifiez qui joue sur chaque chanson.

- **Par chanson, définissez**:
  - Quels musiciens participent
  - Leur instrument
  - Leur rôle (lead, backup, section)
  - Notes spécifiques

- **Calculs automatiques**:
  - Nombre total de musiciens
  - Nombre d'étudiants piano
  - Besoins techniques par pièce
  - Vue d'ensemble des participations

---

## 🔧 **Fonctionnalités avancées**

### **Calculs automatiques**

L'application calcule automatiquement:

1. **Par musicien**:
   - Total des participations
   - Instruments joués
   - Besoins en microphones

2. **Par chanson**:
   - Nombre de musiciens requis
   - Étudiants vs professionnels
   - Configuration technique complète

3. **Par spectacle**:
   - Total des musiciens nécessaires
   - Équipement requis
   - Disposition de la scène

### **Intégration Dropbox**

Toutes les fonctionnalités média supportent:
- ✅ Liens Dropbox directs
- ✅ Dossiers partagés
- ✅ URLs publiques
- ✅ Fichiers dans le dossier Spectacle Interlude

**Format des liens Dropbox**:
```
https://www.dropbox.com/s/xxxxx/fichier.pdf?dl=0
https://www.dropbox.com/sh/xxxxx/xxxxx?dl=0
```

### **Flexibilité**

L'outil est conçu pour s'adapter:
- ✅ Différents types de spectacles
- ✅ Formations variables
- ✅ Instrumentations diverses
- ✅ Niveaux de musiciens mixtes
- ✅ Configurations techniques variées

---

## 📊 **Flux de travail recommandé**

### **1. Configuration initiale**

```
Musiciens → Chansons → Listes de lecture → Spectacles
```

1. **Ajoutez tous les musiciens**
   - Étudiants et professionnels
   - Instruments et coordonnées

2. **Créez votre répertoire**
   - Ajoutez les chansons
   - Attachez médias et partitions
   - Configurez les patches clavier

3. **Assignez les musiciens aux chansons**
   - Qui joue quoi
   - Rôles de chacun

### **2. Planification d'un spectacle**

```
Setlist → Show → Fiche technique → Disposition salle
```

1. **Créez une liste de lecture**
   - Sélectionnez les chansons
   - Organisez l'ordre
   - Vérifiez la durée totale

2. **Planifiez le spectacle**
   - Date et lieu
   - Assignez la setlist
   - Statut et notes

3. **Générez la fiche technique**
   - Exigences de scène
   - Besoins sonores (calculés automatiquement)
   - Liste des canaux
   - Backline

4. **Créez la disposition de salle**
   - Placez les musiciens
   - Positionnez les micros
   - Organisez l'espace

### **3. Collaboration**

```
Partage → Communication → Coordination
```

1. **Partagez les médias**
   - Liens Dropbox aux partitions
   - Accès aux enregistrements
   - Configurations de patches

2. **Communiquez**
   - Notes par musicien
   - Notes par chanson
   - Notes par spectacle

3. **Coordonnez**
   - Visualisation de la salle
   - Positions assignées
   - Besoins techniques clairs

---

## 💡 **Cas d'usage pratiques**

### **Scénario 1: Nouveau spectacle avec étudiants**

1. Ajoutez les nouveaux étudiants dans **Musiciens**
2. Cochez "Étudiant piano" pour chacun
3. Créez les chansons du spectacle
4. Assignez les étudiants à leurs pièces
5. L'app calcule automatiquement:
   - Nombre de pianos nécessaires
   - Nombre de micros piano
   - Disposition optimale

### **Scénario 2: Collaboration avec professionnels**

1. Ajoutez les musiciens professionnels
2. Spécifiez leurs instruments (violon, chant, etc.)
3. Assignez-les aux chansons appropriées
4. L'app calcule:
   - Micros vocaux nécessaires
   - Micros d'instruments
   - Canaux de mixage requis

### **Scénario 3: Partage de configurations**

1. Configurez les patches clavier dans une chanson
2. Ajoutez les liens vers les partitions Dropbox
3. Attachez les enregistrements de référence
4. Les musiciens ont tout en un seul endroit:
   - Sons à utiliser
   - Partitions à lire
   - Exemples à écouter

### **Scénario 4: Planification technique**

1. Créez la disposition de salle
2. Placez chaque musicien
3. Ajoutez les micros nécessaires
4. L'outil affiche:
   - Vue d'ensemble de la scène
   - Statistiques des ressources
   - Plan pour les techniciens

---

## 🎯 **Avantages clés**

### **Pour les organisateurs**
- ✅ Vue complète de tous les musiciens
- ✅ Calculs automatiques des besoins
- ✅ Planning visuel de la salle
- ✅ Fiche technique générée automatiquement

### **Pour les musiciens**
- ✅ Accès direct aux partitions
- ✅ Enregistrements de référence
- ✅ Configurations de sons documentées
- ✅ Position claire sur scène

### **Pour les techniciens**
- ✅ Fiche technique détaillée
- ✅ Plan de scène visuel
- ✅ Comptage automatique des micros
- ✅ Besoins par instrument

### **Pour l'équipe**
- ✅ Collaboration centralisée
- ✅ Informations à jour
- ✅ Flexibilité d'organisation
- ✅ Professionnalisme accru

---

## 🚀 **Prochaines étapes**

1. **Explorez chaque section**
   - Musiciens
   - Chansons (avec médias)
   - Salle
   - Documents

2. **Ajoutez vos données**
   - Musiciens de votre groupe
   - Chansons de votre répertoire
   - Liens vers vos fichiers Dropbox

3. **Planifiez votre spectacle**
   - Utilisez tous les outils ensemble
   - Générez les documents nécessaires
   - Partagez avec l'équipe

4. **Itérez et améliorez**
   - Ajustez les configurations
   - Affinez les dispositions
   - Mettez à jour les informations

---

## 📞 **Support et questions**

Pour toute question sur les nouvelles fonctionnalités:
1. Consultez ce guide
2. Expérimentez dans l'application
3. Contactez l'administrateur

**Version**: 2.0 - Collaboration avancée  
**Mise à jour**: Novembre 2025  
🎵 **Créé pour le Spectacle Interlude**
