import React           from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button          from '@material-ui/core/Button';
import NavigationLinks from './NavigationLinks';
import { Close, Menu } from '@material-ui/icons';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	buttonClose: {
		position: 'absolute',
		right: '0'
	}
});

export default function Navigation () {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		isOpen: false,
	});
	
	const toggleDrawer = ( open ) => ( event ) => {
		if ( event && event.type === 'keydown' && ( event.key === 'Tab' || event.key === 'Shift' ) ) {
			return;
		}

		setState({ ...state, isOpen: open });
	};
	
	const list = () => (
		<div
			className={ classes.list }
			role="presentation"
			onClick={ toggleDrawer(false ) }
			onKeyDown={ toggleDrawer(false ) }>
			<Button onClick={ toggleDrawer( false ) } className={ classes.buttonClose }>
				<Close />
			</Button>
			
			<NavigationLinks/>
		</div>
	);
	
	return (
		<React.Fragment key={ 'left' }>
			<Button onClick={ toggleDrawer(true ) } >
				<Menu />
			</Button>
			
			<SwipeableDrawer
				anchor={ 'left' }
				open={ state[ 'isOpen' ] }
				onClose={ toggleDrawer( false ) }
				onOpen={ toggleDrawer( true ) }>
				{ list() }
			</SwipeableDrawer>
		</React.Fragment>
	);
}
