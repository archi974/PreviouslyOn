Project Previously On

- Lancer le site :

    - avoir npm/nodemon
    - faire un npm i dans le dossier back et front
    - lancer le serveur dans le dossier back (npm start)
    - lancer le client dans le dossier front (npm start)
    - crée un compte sur le site rediriger

- Etape effectuer :

    - redirection du front (localhost:3000) vers l'api grâce à une balise <a>, puis après inscription sur l'api, redirection vers le back grâce à (redirect_uri=localhost4000) précédement écrit dans le front.

    - Accès au série de l'API grâce à un fetch

    - Récupération des données de chaque série (titre/image/nombre de saison/nombre d'épisode/description/note sur 5/genre)
    - Récupérer pour chaque épisodes de chaque série (l'image, le titre, la description, la durée)

- Problématique rencontré :

    - affichage : Cannot GET / dû à une mauvaise écriture du fetch et une mauvaise pratique du useEffect
    - console   : erreur 404 Refused to load the image

    - problème de double mapping de la variable genre qu'il fallait définir en object
    - arrondissement des notes sur 5
