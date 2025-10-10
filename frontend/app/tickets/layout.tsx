export default async function Layout({
  children,
  table
}: {
  children: React.ReactNode
  table: React.ReactNode
}) {
  return (
    <div>
      {children}
      {table}
    </div>
  )
}
