InstagramGallery.init('d9e5284daa7b419e971b81b5491d5b4b');
InstagramGallery.getRecentMedia('pedestrianwanderlust').then((data) => {
    console.log( data );
    const $grid = $('.js-grid');

    $grid.html('');
    for( let i = 0; i < data.length; i++ ) {
        console.log( data[i] );
        const currentItem = data[ i ];
        let resourceHTML = "";
        if ( currentItem.type === "video" ) {
            const video = currentItem.videos.standard_resolution.url;
            resourceHTML = `<video data-link="${currentItem.link}">
                <source src="${video}"> 
            </video>`;
        }
        else {
            const url = currentItem.images.standard_resolution.url;

            resourceHTML = `<img src="${url}" data-link="${currentItem.link}" />`;
        }
        const $currentItem = $(`<div class="grid-item grid-item--width2">
            ${resourceHTML}
        </div>`);
        $grid.append( $currentItem );

        $currentItem.find('video').on('mouseenter', function() {
            $( this )[0].play();
        });

        $currentItem.find('video').on('mouseleave', function() {
            $( this )[0].pause();
        });

        $currentItem.find('video').on('click', function() {
            window.open( $( this ).attr('data-link') );
        });

        $currentItem.find('img').on('click', function() {
            window.open( $( this ).attr('data-link') );
        });

    }
});

