import React, { Component } from 'react';
import Gallery              from '../components/Gallery';
import ImageModal           from '../components/ImageModal';
import SearchForm           from '../components/SearchForm';
import { fetchImages } 		from "../utils/fetches";

const clientId = 'oa-T76Ce9FmlBGbZ9nwhWsLuLzdVNCfjUWZEY6WsUy4';

class Homepage extends Component {
	state = {
		photos: [],
		count: 0,
		page: 1,
		perPage: 20,
		imageModalOpen: false,
		selectedImageId: '',
		favoriteImages: [],
		searchValue: '',
		savedImages: []
	};
	
	componentDidMount = async () => {
		await this.fetchImages( true );
		
		this.setFavoriteImagesCollection();
		this.setSavedImagesCollection();

		window.addEventListener( 'scroll', this.handleScroll.bind( this ), true );
	};

	componentWillUnmount() {
		window.removeEventListener( 'scroll', this.handleScroll );
	}

	async fetchImages() {
		const url = this.getImagesApiUrl();

		try {
			const photos = await fetchImages( url );
			const collection = [ ...this.state.photos, ...photos ];

			this.setState({ photos: collection, count: collection.length, page: this.state.page + 1 })
		} catch( e ) {
			throw e;
		}
	}

	getImagesApiUrl() {
		let url = `https://api.unsplash.com/search/photos?perPage=10&page=${ this.state.page }&query=queryText&client_id=${ clientId }`;

		if ( this.state.searchValue.length > 0 ) {
			url = url.replace( 'queryText', this.state.searchValue );
		} else {
			url = url
				.replace( 'query=queryText&', '' )
				.replace( '/search', '' );
		}

		return url;
	}

	handleScroll() {
		this.lastImageInViewport();
	}

	lastImageInViewport() {
		const galleryImages = document.querySelectorAll( '.gallery img' );
		const lastImg = galleryImages[ galleryImages.length - 4 ];
		const isElementInViewport = this.isElementInViewport( lastImg );

		console.log(isElementInViewport, isElementInViewport && lastImg.getAttribute( 'data-visible' ) === null )
		if ( isElementInViewport && lastImg.getAttribute( 'data-visible' ) === null ) {
			lastImg.setAttribute( 'data-visible', '1' );

			this.fetchImages();
		}
	}

	 isElementInViewport( el ) {
		 const rect = el.getBoundingClientRect();

		 return (
			 rect.top >= 0 &&
			 rect.left >= 0 &&
			 rect.bottom <= ( window.innerHeight || document.documentElement.clientHeight ) &&
			 rect.right <= ( window.innerWidth || document.documentElement.clientWidth )
		 );
	}

	setFavoriteImagesCollection() {
		this.setState({ favoriteImages: this.getLocalStorageItem('favourite-images') })
	}
	
	setSavedImagesCollection() {
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
			downloadUrl: image.downloadUrl,
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
	
	onClickSaveImage( idy ) {
		let images = [ ...this.state.savedImages ];
		
		if ( images.some(( id ) => id === idy )){
			return;
		}
		
		images.push( idy );
		
		this.setState({ savedImages: images });

		this.setLocalStorageItem( 'saved-images', images )
	}

	setLocalStorageItem( key, val ) {
		localStorage.setItem(key, JSON.stringify( val ) );
	}

	getLocalStorageItem( key ) {
		return JSON.parse( localStorage.getItem( key ) ) || [];
	}
	
	changeSearchFormValue( e ) {
		this.setState( { searchValue: e, page: 1, photos: [] } )
	}

	async submitSearchForm() {
		await this.fetchImages();
	}
	
	render() {
		const { photos, imageModalOpen, searchValue } = this.state;
		
		return (
			<div>
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
				
				<SearchForm val={ searchValue } changeSearchFormValue={ this.changeSearchFormValue.bind( this ) }
							submitSearchFormValue={ this.submitSearchForm.bind( this ) } />
				
				<Gallery photos={ photos } onClickImageThumb={ this.onClickImageThumb.bind( this ) }/>
			</div>
		);
	}
}

export default Homepage;
