const clientId = 'oa-T76Ce9FmlBGbZ9nwhWsLuLzdVNCfjUWZEY6WsUy4';

const serializePhotos = ( result ) => {
    return result.map( item => {
        return serializePhoto( item );
    });
}

const serializePhoto = ( item ) => {
    return {
        id: item.id,
        regular: item.urls.regular,
        alt_description: item.alt_description,
        downloadUrl: item.links.download
    }
}

export const fetchImages = async ( url ) => {
    let photos = [];

    try {
        await fetch( url )
            .then( response => response.json() )
            .then(( res ) => {
                if ( res.total === 0 ) throw new Error('Not found');

                photos =  res.results ? serializePhotos( res.results ) : serializePhotos( res )
            });
    } catch ( reason ) {
        throw reason;
    }

    return photos;
}


export const fetchImagesByIds = async ( ids ) => {
    let photos = [];

    await Promise.all( ids.map( async ( id ) => {
        const url = `https://api.unsplash.com/photos/${ id }?client_id=${ clientId }`;

        try {
            await fetch( url )
                .then( response => response.json() )
                .then(( res ) => {
                    photos.push( serializePhoto(res) );

                })
                .catch(( reason ) => {
                    throw reason;
                })
        } catch( reason ) {
            throw reason
        }
    }));

    return photos;
}
