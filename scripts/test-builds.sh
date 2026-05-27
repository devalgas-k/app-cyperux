#!/bin/bash

# Tester uniquement la génération CSS 
npm run build:css 

# Tester le build frontend complet (Vite + TSC + Tikui) 
npm run build 

# Tester le build Maven complet (incluant le frontend) 
./mvnw -DskipTests clean package
