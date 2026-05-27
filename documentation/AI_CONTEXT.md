# Contexte IA - Projet Cyperux

Ce document fournit une analyse exhaustive du projet **Cyperux** pour permettre à une IA ou à un nouveau développeur de comprendre rapidement son fonctionnement, son architecture et ses choix techniques.

---

## 1. Vue d'ensemble du projet

Cyperux est une application full-stack (Java/Spring Boot pour le backend, React/Vite pour le frontend) construite sur les principes de l'**Architecture Hexagonale** (Ports et Adaptateurs) et du **Domain-Driven Design (DDD)**. Le projet a été généré et structuré avec un outil de type JHipster Lite / seed4j, garantissant un haut niveau de qualité, de modularité et de testabilité.

## 2. Architecture technique globale

Le projet utilise une **Architecture Hexagonale** stricte à la fois pour le backend et le frontend :

- **Backend (Java)** : Découpé en contextes métier (Bounded Contexts) comme `account`, `sample`. Chaque contexte est isolé et divisé en `application` (cas d'utilisation), `domain` (logique métier pure), et `infrastructure` (adaptateurs `primary` pour l'API REST et `secondary` pour la persistance/externe).
- **Frontend (React)** : Structure similaire avec `domain`, `infrastructure` (pour les appels API/stockage) et l'UI (pages et composants React).
- **Déploiement** : Conteneurisé via Docker et Jib, prêt pour le Cloud.

## 3. Rôle de chaque dossier et fichier important

- `src/main/java/com/cyperux/` : Code source backend.
  - `[module]/domain/` : Entités métier, interfaces des ports secondaires. (Sans dépendance framework).
  - `[module]/application/` : Services applicatifs (Use Cases).
  - `[module]/infrastructure/primary/` : Contrôleurs REST (Spring MVC).
  - `[module]/infrastructure/secondary/` : Implémentations DB (JPA/Hibernate, JOOQ).
  - `shared/` : Code partagé (gestion des erreurs, pagination, sécurité).
  - `wire/` : Configuration technique Spring Boot (Beans, Cache, Sécurité).
- `src/main/webapp/` : Code source frontend (React/Vite).
- `src/main/resources/config/` : Fichiers de configuration (`application.yml`, Liquibase).
- `pom.xml` & `package.json` : Gestionnaires de dépendances (Maven & NPM).
- `docker-compose.yml` & `src/main/docker/` : Services locaux (PostgreSQL, Keycloak).

## 4. Technologies utilisées et leur rôle

- **Backend** : Java 25, Spring Boot 4, Maven.
- **Base de données** : PostgreSQL, JPA/Hibernate, JOOQ (pour requêtes typesafe), Liquibase (migrations).
- **Sécurité** : Spring Security, OAuth2 / OIDC (Keycloak ou Auth0).
- **Frontend** : Node.js 24, React 19, Vite, TailwindCSS, HeroUI, i18next.
- **Tests** : JUnit 5, Cucumber (BDD), ArchUnit (tests d'architecture), Playwright (E2E), Vitest.
- **Qualité** : SonarQube, Checkstyle, ESLint, Prettier.

## 5. Principaux modules, services et responsabilités

- **Module `sample` (Beers)** : Exemple complet CRUD pour la gestion de bières (`Beer`, `BeerOrder`). Démontre l'architecture hexagonale.
- **Module `account`** : Gestion des comptes utilisateurs connectés via OAuth2.
- **Module `shared.authentication`** : Gestion du contexte de sécurité et des rôles.
- **Module `shared.kipe`** : Moteur d'autorisation granulaire et expressions de sécurité.
- **Module `shared.error`** : Gestion standardisée des exceptions et formatage des erreurs API.

## 6. Flux de données et interactions

1. **Requête entrante** : Le Frontend (React) appelle une route REST (ex: `/api/beers`).
2. **Primary Adapter** : Le contrôleur (`BeersResource`) valide les entrées et appelle l'Application Service.
3. **Application Service** : (`BeersApplicationService`) orchestre la logique, vérifie les droits via Kipe (`AccessChecker`), et interagit avec le Domaine.
4. **Domain** : Entités et règles métier pures exécutent la logique.
5. **Secondary Adapter** : L'Application Service appelle le repository (`BeersRepository`). L'adaptateur JPA (`JpaBeersRepository`) convertit l'entité domaine en entité JPA et interagit avec PostgreSQL.

## 7. Modèles de données / Schémas

- Les schémas sont gérés par **Liquibase** (`src/main/resources/config/liquibase/master.xml`).
- Exemple d'entité : `Beer` (ID, Name, State).
- Architecture DB : Utilisation du schéma `public` par défaut dans PostgreSQL.
- Approche : Les entités du domaine (`Beer.java`) sont découplées des entités JPA (`BeerEntity.java`).

## 8. Routes API et endpoints importants

- Toutes les API sont documentées via **OpenAPI / Swagger** (accessible via `/swagger-ui.html`).
- Endpoints de santé et métriques via **Spring Boot Actuator** (`/management/health`).
- Exemples de routes métier : `/api/beers` (GET, POST, DELETE).

## 9. Règles métier importantes

- L'architecture impose que le **Domaine** n'ait aucune dépendance vers Spring ou la base de données.
- Les validations métier complexes sont effectuées dans les constructeurs des objets du domaine (ex: `BeerName`, `Amount`).
- Les autorisations sont gérées de manière fine au niveau de l'Application Service via le module **Kipe**.

## 10. Authentification et permissions

- **Protocole** : OAuth2 / OpenID Connect.
- **Serveur d'identité** : Keycloak (en local via Docker) ou Auth0.
- **Permissions (Kipe)** : Le projet utilise un système custom `shared/kipe` pour évaluer les accès (`AccessEvaluator`, `AccessContext`) basé sur les rôles de l'utilisateur connecté (`AuthenticatedUser`).

## 11. Dépendances externes et intégrations

- **Keycloak** : Pour l'Identity and Access Management (IAM) local.
- **PostgreSQL** : Stockage persistant principal.
- **Logstash** : Configuration prête pour l'export des logs TCP.

## 12. Instructions d'installation et lancement

1. Démarrer les dépendances locales (DB + IAM) :
   ```bash
   docker compose -f src/main/docker/postgresql.yml up -d
   docker compose -f src/main/docker/keycloak.yml up -d
   ```
2. Lancer le backend :
   ```bash
   ./mvnw spring-boot:run
   ```
3. Lancer le frontend (dans un autre terminal) :
   ```bash
   npm install && npm run dev
   ```

## 13. Commandes utiles

- `npm run build` : Build complet du frontend.
- `npm run test:coverage` : Tests frontend avec Vitest.
- `npm run e2e` : Tests End-to-End avec Playwright.
- `./mvnw verify` : Build complet backend avec exécution des tests unitaires, intégration et Cucumber.
- `./mvnw compile jib:dockerBuild` : Création de l'image Docker de l'application.

## 14. Points faibles, risques ou zones à clarifier

- **Complexité de l'architecture** : L'architecture hexagonale stricte génère beaucoup de boilerplate (mapping entre entités Domaine, API et JPA).
- **Courbe d'apprentissage** : Les concepts de DDD, JOOQ, Cucumber et Kipe nécessitent un temps d'adaptation pour les nouveaux développeurs.
- **Synchronisation Front/Back** : Les modèles doivent être maintenus manuellement entre Java et TypeScript (bien que OpenAPI soit présent, il n'est peut-être pas utilisé pour générer les clients TS).

## 15. Proposition d'architecture cible (Améliorations)

1. **Génération de code frontend** : Utiliser l'OpenAPI (`openapi-contract.yml`) pour générer automatiquement les clients et interfaces TypeScript via `openapi-generator-cli`.
2. **CQRS** : Séparer explicitement les requêtes de lecture (via JOOQ directement) et d'écriture (via JPA/Domain) si la complexité métier ou les besoins de performance augmentent.
3. **Modularith** : S'assurer que les modules métier (ex: `sample`, `account`) restent indépendants (via Spring Modulith) pour faciliter une potentielle extraction en microservices à l'avenir.
