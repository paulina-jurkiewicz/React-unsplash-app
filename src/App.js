import * as React        from 'react';
import { withStyles }    from '@material-ui/core/styles';
import Main              from './components/Main';
import { BrowserRouter } from 'react-router-dom'
import Navigation        from './components/Navigation';


const styles = {
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
	},
};

class App extends React.Component {
	render () {
		return (
			<>
				<BrowserRouter basename={ process.env.PUBLIC_URL }>
					<Main />
				</BrowserRouter>
			</>
		)
	}
	
}

export default withStyles(styles)(App);

