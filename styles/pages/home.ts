import { styled } from '..'

export const Container = styled('main', {
	position: 'relative',
})

export const SliderContainer = styled('div', {
	display: 'flex',
	width: '100%',
	marginLeft: 'auto',
	minHeight: 656,
})

export const Product = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
	minWidth: '43.5rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover'
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '2rem',

        borderRadius: 6,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'rgba(0, 0, 0, 0.6)',

        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        strong: {
            fontSize: '$lg',
			color: '$gray100',
        },

        span: {
            fontSize: '$xl',
            fontWeight: 'bold',
            color: '$green300'
        },
    },

    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1
        }
    }
})

export const NavigationOverlay = styled('div', {
	position: 'absolute',
	width: '8.5rem',
	padding: '1rem',
	border: 'none',
	top: 0,
	bottom: 0,

	display: 'flex',
	alignItems: 'center',

	variants: {
		orientation: {
			left: {
				left: 0,
				background: 'linear-gradient(270deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)'
			},
			right: {
				right: 0,
				background: 'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
				justifyContent: 'flex-end'
			}
		}
	}
})

export const NavigationButton = styled('button', {
	cursor: 'pointer',
	border: 'none',
	backgroundColor: 'transparent',
	fontSize: '3rem',
	color: '$gray300',

	'&:hover': {
		color: '$gray100',
	}
})
