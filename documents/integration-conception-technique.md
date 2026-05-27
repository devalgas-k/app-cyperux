# Conception Technique : Intégration Next.js vers Vite (SPA)

Ce document synthétise la stratégie d'intégration du template `template-cyperux` (Next.js) vers l'application frontend principale (Vite/React), issue de la concertation entre l'Architecture, le Développement et l'UX/UI.

## 1. Enjeux et Architecture (Vision Architecte)
Le template d'origine utilise **Next.js** (App Router, SSR, conventions de nommage spécifiques comme `page.tsx`, `layout.tsx`). La cible est une **SPA (Single Page Application)** propulsée par **Vite** servie par Spring Boot.
* **Décision clé :** Abandon des spécificités serveur de Next.js. Le routage sera entièrement géré côté client.
* **Résolution des imports :** L'alias `@/` doit pointer vers `src/main/webapp/app/` pour conserver la compatibilité avec les composants shadcn/ui.

## 2. Remplacement des Spécificités Next.js (Vision Développeur)
L'absence du framework Next.js implique de remplacer ses API intégrées par des standards de l'écosystème React :
* **Routage :** Remplacement du App Router par `react-router-dom`.
  * `next/navigation` (`useRouter`, `usePathname`) ➔ `react-router-dom` (`useNavigate`, `useLocation`).
  * `next/link` (`<Link>`) ➔ `react-router-dom` (`<Link>`).
* **Mise en page :** Transformation des `layout.tsx` en composants Wrappers classiques (ex: `MainLayout.tsx`) avec un `<Outlet />` pour injecter les sous-pages.
* **Images :** Remplacement de `next/image` (`<Image>`) par des balises `<img />` standards ou un composant personnalisé gérant le lazy-loading.

## 3. Cohérence Visuelle et UX (Vision UX/UI)
Pour garantir que le rendu sous Vite soit 100% identique au template Next.js :
* **Polices de caractères :** Next.js gère l'optimisation des polices via `next/font`. Sous Vite, il faut importer manuellement les polices (ex: *Geist*, *Geist Mono*) dans le `index.html` ou le fichier CSS global.
* **Thème (Dark/Light mode) :** Le template utilise probablement `next-themes`. Il faut le remplacer par un équivalent agnostique au framework, manipulant directement les classes `.dark` sur l'élément `<html>`.
* **Variables CSS :** Les variables Tailwind (`globals.css`) ont déjà été fusionnées avec succès dans `index.css`.

## 4. Plan d'Action Détaillé (Étapes)

### Étape 1 : Mise en place du Routage
1. Installer `react-router-dom`.
2. Créer la configuration des routes dans `src/main/webapp/app/router.tsx`.
3. Définir les routes correspondant à `(dashboard)/hse/page.tsx`, etc.

### Étape 2 : Migration du Layout Principal
1. Copier `app-sidebar.tsx`, `app-header.tsx` et `layout.tsx` depuis le template.
2. Créer un composant `MainLayout.tsx` qui intègre la Sidebar et le Header.
3. Remplacer la prop `children` du layout Next.js par le composant `<Outlet />` de React Router.

### Étape 3 : Adaptation des Composants
1. Auditer les composants copiés pour identifier les imports `next/*`.
2. Remplacer tous les `<Link href="...">` par `<Link to="...">`.
3. Remplacer les hooks de navigation (`useRouter().push`) par `useNavigate()`.

### Étape 4 : Gestion des Polices et du Thème
1. Ajouter les balises `<link>` pour les polices *Geist* dans `src/main/webapp/index.html`.
2. Implémenter un contexte React `ThemeProvider` pour basculer la classe `dark` sur le `document.documentElement`, remplaçant ainsi `next-themes`.

### Étape 5 : Intégration des Pages
1. Migrer le contenu de `template-cyperux/app/(dashboard)/hse/page.tsx` vers un composant de vue Vite (ex: `src/main/webapp/app/hse/HsePage.tsx`).
2. Vérifier que toutes les dépendances UI locales sont correctement résolues via l'alias `@/shared/components/ui/`.
