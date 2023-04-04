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
	color: '$gray500',
	position: 'relative'
})

export const Counter = styled('span', {
	position: 'absolute',
	backgroundColor: '$green500',
	color: '$white',
	width: '1.5rem',
	height: '1.5rem',
	borderRadius: '50%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	top: '-13%',
	right: '-13%',
	border: '3px solid',
	borderColor: '$gray900',
	fontSize: '$xs',
	fontWeight: 'bold'
})
