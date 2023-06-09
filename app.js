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
let bookCounter = 0;

function Book(author, title, pages, id, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.id = id;
  this.read = read || false;
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
    <button type="button" class="readBtn" data-book-id="${book.id}">${book.read === "yes" ? "Read" : "Not Read"}</button>
    <button type="button" class="removeBtn" data-book-id="${book.id}">Remove</button>
  `;
  container.appendChild(newDiv);
  const removeBtn = newDiv.querySelector(".removeBtn");
  const readBtn = newDiv.querySelector(".readBtn");
  removeBtn.addEventListener("click", handleRemove);
  readBtn.addEventListener("click", toggleRead);
}

function displayBooks(library) {
  container.innerHTML= ""
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
    bookCounter,
    readInput.value
  );
  authorInput.value = "";
  titleInput.value = "";
  pagesInput.value = "";
  bookCounter+=1
  addBookToLibrary(newBook);
  closeModal();
  displayBooks(myLibrary);
}

function handleRemove(event) {
  const bookId = event.target.getAttribute("data-book-id");
  const removeBtn = event.target;
  const bookElement = removeBtn.parentElement;
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId)
  myLibrary.splice(bookIndex,1)
  bookElement.remove()
}

function toggleRead(event) {
  const bookId = +event.target.getAttribute("data-book-id");
  const targetBook = myLibrary.find((book) => book.id === bookId);
  targetBook.read = targetBook.read === "yes" ? "no" : "yes";
  displayBooks(myLibrary)
}

newBookBtn.addEventListener("click", toggleModal);
close.addEventListener("click", closeModal);
window.addEventListener("click", handleOutsideClick);
submitBtn.addEventListener("click", handleSubmit);
