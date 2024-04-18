document.getElementById('exit').addEventListener('click', function(event) {
    localStorage.setItem('keepLogged', 'false');
    window.location.replace('login.html');
});