# Guide de Développement - Cyperux

Ce guide vous aide à configurer votre environnement et à développer sur le projet Cyperux.

## 1. Prérequis

- **Java 25** (JDK 25)
- **Node.js 24** (et npm)
- **Docker** (et Docker Compose)

## 2. Démarrage de l'environnement local

Le projet a besoin de PostgreSQL et Keycloak (pour OAuth2) pour fonctionner.

```bash
# Lancer les dépendances avec Docker Compose
docker compose -f src/main/docker/postgresql.yml up -d
docker compose -f src/main/docker/keycloak.yml up -d

# Démarrer le Backend (Spring Boot)
./mvnw spring-boot:run

# Démarrer le Frontend (Vite/React) dans un nouveau terminal
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:9000` (Frontend Vite) ou `http://localhost:8080` (Backend API).

## 3. Commandes Backend (Maven)

- `./mvnw clean compile` : Compiler le projet Java.
- `./mvnw test` : Lancer les tests unitaires.
- `./mvnw verify` : Lancer tous les tests (unitaires, intégration, Cucumber) et vérifier la qualité du code (Checkstyle, Sonar, ArchUnit).
- `./mvnw spotless:apply` (si configuré) ou checkstyle : Vérifier le formatage.

## 4. Commandes Frontend (NPM)

- `npm run dev` : Démarrer le serveur de développement Vite.
- `npm run build` : Construire le frontend pour la production (TypeScript + Vite).
- `npm run test:coverage` : Lancer les tests unitaires avec Vitest et générer la couverture.
- `npm run lint` : Vérifier le code avec ESLint.
- `npm run prettier:format` : Formater le code avec Prettier.
- `npm run e2e` : Lancer les tests E2E avec Playwright (l'interface UI).

## 5. Bonnes pratiques de développement

1. **Architecture Hexagonale** :
   - Ne jamais importer de dépendance framework (Spring, JPA) dans le package `domain`.
   - Utiliser les Mappers dans l'`infrastructure` pour convertir les objets du domaine en DTOs (API) ou Entities (DB).
2. **Tests** :
   - Favoriser le Test-Driven Development (TDD) et Behavior-Driven Development (BDD).
   - Rédiger les specs métier sous forme de fichiers `.feature` (Cucumber) dans `src/test/features/`.
3. **Styles et Composants UI** :
   - Le projet utilise TailwindCSS et HeroUI pour l'interface.
   - Les maquettes ou composants de base peuvent être documentés via Tikui (dossier `src/main/style`).
