import { stripe } from '@/lib/stripe'
import {
	SliderContainer,
	Product,
	Container,
	NavigationOverlay,
	NavigationButton,
	ProductFooter,
	CartButton,
} from '@/styles/pages/home'
import Image from "next/image";
import { useKeenSlider } from 'keen-slider/react'
import Stripe from "stripe";
import 'keen-slider/keen-slider.min.css'
import Link from "next/link";
import Head from 'next/head';
import { CaretLeft, CaretRight, Handbag } from '@phosphor-icons/react';
import { MouseEvent, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';

interface Product {
	id: string
	name: string
	imageUrl: string
	price: number
	formatedPrice: string
	currency: string
	defaultPriceId: string
}

interface HomeProps {
	products: Product[]
}

const CONTAINER_MAX_WIDTH = 1180
const SLIDE_SIZE = 0.55

export default function Home({ products }: HomeProps) {
	const { addItem, cartDetails } = useShoppingCart()
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [loadedImages, setLoadedImages] = useState<boolean[]>([])
	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel)
		},
		slides: (containerWidth) => {
			let origin = 0
			if (containerWidth - CONTAINER_MAX_WIDTH > 0) {
				origin = ((containerWidth - CONTAINER_MAX_WIDTH) / 2) / containerWidth
			}

			return products.map((_, index) => ({ size: SLIDE_SIZE, spacing: 0.04, origin: index === 0 ? origin : (1 - SLIDE_SIZE) / 2 }))
		},
		created() {
			setLoaded(true)
		}
	});

	function handleGoNextSlide(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		instanceRef.current?.next()
	}

	function handleGoPreviousSlide(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		instanceRef.current?.prev()
	}

	function handleLoadingComplete(index: number) {
		return function() {
			setLoadedImages(prevState => {
				const newState = [...prevState]
				newState[index] = true
				return newState
			})
		}
	}

	function handleAddToCart(product: Product) {
		return function(event: MouseEvent<HTMLButtonElement>) {
			event.preventDefault()
			event.stopPropagation()
			if (cartDetails && !cartDetails[product.defaultPriceId]) {
				addItem({
					price_id: product.defaultPriceId,
					name: product.name,
					price: product.price,
					currency: product.currency,
					image: product.imageUrl,
					formattedPrice: product.formatedPrice
				})
			}
		}
	}

	return (
		<>
			<Head>
				<title>Home | Ignite Shop</title>
			</Head>

			<Container>
				<SliderContainer ref={sliderRef} className="keen-slider">
					{products.map((product, index) => (
							<Link href={`/product/${product.id}`} key={product.id}>
								<Product className="keen-slider__slide" loading={!loadedImages[index]}>
									<Image
										src={product.imageUrl}
										width={520}
										height={480}
										alt=""
										placeholder='empty'
										onLoadingComplete={handleLoadingComplete(index)}
									/>

									<ProductFooter>
										<div>
											<strong>{product.name}</strong>
											<span>{product.formatedPrice}</span>
										</div>

										<CartButton onClick={handleAddToCart(product)}>
											<Handbag size={24} />
										</CartButton>
									</ProductFooter>
								</Product>
							</Link>
						)
					)}
				</SliderContainer>

				{loaded && instanceRef.current && (
					<>
						{currentSlide > 0 && (
							<NavigationOverlay orientation='left'>
								<NavigationButton onClick={handleGoPreviousSlide}>
									<CaretLeft />
								</NavigationButton>
							</NavigationOverlay>
						)}

						{currentSlide < instanceRef.current.track.details.slides.length - 1 && (
							<NavigationOverlay orientation='right'>
								<NavigationButton onClick={handleGoNextSlide}>
									<CaretRight />
								</NavigationButton>
							</NavigationOverlay>
						)}
					</>
				)}
			</Container>
		</>
	)
}

export async function getStaticProps() {
	const response = await stripe.products.list({
		expand: ['data.default_price']
	})

	const products = response.data.map(product => {
		const price = product.default_price as Stripe.Price

		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			currency: price.currency,
			price: price.unit_amount,
			formatedPrice: new Intl.NumberFormat('pt-BR',{
				style: 'currency',
				currency: 'BRL'
			}).format((price.unit_amount ?? 0) / 100),
			defaultPriceId: price.id
		}
	})

	return {
		props: {
			products
		},
		revalidate: 60 * 60 * 2 // 2 hours
	}
}
