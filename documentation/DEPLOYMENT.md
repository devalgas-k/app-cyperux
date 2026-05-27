# Guide de Déploiement - Cyperux

Ce document décrit la stratégie de build et de déploiement de l'application Cyperux.

## 1. Conteneurisation (Docker & Jib)

Le projet utilise **Jib** (Google) pour générer des images Docker optimisées sans nécessiter de Docker Daemon sur la machine de build.
L'image finale contiendra l'application Spring Boot ainsi que les assets frontend pré-compilés.

### Créer l'image Docker locale

```bash
./mvnw compile jib:dockerBuild
```

Cette commande va :

1. Compiler le frontend (`npm run build`) via le `frontend-maven-plugin`.
2. Compiler le code Java.
3. Créer une image Docker nommée `cyperux:latest` et l'ajouter à votre daemon Docker local.

### Pousser vers un registre distant

```bash
./mvnw compile jib:build -Djib.to.image=registry.example.com/cyperux:latest -Djib.to.auth.username=user -Djib.to.auth.password=pass
```

## 2. Intégration Continue (CI)

Le projet est pré-configuré pour l'Intégration Continue (ex: `.gitlab-ci.yml` ou `.github/workflows/`).
Le pipeline standard effectue :

1. La vérification du formatage et des linters (Checkstyle, ESLint).
2. L'exécution des tests unitaires et de la couverture (Jacoco, Vitest).
3. L'exécution des tests d'intégration et BDD (Cucumber).
4. L'analyse SonarQube.
5. Le build de l'image Docker (Jib).

## 3. Variables d'Environnement de Production

Lors du déploiement en environnement cible, vous devez surcharger les variables définies dans `application.yml` en utilisant les variables d'environnement standard de Spring Boot :

- `SPRING_DATASOURCE_URL` : URL de la base de données PostgreSQL de production.
- `SPRING_DATASOURCE_USERNAME` : Utilisateur DB.
- `SPRING_DATASOURCE_PASSWORD` : Mot de passe DB.
- `SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI` : L'URL de l'Identity Provider (ex: URL Keycloak/Auth0 de prod).
- `SPRING_PROFILES_ACTIVE` : Profil Spring (ex: `prod`).

## 4. Stratégie de Base de Données

Lors du démarrage de l'application, **Liquibase** exécutera automatiquement les migrations en attente (`master.xml`) pour mettre à jour le schéma de base de données.
Il est crucial de ne jamais modifier un fichier de changelog existant une fois déployé. Pour toute modification, créez un nouveau fichier de migration.
