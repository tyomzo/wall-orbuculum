
import { Move } from '../network/actions';
import { EventEmmiter } from '../utils/event-emmiter';

export class InputHandler {
    public shoot: EventEmmiter<void> = new EventEmmiter();
    public move: EventEmmiter<Move> = new EventEmmiter<Move>();

    constructor() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e.code));
    }

    onKeyDown(keyCode: string) {
        switch (keyCode) {
        case 'ArrowLeft':
        case 'ArrowRight':
            this.move.emit(new Move(keyCode));
            break;
        case 'Space':
            this.shoot.emit(null);
            break;
        default:
            return;
        }
    }
}
