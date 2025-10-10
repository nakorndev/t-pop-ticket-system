import { notFound } from "next/navigation"
import TicketForm from "../../ticket-form"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data, error } = await fetch(`http://localhost:3000/api/tickets/${id}`).then(res => res.json()) as {
    data: {
      id: string
      title: string
      description: string
      priority: string
      status: string
      createdAt: string
      updatedAt: string
    }
    error?: string
  }
  if (!data) return notFound()
  if (error) throw new Error(error)
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Update ticket (ID: {id})</h1>
      <TicketForm method="PATCH" action={`/api/tickets/${id}`} defaultValues={{
        title: data.title,
        description: data.description,
        priority: data.priority as 'LOW' | 'MEDIUM' | 'HIGH',
        status: data.status as 'OPEN' | 'IN_PROGRESS' | 'RESOLVED',
      }}></TicketForm>
    </>
  )
}
