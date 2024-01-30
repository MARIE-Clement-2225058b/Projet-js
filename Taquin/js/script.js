var taquin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]; // Une case est vide à l'origine
var compteurDeplacements = 0;

const melangerTaquin = () => {
    // Logique de mélange du taquin
    for (let i = taquin.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [taquin[i], taquin[j]] = [taquin[j], taquin[i]];
    }
    afficherTaquin();
    resetCompteurDeplacements();
};

const afficherTaquin = () => {
    for (let i = 0; i < taquin.length; i++) {
        var caseElement = document.getElementById(`c${i + 1}`);
        caseElement.textContent = taquin[i] === 0 ? '' : taquin[i];
        caseElement.onclick = () => deplacer(i);
    }

    afficherCompteurDeplacements();
};

const deplacer = (index) => {
    const caseVideIndex = taquin.indexOf(0);
    const adjacentIndexes = [caseVideIndex - 1, caseVideIndex + 1, caseVideIndex - 4, caseVideIndex + 4];

    if (adjacentIndexes.includes(index)) {
        [taquin[index], taquin[caseVideIndex]] = [taquin[caseVideIndex], taquin[index]];
        incrementerCompteurDeplacements();
        afficherTaquin();

        if (estGagne()) {
            alert(`Félicitations ! Vous avez gagné en ${compteurDeplacements} déplacements !`);
            melangerTaquin();
        }
    }
};

const resetCompteurDeplacements = () => {
    compteurDeplacements = 0;
    afficherCompteurDeplacements();
};

const incrementerCompteurDeplacements = () => {
    compteurDeplacements++;
    afficherCompteurDeplacements();
};

const afficherCompteurDeplacements = () => {
    document.getElementById('compteurDeplacements').textContent = compteurDeplacements;
};

const estGagne = () => taquin.every((value, index) => value === index + 1);

melangerTaquin();
