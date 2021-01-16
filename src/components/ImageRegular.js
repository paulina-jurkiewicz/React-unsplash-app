import React          from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	image: {
		width: '100%',
		display: 'block',
		boxSizing: 'border-box'
	}
}));

function ImageRegular( props ) {
	const classes = useStyles();
	
	return <img className={ classes.image } src={ props.url } alt={ props.alt } />
}

export default ImageRegular;