import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Page() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Tickets</h1>
        <Link href="/tickets/create">
          <Button>Create</Button>
        </Link>
      </div>
    </div>
  )
}
