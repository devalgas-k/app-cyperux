#!/bin/bash
npm install
# Tester uniquement la génération CSS
npm run build:css

# Tester le build frontend complet (Vite + TSC + Tikui)

# Tester le build Maven complet (incluant le frontend)
./mvnw -DskipTests clean package
