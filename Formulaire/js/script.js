function verifierFormulaire(event) {
    event.preventDefault();
    var champs = ['nom', 'prenom', 'email', 'telephone', 'zonetexte', 'cp', 'ville', 'numCart', 'cods'];
    var civilite = document.querySelector('input[name="choix"]:checked');
    var typeCarte = document.querySelector('input[name="choix2"]:checked');
    var messageErreurCivilite = document.getElementById('erreurChoix');
    var messageErreurTypeCarte = document.getElementById('erreurChoix2');
    
    function gererMiseEnFormeChamp(champ) {
        var champElement = document.getElementById(champ);
        var valeur = champElement.value.trim();
        var messageErreur = document.getElementById('erreur' + champ.charAt(0).toUpperCase() + champ.slice(1));

        champElement.classList.remove('champ-invalide');
        messageErreur.classList.add('hidden');

        if (valeur === '') {
            champElement.classList.add('champ-invalide');
            messageErreur.classList.remove('hidden');
            return false;
        }

        if ((champ === 'cp' || champ === 'telephone' || champ === 'numCart' || champ === 'cods') && isNaN(valeur)) {
            champElement.classList.add('champ-invalide');
            messageErreur.textContent = 'Veuillez entrer seulement des chiffres';
            messageErreur.classList.remove('hidden');
            return false;
        }

        if ((champ === 'nom' || champ === 'prenom' || champ === 'ville') && !/^[A-Za-z]+$/.test(valeur)) {
            champElement.classList.add('champ-invalide');
            messageErreur.textContent = 'Veuillez entrer seulement des lettres';
            messageErreur.classList.remove('hidden');
            return false;
        }

        var longueurMax1 = champ === 'zonetexte' ? 100 : 50;
        if (valeur.length > longueurMax1) {
            champElement.classList.add('champ-invalide');
            messageErreur.classList.remove('hidden');
            return false;
        }

        if (champ === 'email' && !valeur.includes('@')) {
            champElement.classList.add('champ-invalide');
            messageErreur.textContent = 'Veuillez entrer une adresse e-mail valide';
            messageErreur.classList.remove('hidden');
            return false;
        }

        var longueurMax = 0;

        switch (champ) {
            case 'cp':
                longueurMax = 5;
                break;
            case 'telephone':
                longueurMax = 10;
                break;
            case 'numCart':
                longueurMax = 16;
                break;
            case 'cods':
                longueurMax = 3;
                break;
            default:
                longueurMax = champ === 'zonetexte' ? 100 : 50;
                break;
        }

        if (valeur.length > longueurMax) {
            champElement.classList.add('champ-invalide');
            messageErreur.textContent = 'La saisie dépasse la longueur maximale permise';
            messageErreur.classList.remove('hidden');
            return false;
        }

        return true;
    }

    var champsValides = true;

    for (var i = 0; i < champs.length; i++) {
        if (!gererMiseEnFormeChamp(champs[i])) {
            champsValides = false;
        }
    }

    if (!civilite) {
        messageErreurCivilite.classList.remove('hidden');
    } else {
        messageErreurCivilite.classList.add('hidden');
    }

    if (!typeCarte) {
        messageErreurTypeCarte.classList.remove('hidden');
    } else {
        messageErreurTypeCarte.classList.add('hidden');
    }

    if (!civilite || !typeCarte || !champsValides) {
        alert('Veuillez remplir correctement tous les champs du formulaire.');
        return false;
    }

    alert('Merci pour vos informations !');
    document.getElementById('monFormulaire').reset();
    return true;
}
