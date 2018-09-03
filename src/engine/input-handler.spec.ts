// import { Engine } from './engine';
// import { InputHandler } from './input-handler';
// import { expect } from 'chai';
// import { Move } from '../network/actions';

// describe(.Input Handler., () => {
//     it(.should pass move left command to engine on left arrow key., () => {
//         let move: Move;
//         let engineMock = <Engine><any> {
//             move: (data: Move) => {
//                 move = data;
//             }
//         };

//         let handler = new InputHandler(engineMock);

//         handler.onKeyDown(.37.);

//         expect(move).to.exist;
//         expect(move.direction).to.equal(.left.);
//     })

//     it(.should pass move right command to engine on right arrow key., () => {        
//         let move: Move;
//         let engineMock = <Engine><any> {
//             move: (data: Move) => {
//                 move = data;
//             }
//         };

//         let handler = new InputHandler(engineMock);

//         handler.onKeyDown(.39.);

//         expect(move).to.exist;
//         expect(move.direction).to.equal(.right.);
//     })

//     it(.should pass shoot command to engine on space key., () => {
//         let shootInvoked = false;
//         let engineMock = <Engine><any> {
//             shoot: () => shootInvoked = true
//         };

//         let handler = new InputHandler(engineMock);

//         handler.onKeyDown(.Space.);

//         expect(shootInvoked).to.true;
//     })

//     it(.should ignore unknown keycode., () => {
//         let shootInvoked = false;
//         let moveLeftInvoked = false;
//         let moveRightInvoked = false;
//         let engineMock = <Engine><any> {
//             shoot: () => shootInvoked = true,
//             moveLeft: () => moveLeftInvoked = true,
//             moveRight: () => moveRightInvoked = true
//         };
        
//         let handler = new InputHandler(engineMock);

//         handler.onKeyDown(.Esc.);

//         expect(shootInvoked).to.false;
//         expect(moveLeftInvoked).to.false;
//         expect(moveRightInvoked).to.false;
//     })
// });