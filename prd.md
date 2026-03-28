# TFT Learning Academy — Product Requirements Document

**Version:** 0.1 (Draft)
**Date:** 2026-03-27
**Phase:** 1 — Item Mastery

---

## 1. Overview

TFT Learning Academy is a beginner-focused web application designed to help new players understand Teamfight Tactics (Set 13) items — their stats, synergies, and strategic value. Phase 1 ships a self-contained "Item Mastery" module. Future phases will layer in Champion Guides and Team Comp builders on top of the same shell.

---

## 2. Problem Statement

New TFT players are overwhelmed by 60+ items, each with unique stat contributions and situational power. Existing resources (wikis, tier lists) assume prior knowledge and are not beginner-friendly. There is no single place that explains *what* an item does and *why* it matters in plain language.

---

## 3. Goals

| Goal | Metric |
|---|---|
| Players can identify any item by icon and name | < 5 s to find an item in the catalog |
| Players understand an item's stats at a glance | Stats visible without additional clicks |
| Players understand *why* to use an item | "Why it Matters" section shown on item detail |
| Players can discover recipes | Item Combinator returns correct result < 2 s |

---

## 4. Out of Scope (Phase 1)

- Champion Guides
- Team Comp Builder
- Augment Library
- User accounts / saved progress
- Live patch data ingestion (all data is static JSON for Phase 1)

---

## 5. Users

**Primary:** Players with < 50 TFT games who want to improve item knowledge.
**Secondary:** Returning players who want a quick stat reference.

---

## 6. Feature Requirements

### 6.1 Item Catalog

- Display all completed (non-component) Set 13 items in a grid layout.
- Each card shows:
  - Item icon (placeholder image for Phase 1, swappable to CDN URL later)
  - Item name
  - Primary stat tags (e.g., `+35 AD`, `+20% AS`)
  - Priority badge: `S`, `A`, `B`, `C` tier label
- Live search/filter bar: filters cards by name or stat keyword as user types.
- Item category filter tabs or sidebar (categories TBD — see Section 9).

### 6.2 Item Detail View

Triggered by clicking any item card. Shows:

- Large icon + item name + recipe (two component icons)
- Full stat block (all bonuses, formatted consistently)
- Unique passive name + description (if applicable)
- **"Why it Matters"** — 2-3 sentence beginner explanation of when and why to build this item
- **Best on:** a short list of champion archetypes (e.g., "Backline carries, AD snipers")
- Priority / Importance rating with a plain-English rationale

### 6.3 Item Combinator

- Two component slots (click to open a component picker)
- On selecting both components, immediately display:
  - The resulting completed item (icon + name)
  - A shortcut link to that item's detail view
- If no valid combination exists, show a friendly "No item found" message
- Reset button to clear both slots

### 6.4 Data Layer (`data/items.json`)

Schema per item:

```jsonc
{
  "id": "infinity_edge",
  "name": "Infinity Edge",
  "icon": "/icons/infinity_edge.png",   // placeholder path
  "category": "ad",                      // ad | ap | tank | utility
  "tier": "S",                           // S | A | B | C
  "components": ["b_f_sword", "sparring_gloves"],
  "stats": {
    "ad": 35,
    "crit_chance": 35
  },
  "passive": {
    "name": "Crits",
    "description": "Critical strikes deal 10% bonus true damage."
  },
  "why_it_matters": "Infinity Edge is the gold standard for AD carries. The true damage passive makes it irreplaceable on snipers like Jinx or Caitlyn.",
  "best_on": ["AD carries", "Backline snipers"],
  "priority": 9   // 1–10 scale
}
```

---

## 7. Technical Architecture

```
tft-academy/                         ← Next.js project root
├── public/
│   └── icons/                       # placeholder item icons (swap to CDN later)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          # persistent left rail nav
│   │   │   └── PageShell.tsx        # sidebar + main content wrapper
│   │   ├── catalog/
│   │   │   ├── ItemGrid.tsx         # responsive card grid
│   │   │   ├── ItemCard.tsx         # individual item tile
│   │   │   ├── SearchBar.tsx        # live name/stat search
│   │   │   └── CategoryTabs.tsx     # AD | AP | Tank | Utility filter tabs
│   │   ├── detail/
│   │   │   ├── ItemModal.tsx        # modal overlay container
│   │   │   ├── StatBlock.tsx        # formatted stat list
│   │   │   ├── WhyItMatters.tsx     # beginner explanation block
│   │   │   └── RecipePills.tsx      # two component icons → item
│   │   └── combinator/
│   │       ├── Combinator.tsx       # two-slot combinator UI
│   │       ├── ComponentPicker.tsx  # modal/dropdown to pick a component
│   │       └── ResultDisplay.tsx    # shows resulting item
│   ├── data/
│   │   └── items.json               # canonical item data
│   ├── hooks/
│   │   └── useItemFilter.ts         # search + category filter logic
│   ├── pages/
│   │   ├── index.tsx                # Item Catalog (with modal state)
│   │   └── combinator.tsx           # Item Combinator page
│   └── types/
│       └── item.ts                  # TypeScript interfaces
├── data/
│   └── items.json
├── tailwind.config.js
└── prd.md
```

**Modularity note:** Each feature area (catalog, detail, combinator) lives in its own component folder and is independent of the others. Adding a `champions/` or `comps/` feature in Phase 2 requires only a new folder, new data file, and a new nav entry — zero changes to existing feature code.

---

## 8. Design System

| Token | Value |
|---|---|
| Background | `#0f0f1a` (near-black) |
| Surface | `#1a1a2e` |
| Accent Purple | `#7c3aed` |
| Accent Gold | `#f59e0b` |
| Text Primary | `#f1f5f9` |
| Text Secondary | `#94a3b8` |
| Font | Inter (body), Cinzel or Orbitron (headings) |

Dark mode only for Phase 1. Tailwind CSS utility classes throughout; no external UI component library (keeps bundle small and style consistent).

---

## 9. Design Decisions (resolved)

| Question | Decision | Rationale |
|---|---|---|
| Navigation layout | **Sidebar** (persistent left rail) | Easy to extend with Phase 2 sections without restructuring layout |
| Item categories | **By Stat Type** — AD / AP / Tank / Utility | Mirrors how players think about building for a carry's damage type |
| Item Detail UX | **Modal overlay** | User stays in catalog context; no page navigation needed |
| React setup | **Next.js** | File-based routing, SSR/SSG ready, better for future SEO on item/champion pages |

---

## 10. Phase 2 Hooks (design now, build later)

- Navigation shell must support adding new top-level sections without restructuring layout
- `data/` folder will grow: `champions.json`, `comps.json`, `augments.json`
- Item data schema versioned with a `set` field so Set 14 data can coexist
- Component architecture allows reusing `ItemCard` inside Champion Guide pages

---

## 11. Milestones

| Milestone | Deliverable |
|---|---|
| M0 | PRD approved, design questions resolved |
| M1 | `data/items.json` seeded with 20 representative items |
| M2 | Item Catalog — grid + search + filter |
| M3 | Item Detail view |
| M4 | Item Combinator |
| M5 | Polish pass — animations, mobile layout, accessibility |
