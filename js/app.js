/*****************************************
 * The high-level elements on the page:
 *  - The new task input field
 *  - The add new task button
 *  - The to-do list iteslf
 ****************************************/
let taskInput;
let addButton;
let todoList;


/***************************************************************
 * Setup Function:
 * - grabs the high level elements and stores them in variables
 * - adds event handlers to already existing tasks
 * 
 * DO NOT EDIT THIS FUNCTION!!!
 ***************************************************************/
const setup = function () {
  // Retrieve high-level elements:
  taskInput = document.getElementById("new-task");
  addButton = document.getElementById("add-button");
  todoList = document.getElementById("todo-list");

  // Add event handlers to existing tasks
  Array.from(todoList.children).forEach(function (listItem) {
    let checkBox = listItem.querySelector("input[type=checkbox]"); //
    let editButton = listItem.querySelector("button.edit"); //
    editButton.onclick = editTask; // Bind editTask to edit button
    checkBox.onchange = completeTask;
  });

  // Add a click handler to the addButton
  addButton.onclick = addTask;
};

/*******************************************
 * Create a new to-do item:
 *
 * Generates a new to-do list item along
 * with all of its buttons and input fields
 *
 * createNewTask(itemString);
 ********************************************/
const createNewTask = function (taskString) {
  let listItem = document.createElement("li"); // Create List Item
  let checkBox = document.createElement("input"); // Input (checkbox)
  let label = document.createElement("label"); // Label
  let editInput = document.createElement("input"); // Input (text)
  let editButton = document.createElement("button"); // Button.edit

  checkBox.type = "checkbox"; // Make this input a checkbox
  editInput.type = "text"; // Make this input a text field
  editButton.innerHTML = "Edit"; // Change the text on the button
  editButton.className = "edit"; // Give the button a .edit class
  label.innerHTML = taskString; // Change the label text to the new taskString

  // COMPLETE ME!
  // Add handlers for the edit button and checkbox
  editButton.onclick = editTask; // Bind editTask to edit button
  checkBox.onchange = completeTask;
  // checkBox.onchange = ...

  // Append each element to the listItem
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);

  return listItem;
};

/*****************************************************
 * Add a new task to the list:
 * - Create a new task with the value from taskInput
 * - If there is nothing in taskInput, the default is "New Task"
 * - Append the new task to the todoList
 * - Reset the value of taskInput
 *****************************************************/
const addTask = function () {
  // Complete me!
  let taskInput = document.getElementById("new-task");

  todoList.appendChild(createNewTask(taskInput.value || "New Task"));
  taskInput.value = ""

};

/*****************************************************************
 * Edit a task:
 * - Get the current list item
 * - Get the label and the input field from the list item
 * - Check if the list item is in edit mode:
 *   - Edit Mode:
 *       - set the label text to the value of the input field
 *       - set the button text to 'Edit'
 *   - !Edit Mode:
 *       - set the input field value to the text of the label
 *       - set the button text to 'Save'
 * - Toggle edit mode
 *****************************************************************/
const editTask = function () {
  // get the current list item which is the parent
  // node of the current button (`this`)
  let listItem = this.parentNode;
  // Complete me!
  let editButton = listItem.querySelector("button.edit"); //
  let taskInput = document.getElementById("new-task");
  let label = listItem.getElementsByTagName("label")[0]
  let input = listItem.querySelector("input[type=text]");


  if (listItem.classList.contains("edit-mode")) {
    listItem.classList.remove("edit-mode")
    editButton.innerHTML = "Edit"; // Change the text on the button
    label.innerHTML = input.value

  } else {
    listItem.classList.add("edit-mode")
    editButton.innerHTML = "Save"; // Change the text on the button
    input.value = label.innerHTML

  }
  // label.innerHTML = "Hello There"

};

/***********************************
 * Mark a task as completed:
 * - Get the current list item
 * - Remove the item from todoList
 ***********************************/
const completeTask = function () {
  // Complete me!
  let listItem = this.parentNode;
  listItem.remove()
};

module.exports = {
  setup,
  createNewTask,
  addTask,
  editTask,
  completeTask
};