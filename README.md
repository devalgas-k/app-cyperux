# Cyperux

## Prerequisites

### Java

You need to have Java 25:

- [JDK 25](https://openjdk.java.net/projects/jdk/25/)

### Node.js and NPM

Before you can build this project, you must install and configure the following dependencies on your machine:

[Node.js](https://nodejs.org/): We use Node to run a development web server and build the project.
Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```
npm install
```

## Local environment

- [Local server](http://localhost:8080)
- [Local API doc](http://localhost:8080/swagger-ui.html)

<!-- seed4j-needle-localEnvironment -->

## Start up

```bash
./mvnw
```

```bash
docker compose -f src/main/docker/postgresql.yml up -d
```

```bash
docker compose -f src/main/docker/keycloak.yml up -d
```

<!-- seed4j-needle-startupCommand -->

## Documentation Complète

Pour comprendre l'architecture, l'API ou les processus de développement, référez-vous aux documents suivants :

- [Contexte IA & Vue d'ensemble (AI_CONTEXT.md)](documentation/AI_CONTEXT.md)
- [Architecture Technique (ARCHITECTURE.md)](documentation/ARCHITECTURE.md)
- [Documentation API (API.md)](documentation/API.md)
- [Base de Données (DATABASE.md)](documentation/DATABASE.md)
- [Guide de Développement (DEVELOPMENT.md)](documentation/DEVELOPMENT.md)
- [Guide de Déploiement (DEPLOYMENT.md)](documentation/DEPLOYMENT.md)

### Autres documentations techniques (dossier documentation/)

- [Hexagonal architecture](documentation/hexagonal-architecture.md)
- [Front hexagonal architecture](documentation/front-hexagonal-architecture.md)
- [Approval Testing](documentation/approval-testing.md)
- [Package types](documentation/package-types.md)
- [Assertions](documentation/assertions.md)
- [Property Based Testing](documentation/property-based-testing.md)
- [sonar](documentation/sonar.md)
- [PostgreSQL](documentation/postgresql.md)
- [Logs Spy](documentation/logs-spy.md)
- [Dev tools](documentation/dev-tools.md)
- [Caffeine](documentation/caffeine.md)
- [Application errors](documentation/application-errors.md)
- [CORS configuration](documentation/cors-configuration.md)
- [rest-page](documentation/rest-page.md)
- [Cucumber](documentation/cucumber.md)
- [Thymeleaf](documentation/thymeleaf.md)
- [Kipe authorization](documentation/kipe-authorization.md)
- [Kipe expression](documentation/kipe-expression.md)
- [Rest pagination](documentation/rest-pagination.md)
- [Cucumber authentication](documentation/cucumber-authentication.md)
- [Auth0](documentation/auth0.md)
- [Sample](documentation/sample.md)

<!-- seed4j-needle-documentation -->
