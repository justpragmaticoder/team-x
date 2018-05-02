function getSecret() {

    var url = "http://localhost:3000/todo"
    var xhr = new XMLHttpRequest();
    var resultElement = document.getElementsByClassName('todo-wrapper');
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    xhr.addEventListener('load', function() {
        $('.todo-wrapper').html(this.responseText);
        resultElement.innerHTML = this.responseText;
    });
    xhr.send(null);
}
function getToken() {
    var loginUrl = "http://localhost:3000/login"
    var xhr = new XMLHttpRequest();
    var userElement = document.getElementById('username');
    var passwordElement = document.getElementById('password');
    var user = userElement.value;
    var password = passwordElement.value;

    xhr.open('POST', loginUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', function () {
        var responseObject = JSON.parse(this.response);
        console.log(responseObject);
        if (responseObject.token) {
            localStorage.setItem( "token" , responseObject.token);
            localStorage.setItem( "name" , user);
            getSecret();
        } else {
            alert( "Wrong user or password");
        }
    });

    var sendObject = JSON.stringify({name: user, password: password});
    xhr.send(sendObject);
}
function register() {
    var regUrl = "http://localhost:3000/register"
    var xhr = new XMLHttpRequest();
    var userElement = document.getElementById('username');
    var passwordElement = document.getElementById('password');
    var user = userElement.value;
    var password = passwordElement.value;
    xhr.open('POST', regUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onload = function () {
        if (xhr.status == 200) {
            alert('Done!')
        } else {
            alert( "Something go wrong");
        }
    };

    var sendObject = JSON.stringify({name: user, password: password});
    xhr.send(sendObject);
}