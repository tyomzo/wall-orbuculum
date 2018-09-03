import { EventEmmiter } from '../utils/event-emmiter';
import { Hit, GameEvent } from '../network/actions';
import { Connection } from '../network/connection';

export interface Referee {
    hit: EventEmmiter<Hit>;
}

export class RefereeProxy {
    hit = new EventEmmiter<Hit>();

    constructor(connection: Connection) {
        connection.serverAction.addListner(action => this.onServerAction(action));
    }

    onServerAction(event: GameEvent): any {
        if (event instanceof Hit) {
            this.hit.emit(event);
        }
    }
}
