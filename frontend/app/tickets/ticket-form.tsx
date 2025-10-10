'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(5),
  description: z.string().max(5000),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']),
})

type FormSchema = z.infer<typeof formSchema>

export default function TicketForm({
  method,
  action,
  defaultValues
}: {
  method: 'GET' | 'POST',
  action: string,
  defaultValues?: FormSchema
}) {
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      priority: 'LOW',
      status: 'OPEN',
    }
  })
  const [loading, setLoading] = useState(false)
  async function handleSubmit(values: FormSchema) {
    setLoading(true)
    const res = await fetch(action, {
      method,
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      alert(res.statusText)
    } else {
      alert('Done!')
      const json = await res.json()
      router.push(`/tickets/${json.id}`)
    }
    setLoading(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-sm">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="priority" render={({ field }) => (
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
        <FormField control={form.control} name="status" render={({ field }) => (
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
        <Button type="submit" disabled={loading}>Submit</Button>
      </form>
    </Form>
  )
}
