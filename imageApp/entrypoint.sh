#!/bin/sh

# Créer un lien symbolique vers le volume dans un répertoire local
ln -s /app/public/uploads /chemin/sur/hote

# Démarrer votre application (remplacez ceci par la commande réelle pour démarrer votre application)
exec "$@"
