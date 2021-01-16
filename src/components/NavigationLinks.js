import React                from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles }       from '@material-ui/core/styles';
import List                 from '@material-ui/core/List';
import ListItem             from '@material-ui/core/ListItem';
import ListItemText         from '@material-ui/core/ListItemText';
import { Routes }           from '../utils/routes'

const useStyles = makeStyles(theme => ( {
	button: {
		margin: theme.spacing(1),
	},
	list: {
		paddingTop: "0",
	},
} ));

const NavigationLinks = () => {
	const classes = useStyles();
	
	return (
			<List className={ classes.list }>
				{ Routes.map(( prop ) => (
					<ListItem component={ Link } to={ prop.path } button key={ prop.id }>
						<ListItemText primary={ prop.name }/>
					</ListItem>
				)) }
			</List>
	)
};

export default withRouter(NavigationLinks);
