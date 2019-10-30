//Task view methods
function addListId (listId){
    console.log(listId+'-------------------------------------------');
    $('#taskListId').val(listId);
    //taskActionForm
    $('#createNewTaskModalLabel').text('Create New Task');
    $('#taskActionForm').attr('action','createNewTask');
}

function editTask (taskid, taskName, startDate, endDate, des){
    $('#createNewTaskModalLabel').text('Edit Task');
    $('#taskActionForm').attr('action','editNewTask');
    var d1 = new Date(startDate);
    var month1 = parseInt(d1.getMonth())+1;
    month1 = ''+month1+'';
    if(month1.length < 2){
        month1 = '0'+month1;
    }
    var day1 = ''+d1.getDate()+'';
    if(day1.length < 2){
        day1 = '0'+day1;
    }
    startDate = ''+d1.getFullYear()+'-'+month1+'-'+day1;
    
    var d2 = new Date(endDate);
    var month2 = parseInt(d2.getMonth())+1;
    month2 = ''+month2+'';
    if(month2.length < 2){
        month2 = '0'+month2;
    }
    var day2 = ''+d2.getDate()+'';
    if(day2.length < 2){
        day2 = '0'+day2;
    }
    endDate = ''+d2.getFullYear()+'-'+month2+'-'+day2;
    $('#TaskName').val(taskName);
    $('#startDate').val(startDate);
    $('#endDate').val(endDate);
    $('#taskDes').val(des);
    $('#taskId').val(taskid);
}

function deleteTask(taskId){
    var hiddenForm = document.createElement('form');
    hiddenForm.action = 'deleteTask';
    hiddenForm.method = 'POST';
    var hiddenInput = document.createElement('input');
    hiddenInput.value = taskId;
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'taskId';
    hiddenForm.appendChild(hiddenInput);
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
}

//Task List view methods
function editTaskList(listId){
    $('#TaskListName').val($('#taskListName'+listId).text().trim());
    $('#taskListIdForEdit').val(listId);
}

function deleteList(listId){
    var hiddenForm = document.createElement('form');
    hiddenForm.action = 'deleteList';
    hiddenForm.method = 'POST';
    var hiddenInput = document.createElement('input');
    hiddenInput.value = listId;
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'taskListId';
    hiddenForm.appendChild(hiddenInput);
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
}

