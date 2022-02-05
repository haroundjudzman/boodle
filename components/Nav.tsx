import { useContext } from 'react'
import { WordNumberContext } from './WordNumberContext'

export default function Nav() {
  const { wordNumber, setWordNumber } = useContext(WordNumberContext)

  return (
    <div className="flex justify-between pt-2 pb-2 border-b-2">
      <p className="font-mono pl-3">boodle</p>
      <div className="flex justify-between pr-2">
        <svg
          className="w-6 h-6 shadow-sm rounded-sm mx-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() =>
            setWordNumber(Math.floor(Math.random() * (2314 - 0)).toString())
          }
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className="w-6 h-6 shadow-sm rounded-sm"
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
          className="w-12 accent-red-500 caret-red-500 text-center font-sans mx-1"
          value={wordNumber}
          onChange={(e) => setWordNumber(e.target.value)}
        ></input>
        <svg
          className="w-6 h-6 shadow-sm rounded-sm"
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
