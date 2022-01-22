import { createContext, ReactNode, useState, useMemo } from 'react'

export const WordNumberContext = createContext({
  wordNumber: '0',
  setWordNumber: (_: string) => {},
})

export const WordNumberProvider = ({ children }: { children: ReactNode }) => {
  const [wordNumber, setWordNumber] = useState('0')
  const value = useMemo(() => ({ wordNumber, setWordNumber }), [wordNumber])

  return (
    <WordNumberContext.Provider value={value}>
      {children}
    </WordNumberContext.Provider>
  )
}
