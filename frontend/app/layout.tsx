import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'CryptoCritters - Your Portfolio Has Paws',
  description: 'Gamified BSC portfolio tracker where tokens become AI-generated critters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-space">
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#151528',
              color: '#fff',
              border: '1px solid #7B61FF',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
