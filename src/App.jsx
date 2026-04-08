import { useState } from 'react'
import './index.css'

const choices = ['Rock', 'Paper', 'Scissors']

function getResult(player, computer) {
  if (player === computer) return 'Draw'
  if (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Paper' && computer === 'Rock') ||
    (player === 'Scissors' && computer === 'Paper')
  ) return 'You Win!'
  return 'You Lose!'
}

function App() {
  const [playerChoice, setPlayerChoice] = useState('')
  const [computerChoice, setComputerChoice] = useState('')
  const [result, setResult] = useState('')
  const [rounds, setRounds] = useState(0)
  const [streak, setStreak] = useState(0)
  const [history, setHistory] = useState([])

  function play(choice) {
    const computer = choices[Math.floor(Math.random() * 3)]
    const outcome = getResult(choice, computer)

    setPlayerChoice(choice)
    setComputerChoice(computer)
    setResult(outcome)
    setRounds(r => r + 1)
    setStreak(s => outcome === 'You Win!' ? s + 1 : 0)
    setHistory(h => [{ round: rounds + 1, player: choice, computer, outcome }, ...h])
  }

  function reset() {
    setPlayerChoice('')
    setComputerChoice('')
    setResult('')
    setRounds(0)
    setStreak(0)
    setHistory([])
  }

  return (
    <div className="container">
      <h1>Rock Paper Scissors</h1>

      <div className="stats">
        <span>Rounds: {rounds}</span>
        <span>Win Streak: {streak}</span>
      </div>

      <div className="buttons">
        {choices.map(choice => (
          <button key={choice} onClick={() => play(choice)}>{choice}</button>
        ))}
      </div>

      {result && (
        <div className="result">
          <p>You chose: <strong>{playerChoice}</strong></p>
          <p>CPU chose: <strong>{computerChoice}</strong></p>
          <h2>{result}</h2>
        </div>
      )}

      <button className="reset" onClick={reset}>Reset Game</button>

      {history.length > 0 && (
        <div className="history">
          <h3>Move History</h3>
          <table>
            <thead>
              <tr>
                <th>Round</th>
                <th>You</th>
                <th>CPU</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map(h => (
                <tr key={h.round}>
                  <td>{h.round}</td>
                  <td>{h.player}</td>
                  <td>{h.computer}</td>
                  <td>{h.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
