const buttons = document.querySelectorAll("button")

const clickHandler = (event) => {
  const difficulty = event.target.innerText.toLowerCase();
  localStorage.setItem("difficulty", difficulty)
  location.assign("./game.html")
}

buttons.forEach(button => {
  button.addEventListener("click", clickHandler)
})