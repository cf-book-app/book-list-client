var app = app || {};

(function(module) {

    const bookView = {};

    bookView.initPage = () => {
        $('.container').hide();
        $('#book-list').empty();
        $('#book-list').append(app.Book.all.map(book => book.toHtml()));
        $('.book-view').show();
    };

    module.bookView = bookView;

})(app);