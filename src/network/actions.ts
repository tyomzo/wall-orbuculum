import { GamePosition } from '../engine/state/state';

export abstract class GameEvent { }

export class Hit extends GameEvent {
    constructor(public zombie: string, public points: number) {
        super();
    }
}

export class ArrowMove extends GameEvent {
    constructor(public target: GamePosition) {
        super();
    }
}

export class ArcherMove extends GameEvent {
    constructor(public coordintaes: GamePosition) {
        super();
    }
}

export class ZombieMove extends GameEvent {
    constructor(public zombie: string, public position: GamePosition) {
        super();
    }
}

export abstract class UserAction { }

export class Move extends UserAction {
    constructor(keyCode: string) {
        super();
        if (keyCode === 'ArrowLeft') {
            this.direction = 'left';
        } else if (keyCode === 'ArrowRight') {
            this.direction = 'right';
        }
    }
    direction: 'left' | 'right';
}

export class Shoot extends UserAction {
    constructor(public position: GamePosition) {
        super();
    }
}

export class Start extends UserAction {
    constructor(public playerName: string) {
        super();
    }
}
