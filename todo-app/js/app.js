const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-todo");
const alertBox = document.getElementById("alert-box");
const tbody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all");
const editCancelDiv = document.querySelector(".edit-cancel")

let todos = JSON.parse(localStorage.getItem("todos")) || [];

//functions
const generatId = () => {
  return (
    "ID" +
    (
      Math.trunc(Math.random() * Date.now()).toString() +
      Math.trunc(Math.random() * Date.now()).toString()
    ).slice(0, 16)
  );
};

const saveData = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const setAlert = (type, message) => {
  alertBox.innerHTML = "";
  const alert = document.createElement("p");
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alert.innerText = message;
  setTimeout(() => {
    alertBox.append(alert);
  }, 10);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

//handlers
const renderTodos = () => {
  //loadHandler
  if (!todos.length) {
    tbody.innerHTML = `<tr><td colspan="4">No task found!</td></tr>`;
    return;
  }

  tbody.innerHTML = `${todos
    .map((todo) => {
      return `
        <tr>
          <td>${todo.task}</td>
          <td>${todo.date || "No Date"}</td>
          <td>${todo.status ? "Completed" : "Pending"}</td>
          <td>
            <button onclick="editHandler('${todo.id}')">Edit</button>
            <button onclick="statusHandler('${todo.id}')">${todo.status ? "Undo" : "Do"}</button>
            <button onclick="deleteHandler('${todo.id}')">Delete</button>
          </td>
        </tr>
      `;
    })
    .join("")}`;
};

const addHandler = (event) => {
  event.preventDefault();
  const task = taskInput.value;
  const date = dateInput.value;
  if (task) {
    const todo = {
      id: generatId(),
      status: false,
      task,
      date,
    };
    todos.push(todo);
    saveData();
    renderTodos();
    setAlert("success", "Task added successfully");
    taskInput.value = "";
    dateInput.value = "";
  } else {
    setAlert("error", "Please insert task first!");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveData();
    renderTodos();
    setAlert("success", "All tasks deleted successfully");
  } else {
    setAlert("error", "There is no task to clear!");
  }
};

const deleteHandler = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveData();
  renderTodos();
  setAlert("success", "task deleted successfully");
};

const statusHandler = (id) => {
  const todo = todos.find(todo => todo.id === id);
  todo.status = !todo.status;
  saveData();
  renderTodos();
  setAlert("success", "Status changed successfully");
}

const editHandler = (id) => {
  const editButton = editCancelDiv.children[0];
  const todo = todos.find(todo => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editCancelDiv.style.display = "flex";
  editButton.dataset.id = id;
}

window.addEventListener("load", renderTodos);
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
