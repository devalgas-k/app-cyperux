# Base de Données - Cyperux

Ce document explique comment la base de données est gérée au sein du projet Cyperux.

## 1. Technologies Utilisées

- **PostgreSQL** : Moteur de base de données relationnelle.
- **Liquibase** : Outil de gestion des schémas et de migration de base de données.
- **Spring Data JPA / Hibernate** : ORM utilisé pour l'écriture et les cas d'utilisation complexes.
- **JOOQ** : Utilisé optionnellement pour générer du code Typesafe et faire des requêtes de lecture performantes.

## 2. Configuration

La configuration de la base de données se trouve dans `src/main/resources/config/application.yml` :

- L'URL locale par défaut est `jdbc:postgresql://localhost:5438/cyperux`.
- Un environnement Docker Compose est fourni (`src/main/docker/postgresql.yml`) pour lancer l'instance locale sur le port `5438`.

## 3. Gestion du Schéma (Liquibase)

Le schéma de la base de données n'est **pas** généré par Hibernate (`ddl-auto: none`). Il est géré explicitement par **Liquibase**.

- **Fichier maître** : `src/main/resources/config/liquibase/master.xml`.
- **Changelogs** : Les fichiers XML contenant les définitions de tables et modifications se trouvent dans `src/main/resources/config/liquibase/changelog/`.
- Chaque ajout de table, colonne ou index doit faire l'objet d'un nouveau fichier changelog déclaré dans le `master.xml`.

## 4. Architecture et Entités

Pour respecter l'architecture hexagonale :

1. **Domaine** : Les entités du domaine (`Beer.java`) sont de simples objets Java (POJO).
2. **Infrastructure** : Les entités JPA (`BeerEntity.java`) sont annotées avec `@Entity`, `@Table`, etc.
3. **Mappers** : L'adaptateur secondaire (ex: `JpaBeersRepository.java`) se charge de convertir l'objet `Beer` en `BeerEntity` avant de le sauvegarder, et inversement lors de la lecture.

## 5. JOOQ (Java Object Oriented Querying)

Le projet intègre JOOQ. Lors du build Maven, JOOQ se connecte à la base de données locale pour générer des classes Java Typesafe représentant le schéma SQL (tables, colonnes).

- Ces classes générées se trouvent dans `target/generated-sources/jooq/`.
- Cela permet d'écrire des requêtes SQL de manière fluide en Java, sans erreur de syntaxe.

## 6. Lancement local

Pour démarrer la base de données en local :

```bash
docker compose -f src/main/docker/postgresql.yml up -d
```
