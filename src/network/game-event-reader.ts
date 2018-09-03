import { ZombieMove, GameEvent, Hit } from './actions';
import { GamePosition } from '../engine/state/state';

export class GameEventReader {
    read(payload: string): GameEvent {
        let chunks = payload.split(' ');
        switch (chunks.shift()) {
        case 'WALK': {
            return this.readWalk(chunks);
        }
        case 'BOOM': {
            return this.readBoom(chunks);
        }
        default: {
            throw new Error(`Unknown payload received from server: ${payload}`);
        }
        }
    }
    private readWalk(chunks: string[]): ZombieMove {
        if (chunks.length === 3) {
            return new ZombieMove(chunks[0], new GamePosition(Number(chunks[1]), Number(chunks[2])));
        }
        throw new Error(`Invalid WALK event received: ${chunks}`);
    }
    private readBoom(chunks: string[]): Hit {
        if (chunks.length === 2) {
            return new Hit(undefined, Number(chunks[1]));
        }
        if (chunks.length === 3) {
            return new Hit(chunks[2], Number(chunks[1]));
        }
        throw new Error('Invalid BOOM event received');
    }
}
