const searchtypeFormEl = $('#search-type-form');

searchtypeFormEl.on('submit', function(e) {

    e.preventDefault();  // Prevent the default form submission behavior

    // Navigate to the blog page
    window.location.assign("pokemon-details.html");

});