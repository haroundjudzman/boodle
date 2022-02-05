import { useContext, useEffect, useState } from 'react'
import { WordNumberContext } from './WordNumberContext'
import { getSolution, getValidWords } from '../libs/words'
import { GameState } from '../libs/types'
import { getAnswerStates } from '../libs/utils'
import React from 'react'
import Tile from './Tile'
import Keyboard from './Keyboard'
import Nav from './Nav'
import Alert from './Alert'

const initialState: GameState = {
  answers: Array(6).fill(''),
  attempt: 0,
}

export default function Game() {
  const { wordNumber, setWordNumber } = useContext(WordNumberContext)
  const [gameState, setGameState] = useState(initialState)
  const solution = getSolution(Number(wordNumber))
  const validWords = getValidWords()
  const [invalidAnswer, setInvalidAnswer] = useState(false)
  const [status, setStatus] = useState('playing')
  const [message, setMessage] = useState(null)

  console.log(wordNumber)
  useEffect(() => {
    setGameState(initialState)
  }, [wordNumber])

  function handlePressChar(char: string) {
    // ignore if already finished
    if (gameState.answers[gameState.attempt - 1] === solution) {
      return
    }

    setGameState({
      answers: gameState.answers.map((answer, i) => {
        if (i === gameState.attempt && answer.length < 5) {
          return answer + char
        }

        return answer
      }),
      attempt: gameState.attempt,
    })
  }

  function handleBackspace() {
    setGameState({
      answers: gameState.answers.map((answer, i) => {
        if (i === gameState.attempt) {
          return answer.slice(0, -1)
        }

        return answer
      }),
      attempt: gameState.attempt,
    })
  }

  function handleSubmit() {
    // ignore submission if the answer is already correct
    if (gameState.answers[gameState.attempt - 1] === solution) {
      return
    }

    const userAnswer = gameState.answers[gameState.attempt]
    if (userAnswer.length < 5) {
      markInvalid()
      return
    }

    if (!validWords.has(userAnswer)) {
      markInvalid()
      return
    }

    setInvalidAnswer(false)
    setGameState({
      answers: gameState.answers.map((answer, i) => {
        if (i === gameState.attempt) {
          return userAnswer
        }

        return answer
      }),
      attempt: gameState.attempt + 1,
    })

    if (solution === userAnswer) {
      setStatus('won')
    } else if (gameState.attempt === 5) {
      setStatus('lost')
      showMessage(solution)
    }
  }
  function showMessage(message: string) {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 750)
  }

  function markInvalid() {
    setInvalidAnswer(true)
    setTimeout(() => {
      setInvalidAnswer(false)
    }, 300)
  }

  return (
    <div>
      <Nav />
      <div className="mt-5">
        <div
          className="grid grid-rows-6 gap-14 aspect-square mx-3"
          key={Number(wordNumber)}
        >
          {message && <Alert>{message}</Alert>}
          {Array(6)
            .fill('')
            .map((_, i) => {
              let userAnswer = gameState.answers[i] ?? ''
              userAnswer += ' '.repeat(5 - userAnswer.length)

              const answerStates = getAnswerStates(userAnswer, solution)
              return (
                <div
                  className="grid grid-cols-5 gap-1.5 justify-center"
                  key={i}
                >
                  {userAnswer.split('').map((char, index) => {
                    let state = null
                    if (i < gameState.attempt) {
                      state = answerStates[index]
                    }
                    const isInvalid = invalidAnswer && i === gameState.attempt
                    return (
                      <React.Fragment key={index}>
                        <Tile
                          key={index}
                          char={char}
                          state={state}
                          isInvalid={isInvalid}
                        />
                      </React.Fragment>
                    )
                  })}
                </div>
              )
            })}
        </div>
        <Keyboard
          gameState={gameState}
          answer={solution}
          onPressChar={handlePressChar}
          onBackspace={handleBackspace}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
