import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const sarabunFont = Sarabun({
  subsets: ["latin", "thai"],
  variable: "--font-sarabun",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin T-POP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={sarabunFont.className}
      >
        <nav className="bg-gray-200 py-2">
          <div className="px-3">
            <div className="flex items-center gap-2">
              <h1 className="font-bold">Admin T-POP</h1>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="cursor-pointer hover:bg-gray-300 rounded-md px-2 py-1">
                    Tickets
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Link href="/tickets">รายการ Tickets ทั้งหมด</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/tickets/create">สร้าง Ticket ใหม่</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
        <main className="py-4">
          <div className="px-3">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
