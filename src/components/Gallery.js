import React          		from 'react';
import ImageThumb     		from './ImageThumb';
import '../css/gallery.css';

function Gallery( props ) {
	function handleClick( id ) {
		props.onClickImageThumb( id );
	}
	
	return (
		<div className="gallery">
			{ props.photos.map(( photo ) =>
				<ImageThumb key={ photo.id } url={ photo.regular } alt={ photo.alt_description } id={ photo.id } onClick={ handleClick } />
			) }
 		</div>
	)
}
export default Gallery;
