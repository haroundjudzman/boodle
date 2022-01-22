import Head from 'next/head'
import Nav from '../components/Nav'
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
        <Nav />
      </WordNumberProvider>
    </>
  )
}
