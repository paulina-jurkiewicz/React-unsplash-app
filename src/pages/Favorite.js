import React, { Component } from 'react';
import Gallery              from '../components/Gallery';
import ImageModal           from '../components/ImageModal';
import Typography           from '@material-ui/core/Typography';
import {fetchImagesByIds} from "../utils/fetches";

const clientId = 'oa-T76Ce9FmlBGbZ9nwhWsLuLzdVNCfjUWZEY6WsUy4';

class Favorite extends Component {
	state = {
		photos: [],
		count: 0,
		imageModalOpen: false,
		selectedImageId: '',
		favoriteImages: [],
		savedImages: []
	};
	
	componentDidMount = async () => {
		const ids = this.getLocalStorageItem('favourite-images');
		
		await this.getImages( ids );
		this.setFavoriteImagesCollection();
		this.setSavedImagesCollection();
	};

	async getImages( ids ) {
		let photos = [];

		try {
			photos = await fetchImagesByIds( ids )
		} catch( e )  {
			throw e;
		}

		this.setState({ photos: photos })
	}
	
	setFavoriteImagesCollection() {
		this.setState({ favoriteImages: this.getLocalStorageItem( 'favourite-images' ) })
	}
	
	setSavedImagesCollection() {
		this.setState({ savedImages: this.getLocalStorageItem( 'saved-images' ) })
	}
	
	onClickImageThumb( imageId ) {
		this.setState({ imageModalOpen: true, selectedImageId: imageId });
	}
	
	onClickCloseModal() {
		this.setState({ imageModalOpen: false })
	}
	
	onClickSaveImage( idy ) {
		let images = [ ...this.state.savedImages ];
		
		if ( images.some(( id ) => id === idy )){
			return;
		}
		
		images.push( idy );
		
		this.setState({ savedImages: images });
		
		this.setLocalStorageItem( 'saved-images', images )
	}
	
	selectedImage() {
		const image = this.state.photos.find(( item ) => item.id === this.state.selectedImageId );
		
		return !image ? { idy: '', url: '', alt: '', downloadUrl: '' } : {
			idy: image.id,
			url: image.urls.regular,
			alt: image.alt_description,
			downloadUrl: image.links.download,
		};
	}
	
	isFavorite( idy ) {
		return this.state.favoriteImages.includes( idy );
	}
	
	onClickFavoriteImage( idy ) {
		const images = [ ...this.state.favoriteImages ].filter(( item ) => item !== idy );
		const photos = [ ...this.state.photos ].filter(( item ) => item.id !== idy );
		
		this.setState({ favoriteImages: images, photos: photos, imageModalOpen: false });
		
		this.setLocalStorageItem( 'favourite-images', images )
	}
	
	setLocalStorageItem( key, val ) {
		localStorage.setItem( key, JSON.stringify( val ));
	}
	
	getLocalStorageItem( key ) {
		return JSON.parse( localStorage.getItem( key ) ) || [];
	}
	
	render() {
		const { photos, imageModalOpen } = this.state;
		
		return (
			<div>
				<Typography variant="h4" align="center" component="h1">Favorite images</Typography>
				
				<ImageModal imageId={ this.selectedImage().idy }
							imageUrl={ this.selectedImage().url }
							imageDownloadUrl={ this.selectedImage().downloadUrl }
							imageAlt={ this.selectedImage().alt }
							imageModalOpen={ imageModalOpen }
							isFavoriteImage={ this.isFavorite( this.selectedImage().idy ) }
							onClickCloseModal={ this.onClickCloseModal.bind( this ) }
							onClickFavoriteImage={ this.onClickFavoriteImage.bind( this ) }
							onClickSaveImage={ this.onClickSaveImage.bind( this ) }
				/>
				
				<Gallery photos={ photos } onClickImageThumb={ this.onClickImageThumb.bind( this ) }/>
			</div>
		);
	}
}

export default Favorite;
