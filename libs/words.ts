import { SOLUTIONS } from '../constants/solutions'
import { VALIDWORDS } from '../constants/validWords'

export const getSolution = (wordId: number) => {
  // Check for NaN
  if (isNaN(wordId)) {
    return SOLUTIONS[0]
  }

  // Check for correct range
  if (wordId < 0 || wordId > 2315) {
    return SOLUTIONS[0]
  }

  return SOLUTIONS[wordId]
}

export const getValidWords = () => VALIDWORDS
