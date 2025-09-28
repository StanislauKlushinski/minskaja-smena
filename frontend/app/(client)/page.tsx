import React from 'react'
import Link from 'next/link'

export default function Home () {
  return (
    <>
      <h1>
        Main page
      </h1>
      <Link href={'/1/model-test'}>test</Link>
    </>
  )
}
