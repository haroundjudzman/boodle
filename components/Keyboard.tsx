import KeyboardButton from './KeyboardButton'
import { GameState } from '../libs/types'
import { MutableRefObject, useEffect, useRef } from 'react'

interface Props {
  onPressChar: (char: string) => void
  onBackspace: () => void
  onSubmit: () => void
  gameState: GameState
  answer: string
}

export default function Keyboard(props: Props) {
  const { onPressChar, onBackspace, onSubmit, gameState, answer } = props
  const usedChars = new Set(
    gameState.answers
      .slice(0, gameState.attempt)
      .map((answer) => answer.split(''))
      .flat()
  )

  const correctChars = new Set()
  gameState.answers.forEach((userAnswer, i) => {
    if (i < gameState.attempt) {
      userAnswer.split('').forEach((char, j) => {
        if (answer[j] === char) {
          correctChars.add(char)
        }
      })
    }
  })

  function getKeyboardState(
    char: string
  ): 'correct' | 'exist' | 'wrong' | null {
    let state: 'correct' | 'exist' | 'wrong' | null = null
    if (correctChars.has(char)) {
      state = 'correct'
    } else if (usedChars.has(char) && answer.includes(char)) {
      state = 'exist'
    } else if (usedChars.has(char)) {
      state = 'wrong'
    }

    return state
  }

  const pressed = useRef(null)
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (gameState.attempt === 6) {
        return
      }

      const currentText = gameState.answers[gameState.attempt]
      if (
        pressed.current === true &&
        e.key === currentText[currentText.length - 1]
      ) {
        return
      }

      pressed.current = true
      if (e.key === 'Backspace') {
        onBackspace()
      } else if (e.key === 'Enter') {
        onSubmit()
      } else if (/[a-z]/i.test(e.key) && e.key.length === 1) {
        onPressChar(e.key)
      }
    }

    function handleKeyup() {
      pressed.current = false
    }

    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyup)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyup)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState])

  return (
    <div
      className="fixed bottom-1 w-[min(100vw,32rem)] grid grid-rows-3 gap-1 p-1"
      id="keyboard"
    >
      <div className="row-span-1 flex gap-1">
        {'qwertyuiop'.split('').map((char) => (
          <KeyboardButton
            key={char}
            state={getKeyboardState(char)}
            onClick={() => onPressChar(char)}
          >
            {char}
          </KeyboardButton>
        ))}
      </div>
      <div className="row-span-1 flex gap-1">
        <div style={{ flex: 0.5 }} />
        {'asdfghjkl'.split('').map((char) => (
          <KeyboardButton
            key={char}
            state={getKeyboardState(char)}
            onClick={() => onPressChar(char)}
          >
            {char}
          </KeyboardButton>
        ))}
        {/* <KeyboardButton state={null} onClick={onBackspace} scale={1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="currentColor"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </KeyboardButton> */}
        <div style={{ flex: 0.5 }} />
      </div>
      <div className="row-span-1 flex gap-1">
        <KeyboardButton key={'→'} state={null} onClick={onSubmit} scale={1.5}>
          {'↵'}
        </KeyboardButton>
        {'zxcvbnm'.split('').map((char) => (
          <KeyboardButton
            key={char}
            state={getKeyboardState(char)}
            onClick={() => onPressChar(char)}
          >
            {char}
          </KeyboardButton>
        ))}
        <KeyboardButton
          key={'⌫'}
          state={null}
          onClick={onBackspace}
          scale={1.5}
        >
          {'⌫'}
        </KeyboardButton>
        {/* <div style={{ flex: 1.5 }}></div> */}
      </div>
    </div>
  )
}
