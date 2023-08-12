import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { ClerkProvider } from '@clerk/nextjs'
import QueryProvider from '@/utils/providers/QueryProvider'
import { Toaster } from '@/components/ui/Toast'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Rs utility tool',
  description: 'BracU Residential Semester Utility Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <QueryProvider>
          <Toaster
            position="bottom-center" />
          <body className={inter.className}>{children}</body>
          {/* <Footer /> */}
        </QueryProvider>
      </html>
    </ClerkProvider>

  )
}
