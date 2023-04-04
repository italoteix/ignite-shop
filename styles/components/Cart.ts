import { styled } from '..'

export const Overlay = styled('div', {
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	zIndex: 9,
})

export const Drawer = styled('div', {
	position: 'fixed',
	top: 0,
	bottom: 0,
	right: 0,
	zIndex: 9,

	height: '100%',
	width: '30rem',
	padding: '1.5rem',

	backgroundColor: '$gray800',
	boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
})

export const CloseButton = styled('button', {
	marginLeft: 'auto',
	marginBottom: '1.5rem',
	display: 'block',
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',

	color: '$gray500',
	fontSize: '$xl',

	'&:hover': {
		color: '$gray300'
	}
})

export const ProductList = styled('div', {
	padding: '1.5rem',
	paddingTop: 0,

	h3: {
		fontSize: '$lg',
		color: '$gray100',
		marginBottom: '2rem'
	},

	ul: {
		margin: 0,
		padding: 0,
		listStyle: 'none'
	}
})

export const Product = styled('li', {
	display: 'flex',

	div: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		fontSize: '$md',

		'p:first-child': {
			marginBottom: '0.125rem'
		}
	},

	button: {
		marginTop: '0.5rem',
		fontSize: '$sm',
		fontWeight: 700,
		border: 'none',
		backgroundColor: 'transparent',
		color: '$green500',
		cursor: 'pointer',

		'&:hover': {
			color: '$green300'
		}
	}
})
