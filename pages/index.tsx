import Head from 'next/head'

import LandingPage from '@/components/LandingPage'

export default function Home() {
  return (
    <>
      <Head>
        <title>L RMN - Drop a Message, Flex Your STT</title>
        <meta
          name="description"
          content="L RMN - Drop a Message, Flex Your STT"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingPage />
    </>
  )
}
