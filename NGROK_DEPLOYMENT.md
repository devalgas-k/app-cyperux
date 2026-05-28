# Déploiement Local Public avec Ngrok

Ce guide explique comment exposer l'application Cyperux (Vite + Spring Boot) sur Internet de manière sécurisée et gratuite en utilisant Ngrok.

## Prérequis
- Votre backend Spring Boot tourne sur le port `8080`.
- Votre frontend Vite tourne sur le port `9000` (et "proxifie" déjà les requêtes API/Auth vers le 8080 via `vite.config.ts`).
- Un compte gratuit sur [ngrok.com](https://ngrok.com).

---

## Étape 1 : Installer Ngrok

Sur macOS, utilisez Homebrew pour installer Ngrok :
```bash
brew install ngrok/ngrok/ngrok
```
*(Pour Windows ou Linux, téléchargez l'exécutable depuis le site de Ngrok).*

## Étape 2 : Configurer l'authentification Ngrok

Récupérez votre "Authtoken" dans le dashboard de votre compte Ngrok, puis lancez la commande suivante dans votre terminal :
```bash
ngrok config add-authtoken VOTRE_TOKEN_ICI
```

## Étape 3 : Exposer l'application

Ouvrez un nouveau terminal et exposez le port de votre frontend Vite (`9000`) :
```bash
ngrok http 9000
```
Ngrok va démarrer et vous afficher une URL publique (ex: `https://a1b2c3d4.ngrok-free.app`). Vous pouvez partager ce lien.

---

## ⚠️ Étape 4 (Cruciale) : Configuration OAuth2 / Keycloak

L'application utilisant une authentification centralisée (Keycloak / OIDC), le serveur d'authentification refusera les requêtes provenant d'une URL inconnue.

Vous devez **obligatoirement** ajouter votre nouvelle URL Ngrok dans la configuration de votre client OAuth2 (Keycloak) :

1. Connectez-vous à la console d'administration Keycloak.
2. Allez dans **Clients** > Sélectionnez votre client (ex: `cyperux-app`).
3. Ajoutez l'URL Ngrok dans les champs suivants :
   - **Valid Redirect URIs** : `https://a1b2c3d4.ngrok-free.app/*`
   - **Web Origins** : `https://a1b2c3d4.ngrok-free.app`
4. Sauvegardez.

> **Note technique** : Grâce au paramètre `xfwd: true` présent dans votre `vite.config.ts`, le backend Spring Boot comprendra qu'il se trouve derrière un proxy (Ngrok) et générera correctement les URL de retour pour la redirection de connexion.
