import { stripe } from '@/lib/stripe'
import {
	ImageContainer,
	ProductContainer,
	ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPropsContext } from "next";
import Head from 'next/head';
import Image from "next/image";
import Stripe from "stripe";
import { useShoppingCart } from 'use-shopping-cart';

interface ProductProps {
	product: {
		id: string
		name: string
		imageUrl: string
		description: string
		price: number
		formatedPrice: string
		currency: string
		defaultPriceId: string
	}
}

export default function Product({ product }: ProductProps) {
	const { addItem, cartDetails } = useShoppingCart()

	function handleAddToCart(addedProduct: ProductProps['product']) {
		if (cartDetails && !cartDetails[product.defaultPriceId]) {
			addItem({
				price_id: addedProduct.defaultPriceId,
				name: addedProduct.name,
				price: addedProduct.price,
				currency: addedProduct.currency,
				image: addedProduct.imageUrl,
				formattedPrice: addedProduct.formatedPrice
			})
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
					<span>{product.formatedPrice}</span>

					<p>{product.description}</p>

					<button onClick={() => handleAddToCart(product)}>
						Colocar na sacola
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
				currency: price.currency,
				price: price.unit_amount,
				formatedPrice: new Intl.NumberFormat('pt-BR', {
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
