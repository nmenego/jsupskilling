import {SquareState} from "./SquareState.js";
import {GameState} from "./GameState.js";

class TicTacToe {
    #currentTurn;
    #moveHistory = [];
    #squareStates = [
        [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
        [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
        [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    ];
    #winningStreak = [];

    constructor(currentTurn = SquareState.NOUGHT) {
        this.#currentTurn = currentTurn;
    }

    get currentTurn() {
        return this.#currentTurn;
    }

    get winningStreak() {
        return this.#winningStreak;
    }

    get squareStates() {
        return this.#squareStates;
    }

    get gameState() {
        if (this.hasHorizontalWins() || this.hasVerticalWins() ||
            this.hasDiagonalWins() || this.hasAntiDiagonalWins()
        ) {
            return this.#currentTurn === SquareState.CROSS ? GameState.CROSS_WON : GameState.NOUGHT_WON;
        }

        if (this.#moveHistory.length === 9) {
            return GameState.DRAWN;
        }
        return GameState.ONGOING;
    }

    hasHorizontalWins() {
        for (let i = 0; i < this.#squareStates.length; i++) {
            for (let j = 0; j < this.#squareStates[i].length; j++) {
                if (this.#squareStates[i][j] !== this.#currentTurn) {
                    this.#winningStreak.length = 0
                    break;
                }
                this.#winningStreak[j] = `${i}_${j}`;
            }
            if (this.#winningStreak.length === 3) return true;
        }
        return false;
    }

    hasVerticalWins() {
        for (let j = 0; j < this.#squareStates[0].length; j++) {
            for (let i = 0; i < this.#squareStates.length; i++) {
                if (this.#squareStates[i][j] !== this.#currentTurn) {
                    this.#winningStreak.length = 0;
                    break;
                }
                this.#winningStreak[i] = `${i}_${j}`;
            }
            if (this.#winningStreak.length === 3) return true;
        }
        return false;
    }

    hasDiagonalWins() {
        for (let i = 0, j = 0; i < this.#squareStates.length; i++, j++) {
            if (this.#squareStates[i][j] !== this.#currentTurn) {
                this.#winningStreak.length = 0;
                break;
            }
            this.#winningStreak[i] = `${i}_${j}`;
        }
        return (this.#winningStreak.length === 3);
    }

    hasAntiDiagonalWins() {
        for (let i = 0, j = this.#squareStates[i].length - 1; i < this.#squareStates.length; i++, j--) {
            if (this.#squareStates[i][j] !== this.#currentTurn) {
                this.#winningStreak.length = 0;
                break;
            }
            this.#winningStreak[i] = `${i}_${j}`;
        }
        return (this.#winningStreak.length === 3);
    }

    move(move) {
        // check if possible, then set state of board
        // check wins
        if (this.gameState !== GameState.ONGOING) {
            throw new Error("Game is already won. No additional moves allowed.");
        }

        if (move.squareState === SquareState.EMPTY) {
            throw new Error("Can not move with empty state.");
        }

        if (move.squareState !== this.#currentTurn) {
            throw new Error("Illegal move: not your turn.");
        }

        if (this.#squareStates[move.row][move.col] !== SquareState.EMPTY) {
            throw new Error("Illegal move: the square is already taken.");
        }

        this.#squareStates[move.row][move.col] = this.#currentTurn;
        this.#moveHistory.push(move);
        if (this.gameState === GameState.ONGOING) {
            this.#currentTurn = this.#currentTurn === SquareState.CROSS ? SquareState.NOUGHT : SquareState.CROSS;
        }
    }

}

export {TicTacToe};


