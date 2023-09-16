import './globals.css'
import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`
import { Providers } from "./providers";
import NavBar from "../components/layouts/navbar"

const menlo = localFont({
  src: './Menlo-Regular.woff',
  display: 'swap',
})


export const metadata = {
	title: 'Mockapi',
	description: 'Created by azkal',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className='light' suppressHydrationWarning>
			<body className={menlo.className}><Providers>
			
				<main>
					{children}
				</main>
			</Providers></body>
		</html>
	)
}
