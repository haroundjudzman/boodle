import Head from 'next/head'
import Nav from '../components/Nav'
import Game from '../components/Game'
import { WordNumberProvider } from '../components/WordNumberContext'

export default function Home() {
  return (
    <>
      <Head>
        <title>boodle</title>
        <meta name="description" content="Unlimited wordle" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <WordNumberProvider>
        <div className="h-screen">
          <Nav />
          <Game />
        </div>
      </WordNumberProvider>
    </>
  )
}
