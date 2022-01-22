import { useContext, useEffect, useRef, useState } from 'react'
import { WordNumberContext } from './WordNumberContext'
import { getSolution, getValidWords } from '../libs/words'
import { GameState } from '../libs/types'
import { getAnswerStates } from '../libs/utils'
import React from 'react'
import Tile from './Tile'
import Keyboard from './Keyboard'

const initialState: GameState = {
  answers: Array(6).fill(''),
  attempt: 0,
}

export default function Game() {
  const { wordNumber } = useContext(WordNumberContext)
  const [gameState, setGameState] = useState(initialState)
  const solution = getSolution(Number(wordNumber))
  const validWords = getValidWords()
  const [invalidAnswer, setInvalidAnswer] = useState(false)
  const isAnimating = useRef(null)
  const [resetIndex, setResetIndex] = useState(0)

  useEffect(() => {
    setGameState(initialState)
  }, [wordNumber])

  function handlePressChar(char: string) {
    // ignore if already finished
    if (gameState.answers[gameState.attempt - 1] === solution) {
      return
    }

    if (isAnimating.current) {
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
    if (isAnimating.current) {
      return
    }

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
    if (isAnimating.current) {
      return
    }

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

    isAnimating.current = true
    setTimeout(() => {
      isAnimating.current = false

      if (solution === userAnswer) {
        console.log('SUCCESS')
      } else if (gameState.attempt === 5) {
        console.log('GAGAL')
      }
    }, 400 * 6)
  }

  function markInvalid() {
    setInvalidAnswer(true)
    setTimeout(() => {
      setInvalidAnswer(false)
    }, 600)
  }

  return (
    <div className="flex flex-col gap-1 mt-1 w-[calc(320px+1rem)] mx-auto">
      <div
        className="grid grid-rows-6 gap-1.5 max-w-full aspect-square"
        key={Number(wordNumber)}
      >
        {Array(2)
          .fill('')
          .map((_, i) => {
            let userAnswer = gameState.answers[i] ?? ''
            userAnswer += ' '.repeat(5 - userAnswer.length)

            const answerStates = getAnswerStates(userAnswer, solution)
            return (
              <div className="grid grid-cols-5 gap-1.5 relative" key={i}>
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
                        delay={300 * index}
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
        isAnimating={isAnimating}
      />
    </div>
  )
}
