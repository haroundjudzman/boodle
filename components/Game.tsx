import { useContext, useState } from 'react'
import { WordNumberContext } from './WordNumberContext'
import { getSolution, getValidWords } from '../libs/words'
import { GameState } from '../libs/types'
import { getAnswerStates } from '../libs/utils'
import React from 'react'
import Tile from './Tile'

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

  return (
    <div className="flex flex-col gap-1 mt-1 w-[calc(320px+1rem)] mx-auto">
      <div className="grid grid-rows-6 gap-1.5 max-w-full aspect-square">
        {Array(6)
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
    </div>
  )
}
