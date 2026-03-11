# City Explorer — Guide de déploiement

## Ce que vous obtiendrez
Une URL publique (ex: `city-explorer.onrender.com`) partageable à votre famille.
Propulsé par Groq + Llama 3.3 (100% gratuit).

---

## Étape 1 — Récupérer votre clé API Groq

1. Connectez-vous sur **console.groq.com**
2. Allez dans **"API Keys"** → **"Create API Key"**
3. Copiez la clé (commence par `gsk_...`)

> ⚠️ Ne partagez jamais votre clé — elle doit rester uniquement dans Render.

---

## Étape 2 — Créer un compte GitHub (5 min)

1. **github.com** → "Sign up"
2. Nouveau dépôt : **"New repository"** → nommer `city-explorer` → "Create repository"

---

## Étape 3 — Déposer les fichiers (5 min)

Dans votre dépôt GitHub vide :
1. Cliquez **"uploading an existing file"**
2. Glissez les fichiers dézippés : `server.js`, `package.json`, dossier `public/`
3. **"Commit changes"**

---

## Étape 4 — Déployer sur Render (10 min)

1. **render.com** → "Get Started" → connexion avec GitHub
2. **"New +"** → **"Web Service"** → sélectionnez `city-explorer`
3. Remplissez :
   - **Runtime** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Plan** : `Free`
4. **"Environment Variables"** → **"Add Environment Variable"** :
   - **Key** : `GROQ_API_KEY`
   - **Value** : votre clé `gsk_...`
5. **"Create Web Service"** → URL disponible en 2-3 min

---

## Mettre à jour l'app

Remplacez les fichiers sur GitHub → Render redéploie automatiquement.
