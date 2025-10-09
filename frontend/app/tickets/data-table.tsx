"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  page: number
  pageSize: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  page,
  pageSize,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const totalPages = Math.ceil(total / pageSize)

  function pagesToShow() {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (page > 3) pages.push(1, "…")
      for (
        let i = Math.max(1, page - 2);
        i <= Math.min(totalPages, page + 2);
        i++
      ) {
        pages.push(i)
      }
      if (page < totalPages - 2) pages.push("…", totalPages)
    }
    return pages
  }

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`/tickets?page=${page === 1 ? 1 : page - 1}`} />
            </PaginationItem>

            {pagesToShow().map((p, i) =>
              typeof p === "number" ? (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`/tickets?page=${p}`}
                    className={cn(p === page && "bg-primary text-white")}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={i}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext href={`/tickets?page=${page === 1 ? 1 : page + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
