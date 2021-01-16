import React          from 'react';
import Input          from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core';
import Button 		  from "@material-ui/core/Button";

const useStyles = makeStyles(() => ( {
	form: {
		maxWidth: '400px',
		width: '100%',
		margin: '30px auto',
		display: 'flex'
	}
} ));

function SearchForm( props ) {
	const classes = useStyles();
	
	function onChangeSearchFormValue( e ) {
		props.changeSearchFormValue( e.target.value );
	}

	function onSubmitSearchForm( e ) {
		e.preventDefault();

		props.submitSearchFormValue();
	}
	
	return (
		<form className={ classes.form } noValidate autoComplete="off" onSubmit={ onSubmitSearchForm.bind( this ) }>
			<Input value={ props.val } onChange={ onChangeSearchFormValue.bind( this ) }
				   fullWidth={ true } placeholder="Search..."
				   inputProps={ { 'aria-label': 'Find image' } }/>

			<Button type="submit" variant="outlined" color="default">
				Find
			</Button>
		</form>
	)
}

export default SearchForm;
