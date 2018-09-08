import { Hit, ZombieMove, Move, Shoot, Start, Aim } from '../network/actions';
import { stateReducer, Action, initialState } from './state/reducer';
import { State, GamePosition } from './state/state';
import { Necromancer } from './necromancer';
import { Referee } from './referee';
import { EventEmmiter } from '../utils/event-emmiter';
import { InputHandler } from './input-handler';

export interface StateChange {
    state: State;
    action: Action;
}

export class Engine {
    private _state: State;
    private _stateChanged: EventEmmiter<StateChange>;

    public get state(): State {
        return this._state;
    }

    public get stateChanged(): EventEmmiter<StateChange> {
        return this._stateChanged;
    }

    public constructor(referee: Referee, necromancer: Necromancer, inputHandler: InputHandler) {
        this._state = initialState;
        this._stateChanged = new EventEmmiter<StateChange>();
        referee.hit.addListner(hit => this.onHit(hit));
        necromancer.zombieMoved.addListner(move => this.onZombieMove(move));
        inputHandler.shoot.addListner(() => this.shoot());
        inputHandler.move.addListner((move) => this.move(move));
        inputHandler.aim.addListner((aim) => this.aim(aim));
    }

    public start(start: Start) {
        this.changeState(start);
    }

    public move(move: Move): void {
        this.changeState(move);
    }

    public shoot(): void {
        let shoot = new Shoot(new GamePosition(Math.floor(this.state.scope.position.x), Math.floor(this.state.scope.position.y)));
        this.changeState(shoot);
    }

    aim(aim: Aim): any {
        this.changeState(aim);
    }

    protected onHit(hit: Hit) {
        this.changeState(hit);
    }

    protected onZombieMove(zombieMove: ZombieMove) {
        this.changeState(zombieMove);
    }

    private changeState(action: Action) {
        this._state = stateReducer(this.state, action);
        this._stateChanged.emit({ state: this._state, action: action });
    }
}
