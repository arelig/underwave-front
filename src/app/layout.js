import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@components/navbar/NavBar'
import SimpleFooter from '@components/footer'
import {CartProvider} from './lib/cartContext'

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
          <NavBar />
          {children}
          <SimpleFooter />
        </CartProvider>
      </body>
    </html>
  )
}

export default RootLayout
