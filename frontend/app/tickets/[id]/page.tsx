import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import DeleteButton from "./delete-button"

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
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
    <div>
      <ul className="list-disc pl-6">
        <li>ID: {data.id}</li>
        <li>Title: {data.title}</li>
        <li>Description: {data.description}</li>
        <li>Priority: {data.priority}</li>
        <li>Status: {data.status}</li>
        <li>Created At: {data.createdAt}</li>
        <li>Updated At: {data.updatedAt}</li>
      </ul>
      <div className="mt-4 flex gap-2">
        <Button>
          <Link href={`/tickets/${id}/edit`}>Edit</Link>
        </Button>
        <DeleteButton id={id}></DeleteButton>
      </div>
    </div>
  )
}
