import { styled } from '..'

export const Container = styled('header', {
	padding: '2rem 0',
	width: '100%',
	maxWidth: 1180,
	margin: '0 auto',

	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const CartButton = styled('button', {
	width: '3rem',
	height: '3rem',
	borderRadius: 6,
	border: 'none',
	backgroundColor: '$gray800',
	cursor: 'pointer',
	color: '$gray500'
})
