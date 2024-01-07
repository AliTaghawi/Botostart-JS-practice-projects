import formatData from "./functions.js"

const loader = document.getElementById("loader")
const container = document.getElementById("container")
const errorEle = document.getElementById("error")
const questionText = document.getElementById("question-text")
const answerList = document.querySelectorAll(".answer-text")
const scoreEle = document.getElementById("score")

const difficulty = localStorage.getItem("difficulty") || "medium"
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`
const SCORE_BUNOS = 10
let formattedData = null;
let questionNumber = 0;
let correctAnswer = null
let isClicked = false;
let score = 0

const showQuestion = () => {
  const {question, answers, correctAnswerIndex} = formattedData[questionNumber]
  correctAnswer = correctAnswerIndex
  questionText.innerHTML = question
  answerList.forEach((button, index) => {
    button.innerHTML = answers[index]
  })
}

const start = () => {
  showQuestion()
  loader.style.display = "none"
  container.style.display = "block"
}

const fetchData = async () => {
  try {
    const res = await fetch(URL)
    const  data = await res.json()
    formattedData = formatData(data.results)
    start()
  } catch (err) {
    loader.style.display = "none"
    errorEle.style.display = "flex"
  }
}

const answerHandler = (event, index) => {
  if (isClicked) return;
  isClicked = true;
  const isCorrect = index == correctAnswer
  if (isCorrect) {
    event.target.classList.add("correct")
    score += SCORE_BUNOS
    scoreEle.innerText = score
  } else {
    event.target.classList.add("incorrect")
    answerList[correctAnswer].classList.add("correct")
  }
}

window.addEventListener("load", fetchData)
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => answerHandler(event, index))
})