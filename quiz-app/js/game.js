import formatData from "./functions.js"

const loader = document.getElementById("loader")
const container = document.getElementById("container")
const errorEle = document.getElementById("error")
const questionText = document.getElementById("question-text")
const answerList = document.querySelectorAll(".answer-text")
const scoreEle = document.getElementById("score")
const questionCounter = document.getElementById("question-counter")
const nextButton = document.getElementById("next-button")
const finishButton = document.getElementById("finish-button")

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
  questionCounter.innerText = questionNumber + 1
  questionText.innerHTML = question
  answerList.forEach((button, index) => {
    button.innerHTML = answers[index]
    button.className = "answer-text"
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
    localStorage.removeItem("difficulty")
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

const nextHandler = () => {
  questionNumber++
  if (questionNumber < formattedData.length) {
    showQuestion()
    isClicked = false
  } else {
    finishHandler()
  }
}

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score))
  location.assign("./end.html")
}

window.addEventListener("load", fetchData)
nextButton.addEventListener("click", nextHandler)
finishButton.addEventListener("click", finishHandler)
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => answerHandler(event, index))
})