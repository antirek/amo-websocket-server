const EventEmitter = require('events');

class Friend extends EventEmitter {
  constructor({key, socket, ip, onMessage = null}) {
    super();
    this.key = key;
    this.uniqId = '' + Math.random();
    this.socket = socket;
    this.dateConnected = Date.now();
    this.ip = ip;

    this.socket.on('close', () => {
      this.emit('leave', this.uniqId);
    });

    this.socket.on('message', (data) => {
      if (!onMessage) return;
      onMessage({
        key: this.key,
        uniqId: this.uniqId,
        data,
      });
    });
  }

  disconnect() {
    if (this.socket.readyState !== 3) {
      this.socket.close();
    }
  }

  send(data) {
    this.socket.send(data);
  }
}

class Room {
  constructor(name) {
    this.name = name;
    this.friends = [];
  }

  join(friend) {
    console.log('join friend', this.name, friend.uniqId, friend.key);
    friend.on('leave', (uniqId) => {
      console.log(`room get leave ${uniqId}`);
      this.removeFriendById(uniqId);
    });
    this.friends.push(friend);
  }

  removeFriendById(uniqId) {
    const friend = this.getFriendById(uniqId);
    this.removeFriend(friend);
  }

  removeFriend(friend) {
    const friends = this.friends.filter((f) => f.uniqId !== friend.uniqId);
    this.friends = friends;
  }

  getFriendById(uniqId) {
    return this.friends.find((f) => f.uniqId === uniqId);
  }

  getFriendsByKey(key) {
    return this.friends.filter((f) => f.key === key);
  }

  getFriends() {
    return this.friends.map((f) => {
      return {
        key: f.key,
        uniqId: f.uniqId,
        dateConnected: f.dateConnected,
        ip: f.ip,
      };
    });
  }

  sendToFriend(uniqId, data) {
    const friend = this.getFriendById(uniqId);
    friend.send(data);
  }

  sendToFriends(key, data) {
    const friends = this.getFriendsByKey(key);
    for (const friend of friends) {
      friend.send(data);
    }
  }

  getFriendIds() {
    return this.friends.map((f) => f.uniqId);
  }
}

class RoomManager {
  constructor() {
    this.rooms = [];
  }

  addRoom(roomName) {
    const room = new Room(roomName);
    this.rooms.push(room);
    return room;
  }

  joinFriendToRoom(roomName, friend) {
    const room = this.getRoomByName(roomName);
    room.join(friend);
  }

  getRooms() {
    return this.rooms.map((r) => r.name);
  }

  getRoomByName(roomName) {
    let room = this.rooms.find((r) => (r.name === roomName));
    if (!room) {
      room = this.addRoom(roomName);
    };
    return room;
  }

  getFriendFromRoom(roomName, uniqId) {
    const room = this.getRoomByName(roomName);
    return room.getFriendById(uniqId);
  }

  getFriendIdsFromRoom(roomName) {
    const room = this.getRoomByName(roomName);
    return room.getFriendIds();
  }

  getFriendsFromRoom(roomName) {
    const room = this.getRoomByName(roomName);
    return room.getFriends();
  }
}

module.exports = {
  Friend,
  Room,
  RoomManager,
};
