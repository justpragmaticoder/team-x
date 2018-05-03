const user = localStorage.getItem("name");
console.log(user);
$(document).ready(function () {
    $('#main_field').focus();
    $.ajax({
        url: '/show',
        type: 'post',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
            user: user
        }),
        success: function (res) {
            for (var i = 0; i < res.length; i++) {
                $('.list-group').append('<li id="' + res[i].id + '"class="list-group-item">' + res[i].task + '<span onclick="del(this.parentElement.id)"class="badge">x</span><a href="#updateModal" onclick="upd(this.parentElement.id)"  class="badge">edit</a> </li>');
            }
        }
    });

    //Adds a new task to the todo list.
    $('#main_field').keyup(function (e) {
        var taskText = e.target.value;
        if (e.keyCode == 13 && taskText.length > 0) {
            $(this).val('');
            $.ajax({
                url: "/create",
                dataType: 'json',
                contentType: "application/json",
                type: 'post',
                data: JSON.stringify({
                    newTask: taskText,
                    user: user
                }),
                success: function (res) {
                    $('.list-group').prepend('<li id="' + res[0].id + '"class="list-group-item">' + res[0].task + '<span onclick="del(this.parentElement.id)"class="badge">x</span><a href="#updateModal" onclick="upd(this.parentElement.id)"  class="badge">edit</a> </li>');
                },
                error: function () {
                    alert('The task is not added!');
                }
            });
        }
    });

    //Hides the last added task when the list is already full.
    $('.list-frame').bind('DOMNodeInserted DOMNodeRemoved', function (event) {
        if ($(this).outerHeight() >= $('.task-container').innerHeight()) {
            $('.list-frame .single-task:last').hide();
        }
        if ($(this).outerHeight() < $('.task-container').innerHeight()) {
            $('.list-frame .single-task:hidden:first').show();
        }
    });


    $('.input-field input[type=checkbox]').on('click', function () {
        if ($(this).prop('checked')) {
            $('.list-frame input[type=checkbox]').prop('checked', 'true');
            return
        }
        $('.list-frame input[type=checkbox]').removeProp('checked');
    });


    $('.list-frame').on("dblclick", ".single-task .task-text", function () {
        $(this).replaceWith('<input type="text" class=task-text>');

        $('.single-task input[type=text]').keyup(function (e) {
            var newText = e.target.value;
            if (e.keyCode == 13 && newText.length > 0) {
                $(this).replaceWith('<p class="task-text">' + newText + '</p>');
            }
        });
    });

    //Deletes the task when user clicks on the closing cross.
    $('.list-frame').on('click', '.single-task .delete', function () {
        var keyName = $(this).parent().attr('elemId');
        localStorage.removeItem(keyName);
        $(this).parent().remove();
    });


});

function del(id) {
    $.ajax({

        url: "/delete",
        dataType: 'json',
        contentType: "application/json",
        type: 'post',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem("token"));
        },
        data: JSON.stringify({
            delete: id
        }),
        success: function () {
            $('#' + id).remove();
        },
        error: function () {
            alert("deleting error");
        }
    })

}
