import './App.css'
import Pokemons from './components/pokemons'
import { useState, useEffect } from 'react'

function App() {

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const resetScore = () => setScore(0);
  const incrementScore = () => setScore(score + 1);


  useEffect(() => {
    if (highScore < score) {
      setHighScore(score);
    }
  }, [score])


  return (
    <>
      <header>
        <h1>Pokemon - Memory game</h1>
        <h3>Click on a Pokemon card <span>(* only once)</span> and collect points</h3>
        <div className='Scores'>
          <h3>Score: {score}</h3>
          <h3>High Score: {highScore}</h3>
        </div>
      </header>
      <Pokemons
        resetScore={resetScore}
        incrementScore={incrementScore}
      />    
    </>
  )
}

export default App
