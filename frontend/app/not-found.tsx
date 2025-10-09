'use client'

import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <Link className="text-blue-600 underline" href="/">Return to homepage</Link>
    </div>
  )
}
