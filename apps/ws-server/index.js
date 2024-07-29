const config = require('config');

const {createExpressApp} = require('./api-server');
const {createWebsocketServer} = require('./websocket-server');

const connections = [];

const apiServer = createExpressApp(connections);
const websocketServer = createWebsocketServer(connections);

websocketServer.listen(config.get('apps.ws-server.wsport'), () => {
  console.log('websocket server start');
});

apiServer.listen(config.get('apps.ws-server.httpport'), () => {
  console.log('http api servers start');
});
