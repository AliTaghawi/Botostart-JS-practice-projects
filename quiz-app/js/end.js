const highScores = JSON.parse(localStorage.getItem("highScores")) || []
const score = JSON.parse(localStorage.getItem("score"))

const scoreEle = document.querySelector("p")
const input = document.querySelector("input")
const savebutton = document.querySelector("button")

const loadHandler = () => {
  if (!score) {
    input.style.pointerEvents = "none"
    input.style.opacity = ".55"
    savebutton.style.pointerEvents = "none"
    savebutton.style.opacity = ".55"
  }
  scoreEle.innerText = score
}

const saveHandler = () => {
  if (!input.value) {
    alert("Invalid score or username")
  } else {
    highScores.push({name: input.value, score})
    highScores.sort((a, b) => b.score - a.score)
    highScores.splice(10)
    localStorage.setItem("highScores", JSON.stringify(highScores))
    localStorage.removeItem("score")
    location.assign("./")
  }
}

window.addEventListener("load", loadHandler)
savebutton.addEventListener("click", saveHandler)