import {SquareState} from "./SquareState.js";
import {TicTacToe} from "./TicTacToe.js";
import {GameState} from "./GameState.js";

const MAX_ROW = 3;
const MAX_COL = 3;

function renderStats(game) {
    let statsDiv = document.getElementById('stats');
    let gameStats = document.createElement("p");
    let gameState = game.gameState;
    statsDiv.innerHTML = '';
    if (gameState !== GameState.ONGOING) {
        gameStats.innerText = `${gameState.display}`;
    } else {
        gameStats.innerText = `Current player ${game.currentTurn.display}`;
    }
    statsDiv.appendChild(gameStats);

    // render controls
    let restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart game";
    restartBtn.onclick = (ev) => {
        loadTicTacToe();
    };
    statsDiv.appendChild(restartBtn);
}

const render = (game) => {
    let gameState = game.gameState;
    let squareStates = game.squareStates;
    let gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '';
    for (let i = 0; i < MAX_ROW; i++) {
        for (let j = 0; j < MAX_COL; j++) {
            let node = document.createElement("button");
            node.id = `${i}_${j}`;
            node.innerHTML = squareStates[i][j].display;
            if (gameState === GameState.ONGOING) {
                node.onclick = (ev) => {
                    let nodeId = ev.target.id;
                    let nodeCoordinates = nodeId.split("_");
                    game.move({squareState: game.currentTurn, row: nodeCoordinates[0], col: nodeCoordinates[1]});
                    render(game);
                }
            } else {
                let current = `${i}_${j}`;
                let winningCoordinates = game.winningStreak;
                if (winningCoordinates.includes(current)) {
                    node.className = "winning-streak";
                }
            }
            gameDiv.appendChild(node);
        }
        gameDiv.appendChild(document.createElement("br"));
    }

    renderStats(game);
};

const loadTicTacToe = () => {
    function randomPlayer() {
        return Math.random() < 0.5 ? SquareState.NOUGHT : SquareState.CROSS;
    }

    let game = new TicTacToe(randomPlayer());
    render(game);
}

document.addEventListener("DOMContentLoaded", loadTicTacToe);



