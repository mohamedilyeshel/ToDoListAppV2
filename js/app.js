// Needed Variables & Constants
const todoList = document.querySelector(".todoList");
const todoForm = document.querySelector(".todoForm");

// Classes
class Todo {
  constructor(name, done) {
    this.name = name;
    this.done = done;
  }
}

class LocalS {
  static addToStorage(todoObj) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos === null) {
      todos = [];
    }
    todos.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static chargeToDos() {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos !== null) {
      for (let todo of todos) {
        UI.addToDo(todo);
      }
    }
  }

  static removeToDos(name) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos !== null) {
      const newTodos = todos.filter((todo) => {
        return todo.name !== name;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  }

  static makeItDone(name) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos !== null) {
      const newTodos = todos.map((todo) => {
        if (todo.name === name) {
          todo.done = !todo.done;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  }
}

class UI {
  static addToDo(todo) {
    let todoElement = document.createElement("li");
    todoElement.classList.add("todoItem");
    if (todo.done === true) {
      todoElement.classList.add("done");
    }
    todoElement.append(todo.name);
    todoList.prepend(todoElement);
  }

  static removeToDo(t) {
    const tClasses = Array.from(t.classList);
    if (
      tClasses.find((e) => {
        return e === "todoItem";
      }) !== undefined
    ) {
      t.remove();
    }
  }

  static makeItDone(t) {
    const tClasses = Array.from(t.classList);
    if (
      tClasses.find((e) => {
        return e === "todoItem";
      }) !== undefined
    ) {
      t.classList.toggle("done");
    }
  }
}

// Event Listeners
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = new Todo(todoForm.elements.todo.value, false);
  UI.addToDo(todo);
  LocalS.addToStorage(todo);
  todoForm.elements.todo.value = "";
});

todoList.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

todoList.addEventListener("mousedown", (e) => {
  if (e.button == 2) {
    UI.removeToDo(e.target);
    LocalS.removeToDos(e.target.innerText);
  } else if (e.button == 0) {
    UI.makeItDone(e.target);
    LocalS.makeItDone(e.target.innerText);
  }
});

// Call Start Methods
LocalS.chargeToDos();
