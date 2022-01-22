import { useContext } from 'react'
import { WordNumberContext } from './WordNumberContext'
import { getSolution } from '../libs/words'

export default function Game() {
  const { wordNumber, setWordNumber } = useContext(WordNumberContext)

  // Get the solution from wordNumber
  const solution = getSolution(Number(wordNumber))
  return (
    <>
      <div>{solution}</div>
    </>
  )
}
