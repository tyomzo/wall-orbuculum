export const boardSize: GamePosition = {
    x: 10,
    y: 30
};

export class State {
    archer: Archer;
    scope: Scope;
    zombies: Zombie[];
}

export interface Archer {
    name: string;
    position: GamePosition;
    score: number;
}

export interface Scope {
    position: GamePosition;
}

export interface Zombie {
    name: string;
    position: GamePosition;
}

export class GamePosition {
    constructor(public x: number, public y: number) {}
}
