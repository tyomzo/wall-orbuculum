import { UserAction, Shoot, Start } from './actions';

export class UserActionWriter {
    write(userAction: UserAction): string {
        if (userAction instanceof Shoot) {
            let shoot = userAction as Shoot;
            return `SHOOT ${shoot.position.x} ${shoot.position.y}\n`;
        }
        if (userAction instanceof Start) {
            let start = userAction as Start;
            return `START ${start.playerName}\n`;
        }
        throw new Error('Unsupported user action');
    }
}
