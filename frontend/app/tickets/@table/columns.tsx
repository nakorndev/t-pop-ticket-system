'use client'

import { ColumnDef } from "@tanstack/react-table"

export type Ticket = {
  id: string
  title: string
  description: string
  priority: string
  status: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span className="font-mono">{row.getValue('id')}</span>
    )
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const text = row.getValue('description') as string
      const short = text.length > 50 ? text.slice(0, 50) + '...' : text
      return <span title={text}>{short}</span>
    }
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
  },
]
