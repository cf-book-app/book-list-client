const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://jb-301n10-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

// if running locally with hybrid in query string
// then force use of production API
var urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('hybrid')) {
    ENV.apiUrl = ENV.productionApiUrl;
}

var app = app || {};

(module => {

    module.Book = Book;

    function errorCallback(err) {
        console.error(err);
        module.errorView.initErrorPage(err);
      }
      
    function Book(bookObj) {
        Object.assign(this, bookObj);
    }

    Book.prototype.toHtml = function() {
        const template = Handlebars.compile($('#book-list-template').text());
        return template(this);
    }

    Book.all = [];

    Book.loadAll = function(rows) {
        Book.all = rows.map(row => new Book(row));
    } 

    Book.fetchAll = function(callback) {
        $.getJSON(ENV.apiUrl + '/api/v1/books')
            .then(Book.loadAll)
            .then(callback)
            .catch(errorCallback); 
    }
    

})(app)

$(() => app.Book.fetchAll(app.bookView.initPage));