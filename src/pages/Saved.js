import React, { Component } from 'react';
import Gallery              from '../components/Gallery';
import ImageModal           from '../components/ImageModal';
import Typography           from '@material-ui/core/Typography';
import { fetchImagesByIds } from "../utils/fetches";


class Saved extends Component {
	state = {
		photos: [],
		count: 0,
		page: 0,
		perPage: 20,
		imageModalOpen: false,
		selectedImageId: '',
		favoriteImages: [],
		savedImages: []
	};
	
	componentDidMount = async () => {
		const ids = this.getLocalStorageItem('saved-images');
		
		await this.getImages( ids );

		this.setImagesCollection();
		this.setFavoriteImagesCollection();
	};
	
	async getImages( ids ) {
		let photos = [];

		try {
			photos = await fetchImagesByIds(ids)
		} catch( e )  {
			throw e;
		}

		this.setState({ photos: photos })
	}
	
	setFavoriteImagesCollection() {
		this.setState({ favoriteImages: this.getLocalStorageItem('favourite-images') })
	}
	
	setImagesCollection() {
		this.setState({ savedImages: this.getLocalStorageItem('saved-images') })
	}
	
	onClickImageThumb( imageId ) {
		this.setState({ imageModalOpen: true, selectedImageId: imageId });
	}
	
	onClickCloseModal() {
		this.setState({ imageModalOpen: false })
	}
	
	selectedImage() {
		const image = this.state.photos.find(( item ) => item.id === this.state.selectedImageId );
		
		return !image ? { idy: '', url: '', alt: '', downloadUrl: '' } : {
			idy: image.id,
			url: image.regular,
			alt: image.alt_description,
			downloadUrl: image.downloadUrl
		};
	}
	
	isFavorite( idy ) {
		return this.state.favoriteImages.includes( idy );
	}
	
	onClickFavoriteImage( idy ) {
		let images = [ ...this.state.favoriteImages ];
		
		images = images.filter(( item ) => item !== idy );
		
		if ( !this.isFavorite( idy ) ) {
			images.push( idy );
		}
		
		this.setState({ favoriteImages: images });
		
		this.setLocalStorageItem( 'favourite-images', images )
	}
	
	setLocalStorageItem( key, val ) {
		localStorage.setItem( key, JSON.stringify( val ) );
	}
	
	getLocalStorageItem( key ) {
		return JSON.parse( localStorage.getItem(key) ) || [];
	}
	
	onClickSaveImage( idy ) {
		let images = [ ...this.state.savedImages ];

		if ( images.some(( id ) => id === idy )) {
			return;
		}

		images.push( idy );

		this.setState({ savedImages: images });

		this.setLocalStorageItem('saved-images', images)
	}
	
	render() {
		const { photos, imageModalOpen } = this.state;
		
		return (
			<div>
				<Typography variant="h4" align="center" component="h1">Saved images</Typography>
				
				<ImageModal imageId={ this.selectedImage().idy }
							imageUrl={ this.selectedImage().url }
							imageDownloadUrl={ this.selectedImage().downloadUrl }
							imageAlt={ this.selectedImage().alt }
							imageModalOpen={ imageModalOpen }
							isFavoriteImage={ this.isFavorite( this.selectedImage().idy ) }
							onClickCloseModal={ this.onClickCloseModal.bind( this ) }
							onClickFavoriteImage={ this.onClickFavoriteImage.bind( this ) }
							onClickSaveImage={ this.onClickSaveImage.bind( this ) }/>
				
				<Gallery photos={ photos } onClickImageThumb={ this.onClickImageThumb.bind( this ) }/>
			</div>
		);
	}
}

export default Saved;
