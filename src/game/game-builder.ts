import { RefereeProxy, Referee } from '../engine/referee';
import { ConnectionManager } from '../network/connection-manager';
import { NecromancerProxy, Necromancer } from '../engine/necromancer';
import { Engine } from '../engine/engine';
import { InputHandler } from '../engine/input-handler';
import { Connection } from '../network/connection';
import { Renderer } from '../engine/renderer';
import { Game } from './game';
import { Shoot, Start } from '../network/actions';

export abstract class GameBuilder {
    constructor(protected _renderer: Renderer) { }
    public createGame(options: GameOptions): Promise<Game> {
        return this.initialize(options)
            .then(() => {
                let referee = this.createReferee();
                let necromancer = this.createNecromancer();
                let inputHandler = this.createInputHandler();
                let engine = this.createEngine(referee, necromancer, inputHandler);
                return new Game(options.username, engine, this._renderer);
            });
    }

    public abstract initialize(options: GameOptions): Promise<void>;
    public abstract createReferee(): Referee;
    public abstract createNecromancer(): Necromancer;
    public abstract createInputHandler(): InputHandler;
    public abstract createEngine(referee: Referee, necromancer: Necromancer, inputHandler: InputHandler): Engine;
}

export interface GameOptions {
    username: string;
}

export interface TcpServerGameOptions extends GameOptions {
    host: string;
    port: number;
}

export class TcpServerGameBuilder extends GameBuilder {
    _connection: Connection;

    constructor(private connectionManager: ConnectionManager, _renderer: Renderer) {
        super(_renderer);
    }

    initialize(options: GameOptions) {
        let tcpOptions = options as TcpServerGameOptions;
        // return new ConnectionManager(new TcpConnectionFactory()).connect(options.host, options.port)
        return this.connectionManager.connect(tcpOptions.host, tcpOptions.port)
            .then(connection => {
                this._connection = connection;
                return;
            });
    }

    public createReferee() {
        return new RefereeProxy(this._connection);
    }

    public createNecromancer() {
        return new NecromancerProxy(this._connection);
    }

    public createInputHandler() {
        return new InputHandler();
    }

    public createEngine(referee: Referee, necromancer: Necromancer, inputHandler: InputHandler) {
        let engine = new Engine(referee, necromancer, inputHandler);
        engine.stateChanged.addListner(stateChange => {
            console.log('should send user action');
            if (stateChange.action instanceof Start || stateChange.action instanceof Shoot) {
                this._connection.sendUserAction(stateChange.action);
            }
        });
        return engine;
    }
}
