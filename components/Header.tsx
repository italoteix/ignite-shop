import Image from 'next/image'
import logoImg from '@/assets/logo.svg'
import { CartButton, Container } from '@/styles/components/Header'
import Link from 'next/link'
import { Handbag } from '@phosphor-icons/react'

export function Header() {
	return (
		<Container>
			<Link href='/'>
				<Image src={logoImg} alt="dois triangulos sobrepostos a esquerda do nome Ignite Shop" />
			</Link>

			<CartButton>
				<Handbag size={24} />
			</CartButton>
		</Container>
	)
}
