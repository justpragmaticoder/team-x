$(function () {
    const socket = io();
    let nick;
    let lastMsgId;
    do {
        nick = prompt('Please, write your login:');
    } while (nick === '' || typeof nick === 'undefined');

    $.ajax({
        url: '/short-history',
        type: 'GET',
        success: (res) => {
            lastMsgId = res[res.length - 1].id;
            res.forEach((elem) => {
                $('#messages').prepend('<li>' + '[' + elem.nickname + ']: ' + elem.text + '</li>');
            });
        }
    });
    socket.emit('nickname', nick);

    $('form').submit(() => {
        let userMsg = $('#m').val();
        $('#m').val('');
        socket.emit('chat message', userMsg);
        return false;
    });

    socket.on('chat message', (msg) => {
        let incomingMessage = JSON.parse(msg);
        $('#messages').append($('<li>').text("[" + incomingMessage.nickname + "]: " + incomingMessage.message));
    });

    $(window).on('scroll', () => {
        if (window.pageYOffset === 0) {
            $.ajax({
                type: 'POST',
                url: '/next-messages',
                data: JSON.stringify({
                    msgId: lastMsgId
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: (res) => {
                    if (res.length !== 0) {
                        lastMsgId = res[res.length - 1].id;
                        res.forEach((elem) => {
                            $('#messages').prepend('<li>' + '[' + elem.nickname + ']: ' + elem.text + '</li>');
                        });
                    }
                }
            });
        }
    });

    $('#messages').bind('mousewheel', (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            if ($(this).height() === $(window).height()) {
                $.ajax({
                    type: 'POST',
                    url: '/next-messages',
                    data: JSON.stringify({
                        msgId: lastMsgId
                    }),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: (res) => {
                        if (res.length !== 0) {
                            lastMsgId = res[res.length - 1].id;
                            res.forEach((elem) => {
                                $('#messages').prepend('<li>' + '[' + elem.nickname + ']: ' + elem.text + '</li>');
                            });
                        }
                    }
                });
            }
        }
    });
});