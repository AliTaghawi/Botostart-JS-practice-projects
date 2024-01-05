const formatData = (data) => {
  const newData = data.map(item => {
    const correctAnswerIndex = Math.floor(Math.random() * 4)
    const answers = item.incorrect_answers
    answers.splice(correctAnswerIndex, 0, item.correct_answer)
    return {
      question: item.question,
      answers,
      correctAnswerIndex
    }
  })
  return newData
}

export default formatData