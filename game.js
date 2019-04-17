let gameContainer;
let gameContext;
let ballConfig;
let platformConfig;
let engineConfig;

const initDefaultValues = () => {
    platformConfig = {
        width: 10,
        height: 100,
        positionX: 20,
        positionY: (gameContainer.height - this.height) / 2
    }
    ballConfig = {
        positionX: 50,
        positionY: 50,
        width: 10,
        height: 10
    }
    engineConfig = {
        fps: 30
    }
}

const calculateGame = () => {
    ballConfig.positionX += 5;
    ballConfig.positionY += 5;
}

const drawGame = () => {
    // Platform
    gameContext.fillStyle = 'white';
    gameContext.fillRect(platformConfig.positionX, platformConfig.positionY, platformConfig.width, platformConfig.height);
    // Ball
    gameContext.fillStyle = 'yellow';
    gameContext.fillRect(ballConfig.positionX, ballConfig.positionY, ballConfig.width, ballConfig.height);
}

const drawGameField = () => {
    gameContext.fillStyle = 'black';
    gameContext.fillRect(0, 0, gameContainer.width, gameContainer.height);
}

const clearGameField = () => {
    gameContext.clearRect(0, 0, gameContainer.width, gameContainer.height);
}

const gameEngine = () => {
    drawGameField();
    calculateGame();
    drawGame();
}

window.onload = () => {
    gameContainer = document.getElementById('gameContainer');
    gameContext = gameContainer.getContext('2d');
    initDefaultValues();
    // Run animation
    setInterval(gameEngine, 1000 / engineConfig.fps);
}
