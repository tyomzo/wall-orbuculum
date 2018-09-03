import { GameController } from './src/ui/game-controller';

(() => {
    window.addEventListener('load', () => {
        console.info('bootstrapping');
        let gameController = new GameController();
        gameController.showConnectScreen();
        (window as any).gameController = gameController;
    });
})();
