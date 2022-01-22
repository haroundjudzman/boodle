export type AnswerState = 'correct' | 'exist' | 'wrong' | null

export interface GameState {
  answers: string[]
  attempt: number
}
