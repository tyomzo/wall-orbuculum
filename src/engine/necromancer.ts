import { EventEmmiter } from '../utils/event-emmiter';
import { ZombieMove, GameEvent } from '../network/actions';
import { Connection } from '../network/connection';

export interface Necromancer {
    zombieMoved: EventEmmiter<ZombieMove>;
}

export class NecromancerProxy implements Necromancer {
    zombieMoved = new EventEmmiter<ZombieMove>();
    constructor(connection: Connection) {
        connection.serverAction.addListner(action => this.onServerAction(action));
    }

    onServerAction(action: GameEvent): any {
        if (action instanceof ZombieMove) {
            this.zombieMoved.emit(action);
        }
    }
}
