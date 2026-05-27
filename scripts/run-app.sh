#!/bin/bash

# Fonction pour arrêter les processus en arrière-plan lors de l'arrêt du script (Ctrl+C)
cleanup() {
  echo ""
  echo "Arrêt de l'application..."
  kill $(jobs -p)
  exit
}

trap cleanup SIGINT

echo "Démarrage de l'application Cyperux..."

# 1. Démarrage du Backend (Spring Boot)
# On utilise le profil 'local' si nécessaire
echo "Lancement du backend Spring Boot sur http://localhost:8080..."
./mvnw spring-boot:run -Dspring-boot.run.profiles=local &

# 2. Démarrage du Frontend (Vite)
echo "Lancement du frontend Vite sur http://localhost:9000..."
npm run dev &

echo ""
echo "Les deux serveurs sont en cours de démarrage."
echo "- Backend : http://localhost:8080"
echo "- Frontend : http://localhost:9000"
echo "Appuyez sur Ctrl+C pour arrêter tout."

# Attendre que les processus se terminent
wait
