import { State, Archer, Zombie, boardSize } from './state/state';
import { Action } from './state/reducer';
import { Hit } from '../network/actions';

export class Renderer {
    state: State;
    width: number;
    height: number;
    xcellSize: number;
    ycellSize: number;
    constructor(private _ctx: CanvasRenderingContext2D) { }

    render(state: State, action: Action = null) {
        this.state = state;
        this.clear();
        this.calibrateCellSize();
        this.renderArcher(state.archer);
        state.zombies.forEach(zombie => this.renderZombie(zombie));
        this.renderAction(action);
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.render(this.state);
    }

    private renderArcher(archer: Archer) {
        console.debug('drawing archer');
        let size = this.getArcherSize();
        this._ctx.beginPath();
        this._ctx.rect(archer.position.x * this.xcellSize, this.height - this.ycellSize, size.width, size.height);
        this._ctx.fillStyle = '#FF0000';
        this._ctx.fill();
        this._ctx.closePath();
    }

    private renderZombie(zombie: Zombie) {
        console.debug('drawing zombie');
        let size = this.getZombieSize();
        this._ctx.beginPath();
        this._ctx.rect(zombie.position.x * this.xcellSize, zombie.position.y * this.ycellSize, size.width, size.height);
        this._ctx.fillStyle = '#0095DD';
        this._ctx.fill();
        this._ctx.closePath();
    }

    private renderAction(action: Action): any {
        if (action) {
            if (action instanceof Hit) {
                this._ctx.font = '30px Arial';
                this._ctx.fillStyle = '#990000';
                this._ctx.textAlign = 'center';
                this._ctx.fillText(`BOOOM!!!`, this.width / 2, this.height / 2);
                setTimeout(() => this.render(this.state), 500);
            }
        }
    }

    private getArcherSize(): { width: number, height: number } {
        return {
            width: this.xcellSize,
            height: this.ycellSize
        };
    }

    private getZombieSize(): { width: number, height: number } {
        return {
            width: this.xcellSize,
            height: this.ycellSize
        };
    }

    private clear(): void {
        this._ctx.clearRect(0, 0, this.width, this.height);
    }

    private calibrateCellSize(): any {
        this.xcellSize = this.width / boardSize.x;
        this.ycellSize = this.height / boardSize.y;
    }
}
