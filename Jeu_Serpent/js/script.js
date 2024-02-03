document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const scoreElement = document.getElementById('score');

    let snake = [{ x: 10, y: 10 }]; // Le serpent commence à une position initiale
    let direction = 'right'; // Direction initiale du serpent
    let food = generateFood(); // Génère la nourriture initiale
    let score = 0; // Initialise le score à zéro

    // Fonction pour dessiner l'état actuel du jeu
    function draw() {
        gameContainer.innerHTML = ''; // Efface le contenu du conteneur de jeu

        // Dessine le serpent
        snake.forEach((segment, index) => {
            const snakeSegment = document.createElement('div');
            snakeSegment.className = `snake ${index === 0 ? 'snake-head' : ''}`;
            snakeSegment.style.left = `${segment.x * 20}px`;
            snakeSegment.style.top = `${segment.y * 20}px`;
            gameContainer.appendChild(snakeSegment);

            // Affiche le score
            scoreElement.textContent = `Score: ${score}`;
        });

        // Dessine la nourriture
        const foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.left = `${food.x * 20}px`;
        foodElement.style.top = `${food.y * 20}px`;
        gameContainer.appendChild(foodElement);
    }

    // Fonction pour déplacer le serpent
    function move() {
        const head = { ...snake[0] }; // Copie la tête du serpent

        // Déplace la tête en fonction de la direction actuelle
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Vérifie s'il y a collision avec la nourriture
        if (head.x === food.x && head.y === food.y) {
            snake.push({}); // Ajoute un segment au serpent
            food = generateFood(); // Génère une nouvelle nourriture
            score++; // Incrémente le score
        }

        // Déplace le reste du serpent
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i] = { ...snake[i - 1] };
        }
        snake[0] = head; // Met à jour la position de la tête

        // Vérifie s'il y a une collision avec les bords ou avec le serpent lui-même
        const collisionCheck = checkCollision();

        // Si collision, affiche un message d'alerte, réinitialise le jeu et redessine l'état actuel
        if (head.x < 0 || head.y < 0 || head.x >= 45 || head.y >= 30 || collisionCheck) {
            alert(`Game Over ! \nScore : ${score} \nAppuis sur entrée ou cliquez sur OK pour commencer !`);
            resetGame();
        }

        draw(); // Redessine l'état actuel du jeu
    }

    // Fonction pour générer de la nourriture à des positions aléatoires
    function generateFood() {
        const food = {
            x: Math.floor(Math.random() * 45),
            y: Math.floor(Math.random() * 30)
        };

        // Assure que la nourriture n'apparaît pas sur le serpent
        while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            food.x = Math.floor(Math.random() * 45);
            food.y = Math.floor(Math.random() * 30);
        }

        return food;
    }

    // Fonction pour vérifier s'il y a collision avec le serpent lui-même
    function checkCollision() {
        const [head, ...body] = snake;
        return body.some(segment => segment.x === head.x && segment.y === head.y);
    }

    // Fonction pour réinitialiser le jeu
    function resetGame() {
        snake = [{ x: 10, y: 10 }]; // Réinitialise la position du serpent
        direction = 'right'; // Réinitialise la direction
        food = generateFood(); // Génère une nouvelle nourriture
        score = 0; // Réinitialise le score
        draw(); // Redessine l'état initial du jeu
    }

    // Gère les entrées clavier pour changer la direction du serpent
    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    });

    draw(); // Dessine l'état initial du jeu
    setInterval(move, 100); // Déplace le serpent à intervalles réguliers
});
