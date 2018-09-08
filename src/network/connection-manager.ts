import { Connection } from './connection';
import { ConnectionFactory } from './connection-factory';

export type ConnectionErrorCallback = (error: ConnectionError) => void;

export interface ConnectionError {
    message: string;
}

export interface IConnetionManager {
    getConnection: () => Connection;
    connect: (host: string, port: number) => Promise<Connection>;
}

export class ConnectionManager implements IConnetionManager {
    private _connection: Connection = null;
    private _connectionFactory: ConnectionFactory = null;

    constructor(connectionFactory: ConnectionFactory) {
        this._connectionFactory = connectionFactory;
    }

    getConnection = () => this._connection;

    connect(host: string, port: number): Promise<Connection> {
        console.info('Connecting to server');
        return this._connectionFactory.createConnection(host, port)
            .then(connection => {
                console.info('Connected to server');
                this.onConnectionCreated(connection);
                return connection;
            });
    }

    private onConnectionCreated(connection: Connection) {
        this._connection = connection;
    }
}
