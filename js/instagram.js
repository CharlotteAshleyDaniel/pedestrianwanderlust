const InstagramGallery = (function() { // protect the lemmings

    const _internal = {};
    _internal.base_url = 'https://instagramfewd.webscript.io/';


    function init( client_id = null ) {
        if ( client_id === null ) {
            throw new Error('Client ID is required!');
        }

        _internal.client_id = client_id;
    }

    function getRecentMedia( user_name ) {
        const { base_url, client_id } = _internal;
        const path = 'userMedia/';
        const params = {
            client_id,
            user_name,
        };
        console.log( path, params, base_url );
        const queryStr = Object.keys( params ).reduce(( arr, current ) => {
            const val = params[ current ];

            arr.push( current + '=' + val );

            return arr;
        }, []).join('&');
        const url = base_url + path + '?' + queryStr;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function( e ) {
                const data = JSON.parse(e.currentTarget.response);
                resolve( data.data );
            }
            xhr.onerror = function( err ) {
                reject( err );
            }
            xhr.open( 'GET', url );
            xhr.send();
        });
    }

    return {
        init,
        getRecentMedia,
    };

})();
