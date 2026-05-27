[INFO]
[INFO] ------------------------< com.cyperux:cyperux >-------------------------
[INFO] Building cyperux 0.0.1-SNAPSHOT
[INFO] from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- clean:3.2.0:clean (default-clean) @ cyperux ---
[INFO]
[INFO] --- enforcer:3.6.2:enforce (enforce-versions) @ cyperux ---
[INFO] Rule 0: org.apache.maven.enforcer.rules.version.RequireMavenVersion passed
[INFO] Rule 1: org.apache.maven.enforcer.rules.version.RequireJavaVersion passed
[INFO]
[INFO] --- enforcer:3.6.2:enforce (enforce-dependencyConvergence) @ cyperux ---
[WARNING] Rule 0: org.apache.maven.enforcer.rules.dependency.DependencyConvergence failed with message:
Failed while enforcing releasability.
Dependency convergence error for org.apache.commons:commons-lang3:jar:3.20.0. Paths to dependency are:
+-com.cyperux:cyperux:jar:0.0.1-SNAPSHOT
+-org.apache.commons:commons-lang3:jar:3.20.0:compile
and
+-com.cyperux:cyperux:jar:0.0.1-SNAPSHOT
+-org.springframework.boot:spring-boot-starter-liquibase:jar:4.0.1:compile
+-org.springframework.boot:spring-boot-liquibase:jar:4.0.1:compile
+-org.liquibase:liquibase-core:jar:5.0.1:compile
+-com.opencsv:opencsv:jar:5.12.0:compile
+-org.apache.commons:commons-lang3:jar:3.19.0:compile
and
+-com.cyperux:cyperux:jar:0.0.1-SNAPSHOT
+-org.springframework.boot:spring-boot-starter-liquibase:jar:4.0.1:compile
+-org.springframework.boot:spring-boot-liquibase:jar:4.0.1:compile
+-org.liquibase:liquibase-core:jar:5.0.1:compile
+-org.apache.commons:commons-lang3:jar:3.19.0:compile
and
+-com.cyperux:cyperux:jar:0.0.1-SNAPSHOT
+-org.springdoc:springdoc-openapi-starter-webmvc-api:jar:3.0.0:compile
+-org.springdoc:springdoc-openapi-starter-common:jar:3.0.0:compile
+-io.swagger.core.v3:swagger-core-jakarta:jar:2.2.38:compile
+-org.apache.commons:commons-lang3:jar:3.19.0:compile
Dependency convergence error for org.apache.commons:commons-text:jar:1.13.1. Paths to dependency are:
+-com.cyperux:cyperux:jar:0.0.1-SNAPSHOT
+-org.springframework.boot:spring-boot-starter-liquibase:jar:4.0.1:compile
+-org.springframework.boot:spring-boot-liquibase:jar:4.0.1:compile
+-org.liquibase:liquibase-core:jar:5.0.1:compile
+-com.opencsv:opencsv:jar:5.12.0:compile
+-org.apache.commons:commons-text:jar:1.13.1:compile
and
+-com.cyperux:cyperux:jar:0.0.1-SNAPSHOT
+-org.springframework.boot:spring-boot-starter-liquibase:jar:4.0.1:compile
+-org.springframework.boot:spring-boot-liquibase:jar:4.0.1:compile
+-org.liquibase:liquibase-core:jar:5.0.1:compile
+-org.apache.commons:commons-text:jar:1.14.0:compile
[INFO]
[INFO] --- checkstyle:3.6.0:check (validate) @ cyperux ---
[INFO] Début de la vérification...
Vérification terminée.
[INFO] You have 0 Checkstyle violations.
[INFO]
[INFO] --- jacoco:0.8.14:prepare-agent (pre-unit-tests) @ cyperux ---
[INFO] argLine set to -javaagent:/Users/devalgas/.m2/repository/org/jacoco/org.jacoco.agent/0.8.14/org.jacoco.agent-0.8.14-runtime.jar=destfile=/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/target/jacoco.exec
[INFO]
[INFO] --- properties:1.2.1:read-project-properties (default-cli) @ cyperux ---
[INFO] Loading 48 properties from File: /Users/devalgas/Documents/projets/perso/bmad/app-cyperux/sonar-project.properties
[INFO]
[INFO] --- git-commit-id:9.0.2:revision (default) @ cyperux ---
[INFO]
[INFO] --- jooq-codegen:3.20.10:generate (jooq-codegen) @ cyperux ---
[INFO]
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@ @@ @@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@
@@@@@@@@@@@@@@@@ @@ @@ @@@@@@@@@@
@@@@@@@@@@ @@@@ @@ @@ @@@@@@@@@@
@@@@@@@@@@ @@ @@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@ @@ @@@@@@@@@@
@@@@@@@@@@ @@ @@ @@@@ @@@@@@@@@@
@@@@@@@@@@ @@ @@ @@@@ @@@@@@@@@@
@@@@@@@@@@ @@ @ @ @@@@@@@@@@
@@@@@@@@@@ @@ @@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Thank you for using jOOQ 3.20.10 (Build date: 2025-12-05T08:57:46Z)
[INFO]
jOOQ tip of the day: In addition to <includes> and <excludes>, you can also use <includesSql> and <excludesSql> to generate regular expressions for the code generator! https://www.jooq.org/doc/latest/manual/code-generation/codegen-advanced/codegen-config-database/codegen-database-includes-excludes/
[INFO] Database : Inferring driver org.postgresql.Driver from URL jdbc:postgresql://localhost:5438/cyperux
[INFO] No <inputCatalog/> was provided. Generating ALL available catalogs instead.
[INFO] License parameters  
[INFO] ----------------------------------------------------------
[INFO] Thank you for using jOOQ and jOOQ's code generator
[INFO]  
[INFO] Database parameters  
[INFO] ----------------------------------------------------------
[INFO] dialect : POSTGRES
[INFO] URL : jdbc:postgresql://localhost:5438/cyperux
[INFO] target dir : /Users/devalgas/Documents/projets/perso/bmad/app-cyperux/target/generated-sources/jooq
[INFO] target package : org.jooq.codegen
[INFO] includes : [.*]
[INFO] excludes : []
[INFO] includeExcludeColumns : false
[INFO] ----------------------------------------------------------
[INFO]  
[INFO] JavaGenerator parameters
[INFO] ----------------------------------------------------------
[INFO] annotations  
[INFO] generated : false
[INFO] JPA : false
[INFO] JPA version :
[INFO] validation : false
[INFO] spring : false
[INFO] comments  
[INFO] comments : true
[INFO] on attributes : true
[INFO] on catalogs : true
[INFO] on columns : true
[INFO] on embeddables : true
[INFO] on keys : true
[INFO] on links : true
[INFO] on packages : true
[INFO] on parameters : true
[INFO] on queues : true
[INFO] on routines : true
[INFO] on schemas : true
[INFO] on sequences : true
[INFO] on tables : true
[INFO] on udts : true
[INFO] sources  
[INFO] sources : true
[INFO] sources on views : true
[INFO] global references  
[INFO] global references : true
[INFO] catalogs : true
[INFO] domains : true
[INFO] indexes : true
[INFO] keys : true
[INFO] links : true
[INFO] queues : true
[INFO] routines : true
[INFO] schemas : true
[INFO] sequences : true
[INFO] tables : true
[INFO] udts : true
[INFO] object types  
[INFO] daos : false
[INFO] indexes : true
[INFO] instance fields : true
[INFO] interfaces : false
[INFO] interfaces (immutable) : false
[INFO] javadoc : true
[INFO] keys : true
[INFO] links : true
[INFO] pojos : false
[INFO] pojos (immutable) : false
[INFO] queues : true
[INFO] records : true
[INFO] routines : true
[INFO] sequences : true
[INFO] sequenceFlags : true
[INFO] table-valued functions : true
[INFO] tables : true
[INFO] udts : true
[INFO] relations : true
[INFO] other  
[INFO] deprecated code : true
[INFO] ----------------------------------------------------------
[INFO]  
[INFO] Generation remarks  
[INFO] ----------------------------------------------------------
[INFO]  
[INFO] ----------------------------------------------------------
[INFO] Generating catalogs : Total: 1
[INFO] Version : Database version is supported by dialect POSTGRES: 18.1 (Debian 18.1-1.pgdg13+2)
[INFO] ARRAYs fetched : 0 (0 included, 0 excluded)
[INFO] Domains fetched : 0 (0 included, 0 excluded)
[INFO] Tables fetched : 0 (0 included, 0 excluded)
[INFO] Embeddables fetched : 0 (0 included, 0 excluded)
[INFO] Enums fetched : 0 (0 included, 0 excluded)
[INFO] Packages fetched : 0 (0 included, 0 excluded)
[INFO] Routines fetched : 0 (0 included, 0 excluded)
[INFO] Sequences fetched : 0 (0 included, 0 excluded)
[INFO] UDTs fetched : 0 (0 included, 0 excluded)
[INFO] Excluding empty catalog :
[INFO] Affected files: 0  
[INFO] Modified files: 0  
[INFO] No modified files : This code generation run has not produced any file modifications.
This means, the schema has not changed, and no other parameters (jOOQ version, driver version, database version,
and any configuration elements) have changed either.
In automated builds, it is recommended to prevent unnecessary code generation runs. This run took: 278.545ms
Possible means to prevent this:

- Use manual code generation and check in generated sources: https://www.jooq.org/doc/latest/manual/code-generation/codegen-version-control/
- Use schema version providers: https://www.jooq.org/doc/latest/manual/code-generation/codegen-advanced/codegen-config-database/codegen-database-version-providers/
- Use gradle tasks and inputs: https://docs.gradle.org/current/userguide/incremental_build.html
  [INFO] Removing excess files  
  [INFO]
  [INFO] --- frontend:2.0.0:install-node-and-npm (install-node-and-npm) @ cyperux ---
  [INFO] Installing node version v24.12.0
  [INFO] Unpacking /Users/devalgas/.m2/repository/com/github/eirslett/node/24.12.0/node-24.12.0-darwin-arm64.tar.gz into /Users/devalgas/Documents/projets/perso/bmad/app-cyperux/target/node/tmp
  [INFO] Copying node binary from /Users/devalgas/Documents/projets/perso/bmad/app-cyperux/target/node/tmp/node-v24.12.0-darwin-arm64/bin/node to /Users/devalgas/Documents/projets/perso/bmad/app-cyperux/target/node/node
  [INFO] Installed node locally.
  [INFO] Installing npm version 11.7.0
  [INFO] Unpacking /Users/devalgas/.m2/repository/com/github/eirslett/npm/11.7.0/npm-11.7.0.tar.gz into /Users/devalgas/Documents/projets/perso/bmad/app-cyperux/target/node/node_modules
  [INFO] Installed npm locally.
  [INFO]
  [INFO] --- frontend:2.0.0:npm (npm install) @ cyperux ---
  [INFO] Running 'npm install' in /Users/devalgas/Documents/projets/perso/bmad/app-cyperux
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: cssnano-preset-default@7.0.17
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn cssnano-preset-default@"^7.0.10" from cssnano@7.1.2
  [INFO] npm warn node_modules/cssnano
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn cssnano-preset-default@"^7.0.10" from cssnano@7.1.2
  [INFO] npm warn node_modules/cssnano
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: cssnano-utils@5.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from cssnano-utils@5.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/cssnano-utils
  [INFO] npm warn cssnano-utils@"^5.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn 4 more (postcss-merge-rules, postcss-minify-gradients, ...)
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from cssnano-utils@5.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/cssnano-utils
  [INFO] npm warn cssnano-utils@"^5.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn 4 more (postcss-merge-rules, postcss-minify-gradients, ...)
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-colormin@7.0.10
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-colormin@7.0.10
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-colormin
  [INFO] npm warn postcss-colormin@"^7.0.10" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-colormin@7.0.10
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-colormin
  [INFO] npm warn postcss-colormin@"^7.0.10" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-convert-values@7.0.12
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-convert-values@7.0.12
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-convert-values
  [INFO] npm warn postcss-convert-values@"^7.0.12" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-convert-values@7.0.12
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-convert-values
  [INFO] npm warn postcss-convert-values@"^7.0.12" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-discard-comments@7.0.8
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-discard-comments@7.0.8
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-discard-comments
  [INFO] npm warn postcss-discard-comments@"^7.0.8" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-discard-comments@7.0.8
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-discard-comments
  [INFO] npm warn postcss-discard-comments@"^7.0.8" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-discard-duplicates@7.0.4
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-discard-duplicates@7.0.4
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-discard-duplicates
  [INFO] npm warn postcss-discard-duplicates@"^7.0.4" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-discard-duplicates@7.0.4
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-discard-duplicates
  [INFO] npm warn postcss-discard-duplicates@"^7.0.4" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-discard-empty@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-discard-empty@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-discard-empty
  [INFO] npm warn postcss-discard-empty@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-discard-empty@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-discard-empty
  [INFO] npm warn postcss-discard-empty@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-discard-overridden@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-discard-overridden@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-discard-overridden
  [INFO] npm warn postcss-discard-overridden@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-discard-overridden@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-discard-overridden
  [INFO] npm warn postcss-discard-overridden@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-merge-longhand@7.0.7
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-merge-longhand@7.0.7
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-merge-longhand
  [INFO] npm warn postcss-merge-longhand@"^7.0.7" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-merge-longhand@7.0.7
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-merge-longhand
  [INFO] npm warn postcss-merge-longhand@"^7.0.7" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-merge-rules@7.0.11
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-merge-rules@7.0.11
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-merge-rules
  [INFO] npm warn postcss-merge-rules@"^7.0.11" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-merge-rules@7.0.11
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-merge-rules
  [INFO] npm warn postcss-merge-rules@"^7.0.11" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-minify-font-values@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-minify-font-values@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-minify-font-values
  [INFO] npm warn postcss-minify-font-values@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-minify-font-values@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-minify-font-values
  [INFO] npm warn postcss-minify-font-values@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-minify-gradients@7.0.5
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-minify-gradients@7.0.5
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-minify-gradients
  [INFO] npm warn postcss-minify-gradients@"^7.0.5" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-minify-gradients@7.0.5
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-minify-gradients
  [INFO] npm warn postcss-minify-gradients@"^7.0.5" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-minify-params@7.0.9
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-minify-params@7.0.9
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-minify-params
  [INFO] npm warn postcss-minify-params@"^7.0.9" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-minify-params@7.0.9
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-minify-params
  [INFO] npm warn postcss-minify-params@"^7.0.9" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-minify-selectors@7.1.2
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-minify-selectors@7.1.2
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-minify-selectors
  [INFO] npm warn postcss-minify-selectors@"^7.1.2" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-minify-selectors@7.1.2
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-minify-selectors
  [INFO] npm warn postcss-minify-selectors@"^7.1.2" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-charset@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-charset@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-charset
  [INFO] npm warn postcss-normalize-charset@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-charset@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-charset
  [INFO] npm warn postcss-normalize-charset@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-display-values@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-display-values@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-display-values
  [INFO] npm warn postcss-normalize-display-values@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-display-values@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-display-values
  [INFO] npm warn postcss-normalize-display-values@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-positions@7.0.4
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-positions@7.0.4
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-positions
  [INFO] npm warn postcss-normalize-positions@"^7.0.4" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-positions@7.0.4
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-positions
  [INFO] npm warn postcss-normalize-positions@"^7.0.4" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-repeat-style@7.0.4
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-repeat-style@7.0.4
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-repeat-style
  [INFO] npm warn postcss-normalize-repeat-style@"^7.0.4" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-repeat-style@7.0.4
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-repeat-style
  [INFO] npm warn postcss-normalize-repeat-style@"^7.0.4" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-string@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-string@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-string
  [INFO] npm warn postcss-normalize-string@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-string@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-string
  [INFO] npm warn postcss-normalize-string@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-timing-functions@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-timing-functions@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-timing-functions
  [INFO] npm warn postcss-normalize-timing-functions@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-timing-functions@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-timing-functions
  [INFO] npm warn postcss-normalize-timing-functions@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-unicode@7.0.9
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-unicode@7.0.9
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-unicode
  [INFO] npm warn postcss-normalize-unicode@"^7.0.9" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-unicode@7.0.9
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-unicode
  [INFO] npm warn postcss-normalize-unicode@"^7.0.9" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-url@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-url@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-url
  [INFO] npm warn postcss-normalize-url@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-url@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-url
  [INFO] npm warn postcss-normalize-url@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-normalize-whitespace@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-whitespace@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-whitespace
  [INFO] npm warn postcss-normalize-whitespace@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-normalize-whitespace@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-normalize-whitespace
  [INFO] npm warn postcss-normalize-whitespace@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-ordered-values@7.0.4
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-ordered-values@7.0.4
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-ordered-values
  [INFO] npm warn postcss-ordered-values@"^7.0.4" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-ordered-values@7.0.4
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-ordered-values
  [INFO] npm warn postcss-ordered-values@"^7.0.4" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-reduce-initial@7.0.9
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-reduce-initial@7.0.9
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-reduce-initial
  [INFO] npm warn postcss-reduce-initial@"^7.0.9" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-reduce-initial@7.0.9
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-reduce-initial
  [INFO] npm warn postcss-reduce-initial@"^7.0.9" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-reduce-transforms@7.0.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-reduce-transforms@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-reduce-transforms
  [INFO] npm warn postcss-reduce-transforms@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-reduce-transforms@7.0.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-reduce-transforms
  [INFO] npm warn postcss-reduce-transforms@"^7.0.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-svgo@7.1.3
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-svgo@7.1.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-svgo
  [INFO] npm warn postcss-svgo@"^7.1.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-svgo@7.1.3
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-svgo
  [INFO] npm warn postcss-svgo@"^7.1.3" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: postcss-unique-selectors@7.0.7
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-unique-selectors@7.0.7
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-unique-selectors
  [INFO] npm warn postcss-unique-selectors@"^7.0.7" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from postcss-unique-selectors@7.0.7
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-unique-selectors
  [INFO] npm warn postcss-unique-selectors@"^7.0.7" from cssnano-preset-default@7.0.17
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default
  [INFO] npm warn ERESOLVE overriding peer dependency
  [INFO] npm warn While resolving: stylehacks@7.0.11
  [INFO] npm warn Found: postcss@8.5.6
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn dev postcss@"8.5.6" from the root project
  [INFO] npm warn 17 more (autoprefixer, css-declaration-sorter, cssnano, ...)
  [INFO] npm warn
  [INFO] npm warn Could not resolve dependency:
  [INFO] npm warn peer postcss@"^8.5.13" from stylehacks@7.0.11
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-merge-longhand/node_modules/stylehacks
  [INFO] npm warn stylehacks@"^7.0.11" from postcss-merge-longhand@7.0.7
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-merge-longhand
  [INFO] npm warn
  [INFO] npm warn Conflicting peer dependency: postcss@8.5.15
  [INFO] npm warn node_modules/postcss
  [INFO] npm warn peer postcss@"^8.5.13" from stylehacks@7.0.11
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-merge-longhand/node_modules/stylehacks
  [INFO] npm warn stylehacks@"^7.0.11" from postcss-merge-longhand@7.0.7
  [INFO] npm warn node_modules/cssnano/node_modules/cssnano-preset-default/node_modules/postcss-merge-longhand
  [INFO]
  [INFO] > cyperux@0.0.0 prepare
  [INFO] > husky
  [INFO]
  [INFO]
  [INFO] up to date, audited 1300 packages in 4s
  [INFO]
  [INFO] 299 packages are looking for funding
  [INFO] run `npm fund` for details
  [INFO]
  [INFO] 19 vulnerabilities (15 moderate, 4 high)
  [INFO]
  [INFO] To address issues that do not require attention, run:
  [INFO] npm audit fix
  [INFO]
  [INFO] To address all issues possible (including breaking changes), run:
  [INFO] npm audit fix --force
  [INFO]
  [INFO] Some issues need review, and may require choosing
  [INFO] a different dependency.
  [INFO]
  [INFO] Run `npm audit` for details.
  [INFO]
  [INFO] --- frontend:2.0.0:npm (build front) @ cyperux ---
  [INFO] npm not inheriting proxy config from Maven
  [INFO] Running 'npm run build' in /Users/devalgas/Documents/projets/perso/bmad/app-cyperux
  [INFO]
  [INFO] > cyperux@0.0.0 build
  [INFO] > npm-run-all --parallel build:_
  [INFO]
  [INFO]
  [INFO] > cyperux@0.0.0 build:js
  [INFO] > path-exists src/main/resources/static/js && (mkdirp target/classes/static/js && babel src/main/resources/static/js/ --out-dir target/classes/static/js/) || echo 'No src/main/resources/static/js directory found.'
  [INFO]
  [INFO]
  [INFO] > cyperux@0.0.0 build:tsc
  [INFO] > tsc -b
  [INFO]
  [INFO]
  [INFO] > cyperux@0.0.0 build:vite
  [INFO] > vite build --emptyOutDir
  [INFO]
  [INFO]
  [INFO] > cyperux@0.0.0 build:tikui
  [INFO] > tikui-core build
  [INFO]
  [INFO]
  [INFO] > cyperux@0.0.0 build:svg
  [INFO] > path-exists src/main/resources/static/svg && recursive-copy 'src/main/resources/static/svg' target/classes/static/svg -w -f '\*\*/_.svg' || echo 'No src/main/resources/static/svg directory found.'
  [INFO]
  [INFO]
  [INFO] > cyperux@0.0.0 build:html
  [INFO] > recursive-copy 'src/main/resources/templates' target/classes/templates -w
  [INFO]
  [INFO]
  [INFO] > cyperux@0.0.0 build:css
  [INFO] > mkdirp target/classes/static/css && postcss src/main/resources/static/css/\*.css -d target/classes/static/css
  [INFO]
  [INFO] No src/main/resources/static/js directory found.
  [INFO] No src/main/resources/static/svg directory found.
  [INFO] src/main/resources/templates -> target/classes/templates
  [INFO] src/main/resources/templates/layout -> target/classes/templates/layout
  [INFO] src/main/resources/templates/index.html -> target/classes/templates/index.html
  [INFO] src/main/resources/templates/layout/main.html -> target/classes/templates/layout/main.html
  [INFO] 4 item(s) copied
  [INFO] Building on /Users/devalgas/Documents/projets/perso/bmad/app-cyperux/target/classes/public/style directory.
  [INFO] ReferenceError: require is not defined in ES module scope, you can use import instead
  [INFO] This file is being treated as an ES module because it has a '.js' file extension and '/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
  [INFO] at file:///Users/devalgas/Documents/projets/perso/bmad/app-cyperux/postcss.config.js?t=1779874731470:2:12
  [INFO] at ModuleJob.run (node:internal/modules/esm/module_job:413:25)
  [INFO] at async onImport.tracePromise.**proto** (node:internal/modules/esm/loader:660:26)
  [INFO] at async req (/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/node_modules/postcss-load-config/src/req.js:22:13)
  [INFO] at async Object.search (/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/node_modules/lilconfig/src/index.js:225:23)
  [INFO] at async Promise.all (index 0)
  [INFO] [1] node "/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/node_modules/@tikui/core/dist/assets-build.js" && node "/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/node_modules/@tikui/core/dist/pug-build.js" exited with code SIGTERM
  [INFO] [0] npx sass -I "/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/node_modules" "/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/src/main/style":"/Users/devalgas/Documents/projets/perso/bmad/app-cyperux/target/classes/public/style" -s compressed --source-map --embed-sources exited with code SIGTERM
  [INFO] Build failed, first error code found: undefined
  [INFO] ERROR: "build:css" exited with 1.
