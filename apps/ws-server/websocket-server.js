const {WebSocketServer} = require('ws');
const {createServer} = require('http');


const createWebsocketServer = (connections) => {
  const server = createServer();
  const wss = new WebSocketServer({server});

  const onMessage = async ({key, uniqId, data}) => {
    let message;
    try {
      message = JSON.parse(Buffer.from(data));
    } catch (e) {
      console.log('e', e);
    }

    const jobData = {
      key,
      uniqId,
      appId,
      message,
      timestamp: Date.now(),
    };
  };

  function onConnection(ws, req) {
    console.log(`conn url ${req.url}`);
    const url = new URL(req.url, 'http://test.com'); // здесб любой домен для baseUrl парсинга
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('conn remoteAddress', ip);

    const key = url.searchParams.get('key');

    if(!key) {
      console.log('no key, end connection');
      ws.close(); 
      return;
    }

    console.log(`join ${key}`);    
  }

  wss.on('connection', onConnection);

  return server;
};

module.exports = {
  createWebsocketServer,
};
