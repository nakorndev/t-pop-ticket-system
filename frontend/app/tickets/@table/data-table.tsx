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
import { cn } from "@/lib/utils"
import { FormEventHandler } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  page: number
  pageSize: number
  sortBy: string
  sortOrder: string
  search?: {
    title?: string
    description?: string
    priority?: string
    status?: string
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  page,
  pageSize,
  sortBy,
  sortOrder,
  search,
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

  const router = useRouter()

  const getUrl = (newPage?: number) => {
    const values = form.getValues()
    const url = new URL('/tickets', window.location.href)
    url.searchParams.set('page', (newPage ?? page).toString())
    url.searchParams.set('sortBy', values.sortBy)
    url.searchParams.set('sortOrder', values.sortOrder)
    if (values.search.title) {
      url.searchParams.set('title', values.search.title)
    }
    if (values.search.description) {
      url.searchParams.set('description', values.search.description)
    }
    if (values.search.priority) {
      url.searchParams.set('priority', values.search.priority)
    }
    if (values.search.status) {
      url.searchParams.set('status', values.search.status)
    }
    return url
  }

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const url = getUrl(1)
    router.push(url.toString())
  }

  const form = useForm({
    defaultValues: {
      sortBy,
      sortOrder,
      search: {
        title: search?.title || '',
        description: search?.description || '',
        priority: search?.priority || '',
        status: search?.status || '',
      }
    },
  })

  return (
    <div>
      <div className="mb-2 p-2 bg-gray-200 rounded-lg">
        <Form {...form}>
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-4 gap-2">
              <FormField control={form.control} name="sortBy" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort by</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">ID</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="description">Description</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="createdAt">Created At</SelectItem>
                      <SelectItem value="updatedAt">Updated At</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="sortOrder" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort order</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Ascending</SelectItem>
                      <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="search.title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="search.description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="search.priority" render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">LOW</SelectItem>
                      <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                      <SelectItem value="HIGH">HIGH</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="search.status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OPEN">OPEN</SelectItem>
                      <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                      <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            </div>
            <div className="mt-4">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
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
              <PaginationPrevious href={getUrl(page - 1).toString()} />
            </PaginationItem>

            {pagesToShow().map((p, i) =>
              typeof p === "number" ? (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={getUrl(p).toString()}
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
              <PaginationNext href={getUrl(page + 1).toString()} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
