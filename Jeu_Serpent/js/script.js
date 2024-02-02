document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const scoreElement = document.getElementById('score');
    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let food = generateFood();
    let score = 0;

    function draw() {
        gameContainer.innerHTML = '';

        // Draw snake
        snake.forEach((segment, index) => {
            const snakeSegment = document.createElement('div');
            snakeSegment.className = `snake ${index === 0 ? 'snake-head' : ''}`;
            snakeSegment.style.left = `${segment.x * 20}px`;
            snakeSegment.style.top = `${segment.y * 20}px`;
            gameContainer.appendChild(snakeSegment);

            scoreElement.textContent = `Score: ${score}`;
        });

        // Draw food
        const foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.left = `${food.x * 20}px`;
        foodElement.style.top = `${food.y * 20}px`;
        gameContainer.appendChild(foodElement);

    }

    function move() {
        const head = { ...snake[0] };

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

        if (head.x === food.x && head.y === food.y) {
            snake.push({});
            food = generateFood();
            score++;
        }


        for (let i = snake.length - 1; i > 0; i--) {
            snake[i] = { ...snake[i - 1] };
        }
        snake[0] = head;


        const collisionCheck = checkCollision();

        if (head.x < 0 || head.y < 0 || head.x >= 45 || head.y >= 30 || collisionCheck) {
            alert(`Game Over! Ton score: ${score}`);
            resetGame();
        }

        draw();
    }

    function generateFood() {
        const food = {
            x: Math.floor(Math.random() * 45),
            y: Math.floor(Math.random() * 30)
        };


        while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            food.x = Math.floor(Math.random() * 45);
            food.y = Math.floor(Math.random() * 30);
        }

        return food;
    }

    function checkCollision() {
        const [head, ...body] = snake;
        return body.some(segment => segment.x === head.x && segment.y === head.y);
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        food = generateFood();
        score = 0;
        draw();
    }


    // Handle keyboard input
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


    draw();
    setInterval(move, 100);
});
