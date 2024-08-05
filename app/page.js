// pages/index.js

import Head from 'next/head'
import { HomeComponent } from './HomeComponent'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to our homepage!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeComponent/>
    </div>
  )
}
