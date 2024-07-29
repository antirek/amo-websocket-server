const express = require('express');
const cors = require('cors');
const {customAlphabet} = require('nanoid');

const nanoid = customAlphabet('1234567890abcdef', 10);

const createExpressApp = (connections) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post('/send/key/:key', async (req, res) => {
    try {
      console.log('/send by key');
      const ref = nanoid();
      const {roomName, key, appId} = req.params;
      const data = req.body;
      console.log({roomName, key, appId, data, ref});
      const room = roomManager.getRoomByName(roomName, appId);
      console.log({room});
      room.sendToFriends(key, JSON.stringify({...data, ref}));
      res.json({status: 'OK'});
    } catch (e) {
      console.log('e', e);
      res.json({status: 'Error'});
    }
  });

  app.post('/send/:appId/:roomName/uniqId/:uniqId', async (req, res) => {
    try {
      console.log('/send by uniqId');
      const ref = nanoid();
      const {roomName, uniqId, appId} = req.params;
      const data = req.body;
      console.log({roomName, uniqId, appId, data, ref});
      const room = roomManager.getRoomByName(roomName, appId);
      console.log({room});
      room.sendToFriend(uniqId, JSON.stringify({...data, ref}));
      res.json({status: 'OK'});
    } catch (e) {
      console.log('e', e);
      res.json({status: 'Error'});
    }
  });

  app.get('/list', async (req, res) => {
    try {
      console.log('/list');
      console.log({friends});
      res.json(friends);
    } catch (e) {
      console.log('e', e);
      res.json([]);
    }
  });

  return app;
};

module.exports = {
  createExpressApp,
};
