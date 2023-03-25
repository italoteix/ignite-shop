import { stripe } from '@/lib/stripe'
import {
	ImageContainer,
	ProductContainer,
	ProductDetails,
} from '@/styles/pages/product'
import axios from "axios";
import { GetStaticPropsContext } from "next";
import Head from 'next/head';
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
	product: {
		id: string
		name: string
		imageUrl: string
		price: string
		description: string
		defaultPriceId: string
	}
}

export default function Product({ product }: ProductProps) {
	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

	async function handleBuyClick() {
		try {
			setIsCreatingCheckoutSession(true)

			const response = await axios.post('/api/checkout', {
				priceId: product.defaultPriceId
			})

			const { checkoutUrl } = response.data

			window.location.href = checkoutUrl
		} catch {
			setIsCreatingCheckoutSession(false)

			alert('Falha ao direcionar ao checkout.')
		}
	}

    return (
		<>
			<Head>
				<title>{product.name} | Ignite Shop</title>
			</Head>

			<ProductContainer>
				<ImageContainer>
					<Image src={product.imageUrl} width={520} height={480} alt="" />
				</ImageContainer>

				<ProductDetails>
					<h1>{product.name}</h1>
					<span>{product.price}</span>

					<p>{product.description}</p>

					<button disabled={isCreatingCheckoutSession} onClick={handleBuyClick}>
						Comprar agora
					</button>
				</ProductDetails>
			</ProductContainer>
		</>
	)
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ id: string }>) {
	const productId = params?.id

	if (!productId) {
		return {
			notFound: true
		}
	}

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price']
	})

	const price = product.default_price as Stripe.Price

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: new Intl.NumberFormat('pt-BR',{
					style: 'currency',
					currency: 'BRL'
				}).format((price.unit_amount ?? 0) / 100),
				description: product.description,
				defaultPriceId: price.id
			}
		},
		revalidate: 60 * 60 * 1, // 1 hour
	}
}

export async function getStaticPaths() {
	const response = await stripe.products.list()

	const paths = response.data.map(product => ({ params: { id: product.id } }))
	return {
		paths,
		fallback: 'blocking'
	}
}
