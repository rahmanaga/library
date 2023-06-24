const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".newBook");
const submitBtn = document.querySelector(".submit");
const modal = document.querySelector('#forumModal');
const authorInput = document.querySelector('#authorInput');
const titleInput = document.querySelector('#titleInput');
const pagesInput = document.querySelector('#pagesInput');
const readInput = document.querySelector('#readInput');
const close = document.querySelector(".close");
const myLibrary = [
  {
  author: "George R.R. Martin",
  title: "A Game Of Thrones",
  pages: 694,
  id: 1,
  read: "yes",
},
  {
  author: "George R.R. Martin",
  title: "A Clash Of Kings",
  pages: 761,
  id: 2,
  read: "yes",
},
  {
  author: "George R.R. Martin",
  title: "A Storm Of Swords",
  pages: 973,
  id: 3,
  read: "yes",
},
  {
  author: "George R.R. Martin",
  title: "A Feast For Crows",
  pages: 753,
  id: 4,
  read: "yes",
},
  {
  author: "George R.R. Martin",
  title: "A Dance with Dragons",
  pages: 1016,
  id: 5,
  read: "yes",
},
];
let bookCounter = myLibrary.length + 1;

function Book(author, title, pages, id, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.id = id;
  this.read = read === "yes" || "no";
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
  newDiv.classList.add("card", "hidden"); // Add the "hidden" class initially
  newDiv.innerHTML = `
    <h2>${book.title}</h2>
    <p>By: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <button type="button" class="${book.read === "yes" ? "read" : "notRead"} readBtn" data-book-id="${book.id}">${book.read === "yes" ? "Read" : "Not Read"}</button>
    <button type="button" class="removeBtn" data-book-id="${book.id}"><i class="fa-solid fa-trash-can fa-xl" style="color: #1a3d7a;"></i></button>
  `;
  container.appendChild(newDiv);
  setTimeout(() => {
    newDiv.classList.remove("hidden"); // Remove the "hidden" class to trigger the transition
  }, 10); // Delay the removal of "hidden" class to ensure transition effect
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
    readInput.value
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
  bookElement.classList.add("disappear"); // Apply class to trigger transition
  setTimeout(() => {
    bookElement.remove();
  }, 250); // Remove the element after the transition duration (0.25s)
}

function toggleRead(event) {
  const bookId = +event.target.getAttribute("data-book-id");
  const targetBook = myLibrary.find((book) => book.id === bookId);
  targetBook.read = targetBook.read === "yes" ? "no" : "yes";
  displayBooks(myLibrary);
}

newBookBtn.addEventListener("click", toggleModal);
close.addEventListener("click", closeModal);
window.addEventListener("click", handleOutsideClick);
submitBtn.addEventListener("click", handleSubmit);

displayBooks(myLibrary);
