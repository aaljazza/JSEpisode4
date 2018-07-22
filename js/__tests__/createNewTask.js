import "jest-dom/extend-expect";

document.body.innerHTML =
  '<label for="new-task">Add Item</label>' +
  '<input id="new-task" type="text">' +
  '<button id="add-button">Add</button>' +
  '<ul id="todo-list">' +
  "<li>" +
  '<input type="checkbox">' +
  "<label>Pay Bills</label>" +
  '<input type="text">' +
  '<button class="edit">Edit</button>' +
  "</li>" +
  '<li class="editMode">' +
  '<input type="checkbox">' +
  "<label>Go Shopping</label>" +
  '<input type="text" value="Go Shopping">' +
  '<button class="edit">Save</button>' +
  "</li>" +
  "</ul>";

const { createNewTask } = require("../app");
let newTask;

beforeEach(() => {
  newTask = createNewTask("pass the tests");
});

describe("createNewTask()", () => {
  it("returns a new list item", () => {
    expect(newTask).toBeInstanceOf(HTMLLIElement);
  });

  describe("the item", () => {
    it("has a checkbox", () => {
      const checkbox = newTask.querySelector("input[type=checkbox]");
      expect(checkbox).not.toBeNull();
    });

    it("has a text input field", () => {
      const textInput = newTask.querySelector("input[type=text]");
      expect(textInput).not.toBeNull();
    });

    it("has an 'edit' button", () => {
      const editButton = newTask.querySelector("button");
      expect(editButton).not.toBeNull();
      expect(editButton.innerText).toBe("Edit");
      expect(editButton).toHaveClass("edit");
    });

    it("has a label which shows the correct task", () => {
      const label = newTask.querySelector("label");
      expect(label).not.toBeNull();
      expect(label.innerText).toBe("pass the tests");

      const otherTask = createNewTask("some other task");
      const otherLabel = otherTask.querySelector("label");
      expect(otherLabel.innerText).toBe("some other task");
    });
  });
});
