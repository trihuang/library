const cardsContainer = document.querySelector(".cards-container");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    if (this.read) {
    return `${this.title} by ${this.author}, ${this.pages} pages, read`;
    } else {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
    }
}

// TODO
function addBookToLibrary() {

}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theBookThief = new Book("The Book Thief", "Markus Zusak", 584, true);
const nineteenEightyFour = new Book("Nineteen Eighty-Four", "George Orwell", 328, true);