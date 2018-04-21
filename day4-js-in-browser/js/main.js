$(document).ready(function(){
	//Makes focus on the task input field as soon as the page has fully loaded.
	$(function() {
		$('#main_field').focus();

		var storageLength = localStorage.length;
      	if(storageLength > 0){
        	for(var i = 1; i <= storageLength; i++){
          		value = localStorage.getItem(i);
          		$(".list-frame").append(value);
        	}
     	}
	});
	
	//Adds a new task to the todo list.
	$('#main_field').keyup(function(e){
		var taskText = e.target.value;
    	if(e.keyCode == 13 && taskText.length > 0) {
    		$(this).val('');

    		var itemAttr = 'elemId';
    		var newElemId = 0;
 
        	$(".list-frame").children().each(function(index, elem){
          		var elemId = $(elem).attr('elemId');
          		if(elemId > newElemId) 
            		newElemId = elemId;
        		})
        		newElemId++;

    		var newTask = "<div class='single-task'" 
    			+ itemAttr +"='" + newElemId +"'>" 
        		+ "<input type='checkbox'><p class='task-text'>" 
        		+ taskText + "</p><span class='delete'></span></div>";
        		
        	$(".list-frame").append(newTask);
			localStorage.setItem(newElemId, newTask)
       	}
   	});

	//Hides the last added task when the list is already full.
   	$('.list-frame').bind('DOMNodeInserted DOMNodeRemoved', function(event) {
    	if($(this).outerHeight() >= $('.task-container').innerHeight()) {
    		$('.list-frame .single-task:last').hide();
    	}
    	if($(this).outerHeight() < $('.task-container').innerHeight()) {
    		$('.list-frame .single-task:hidden:first').show();
    	}
	});


	$('.input-field input[type=checkbox]').on('click', function() {
		if($(this).prop('checked')) {
			$('.list-frame input[type=checkbox]').prop('checked', 'true');
			return
		}
		$('.list-frame input[type=checkbox]').removeProp('checked');
	});


	$('.list-frame').on("dblclick", ".single-task .task-text", function () {
    	$(this).replaceWith('<input type="text" class=task-text>');

    	$('.single-task input[type=text]').keyup(function(e){
    		var newText = e.target.value;
    		if(e.keyCode == 13 && newText.length > 0) {
    			$(this).replaceWith('<p class="task-text">' + newText + '</p>');
    		}
    	});
    });

	//Deletes the task when user clicks on the closing cross.
    $('.list-frame').on('click', '.single-task .delete', function(){
    	var keyName = $(this).parent().attr('elemId');
    	localStorage.removeItem(keyName);
  		$(this).parent().remove();
  	});



});