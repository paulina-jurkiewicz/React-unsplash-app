import Homepage from '../pages/Homepage'
import Favorite from '../pages/Favorite';
import Saved    from '../pages/Saved';

export const Routes = [
	{
		id: 1,
		path: '/',
		name: 'Homepage',
		component: Homepage
	},
	{
		id: 2,
		path: '/favorite',
		name: 'Favorite',
		component: Favorite
	},
	{
		id: 3,
		path: '/saved',
		name: 'Saved',
		component: Saved
	}
];
