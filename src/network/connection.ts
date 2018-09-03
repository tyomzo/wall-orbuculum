import { UserAction, GameEvent } from './actions';
import { createConnection, Socket } from 'net';
import { EventEmmiter } from '../utils/event-emmiter';
import { GameProtocol } from './protocol';

export interface Connection {
    connect(): Promise <void>;
    sendUserAction(data: UserAction): Promise<void>;
    serverAction: EventEmmiter<GameEvent>;
}

export interface ConnectionState {
    server: string;
    connected: boolean;
}

export class TcpConnection implements Connection {
    private client: Socket;

    serverAction = new EventEmmiter<GameEvent>();

    constructor(private _host: string, private _port: number, private _protocol: GameProtocol) { }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client = createConnection({ host: this._host, port: this._port }, () => {
                resolve();
            });
            this.client.on('error', (err) => {
                reject(err);
            });
        })
        .then(() => {
            this.client.on('data', (data) => {
                this.handleServerMessage(data);
            });
            this.client.removeAllListeners('error');
        });
    }

    sendUserAction(data: UserAction): Promise<void> {
        return new Promise((resolve, _reject) => {
            let message = this._protocol.write(data);
            console.log(`Sending message to server: ${message}`);
            this.client.write(this._protocol.write(data));
            resolve();
        });
    }

    private handleServerMessage(data: Buffer) {
        let gameEvent = this._protocol.read(data.toString('utf8'));
        this.serverAction.emit(gameEvent);
    }

}
