import { Socket, createServer } from 'net';
import { Zombie, GamePosition } from './src/engine/state/state';

let games: {[port: number]: Game; } = {};
export function start() {
    const server = createServer((socket: Socket) => {
        acceptClient(socket);
    })
    .on('error', (err) => {
        console.log(err);
    });

    server.listen(3415, () => {
        console.log(`opened server on ${JSON.stringify(server.address())}`);
    });

    function acceptClient(socket: Socket) {
        console.log(`Client connected ${JSON.stringify(socket.remotePort)}`);
        socket.on('data', (data) => {
            handleMessage(data.toString(), socket.remotePort, socket);
        });
        socket.on('error', e => {
            console.log(e);
        });
    }
}

function handleMessage(data: string, id: number, socket: Socket) {
    let message = data.trim().split(' ');
    if (message[0] === 'START') {
        games[id] = new Game(message[1], socket);
    }
    if (message[0] === 'SHOOT') {
        games[id].hit(new GamePosition(Number(message[1]), Number(message[2])));
    }
}

export class Game {
    counter = 0;
    zombies: Zombie[];
    constructor(public name: string, private socket: Socket) {
        this.zombies = [];
        setInterval(() => {
            this.getZombieMoves().forEach(zombie => {
                socket.write(`WALK ${zombie.name} ${zombie.position.x} ${zombie.position.y}\n`);
            });
        }, 2000);
    }
    hit(position: GamePosition) {
        let index = this.zombies.findIndex(z => z.position.x === position.x && z.position.y === position.y);
        if (index >= 0) {
            let zombies = this.zombies.splice(index, 1);
            zombies.forEach(zombie => {
                this.socket.write(`BOOM ${this.name} ${Math.floor((Math.random() * 10) + 1)} ${zombie.name}\n`);
            });
        }
    }
    getZombieMoves(): Zombie[] {
        this.zombies.forEach(z => { if (z.position.y < 30) { z.position.y++; } });
        let zombie = {
            position: new GamePosition(Math.floor((Math.random() * 10) + 1), 0),
            name: `Zombie${++this.counter}`
        };
        this.zombies.push(zombie);
        return this.zombies;
    }
}
