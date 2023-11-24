const taskInput = document.getElementById("task-input")
const dateInput = document.getElementById("date-input")
const addButton = document.getElementById("add-todo")
const todos = []

const addHandler = (event) => {
  event.preventDefault()
  const task = taskInput.value
  const date = dateInput.value
  const todo = {
    status: false,
    task,
    date,
  }
  todos.push(todo)
  taskInput.value = ""
  dateInput.value = ""
  console.log(todos)
}

addButton.addEventListener("click", addHandler)