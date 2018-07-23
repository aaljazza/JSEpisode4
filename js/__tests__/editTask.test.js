jest.unmock("../app");

import "jest-dom/extend-expect";
import * as app from "../app";

beforeEach(() => {
  document.body.innerHTML =
    '<label for="new-task">Add Item</label>' +
    '<input id="new-task" type="text">' +
    '<button id="add-button">Add</button>' +
    '<ul id="todo-list">' +
    '<li class="edit-mode">' +
    '<input type="checkbox">' +
    "<label></label>" +
    '<input type="text" value="Task 1">' +
    '<button class="edit">Edit</button>' +
    "</li>" +
    "<li>" +
    '<input type="checkbox">' +
    "<label>Task 2</label>" +
    '<input type="text">' +
    '<button class="edit">Edit</button>' +
    "</li>" +
    "<li>" +
    '<input type="checkbox">' +
    "<label>Task 3</label>" +
    '<input type="text">' +
    '<button class="edit">Edit</button>' +
    "</li>" +
    "</ul>";
  app.setup();
});

describe("editTask()", () => {
  it("toggles the edit mode class on the todo item", () => {
    const listItems = document.getElementsByTagName("li");
    app.editTask.bind(listItems[0].querySelector("button"))();
    app.editTask.bind(listItems[1].querySelector("button"))();

    expect(listItems[0]).not.toHaveClass("edit-mode");
    expect(listItems[1]).toHaveClass("edit-mode");
  });

  describe("for todo items NOT initially in edit mode", () => {
    let listItem;

    beforeEach(() => {
      listItem = document.getElementsByTagName("li")[1];
      app.editTask.bind(listItem.querySelector("button"))();
    });

    it("changes the value of the input field to the text of the label", () => {
      const input = listItem.querySelector("input[type=text]");
      expect(input.value).toBe("Task 2");
    });

    it("changes the text of the button to 'Save'", () => {
      const button = listItem.querySelector("button");
      expect(button.innerHTML).toBe("Save");
    });
  });

  describe("for todo items already in edit mode", () => {
    let listItem;

    beforeEach(() => {
      listItem = document.getElementsByTagName("li")[0];
      app.editTask.bind(listItem.querySelector("button"))();
    });

    it("changes the test of the label to be the value of the input field", () => {
      const label = listItem.querySelector("label");
      expect(label.innerHTML).toBe("Task 1");
    });

    it("changes the text of the button to 'Edit'", () => {
      const button = listItem.querySelector("button");
      expect(button.innerHTML).toBe("Edit");
    });
  });
});
