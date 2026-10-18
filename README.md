# Révision PPL

Site de révision de l’examen théorique PPL(A) EASA (DGAC) : cours condensés des 9 matières, 270 QCM corrigés et expliqués, entraînement avec correction immédiate, examens blancs chronométrés notés par matière (seuil de 75 %), et liste des erreurs à refaire. La progression est enregistrée dans le navigateur.

Les questions sont rédigées sur le modèle des QCM officiels ; la banque de questions DGAC n’est pas publique.

## Utilisation

Ouvrir `index.html` dans un navigateur (aucune installation nécessaire), ou activer GitHub Pages sur la branche `main`.

## Structure

- `data/010.js` … `data/090.js` : cours et questions de chaque matière
- `app.js`, `style.css` : l’application
- `node build.mjs` : génère `dist/carnet-ppl.html`, une version en un seul fichier
