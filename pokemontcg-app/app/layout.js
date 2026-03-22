import './globals.css'
import ReduxProvider from '@/store/provider'
import Navbar from '@/components/Navbar'

export const metadata = { title: 'TCG Explorer', description: 'Pokémon TCG card browser' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}