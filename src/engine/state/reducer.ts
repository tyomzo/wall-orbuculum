import { Move, Hit, ZombieMove, Start, Shoot } from '../../network/actions';
import { State, Archer, boardSize, Zombie } from './state';

export const initialState: State = {
    archer: {
        name: null,
        position: null,
        score: 0
    },
    zombies: []
};

const archerMoveDx: number = 0.25;

export type Action = Start | Move | Shoot | Hit | ZombieMove;

export function stateReducer(state: State, action: Action) {
    state = metaReducer(state, action);
    state.archer = archerReducer(state.archer, action);
    state.zombies = zombiesReducer(state.zombies, action);
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
            x: boardSize.x / 2,
            y: boardSize.y
        };
    } else if (action instanceof Move) {
        let move = action as Move;
        if (move.direction === 'left') {
            if (archer.position.x > 0) {
                archer.position.x -= archerMoveDx;
            }
        } else {
            if (archer.position.x < boardSize.x - 1) {
                archer.position.x += archerMoveDx;
            }
        }
    } else if (action instanceof Hit) {
        let hit = action as Hit;
        archer.score += hit.points;
    }
    return archer;
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
        if (hit.zombie) {
            let index = zombies.findIndex(z => z.name === hit.zombie);
            zombies.splice(index, 1);
        }
    }
    return zombies;
}
