// const socket = io('ws://localhost:8080');

const socket = new WebSocket('ws://192.168.18.12:8080/');

socket.addEventListener('open', function () {
  console.log('Connected to server');
});

socket.addEventListener('message', function (ev) {
  console.log('---> Server send to client: ', ev.data);
  const ele = document.createElement('li');
  ele.textContent = ev.data;
  document.querySelector('ul').appendChild(ele);
});

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('input').value;
  const ele = document.createElement('li');
  ele.textContent = `Client: ${text}`;
  document.querySelector('ul').appendChild(ele);
  socket.send(text);
});

document.querySelector('#input').addEventListener('keyup', (event) => {
  // console.log(event.keyCode);
  if (event.keyCode !== 13) return; // Use `.key` instead.
  document.querySelector('button').click(); // Things you want to do.
  document.getElementById('input').value = '';
  // document.querySelector('#input').value = '';
  event.preventDefault(); // No need to `return false;`.
});
