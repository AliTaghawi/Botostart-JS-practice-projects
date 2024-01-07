const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const scoreList = document.querySelector("ol")

scoreList.innerHTML = highScores.map((item, index) => {
  return `
    <li>
      <span>${index + 1}</span>
      <p>${item.name}</p>
      <span>${item.score}</span>
    </li>
  `
}).join("")