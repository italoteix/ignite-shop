import {
	CloseButton,
	Drawer,
	ImageContainer,
	Overlay,
	Product,
	ProductList,
} from '@/styles/components/Cart'
import { X } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'

interface CartProps {
	onClose: () => void
}

export function Cart({ onClose }: CartProps) {
	const { cartDetails, removeItem } = useShoppingCart()

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
								<Product key={product.id}>
									<ImageContainer>
										<Image src={product.imageUrl} alt="" width={94} height={94} />
									</ImageContainer>

									<div>
										<p>{product.name}</p>
										<p><strong>{product.formatedPrice}</strong></p>
										<button onClick={() => removeItem(product.id)}>Remover</button>
									</div>
								</Product>
							)
						})}
					</ul>
				</ProductList>
			</Drawer>
		</>
	)
}
