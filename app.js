//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".main-section__text-input_mode_new");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".main-section__list_task_incomplete");//ul of #incomplete-tasks
var completedTasksHolder=document.querySelector(".main-section__list_task_completed");//completed-tasks

//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("main-section__list-item");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.classList.add("main-section__checkbox-input");

    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text

    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.classList.add("main-section__button");
    editButton.classList.add("main-section__button_function_edit");
    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.classList.add("main-section__button");
    deleteButton.classList.add("main-section__button_function_delete");
    deleteButton.classList.add("delete-button");
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.classList.add("delete-button__img");

    label.innerText=taskString;
    label.classList.add('main-section__label');
    label.classList.add('main-section__label_mode_created');

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.classList.add("main-section__text-input");
    editInput.classList.add("main-section__text-input_mode_created");

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.classList.add("main-section__button");
    editButton.classList.add("main-section__button_function_edit");

    deleteButton.classList.add("main-section__button");
    deleteButton.classList.add("main-section__button_function_delete");
    deleteButton.classList.add("delete-button");

    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.main-section__text-input');
    var label=listItem.querySelector(".main-section__label");
    var editBtn=listItem.querySelector(".main-section__button_function_edit");
    var containsClass=listItem.classList.contains("main-section__list-item_mode-edit");
    //If class of the parent is .edit-mode
    if(containsClass){

        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("main-section__list-item_mode-edit");
    editInput.classList.toggle("main-section__text-input_mode-edit");
    label.classList.toggle("main-section__label_mode-edit");
};

//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}

//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    var label=listItem.querySelector(".main-section__label");
    label.classList.remove("main-section__label_mode_created");
    label.classList.add("main-section__label_mode_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".main-section__checkbox-input");
    var editButton=taskListItem.querySelector(".main-section__button_function_edit");
    var deleteButton=taskListItem.querySelector(".main-section__button_function_delete");

    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items children(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items children(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
