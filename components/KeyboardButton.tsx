import { ComponentProps } from 'react'

type Props = {
  state: 'correct' | 'exist' | 'wrong' | null
  scale?: number
} & Omit<ComponentProps<'button'>, 'className' | 'style'>

export default function KeyboardButton(props: Props) {
  let background = ''
  switch (props.state) {
    case 'correct':
      background = 'bg-green-500'
      break
    case 'exist':
      background = 'bg-amber-300'
      break
    case 'wrong':
      background = 'bg-gray-300'
      break
    default:
  }

  return (
    <button
      className={`font-sans uppercase flex items-center justify-center ${background} border rounded shadow-sm`}
      style={{ minHeight: 48, flex: props.scale ?? 1 }}
      {...props}
    />
  )
}
