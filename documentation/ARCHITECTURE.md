# Architecture Technique - Cyperux

Ce document décrit l'architecture logicielle de l'application Cyperux, conçue pour être robuste, testable et indépendante des frameworks techniques.

## 1. Principes Fondamentaux

Le projet suit les principes de l'**Architecture Hexagonale** (ou Ports et Adaptateurs) couplée au **Domain-Driven Design (DDD)**.
L'objectif est d'isoler la logique métier (le "Cœur" ou "Domaine") de la technologie (Bases de données, Frameworks Web, API externes).

## 2. Découpage Modulaire

L'application est divisée en plusieurs **Bounded Contexts** (Modules métier) :

- `com.cyperux.sample` : Module d'exemple (Gestion de bières).
- `com.cyperux.account` : Gestion du profil utilisateur.
- `com.cyperux.shared` : Briques transverses techniques et métier (Erreurs, Pagination, Kipe pour l'autorisation).
- `com.cyperux.wire` : Configuration d'assemblage technique de Spring Boot.

## 3. L'Hexagone (Structure d'un module)

Chaque module métier respecte la structure suivante :

### A. `domain` (Le cœur)

- Ne contient **aucune** dépendance vers Spring, JPA ou le web.
- Contient les **Entités**, les **Value Objects** et les **Interfaces des Ports** (ex: `BeersRepository`).

### B. `application` (L'orchestrateur)

- Contient les **Application Services** (Cas d'utilisation).
- Orchestre les appels entre le domaine et les adaptateurs secondaires.
- Gère la validation des autorisations (via Kipe).

### C. `infrastructure` (L'extérieur)

L'infrastructure contient les adaptateurs qui implémentent les interfaces (Ports) définies par le domaine ou qui exposent l'application au monde extérieur.

#### `infrastructure/primary` (Entrées)

- **Contrôleurs REST** (Spring MVC).
- Convertit les requêtes HTTP (DTOs) en appels vers l'Application Service.
- Gère le routage et les codes statuts HTTP.

#### `infrastructure/secondary` (Sorties)

- **Persistance** : Implémentation des repositories via Spring Data JPA ou JOOQ.
- Convertit les entités du Domaine en Entités JPA (et inversement).
- **API Externes** : Appels HTTP sortants.

## 4. Architecture Frontend

Le code frontend (`src/main/webapp/app`) suit également une philosophie hexagonale simplifiée :

- `domain` : Modèles TypeScript purs.
- `services` / `application` : Logique de récupération et transformation des données.
- `infrastructure` :
  - `primary` : Composants React, Vues, CSS.
  - `secondary` : Appels `axios` ou `fetch` vers le backend.

## 5. Tests et Qualité

L'architecture est validée en continu par :

- **ArchUnit** : Vérifie qu'aucune dépendance illégale n'existe (ex: le Domaine ne doit pas importer de classes `org.springframework`).
- **Cucumber** : Tests comportementaux (BDD) validant les cas d'utilisation métier de bout en bout.
