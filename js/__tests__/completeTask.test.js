jest.unmock("../app");

import "jest-dom/extend-expect";
import * as app from "../app";

document.body.innerHTML =
  '<label for="new-task">Add Item</label>' +
  '<input id="new-task" type="text">' +
  '<button id="add-button">Add</button>' +
  '<ul id="todo-list">' +
  "<li>" +
  '<input type="checkbox">' +
  "<label>Task 1</label>" +
  '<input type="text">' +
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

describe("completeTask()", () => {
  it("removes the task from the to do list", () => {
    const listItems = document.getElementsByTagName("li");
    listItems[1]
      .querySelector("input[type=checkbox]")
      .dispatchEvent(new MouseEvent("click"));
    expect(listItems.length).toBe(2);

    const itemLabels = Array.from(listItems).map(
      listItem => listItem.querySelector("label").innerHTML
    );

    expect(itemLabels).not.toContain("Task 2");
  });
});
