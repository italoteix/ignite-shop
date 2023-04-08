import {
	CheckoutButton,
	CloseButton,
	Drawer,
	ImageContainer,
	Overlay,
	Product,
	ProductList,
	QuantityLabel,
	TotalLabel,
} from '@/styles/components/Cart'
import { X } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import { MouseEvent } from 'react'

interface CartProps {
	onClose: () => void
}

export function Cart({ onClose }: CartProps) {
	const { cartDetails, removeItem, cartCount = 0, redirectToCheckout, formattedTotalPrice } = useShoppingCart()

	async function handleCheckout(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault()


		if (cartCount > 0) {
			try {
			  const result = await redirectToCheckout()
			  if (result?.error) {
				console.error(result)
			  }
			} catch (error) {
			  console.error(error)
			}
		  }
	}

	return (
		<>
			<Overlay onClick={onClose} />

			<Drawer>
				<CloseButton onClick={onClose}>
					<X />
				</CloseButton>

				<ProductList>
					<h3>Sacola de compras</h3>

					<ul>
						{cartDetails && Object.values(cartDetails).map(product => {
							return (
								<Product key={product.price_id}>
									<ImageContainer>
										<Image src={product.image as string} alt="" width={94} height={94} />
									</ImageContainer>

									<div>
										<p>{product.name}</p>
										<p><strong>{product.formattedPrice}</strong></p>
										<button onClick={() => removeItem(product.price_id)}>Remover</button>
									</div>
								</Product>
							)
						})}
					</ul>

					<div>
						<QuantityLabel>Quantidade<span>{cartCount} {cartCount === 1 ? 'item' : 'itens'}</span></QuantityLabel>
						<TotalLabel>Valor Total<span>{formattedTotalPrice}</span></TotalLabel>
					</div>

					<CheckoutButton onClick={handleCheckout}>Finalizar compra</CheckoutButton>
				</ProductList>
			</Drawer>
		</>
	)
}
