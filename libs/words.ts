import { SOLUTIONS } from '../constants/solutions'
import { VALIDWORDS } from '../constants/validWords'

export const getSolution = (wordId: number) => SOLUTIONS[wordId].toUpperCase()

export const getValidWords = () => VALIDWORDS
