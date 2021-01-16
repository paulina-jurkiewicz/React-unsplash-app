import React                         				from 'react';
import '../css/gallery.css';
import { makeStyles }                                from '@material-ui/core/styles';
import ImageRegular                                  from './ImageRegular';
import { Close, SaveAlt, Favorite, FavoriteBorder  } from '@material-ui/icons';
import Button                                        from '@material-ui/core/Button';
import Dialog                                        from '@material-ui/core/Dialog';
import DialogTitle                                   from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
	close: {
		position: 'absolute',
		top: 5,
		right: 5,
		cursor: 'pointer'
	},
	button: {
	
	},
	header: {
		display: "flex",
		padding: "16px"
	}
	
}));

function ImageModal( props ) {
	const classes = useStyles();
	
	const handleClose = () => {
		props.onClickCloseModal();
	};
	
	const onClickFavoriteImage = () => {
		props.onClickFavoriteImage( props.imageId );
	};
	
	const onClickSaveImage = () => {
		props.onClickSaveImage( props.imageId );
	};
	
	return (
		<div>
			<Dialog open={ props.imageModalOpen } scroll="body">
				<DialogTitle className={ classes.header } id="scroll-dialog-title">
					<Button className={ classes.close } onClick={ handleClose }>
						<Close  />
					</Button>
					
					<Button className={ classes.button } onClick={ onClickFavoriteImage }>
						{ props.isFavoriteImage?
							<Favorite/> : <FavoriteBorder />
						}
					</Button>
					
					<Button onClick={ onClickSaveImage } href={ props.imageDownloadUrl } target="_blank" size="small" className={ classes.button }>
						<SaveAlt />
					</Button>
					
					<ImageRegular url={ props.imageUrl } alt={ props.imageAlt } />
				</DialogTitle>
			</Dialog>
		</div>
	);
}
export default ImageModal;