import './globals.css'
import { Inter } from 'next/font/google'
import SimpleFooter from '@components/Footer'
import { CartProvider } from '@lib/cartContext'
import Header from "@/components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Underwave',
  description: 'Tienda de discos',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={'bg-stone-100 antialiased ' + inter.className}>
      <body className='bg-stone-100 p-3'>
        <CartProvider>
          <Header />
          {children}
          <SimpleFooter />
        </CartProvider>
      </body>
    </html>
  )
}

export default RootLayout
