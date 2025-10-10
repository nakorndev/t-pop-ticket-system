'use client'

import Link from "next/link"

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p>{error.message}</p>
      <Link className="text-blue-600 underline" href="/">Return to homepage</Link>
    </div>
  )
}
