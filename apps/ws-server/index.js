const config = require('config');

const {createExpressApp} = require('./api-server');
const {createWebsocketServer} = require('./websocket-server');
const {RoomManager} = require('./RoomManager');

const roomManager = new RoomManager();

const apiServer = createExpressApp(roomManager);
const websocketServer = createWebsocketServer(roomManager);

websocketServer.listen(config.get('apps.ws-server.wsport'), () => {
  console.log('websocket server start');
});

apiServer.listen(config.get('apps.ws-server.httpport'), () => {
  console.log('http api servers start');
});
