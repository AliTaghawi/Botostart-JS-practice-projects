const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-todo");
const todos = JSON.parse(localStorage.getItem("todos")) || [];

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

//handlers
const addHandler = (event) => {
  event.preventDefault();
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generatId(),
    status: false,
    task,
    date,
  };
  todos.push(todo);
  saveData()
  taskInput.value = "";
  dateInput.value = "";
  console.log(todos);
  console.log(localStorage.getItem("todos"))
};

addButton.addEventListener("click", addHandler);
