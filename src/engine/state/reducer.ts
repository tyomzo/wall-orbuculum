import { Move, Hit, ZombieMove, Start, Shoot, Aim } from '../../network/actions';
import { State, Archer, boardSize, Zombie, Scope } from './state';

export const initialState: State = {
    archer: {
        name: null,
        position: null,
        score: 0
    },
    scope: {
        position: null
    },
    zombies: []
};

const archerMoveDx: number = 0.25;

export type Action = Start | Move | Shoot | Hit | ZombieMove | Aim ;

export function stateReducer(state: State, action: Action) {
    state = metaReducer(state, action);
    state.archer = archerReducer(state.archer, action);
    state.zombies = zombiesReducer(state.zombies, action);
    state.scope = scopeReducer(state.scope, action);
    return state;
}

export function metaReducer(state: State, action: Action) {
    if (action instanceof Start) {
        state = Object.assign({}, initialState);
    }
    return state;
}

export function archerReducer(archer: Archer, action: Action) {
    if (action instanceof Start) {
        let start = action as Start;
        archer.name = start.playerName,
        archer.position = {
            x: (boardSize.x / 2) - 0.5,
            y: boardSize.y
        };
    } else if (action instanceof Hit) {
        let hit = action as Hit;
        archer.score += hit.points;
    }
    return archer;
}

export function scopeReducer(scope: Scope, action: Action) {
    if (action instanceof Start) {
        scope.position = {
            x: boardSize.x / 2,
            y: boardSize.y / 2
        };
    } else if (action instanceof Move) {
        let move = action as Move;
        if (move.direction === 'left') {
            if (scope.position.x > 0) {
                scope.position.x -= archerMoveDx;
            }
        } else if (move.direction === 'right') {
            if (scope.position.x < boardSize.x) {
                scope.position.x += archerMoveDx;
            }
        } else if (move.direction === 'up') {
            if (scope.position.y > 0) {
                scope.position.y -= archerMoveDx;
            }
        } else if (move.direction === 'down') {
            if (scope.position.y < boardSize.y - 1) {
                scope.position.y += archerMoveDx;
            }
        }
    } else if (action instanceof Aim) {
        let aim = action as Aim;
        scope.position = aim.scope;
    }
    return scope;
}

export function zombiesReducer(zombies: Zombie[], action: Action) {
    if (action instanceof ZombieMove) {
        let move = action as ZombieMove;
        let index = zombies.findIndex(z => z.name === move.zombie);
        if (index < 0) {
            zombies.push({
                name: move.zombie,
                position: move.position
            });
        } else {
            zombies[index].position = move.position;
        }
    } else if (action instanceof Hit) {
        let hit = action as Hit;
        console.log(JSON.stringify(hit));
        if (hit.zombie) {
            let index = zombies.findIndex(z => z.name === hit.zombie);
            console.log('remobing zombie');
            zombies.splice(index, 1);
        }
    }
    return zombies;
}
