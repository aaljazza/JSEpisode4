jest.unmock("../app");

import "jest-dom/extend-expect";
import * as app from "../app";

let taskInput;

beforeEach(() => {
  document.body.innerHTML =
    '<label for="new-task">Add Item</label>' +
    '<input id="new-task" type="text">' +
    '<button id="add-button">Add</button>' +
    '<ul id="todo-list">' +
    "</ul>";
  app.setup();
  taskInput = document.getElementById("new-task");
});

describe("addTask()", () => {
  it("adds a task with the correct label to the todo list", () => {
    taskInput.value = "Learn to write tests";
    app.addTask();
    const listItems = document.getElementsByTagName("li");
    expect(listItems.length).toBe(1);
    expect(listItems[0].querySelector("label").innerHTML).toBe(
      "Learn to write tests"
    );
  });

  it("adds a task with the text 'New Task' when the input field is empty", () => {
    app.addTask();
    const listItems = document.getElementsByTagName("li");
    expect(listItems.length).toBe(1);
    expect(listItems[0].querySelector("label").innerHTML).toBe("New Task");
  });

  it("resets the value of the input field after adding a task", () => {
    taskInput.value = "Reticulate splines";
    app.addTask();
    expect(taskInput.value).toBe("");
  });
});
