import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = Number(params.page || 1)
  const sortBy = String(params.sortBy || 'id')
  const sortOrder = String(params.sortOrder || 'asc')
  const title = String(params.title || '')
  const description = String(params.description || '')
  const priority = String(params.priority || '')
  const status = String(params.status || '')
  const url = new URL('http://localhost:3000/api/tickets')
  url.searchParams.set('page', page.toString())
  url.searchParams.set('pageSize', '10')
  url.searchParams.set('sortBy', sortBy)
  url.searchParams.set('sortOrder', sortOrder)
  if (title) url.searchParams.set('title', title)
  if (description) url.searchParams.set('description', description)
  if (priority) url.searchParams.set('priority', priority)
  if (status) url.searchParams.set('status', status)
  console.log(url.href)
  const { data, total, error } = await fetch(url).then(res => res.json()) as {
    data: {
      id: string
      title: string
      description: string
      priority: string
      status: string
      createdAt: string
      updatedAt: string
    }[]
    total: number
    error?: string
  }
  if (error) {
    throw new Error(error)
  }
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        pageSize={10}
        sortBy={sortBy}
        sortOrder={sortOrder}
        search={{
          title,
          description,
          priority,
          status
        }}
      ></DataTable>
    </div>
  )
}
