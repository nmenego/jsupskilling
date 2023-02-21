class GameState {
    static ONGOING = new GameState('ongoing', 'game ongoing');
    static DRAWN = new GameState('drawn', '🟰');
    static NOUGHT_WON = new GameState('nought_won', 'player ⚫ won');
    static CROSS_WON = new GameState('cross_won', 'player ❌ won');

    constructor(name, display) {
        this.name = name;
        this.display = display;
    }

    toString() {
        return `GameState.${this.name}`;
    }
}

export {GameState};