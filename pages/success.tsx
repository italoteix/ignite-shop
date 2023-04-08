import { stripe } from '@/lib/stripe'
import {
	ImageContainer,
	ImagesList,
	SuccessContainer,
} from '@/styles/pages/success'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Stripe from 'stripe'
import Head from 'next/head'

interface SuccessProps {
	costumerName: string;
	products: {
	  name: string;
	  imageUrl: string;
	}[]
  }

export default function Success({ costumerName, products }: SuccessProps) {
	return (
		<>
			<Head>
				<title>Compra efetuada | Ignite Shop</title>
				<meta name="robots" content="noindex" />
			</Head>

			<SuccessContainer>
				<ImagesList>
					{products.map(product => (
						<ImageContainer key={product.name}>
							<Image src={product.imageUrl} width={120} height={110} alt="" />
						</ImageContainer>
					))}
				</ImagesList>

				<h1>Compra efetuada</h1>

				<p>
					Uhuul <strong>{costumerName}</strong>, sua{' '}
					compra de {products.length} camiseta{products.length === 1 ? ' ' : 's '}
					já está a caminho da sua casa.
				</p>

				<Link href="/">Voltar ao catálogo</Link>
			</SuccessContainer>
		</>
	)
}

export async function getServerSideProps({ query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SuccessProps>> {
	if (!query.session_id) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const sessionId = query.session_id as string

	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items', 'line_items.data.price.product']
	})

	const costumerName = session.customer_details?.name
	const products = session.line_items?.data.map(item => {
		const product = item.price?.product as Stripe.Product

		return {
			name: product.name,
			imageUrl: product.images[0]
		}
	})

	return {
		props: {
			costumerName: costumerName || '',
			products: products || []
		}
	}
}
