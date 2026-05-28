---
status: done
baseline_commit: 21968b696d4866fe08a3367c03acd853113a187b
---

# Card Standardization Spec

## Objective
Uniformiser la disposition des cards statistiques en appliquant le même design et comportement que celui utilisé dans `PlanningPage.tsx`. Étendre cette disposition aux pages `projects`, `daily-report`, `logistics`, `resources`, `documents`, `hse`, `organization`.
Exception : Ne pas modifier `dashboard`.

## Scope
1. **InteractiveStatCard.tsx** : Mettre à jour le design pour correspondre à `PlanningPage.tsx` (Label en haut à gauche, Valeur en bas à gauche, Icône à droite dans un cercle `rounded-full`). Ajouter les effets `hover:scale-[1.02] hover:shadow-lg`.
2. **HorizontalCardList.tsx** (Nouveau composant) : Créer un conteneur générique `StatCardList` qui gère l'affichage. 
   - Utilise `flex` au lieu de `grid`.
   - Comportement : `overflow-x-hidden hover:overflow-x-auto`.
   - Les enfants ont un `min-w-[240px] flex-1` pour qu'ils prennent tout l'espace s'ils sont <= 4, et déclenchent le scroll s'ils sont > 4.
3. **Pages à refactoriser** :
   - Remplacer les grilles statiques (`grid gap-4 md:grid-cols-X`) contenant les `InteractiveStatCard` par `<StatCardList>`.
   - Pour `DailyReportPage.tsx` et `LogisticsPage.tsx` qui utilisent des `<Card>` manuelles pour les statistiques, les remplacer par `<InteractiveStatCard>` encapsulées dans `<StatCardList>`.
   - Vérifier et mettre à jour `ProjectsPage.tsx`, `ResourcesPage.tsx`, `HsePage.tsx`, `DocumentsPage.tsx`, `OrganizationPage.tsx`.

## Technical Details
- Composant `StatCardList` :
  ```tsx
  export function StatCardList({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex gap-4 overflow-x-hidden hover:overflow-x-auto pb-2 -mb-2 snap-x scroll-smooth">
        {React.Children.map(children, child => (
          <div className="min-w-[240px] flex-1 snap-start">
            {child}
          </div>
        ))}
      </div>
    )
  }
  ```
- Composant `InteractiveStatCard` : 
  Adaptation du DOM interne pour correspondre au design visé.

## Test Plan
- S'assurer que le Dashboard n'est pas modifié.
- Vérifier le hover (scroll horizontal) sur une page avec 5 cards (ex: ProjectsPage).
- Vérifier qu'il n'y a pas de scroll sur une page avec 4 cards.
- Vérifier la cohérence visuelle.

## Suggested Review Order

**Composants Partagés**

- Conteneur flexible permettant le défilement horizontal lorsque > 4 éléments.
  [`stat-card-list.tsx:10`](../../../src/main/webapp/app/shared/components/custom/stat-card-list.tsx#L10)

- Ajustement du design pour correspondre au planning et intégration dans la grille flexible.
  [`interactive-stat-card.tsx:75`](../../../src/main/webapp/app/shared/components/custom/interactive-stat-card.tsx#L75)

**Pages Mises à Jour**

- Remplacement des grilles statiques par StatCardList pour le suivi logistique.
  [`LogisticsPage.tsx:103`](../../../src/main/webapp/app/templates/logistics/LogisticsPage.tsx#L103)

- Harmonisation des cartes statistiques journalières avec les nouveaux composants.
  [`DailyReportPage.tsx:269`](../../../src/main/webapp/app/templates/daily-report/DailyReportPage.tsx#L269)

- Intégration du composant liste sur les pages projets, documents, HSE, et ressources.
  [`ProjectsPage.tsx:271`](../../../src/main/webapp/app/templates/projects/ProjectsPage.tsx#L271)
