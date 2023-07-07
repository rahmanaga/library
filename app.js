const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".newBook");
const modal = document.querySelector('#forumModal');
const authorInput = document.querySelector('#authorInput');
const titleInput = document.querySelector('#titleInput');
const pagesInput = document.querySelector('#pagesInput');
const readInput = document.querySelector('#readInput');
const close = document.querySelector(".close");
const bookForm = document.querySelector("form");
const myLibrary = [
  {
    author: "George R.R. Martin",
    title: "A Game Of Thrones",
    pages: 694,
    id: 1,
    read: true,
  },
  {
    author: "George R.R. Martin",
    title: "A Clash Of Kings",
    pages: 761,
    id: 2,
    read: true,
  },
  {
    author: "George R.R. Martin",
    title: "A Storm Of Swords",
    pages: 973,
    id: 3,
    read: true,
  },
  {
    author: "George R.R. Martin",
    title: "A Feast For Crows",
    pages: 753,
    id: 4,
    read: true,
  },
  {
    author: "George R.R. Martin",
    title: "A Dance with Dragons",
    pages: 1016,
    id: 5,
    read: true,
  },
];
let bookCounter = myLibrary.length + 1;

function Book(author, title, pages, id, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.id = id;
  this.read = read;
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
  newDiv.classList.add("card", "hidden");
  newDiv.innerHTML = `
    <h2>${book.title}</h2>
    <p>By: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <button type="button" class="${book.read ? "read" : "notRead"} readBtn" data-book-id="${book.id}">${book.read ? "Read" : "Not Read"}</button>
    <button type="button" class="removeBtn" data-book-id="${book.id}"><i class="fa-solid fa-trash-can fa-xl" style="color: #1a3d7a;"></i></button>
  `;
  container.appendChild(newDiv);
  setTimeout(() => {
    newDiv.classList.remove("hidden");
  }, 10);
  const removeBtn = newDiv.querySelector(".removeBtn");
  const readBtn = newDiv.querySelector(".readBtn");
  removeBtn.addEventListener("click", handleRemove);
  readBtn.addEventListener("click", toggleRead);
}

function displayBooks(library) {
  container.innerHTML = "";
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
    readInput.checked
  );
  addBookToLibrary(newBook);
  authorInput.value = "";
  titleInput.value = "";
  pagesInput.value = "";
  bookCounter += 1;
  closeModal();
  displayBooks(myLibrary);
}

function handleRemove(event) {
  const bookId = event.target.parentElement.getAttribute("data-book-id");
  const removeBtn = event.target.parentElement;
  const bookElement = removeBtn.parentElement;
  const bookIndex = myLibrary.findIndex((book) => book.id === parseInt(bookId));
  myLibrary.splice(bookIndex, 1);
  bookElement.classList.add("disappear");
  setTimeout(() => {
    bookElement.remove();
  }, 250);
}

function toggleRead(event) {
  const bookId = +event.target.getAttribute("data-book-id");
  const targetBook = myLibrary.find((book) => book.id === bookId);
  targetBook.read = !targetBook.read;
  displayBooks(myLibrary);
}

newBookBtn.addEventListener("click", toggleModal);
close.addEventListener("click", closeModal);
window.addEventListener("click", handleOutsideClick);
bookForm.addEventListener("submit", handleSubmit);

displayBooks(myLibrary);
