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
  const url = new URL('http://localhost:3000/api/tickets')
  url.searchParams.set('page', page.toString())
  url.searchParams.set('pageSize', '10')
  url.searchParams.set('sortBy', sortBy)
  url.searchParams.set('sortOrder', sortOrder)
  const { data, total } = await fetch(url).then(res => res.json()) as {
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
        search={{}}
      ></DataTable>
    </div>
  )
}
