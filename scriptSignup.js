import { user } from './user.js';

document.getElementById('send').addEventListener('click', function(event) {
    event.preventDefault();
    sendForm();
});

function sendForm() {

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let newuser = new user(username, password, []);
    localStorage.setItem(username, JSON.stringify(newuser));
    window.location.replace('login.html');
}       