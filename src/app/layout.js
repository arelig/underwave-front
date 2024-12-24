import './globals.css'
import { Inter } from 'next/font/google'
import SimpleFooter from '@components/Footer'
import { CartProvider } from '@lib/cartContext'
import Header from "@/components/Header";
import { AuthProvider } from '@lib/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Underwave',
	description: 'Tienda de discos',
}

const RootLayout = ({ children }) => {
	return (
		<html lang="en" className={'antialiased ' + inter.className}>
			<body className='bg-[#f5f5f5] ' >
				<AuthProvider>
					<CartProvider>
						<Header />
						{children}
						<SimpleFooter />
					</CartProvider>
				</AuthProvider>
			</body>
		</html>
	)
}

export default RootLayout
