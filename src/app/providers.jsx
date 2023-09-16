// app/providers.tsx
'use client'
import { Toaster } from 'react-hot-toast';

import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }) {
	return (
		<NextUIProvider>
			{children}
			<Toaster/>
		</NextUIProvider>
	)
}