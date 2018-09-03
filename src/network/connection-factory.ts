import { Connection, TcpConnection } from './connection';
import { GameProtocol } from './protocol';

export interface ConnectionFactory {
    createConnection: (host: string, port: number) => Promise<Connection>;
}

export class TcpConnectionFactory implements ConnectionFactory {
    createConnection(host: string, port: number): Promise<Connection> {
        let protocol = new GameProtocol();
        let connection = new TcpConnection(host, port, protocol);
        return connection.connect().then(_ => connection);
    }
}
