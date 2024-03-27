#!/bin/bash

# Définition des anciennes et nouvelles informations d'auteur
OLD_EMAIL="antonino.gillard@imt-atlantique.net"
NEW_NAME="Gillan0"
NEW_EMAIL="antonino.gillard@orange.fr"

# Exécution de git filter-branch pour mettre à jour l'historique des commits
git filter-branch --env-filter "

if [ \$GIT_COMMITTER_EMAIL = '$OLD_EMAIL' ]
then
    export GIT_COMMITTER_NAME='$NEW_NAME'
    export GIT_COMMITTER_EMAIL='$NEW_EMAIL'
fi
if [ \$GIT_AUTHOR_EMAIL = '$OLD_EMAIL' ]
then
    export GIT_AUTHOR_NAME='$NEW_NAME'
    export GIT_AUTHOR_EMAIL='$NEW_EMAIL'
fi
" --tag-name-filter cat -- --branches --tags

# Affichage d'un message de confirmation
echo "L'historique des commits a été mis à jour. Veuillez pousser les changements avec 'git push --force' si vous êtes sûr."

