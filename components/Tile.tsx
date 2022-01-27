import { CSSProperties, useEffect, useState } from 'react'
import { AnswerState } from '../libs/types'

interface Props {
  char: string
  state: AnswerState
  isInvalid?: boolean
}

export default function Tile(props: Props) {
  const [background, setBackground] = useState('')
  const border = props.state === null ? 'border' : ''
  const borderColor = props.char === ' ' ? 'border-black' : ''
  const shadow = props.char === ' ' ? '' : 'shadow'

  const style: CSSProperties = {}
  if (props.isInvalid) {
    style.animationName = 'shake'
    style.animationDuration = '300ms'
  }

  useEffect(() => {
    switch (props.state) {
      case 'correct':
        setBackground('bg-green-500')
        break
      case 'exist':
        setBackground('bg-amber-300')
        break
      case 'wrong':
        setBackground('bg-gray-300')
        break
      default:
        setBackground('')
        break
    }
  }, [props.state])

  return (
    <div
      style={style}
      className={`text-2xl font-sans uppercase text-black text-center h-[70px] w-[64px] font-medium ${background} flex justify-center items-center ${border} ${borderColor} ${shadow}`}
    >
      {props.char}
    </div>
  )
}
