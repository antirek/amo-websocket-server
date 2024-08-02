const express = require('express');
const axios = require('axios');

const router = express.Router();
const wsServerApi = 'http://localhost:3000';

router.get('/', async (req, res) => {  
  const resp = await axios.get(wsServerApi + '/list');
  console.log('resp', resp.data);
  const users = resp.data;
  res.render('users', {users});
});

router.get('/send/key/:key', async (req, res) => {
  const key = req.params.key;
  const data = {
    command: 'show_notification', 
    params: {
      text: 'new call',
      type: 'text',
    },
  };
  const resp = await axios.post(wsServerApi + '/send/key/' + key, data);
  console.log('resp', resp.data);

  res.redirect('/users');
});

router.get('/send/uniqId/:uniqId', async (req, res) => {
  const uniqId = req.params.uniqId;
  const data = {
    command: 'show_notification',
    params: {
      text: 'new call',
      type: 'text',
    },
  };
  const resp = await axios.post(wsServerApi + '/send/uniqId/' + uniqId, data);
  console.log('resp', resp.data);

  res.redirect('/users');
});

module.exports = router;
