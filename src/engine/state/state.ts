export const boardSize: GamePosition = {
    x: 8,
    y: 8
};

export class State {
    archer: Archer;
    zombies: Zombie[];
}

export interface Archer {
    name: string;
    position: GamePosition;
    score: number;
}

export interface Zombie {
    name: string;
    position: GamePosition;
}

export class GamePosition {
    constructor(public x: number, public y: number) {}
}
