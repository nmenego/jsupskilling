class SquareState {
    static EMPTY = new SquareState('empty', '◻️');
    static CROSS = new SquareState('cross', '❌');
    static NOUGHT = new SquareState('nought', '⚫');

    constructor(name, display) {
        this.name = name;
        this.display = display;
    }

    toString() {
        return `SquareState.${this.name}`;
    }
}

export {SquareState};