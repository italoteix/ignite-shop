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
	display: 'flex',
	flexDirection: 'column',

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
	paddingBlock: 0,
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	// height: '100%',

	h3: {
		fontSize: '$lg',
		color: '$gray100',
		marginBottom: '2rem'
	},

	ul: {
		margin: 0,
		padding: 0,
		listStyle: 'none',
		flex: 1
	}
})

export const Product = styled('li', {
	display: 'flex',

	'&+&': {
		marginTop: '1.5rem'
	},

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

export const ImageContainer = styled('div', {
	background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
	borderRadius: 8,
	marginRight: '1.25rem'
})

export const QuantityLabel = styled('p', {
	display: 'flex',
	justifyContent: 'space-between',
	color: '$gray100',
	marginBottom: '0.5rem',

	span: {
		display: 'inline-block',
		marginLeft: '1rem',
		fontSize: '$md',
		color: '$gray300'
	}
})

export const TotalLabel = styled('p', {
	display: 'flex',
	justifyContent: 'space-between',
	color: '$gray100',
	fontSize: '$md',
	fontWeight: 700,

	span: {
		display: 'inline-block',
		marginLeft: '1rem',
		fontSize: '$xl',
	}
})

export const CheckoutButton = styled('button', {
	marginTop: '3.5rem',
	backgroundColor: '$green500',
	border: 0,
	color: '$white',
	borderRadius: 8,
	padding: '1.25rem',
	cursor: 'pointer',
	fontWeight: 'bold',
	fontSize: '$md',

	'&:disabled': {
		opacity: 0.6,
		cursor: 'not-allowed',
	},

	'&:not(:disabled):hover': {
		backgroundColor: '$green300',
	}
})
