const container = document.querySelector(".container");
let myLibrary = [];

function Book(author, title, pages, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBook(book) {
  const newDiv = document.createElement("div");
  const bookTitle = document.createElement("h2");
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `By: ${book.author}`;
  const bookPages = document.createElement("p");
  bookPages.textContent = `Pages: ${book.pages}`;
  const bookRead = document.createElement("p");
  bookRead.textContent = `Read: ${book.read ? "yes" : "no"}`;
  newDiv.append(bookTitle, bookAuthor, bookPages, bookRead);
  container.append(newDiv);
}

function displayBooks(library) {
  library.forEach((book) => {
    displayBook(book);
  });
}

displayBooks(myLibrary);
