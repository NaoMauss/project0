# Application Todo List

Ce projet est une application de liste de tâches (Todo List) composée d'un backend Node.js avec Fastify et MongoDB, et d'un frontend Vue.js.

## Structure du projet

- `back/` : Backend Node.js avec Fastify et MongoDB
- `front-end-0/` : Frontend Vue.js

## Backend

Le backend est construit avec Fastify et utilise MongoDB comme base de données. Il fournit une API RESTful pour gérer les tâches.

### Fonctionnalités

- Création de tâches
- Récupération de toutes les tâches
- Mise à jour des tâches
- Suppression des tâches

### Installation et démarrage

1. Naviguez vers le dossier `back/`
2. Installez les dépendances :
   ```
   bun install
   ```
3. Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine
4. Démarrez le serveur :
   ```
   bun run index.ts
   ```

Le serveur démarrera sur `http://localhost:3000`.

## Frontend

Le frontend est une application Vue.js qui interagit avec l'API backend pour afficher et gérer les tâches.

### Fonctionnalités

- Affichage de la liste des tâches
- Ajout de nouvelles tâches
- Marquage des tâches comme terminées
- Suppression des tâches

### Installation et démarrage

1. Naviguez vers le dossier `front-end-0/`
2. Installez les dépendances :
   ```
   npm install
   ```
3. Démarrez l'application en mode développement :
   ```
   npm run dev
   ```

L'application sera accessible à l'adresse indiquée dans la console (généralement `http://localhost:5173`).

## Utilisation

Une fois les deux services démarrés, vous pouvez accéder à l'application via votre navigateur. Vous pourrez alors ajouter, marquer comme terminées et supprimer des tâches. Les données seront persistantes grâce à la base de données MongoDB.

## Notes

- Assurez-vous que MongoDB est installé et en cours d'exécution avant de démarrer le backend.
- Le backend utilise le port 3000 par défaut. Assurez-vous qu'il est disponible.
- Le frontend est configuré pour communiquer avec le backend sur `http://localhost:3000`. Si vous modifiez le port du backend, n'oubliez pas de mettre à jour l'URL dans le code frontend.