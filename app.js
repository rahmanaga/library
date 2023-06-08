const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".newBook");
const submitBtn = document.querySelector(".submit");
const modal = document.querySelector('#forumModal');
const authorInput = document.querySelector('#authorInput');
const titleInput = document.querySelector('#titleInput');
const pagesInput = document.querySelector('#pagesInput');
const readInput = document.querySelector('#readInput');
const close = document.querySelector(".close");
const myLibrary = [];

class Book {
  constructor(author, title, pages, read = false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

function toggleModal() {
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function closeModal() {
  modal.style.display = "none";
}

function handleOutsideClick(event) {
  if (event.target === modal) {
    closeModal();
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBook(book) {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
    <h2>${book.title}</h2>
    <p>By: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.read ? "yes" : "no"}</p>
  `;
  container.appendChild(newDiv);
}

function displayBooks(library) {
  library.forEach((book) => {
    displayBook(book);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const newBook = new Book(
    authorInput.value,
    titleInput.value,
    pagesInput.value,
    readInput.value
  );
  addBookToLibrary(newBook);
  closeModal();
  displayBooks(myLibrary);
}

newBookBtn.addEventListener("click", toggleModal);
close.addEventListener("click", closeModal);
window.addEventListener("click", handleOutsideClick);
submitBtn.addEventListener("click", handleSubmit);
