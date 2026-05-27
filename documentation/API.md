# API Documentation - Cyperux

L'application Cyperux expose une API RESTful sécurisée par OAuth2.

## 1. Documentation Interactive

Une fois l'application démarrée, l'interface Swagger UI est disponible à l'adresse :
👉 **[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**

Cette interface permet de :

- Explorer tous les endpoints disponibles.
- Voir les schémas de requêtes et de réponses (OpenAPI).
- S'authentifier et tester les endpoints directement depuis le navigateur.

## 2. Principes de l'API

- **Format** : Toutes les requêtes et réponses utilisent le format `application/json`.
- **Pagination** : Gérée via le standard interne (module `shared.pagination`). Les paramètres typiques sont `page` (index) et `pageSize`.
- **Gestion des Erreurs** : Les erreurs sont standardisées selon la RFC 7807 (Problem Details for HTTP APIs). En cas d'erreur, le backend renvoie un JSON contenant `type`, `title`, `status`, `detail`, et une `errorKey`.

## 3. Sécurité

L'API est protégée par **OAuth2** (JWT).

- Le token doit être passé dans l'en-tête HTTP : `Authorization: Bearer <token>`.
- Le serveur valide le JWT auprès de l'Identity Provider (ex: Keycloak local sur le port `9080`).

## 4. Endpoints Principaux

### Actuator (Supervision)

- `GET /management/health` : État de santé de l'application.
- `GET /management/info` : Informations sur la version (Git, Build).

### Exemples Métier (Module Sample)

- `GET /api/beers` : Liste les bières paginées.
- `POST /api/beers` : Ajoute une nouvelle bière.
- `DELETE /api/beers/{id}` : Supprime une bière existante.

### Comptes Utilisateurs

- `GET /api/accounts/me` : Récupère les informations de l'utilisateur actuellement authentifié.

## 5. Contrats OpenAPI

Le projet génère automatiquement le contrat OpenAPI lors du build via le plugin Maven `openapi-maven-plugin`. Le fichier résultant (`openapi-contract.yml`) se trouve généralement dans le dossier `target/`. Il peut être utilisé pour générer des clients frontends ou des tests d'intégration.
