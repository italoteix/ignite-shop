import { MouseEvent } from 'react'
import {
	CloseButton,
	Drawer,
	Overlay,
	Product,
	ProductList,
} from '@/styles/components/Cart'
import { X } from '@phosphor-icons/react'

interface CartProps {
	onClose: () => void
}

export function Cart({ onClose }: CartProps) {
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
						<Product>
							<div>
								<img src="" alt="" />
							</div>

							<div>
								<p>Camiseta Beyond the Limits</p>
								<p><strong>R$ 79,90</strong></p>
								<button>Remover</button>
							</div>
						</Product>
					</ul>
				</ProductList>
			</Drawer>
		</>
	)
}
