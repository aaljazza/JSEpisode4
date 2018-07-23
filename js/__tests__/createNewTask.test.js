jest.unmock("../app");

import "jest-dom/extend-expect";
import * as app from "../app";

document.body.innerHTML =
  '<label for="new-task">Add Item</label>' +
  '<input id="new-task" type="text">' +
  '<button id="add-button">Add</button>' +
  '<ul id="todo-list">' +
  "</ul>";
app.setup();

let newTask;

beforeEach(() => {
  newTask = app.createNewTask("pass the tests");
});

describe("createNewTask()", () => {
  it("returns a new list item", () => {
    expect(newTask).toBeInstanceOf(HTMLLIElement);
  });

  describe("The List Item", () => {
    it("has a text input field", () => {
      const textInput = newTask.querySelector("input[type=text]");
      expect(textInput).not.toBeNull();
    });

    it("has an 'edit' button", () => {
      const editButton = newTask.querySelector("button");
      expect(editButton).not.toBeNull();
      expect(editButton.innerHTML).toBe("Edit");
      expect(editButton).toHaveClass("edit");
    });

    describe("The Edit Button", () => {
      it("calls editTask when clicked", () => {
        const editButton = newTask.querySelector("button");
        expect(editButton.onclick).toBe(app.editTask);
      });
    });

    it("has a checkbox", () => {
      const checkbox = newTask.querySelector("input[type=checkbox]");
      expect(checkbox).not.toBeNull();
    });

    describe("The Checkbox", () => {
      it("calls completeTask when checked", () => {
        const checkbox = newTask.querySelector("input[type=checkbox]");
        expect(checkbox.onchange).toBe(app.completeTask);
      });
    });

    it("has a label which shows the correct task", () => {
      const label = newTask.querySelector("label");
      expect(label).not.toBeNull();
      expect(label.innerHTML).toBe("pass the tests");

      const otherTask = app.createNewTask("some other task");
      const otherLabel = otherTask.querySelector("label");
      expect(otherLabel.innerHTML).toBe("some other task");
    });
  });
});
