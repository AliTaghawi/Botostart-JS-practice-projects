const buttons = document.querySelectorAll("button")

const clickHandler = (event) => {
  const difficulty = event.target.innerText.toLowerCase();
  localStorage.setItem("difficulty", difficulty)
}

buttons.forEach(button => {
  button.addEventListener("click", clickHandler)
})