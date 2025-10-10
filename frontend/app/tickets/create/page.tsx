import TicketForm from "../ticket-form"

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Create new ticket</h1>
      <TicketForm method="POST" action="/api/tickets"></TicketForm>
    </>
  )
}
