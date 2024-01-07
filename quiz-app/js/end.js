const highScores = JSON.parse(localStorage.getItem("highScores")) || []
const score = JSON.parse(localStorage.getItem("score"))

const scoreEle = document.querySelector("p")
const input = document.querySelector("input")
const savebutton = document.querySelector("button")

scoreEle.innerText = score

const saveHandler = () => {
  if (!score || !input.value) {
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

savebutton.addEventListener("click", saveHandler)