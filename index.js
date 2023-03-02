const cardsContainer = document.querySelector(".cards-container");
const formContainer = document.querySelector(".form-container");
const newBookButton = document.getElementById("new-book-btn");
const closeFormButton = document.getElementById("close-form");
const submitButton = document.getElementById("submit");

let myLibrary = [];

newBookButton.addEventListener("click", openForm);
closeFormButton.addEventListener("click", closeForm);
submitButton.addEventListener("click", addBookFromForm)

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
    let index = myLibrary.indexOf(book);
    card.setAttribute("data-key", `${index}`);
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
    if (book.read) input.checked = true;
    input.setAttribute("onclick", `toggleReadStatus(${index})`);
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
    closeIcon.setAttribute("onclick", `removeBook(${index})`);
    card.appendChild(closeIcon);

    cardsContainer.appendChild(card);
}

function displayBooks(books) {
    for (const book of books) {
        displayBook(book);
    }
}

function removeBook(index) {
    const card = document.querySelector(`.card[data-key='${index}']`);
    cardsContainer.removeChild(card);
    myLibrary.splice(index, 1);
}

function toggleReadStatus(index) {
    const card = document.querySelector(`.card[data-key='${index}']`);
    const text = card.childNodes[0];
    const status = text.childNodes[3];
    const readStatus = status.childNodes[1];
    const readStatusText = readStatus.textContent;
    if (readStatusText === "Read") {
        readStatus.textContent = "Not read yet";
    } else {
        readStatus.textContent = "Read";
    }
}

function addBookFromForm() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read-yes");

    if (title === "" || author === "" || pages === "") {
        alert("All fields are required.");
        event.preventDefault();
    } else {
        let readStatus;
        if (read.checked) readStatus = true;
        else readStatus = false;
        const newBook = new Book(title, author, pages, readStatus);
        addBookToLibrary(newBook);
        displayBook(newBook);
        closeForm();
        event.preventDefault();
    }
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
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read-yes")

    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = true;
}

initializeLibrary();