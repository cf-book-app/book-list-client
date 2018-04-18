const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';

ENV.productionApiUrl = '';

ENV.developmentApiUrl = 'http://localhost:3000';

ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

// if running locally with hybrid in query string

// then force use of production API

var urlParams = new URLSearchParams(window.location.search);

if(urlParams.has('hybrid')) {

    ENV.apiUrl = ENV.productionApiUrl;
}


var app = app || {};

(function(module) {

    function Book(rawDataObj) {

        // this.author = rawDataObj.author;
        // this.title = rawDataObj.title;
        // this.image_url = rawDataObj.image_url;
        // this.description = rawDataObj.description;
        // this.isbn = rawDataObj.isbn;

        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
    }

    Book.prototype.toHtml = function() {
        let template = Handlebars.compile($('#book-list-template').text());
        return template(this);
    }

    
    Book.loadAll = function(books) {
        Book.all = books.sort((a,b) => b.title - a.title)
            .map(rawBook => new Book(rawBook));
    }

    Book.fetchAll = function(callback) {

        $.getJSON(ENV.apiUrl + '/api/v1/books')
            .then(books => {
                Book.loadAll(books);
            });

        
    }

    module.Book = Book;

})(app);

