import { Engine, StateChange } from '../engine/engine';
import { Renderer } from '../engine/renderer';
import { Start } from '../network/actions';

export class Game {
    constructor(private _username: string, private _engine: Engine, private _renderer: Renderer) {
        this._engine.stateChanged.addListner(state => this.onStateChanged(state));
    }

    public start() {
        this._engine.start(new Start(this._username));
    }

    onStateChanged(stateChange: StateChange): any {
        this._renderer.render(stateChange.state, stateChange.action);
    }
}
