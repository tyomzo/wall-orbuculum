import { Renderer } from '../engine/renderer';
import { TcpConnectionFactory } from '../network/connection-factory';
import { ConnectionManager } from '../network/connection-manager';
import { TcpServerGameBuilder, GameOptions } from '../game/game-builder';

export class GameController {
    content: Node;
    errorContent: Node;

    showConnectScreen() {
        let template = document.createElement('template');
        let html = `
<main>
    <div class='inputContainer'>
        <div class='field'>
            <label for="usernameInput">Name: </label>
            <input id='usernameInput' class='input' type='text'>
        </div>
        <div class='field'>
            <label for="hostInput">Server:</label>
            <input id='hostInput' class='input' type='text' value="localhost">
        </div>
        <div class='field'>
            <label for="portInput">Port:</label>
            <input id='portInput' class='input' type='number' value="3415">
        </div>
            <input id='submit' type='submit' onclick='gameController.connect()' value="Start">
    </div>
</main>
`;
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        this.content = template.content.firstChild;
        document.body.appendChild(this.content);
    }

    connect() {
        console.log('Starting game');
        this.clearError();
        let usernameInput = (document.getElementById('usernameInput') as any).value;
        let hostInput = (document.getElementById('hostInput') as any).value;
        let portInput = (document.getElementById('portInput') as any).value;

        if (!usernameInput) {
            this.writeError('Name yourself!');
            return;
        }

        if (!hostInput) {
            this.writeError('Must specify address of a wall!');
            return;
        }

        if (!portInput) {
            this.writeError('And the door number please');
            return;
        }

        document.body.removeChild(this.content);
        try {
            let canvas = document.createElement('canvas');
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            canvas.setAttribute('id', 'gameport');
            document.body.appendChild(canvas);

            let ctx = canvas.getContext('2d', canvas) as CanvasRenderingContext2D;
            let renderer = new Renderer(ctx);
            renderer.height = canvas.height;
            renderer.width = canvas.width;

            let connectionFactory = new TcpConnectionFactory();
            let connectionManager = new ConnectionManager(connectionFactory);

            let builder = new TcpServerGameBuilder(connectionManager, renderer);
            builder.createGame({
                username: usernameInput,
                host: hostInput,
                port: Number(portInput) } as GameOptions)
            .then(game => game.start())
            .catch(e => this.writeError(e));

            window.addEventListener('resize', () => {
                canvas.height = window.innerHeight;
                canvas.width = window.innerWidth;
                renderer.resize(canvas.height, canvas.width);
            });
        } catch (e) {
            this.writeError(e);
        }
    }

    writeError(e: Error | string) {
        console.error(e);
        let message: string;
        if (e instanceof Error) {
            message = (e as Error).message;
        } else {
            message = e;
        }

        let errorTemplate = document.createElement('template');
        let errorHtml = `
    <div class='error'>
        <p>${message}</p>
    </div>
`;
        errorHtml = errorHtml.trim(); // Never return a text node of whitespace as the result
        errorTemplate.innerHTML = errorHtml;
        this.errorContent = errorTemplate.content.firstChild;
        this.content.appendChild(this.errorContent);
    }

    clearError() {
        if (this.content && this.errorContent) {
            this.content.removeChild(this.errorContent);
            this.errorContent = null;
        }
    }
}
