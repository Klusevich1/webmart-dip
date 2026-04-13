import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'

export const metadata: Metadata = {
  title: 'Webmart - Digital Performance Marketing Agency',
  description: 'Digital-агентство WEBMART – команда профессионалов с мощным портфолио, экспертизой в интернет-маркетинге, креативе и аналитике',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="font-gilroy">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  )
}


