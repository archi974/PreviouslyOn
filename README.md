Project Previously On

- Etape effectuer :

    - redirection du front (localhost:3000) vers l'api grâce à une balise <a>, puis après inscription sur l'api, redirection vers le back grâce à (redirect_uri=localhost4000) précédement écrit dans le front.

    - Accès au série de l'API grâce à un fetch

    - Récupération des données (titre/image/nombre de saison/nombre d'épisode/description/note sur 5/genre)

- Problématique rencontré :

    - affichage : Cannot GET / dû à une mauvaise écriture du fetch et une mauvaise pratique du useEffect
    - console   : erreur 404 Refused to load the image

    - problème de double mapping de la variable genre qu'il fallait définir en object
    - arrondissement des notes sur 5
