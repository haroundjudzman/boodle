import { useContext } from 'react'
import { WordNumberContext } from './WordNumberContext'

export default function Nav() {
  const { wordNumber, setWordNumber } = useContext(WordNumberContext)

  return (
    <div className="flex justify-between items-center px-3 py-2 border-b-2">
      <p className="font-mono">boodle</p>
      <div className="flex justify-between">
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setWordNumber((Number(wordNumber) - 1).toString())}
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <input
          inputMode="numeric"
          className="w-6 accent-red-500 caret-red-500 text-center"
          value={wordNumber}
          onChange={(e) => setWordNumber(e.target.value)}
        ></input>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setWordNumber((Number(wordNumber) + 1).toString())}
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  )
}
