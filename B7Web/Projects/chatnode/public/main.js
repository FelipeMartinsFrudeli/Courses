const socket = io();
let username = '';
let userList = [];

let loginPage = document.querySelector('#loginPage');
let chatPage = document.querySelector('#chatPage');

let loginInput = document.querySelector('#loginNameInput');
let textInput = document.querySelector('#chatTextInput');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';

loginInput.addEventListener('keyup', e => {
    if (e.keyCode != 13) return;

    let name = loginInput.value.trim();
    if (name == '') return;

    username = name;
    document.title = `${username}`;

    socket.emit('join-request', username);
})