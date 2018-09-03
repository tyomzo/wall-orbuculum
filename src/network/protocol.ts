import { UserAction, GameEvent } from './actions';
import { UserActionWriter } from './user-action-writer';
import { GameEventReader } from './game-event-reader';

export class GameProtocol {

    private reader = new GameEventReader();
    private writer = new UserActionWriter();

    read(payload: string): GameEvent {
        return this.reader.read(payload);
    }

    write(action: UserAction): string {
        return this.writer.write(action);
    }
}
