import { expect } from 'chai';
import { Engine, StateChange } from './engine';
import { Referee } from './referee';
import { Necromancer } from './necromancer';
import { InputHandler } from './input-handler';
import { Start } from '../network/actions';

describe('Engine', () => {
    it('should emit "Start"', () => {
        let refery = {} as Referee;
        let necromancer = {} as Necromancer;
        let inputHandler = {} as InputHandler;
        let engine = new Engine(refery, necromancer, inputHandler);

        let stateChange: StateChange;
        engine.stateChanged.addListner(sc => stateChange = sc);

        let start = new Start('player');
        engine.start(start);

        // tslint:disable-next-line:no-unused-expression
        expect(stateChange).to.exist;
    });
});
