const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// nazwy uzyt i pokojow
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// doloczanie
socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// wiadomosc z servera
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// wysyłanie wiad
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();


  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  socket.emit('chatMessage', msg);

  // czyszczenie
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// wysylanie do  DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// pokoje DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// uzytk. DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//wiadomosc do podwierdzenia przy wyjsciu
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});






