'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  async function handleDelete() {
    if (confirm("Are you sure you want to delete this ticket?")) {
      await fetch(`http://localhost:3000/api/tickets/${id}`, { method: 'DELETE' })
      alert('Done')
      router.push('/tickets')
    }
  }
  return (
    <Button onClick={handleDelete} variant="destructive">
      Delete
    </Button>
  )
}
