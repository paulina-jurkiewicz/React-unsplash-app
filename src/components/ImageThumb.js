import React          from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	image: {
		width: '100%',
		padding: '8px',
		display: 'block',
		boxSizing: 'border-box',
		borderRadius: '12px',
		cursor: 'pointer'
	}
}));

function ImageThumb( props ) {
	const classes = useStyles();
	
	function handleClick( event ) {
		props.onClick( event );
	}
	
	return <img className={ classes.image } src={ props.url } alt={ props.alt } onClick={ handleClick.bind( this, props.id ) } />
}

export default ImageThumb;