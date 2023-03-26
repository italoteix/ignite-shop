import { Header } from '@/components/Header'
import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

globalStyles()

const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
const cancelUrl = `${process.env.NEXT_URL}/`

export default function App({ Component, pageProps }: AppProps) {
	return (
		<CartProvider
			mode='payment'
			cartMode='client-only'
			stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
			successUrl={successUrl}
			cancelUrl={cancelUrl}
			currency='BRL'
			shouldPersist
		>
			<Container>
				<Header />
				<Component {...pageProps} />
			</Container>
		</CartProvider>
	)
}
