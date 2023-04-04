import Image from 'next/image'
import logoImg from '@/assets/logo.svg'
import { CartButton, Container, Counter } from '@/styles/components/Header'
import Link from 'next/link'
import { Handbag } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'
import { Cart } from './Cart'
import { useState } from 'react'

export function Header() {
	const { cartCount } = useShoppingCart()
	const [isCartOpen, setIsCartOpen] = useState(false)

	function handleOpenCart() {
		setIsCartOpen(true)
	}

	function handleCloseCart() {
		setIsCartOpen(false)
	}

	return (
		<Container>
			<Link href='/'>
				<Image src={logoImg} alt="dois triangulos sobrepostos a esquerda do nome Ignite Shop" />
			</Link>

			<CartButton onClick={handleOpenCart}>
				<Handbag size={24} />
				{!!cartCount && <Counter>{cartCount}</Counter>}
			</CartButton>

			{isCartOpen && <Cart onClose={handleCloseCart} />}
		</Container>
	)
}
