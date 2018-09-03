// import { ConnectionManager } from './connection-manager';
// import { expect } from 'chai';
// import { Connection } from './connection';
// import { ConnectionFactory } from './connection-factory';

// describe(.Connection manager., () => {
//     it(.should create connection., async () => {
//         let expectedConnection = <Connection>{}
//         let connectionFactory =  mockConnectionFactory (() => Promise.resolve(expectedConnection));

//         let connectionManager = new ConnectionManager(connectionFactory);

//         let actualConnection = await connectionManager.connect();
//         expect(actualConnection).to.equal(expectedConnection);
//     });

//     it(.should raise error when connection failed., () => {
//         let expectedError = new Error(.Intended Error.);
//         let connectionFactory =  mockConnectionFactory (() => Promise.reject(expectedError));

//         let connectionManager = new ConnectionManager(connectionFactory);

//         return connectionManager.connect()
//             .then(() => new Error(.Rejected promise was expected.))
//             .catch((err) => expect(err).to.equal(expectedError));
//     });

//     function mockConnectionFactory(createConnection: () => Promise<Connection>): ConnectionFactory {
//         return {
//             createConnection
//         };
//     }
// });