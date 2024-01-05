import formatData from "./functions.js"

const loader = document.getElementById("loader")
const container = document.getElementById("container")
const errorEle = document.getElementById("error")
const questionText = document.getElementById("question-text")
const answerList = document.querySelectorAll(".answer-text")

const difficulty = localStorage.getItem("difficulty") || "medium"
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`
let formattedData = null;
let questionNumber = 0;
let correctAnswer = null

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

window.addEventListener("load", fetchData)