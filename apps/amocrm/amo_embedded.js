

const createWSSClient = ({key, onMessage}) => {
  return new Promise(function(resolve, reject) {
    const init = () => {
      const url = 'ws://localhost:3001';
      const r = [`key=${key}`].join('&');
      const socket = new WebSocket(url + '?' + r);

      socket.onopen = () => {
        console.log('Connected to the server');
        resolve({send})
      };

      socket.onmessage = ((event) => {
        console.log(`Received message from server, ${event.data}`);
        onMessage(event.data);
      })

      socket.onerror = function(err) {
        reject(err);
      };

      socket.onclose = function () {
        setTimeout(function () {
          init()
        }, 1000);
      };

      const send = (object) => {
        if (!socket.readyState) {
          return;
        }
        socket.send(JSON.stringify(object));
      }

      setInterval(() => {
        send({ping: 1});
      }, 1000);
    }
    init();
  })
}


const notify2 = (text) => {
var message_params = {
  header: "Внимание",
  text: text,
  // icon: 'https://cdn-icons-png.flaticon.com/128/16147/16147516.png',
  // date: 1722600737
};
console.log('tt2', message_params);
AMOCRM.notifications.show_message(message_params);
}

const notify3 = (text) => {
  var notification = {
      text: {
          header: "Исходящий звонок",
          text: text,
      },
      type: "call"
  };
  console.log('tt3')
  AMOCRM.notifications.show_notification(notification);
}

const notify4 = function (text) {
  var error_params = {
      header: "Внимание",
      text: "Соединение с сервером потеряно"
  };
  console.log('tt4')
  AMOCRM.notifications.show_message_error(error_params);
}

const notify5 = function (text) {
  var error_params = {
      header: "Ошибка",
      text,
      date: 1722600737,
      link: "/contacts/list/?term=4990000001"
  };
  console.log('tt5')
  AMOCRM.notifications.add_error(error_params);
}

const notify6 = function (text) {
  var call_params = {
      text,
      date: 1534084500,
      from: "Петрова Анна",
      to: "Смирнов Алексей",
      click_link: "/contacts/add/?phone=9191234567",
  };
  AMOCRM.notifications.add_call(call_params);
}

const getUserKey = function () {
  const userId = AMOCRM.constant('user').id;
  const accountId = AMOCRM.constant('account').id;

  console.log('usertId', userId, 'accountId', accountId);
  return accountId + ':' + userId;
}

const getUserToken = async function () {
  const uuid = 'c439f6b2-8d4e-4a27-a9e1-bdd4beb1e406';
  const url = '/ajax/v2/integrations/' + uuid + '/disposable_token';
  const response = await fetch(
    url,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )
  const { token } = await response.json()
  console.log('token', token);
  return token;
}

const run = () => {
  (getUserToken)();
  const key = getUserKey();
  const wsClient = createWSSClient({key, onMessage: function (message) {
    const obj = JSON.parse(message);
    console.log('obj', obj);
    notify2('text');
  }})
}
