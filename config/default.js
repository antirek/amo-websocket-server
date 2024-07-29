module.exports = {
  apps: {
    'admin-web': {
      port: 3002,
    },
    'ws-server': {
      wsport: 3001,
      httpport: 3000,
    },
  },
  mongodb: 'mongodb://mongodb:27017/websocket'
};
