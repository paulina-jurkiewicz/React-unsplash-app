import React             from 'react';
import { Switch, Route } from 'react-router-dom'
import { makeStyles }    from '@material-ui/core/styles';
import Homepage          from '../pages/Homepage';
import Favorite          from '../pages/Favorite';
import Navigation        from './Navigation';
import Saved             from '../pages/Saved';


const useStyles = makeStyles(() => ({
	content: {
		flexGrow: 1
	},
}));

const Main = () => {
	const classes = useStyles();
	
	return (
		<main className={ classes.content }>
			<Navigation />
			
			<Switch>
				<Route exact path="/" component={ Homepage } />
				<Route path="/favorite" component={ Favorite } />
				<Route path="/saved" component={ Saved } />
				<Route component={ Homepage } />
			</Switch>
		</main>
	)
};

export default Main