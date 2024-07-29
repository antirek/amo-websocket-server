const {WebSocketServer} = require('ws');
const {createServer} = require('http');

const {Friend} = require('./RoomManager');
const {Message} = require('../../models');

const roomName = 'ROOM';

const createWebsocketServer = (roomManager) => {
  const server = createServer();
  const wss = new WebSocketServer({server});

  const onMessage = async ({key, uniqId, data}) => {
    console.log('ttt', data);
    let message;
    try {
      message = JSON.parse(Buffer.from(data));
    } catch (e) {
      console.log('e', e);
    }

    const messageData = {
      key,
      uniqId,
      message,
      timestamp: Date.now(),
    };

    await Message.create(messageData)
    console.log('message saved');
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

    roomManager.joinFriendToRoom(roomName, new Friend({key, socket: ws, ip, onMessage}));
    console.log(`join ${key}`);
  }

  wss.on('connection', onConnection);

  return server;
};

module.exports = {
  createWebsocketServer,
};
