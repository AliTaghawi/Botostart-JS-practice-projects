const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-todo");
const alertBox = document.getElementById("alert-box")
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

const setAlert = (type, message) => {
  alertBox.innerHTML = ""
  const alert = document.createElement("p")
  alert.classList.add("alert")
  alert.classList.add(`alert-${type}`)
  alert.innerText = message
  setTimeout(() => {
    alertBox.append(alert)
  }, 10)
  
  setTimeout(() => {
    alert.style.display = "none"
  }, 2000)
}

//handlers
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
    saveData()
    setAlert("success", "Task added successfully")
    taskInput.value = "";
    dateInput.value = "";
  } else {
    setAlert("error", "Please insert task first!")
  }
};

addButton.addEventListener("click", addHandler);
