# Étape 1: Build de l'application front-end
FROM node:16.17.0 as build-stage
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN  npm install --legacy-peer-deps


# Copie du reste des fichiers de l'application et construction
COPY . .
RUN npm run build

# Étape 2: Serveur Nginx pour servir l'application construite
FROM nginx
# Copie des fichiers statiques du build dans le dossier de serveur web
COPY --from=build-stage /app/dist/crudtuto-Front/ /usr/share/nginx/html

# Remplacement de la configuration Nginx par défaut (si nécessaire)
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
