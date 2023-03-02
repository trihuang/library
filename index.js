const cardsContainer = document.querySelector(".cards-container");
const formContainer = document.querySelector(".form-container");
const newBookButton = document.getElementById("new-book-btn");
const closeFormButton = document.getElementById("close-form");

let myLibrary = [];

newBookButton.addEventListener("click", openForm);
closeFormButton.addEventListener("click", closeForm);

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

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    const text = document.createElement("div");
    text.classList.add("text");

    const title = document.createElement("em");
    const heading = document.createElement("h2");
    title.textContent = book.title;
    heading.appendChild(title);
    text.appendChild(heading);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    text.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `Number of Pages: ${book.pages} pages`;
    text.appendChild(pages);

    const readStatus = document.createElement("em");
    if (book.read) {
        readStatus.textContent = "Read";
    } else {
        readStatus.textContent = "Not read yet";
    }
    const status = document.createElement("p");
    status.textContent = "Status: ";
    status.appendChild(readStatus);
    text.appendChild(status);

    const toggle = document.createElement("label");
    toggle.classList.add("switch");
    const input = document.createElement("input");
    input.type = "checkbox";
    toggle.appendChild(input);
    const slider = document.createElement("span");
    slider.classList.add("slider");
    slider.classList.add("round");
    toggle.appendChild(slider);
    text.appendChild(toggle);

    card.appendChild(text);

    const closeIcon = document.createElement("img");
    closeIcon.classList.add("close-icon");
    closeIcon.src = "./img/close-icon.svg";
    card.appendChild(closeIcon);

    cardsContainer.appendChild(card);
}

function displayBooks(books) {
    for (const book of books) {
        displayBook(book);
    }
}

function removeBook() {

}

function toggleReadStatus() {

}

function initializeLibrary() {
    const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
    const theBookThief = new Book("The Book Thief", "Markus Zusak", 584, true);
    const nineteenEightyFour = new Book("Nineteen Eighty-Four", "George Orwell", 328, true);

    addBookToLibrary(theHobbit);
    addBookToLibrary(theBookThief);
    addBookToLibrary(nineteenEightyFour);

    displayBooks(myLibrary);
}

function openForm() {
    formContainer.style.display = "block";
}

function closeForm() {
    formContainer.style.display = "none";
}

initializeLibrary();