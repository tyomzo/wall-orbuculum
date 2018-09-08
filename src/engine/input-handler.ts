
import { Move, Aim } from '../network/actions';
import { EventEmmiter } from '../utils/event-emmiter';
import { boardSize, GamePosition } from './state/state';

export class InputHandler {
    public shoot: EventEmmiter<void> = new EventEmmiter();
    public move: EventEmmiter<Move> = new EventEmmiter<Move>();
    public aim: EventEmmiter<Aim> = new EventEmmiter<Aim>();

    constructor(public gameportx: number, public gameporty: number) {
        document.addEventListener('keydown', (e) => this.onKeyDown(e.code));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e.clientX, e.clientY));
        document.addEventListener('click', () => this.onMouseClick());
    }

    onKeyDown(keyCode: string) {
        switch (keyCode) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
            this.move.emit(new Move(keyCode));
            break;
        case 'Space':
            this.shoot.emit(null);
            break;
        default:
            return;
        }
    }

    onMouseMove(x: number, y: number): any {
        x = x / (this.gameportx / boardSize.x);
        y = y / (this.gameporty / boardSize.y);
        this.aim.emit(new Aim(new GamePosition(x, y)));
    }

    onMouseClick(): any {
        this.shoot.emit(null);
    }
}
