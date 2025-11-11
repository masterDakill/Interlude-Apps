# 🎸 Stage Layout - Plan de Développement

## 🎯 Objectif
Créer un éditeur de plan de scène drag & drop avec effet 3D CSS

## 📋 Checklist de Développement

### Phase 1: Base Fonctionnelle ✅ PRÊT À CODER
- [ ] Créer types TypeScript (`StageLayout`, `MusicianPosition`)
- [ ] Service Firebase `stageLayoutService.ts`
- [ ] Composant `StageLayoutEditor.tsx` (structure de base)
- [ ] Grid de positionnement (CSS Grid)
- [ ] Liste des musiciens disponibles

### Phase 2: Drag & Drop
- [ ] Installer `@dnd-kit/core` (moderne, léger)
- [ ] Rendre musiciens draggables
- [ ] Drop zones sur le grid
- [ ] Afficher positions en temps réel
- [ ] Bouton "Supprimer" pour retirer du stage

### Phase 3: Visuel 3D CSS
- [ ] Ajouter perspective CSS au container
- [ ] Transform 3D sur les cartes musiciens
- [ ] Ombres et profondeur
- [ ] Transitions fluides
- [ ] Mode "Vue Plan" vs "Vue Scène"

### Phase 4: Photos & Icônes
- [ ] Afficher photos des musiciens (depuis profil)
- [ ] Icônes instruments (emoji ou SVG)
- [ ] Avatar par défaut si pas de photo
- [ ] Orientation (flèche direction regard)

### Phase 5: Templates
- [ ] Template "Rock Band"
- [ ] Template "Jazz Quartet"
- [ ] Template "Solo + Backing"
- [ ] Bouton "Appliquer template"
- [ ] Bouton "Réinitialiser"

### Phase 6: Sauvegarde & Export
- [ ] Sauvegarde dans Firebase
- [ ] Liste des layouts par show
- [ ] Export PNG avec `html2canvas`
- [ ] Partage (URL unique)

---

## 🏗️ Architecture des Fichiers

```
src/
├── types/
│   └── stageLayout.ts         # Interfaces TypeScript
├── services/
│   └── stageLayoutService.ts  # CRUD Firebase
├── components/
│   ├── StageLayoutEditor.tsx  # Éditeur principal
│   ├── MusicianCard.tsx       # Carte draggable
│   ├── StageGrid.tsx          # Grille de placement
│   ├── TemplateSelector.tsx   # Sélecteur templates
│   └── StageLayoutList.tsx    # Liste des layouts
└── hooks/
    └── useStageLayout.ts      # Hook custom
```

---

## 📦 Dépendances à Installer

```bash
npm install @dnd-kit/core @dnd-kit/utilities
npm install html2canvas  # Pour export PNG
npm install framer-motion  # Animations fluides (optionnel)
```

---

## 🎨 Design System

### Couleurs
- **Stage**: #2a2a2a (gris foncé)
- **Grid**: #3a3a3a (lignes subtiles)
- **Cards**: #ffffff (blanc)
- **Accent**: #3b82f6 (bleu)

### Tailles
- **Card Musician**: 120px × 140px
- **Photo**: 80px diameter (cercle)
- **Grid cell**: 100px × 100px
- **Stage**: Responsive (min 600px, max 1200px)

### 3D Effects
```css
.stage-container {
  perspective: 1200px;
  perspective-origin: 50% 30%;
}

.stage-grid {
  transform: rotateX(45deg);
  transform-style: preserve-3d;
}

.musician-card {
  transform: translateZ(20px);
  transition: transform 0.3s ease;
}

.musician-card:hover {
  transform: translateZ(40px) scale(1.05);
}
```

---

## 🔧 Types TypeScript

```typescript
interface MusicianPosition {
  id: string;
  musicianId: string;
  x: number;  // 0-100 (pourcentage)
  y: number;  // 0-100 (pourcentage)
  rotation: number;  // 0-360 degrés
  instrument: string;
}

interface StageLayout {
  id: string;
  name: string;
  showId?: string;
  positions: MusicianPosition[];
  stageWidth: number;   // Largeur en mètres
  stageDepth: number;   // Profondeur en mètres
  viewMode: 'plan' | 'scene';
  createdAt: Date;
  updatedAt: Date;
}

interface StageTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  positions: Omit<MusicianPosition, 'id' | 'musicianId'>[];
}
```

---

## 🎯 Templates Pré-configurés

### Template 1: Rock Band
```typescript
{
  name: "Rock Band Standard",
  positions: [
    { x: 50, y: 85, rotation: 180, instrument: "drums" },
    { x: 25, y: 65, rotation: 180, instrument: "bass" },
    { x: 75, y: 65, rotation: 180, instrument: "guitar" },
    { x: 50, y: 35, rotation: 180, instrument: "vocals" }
  ]
}
```

### Template 2: Jazz Quartet
```typescript
{
  name: "Jazz Quartet",
  positions: [
    { x: 70, y: 70, rotation: 225, instrument: "piano" },
    { x: 30, y: 70, rotation: 135, instrument: "drums" },
    { x: 50, y: 50, rotation: 180, instrument: "bass" },
    { x: 50, y: 30, rotation: 180, instrument: "sax" }
  ]
}
```

### Template 3: Solo + Backing
```typescript
{
  name: "Artiste Solo + Musiciens",
  positions: [
    { x: 50, y: 25, rotation: 180, instrument: "vocals" },
    { x: 25, y: 60, rotation: 180, instrument: "keyboard" },
    { x: 50, y: 70, rotation: 180, instrument: "drums" },
    { x: 75, y: 60, rotation: 180, instrument: "guitar" }
  ]
}
```

---

## 📱 Responsive Design

### Desktop (> 1024px)
- Stage full width (max 1200px)
- Sidebar pour liste musiciens
- Dual view (Plan + Scène côte à côte)

### Tablet (768px - 1024px)
- Stage centré (800px)
- Liste musiciens en bas
- Toggle Plan/Scène

### Mobile (< 768px)
- Stage 100% width
- Liste musiciens collapsible
- Boutons plus grands (touch-friendly)
- Snap to grid plus agressif

---

## 🚀 Plan d'Exécution

**Temps estimé total: 5-6 heures**

1. **Setup (30min)**: Types, services, structure
2. **Phase 1 (1h)**: Grid de base + liste musiciens
3. **Phase 2 (1h30)**: Drag & drop fonctionnel
4. **Phase 3 (1h)**: Effets 3D CSS
5. **Phase 4 (1h)**: Photos + icônes + polish
6. **Phase 5 (30min)**: Templates
7. **Phase 6 (30min)**: Export PNG

---

## ✅ Critères de Succès

Un utilisateur peut:
- ✅ Glisser-déposer un musicien sur le stage
- ✅ Voir sa photo et son nom
- ✅ Changer l'orientation (rotation)
- ✅ Appliquer un template (rock, jazz, etc.)
- ✅ Voir en "Vue Plan" (édition) ou "Vue Scène" (3D)
- ✅ Sauvegarder le layout
- ✅ Exporter en PNG
- ✅ Réutiliser pour différents shows

---

## 🎬 READY TO START

En attente de confirmation que Firebase fonctionne, puis je démarre immédiatement!
