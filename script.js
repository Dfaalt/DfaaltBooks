// Function to search for books
function searchBooks() {
  let searchInput = document.getElementById("searchInput").value;
  let url = "https://www.googleapis.com/books/v1/volumes?q=" + searchInput;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBooks(data.items, "searchResults"))
    .catch((error) => console.log(error));
}

function toggleLightMode() {
  var body = document.body;
  body.classList.toggle("light-mode");
}

// Function to display books
function displayBooks(books, containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML = "";

  books.forEach((book) => {
    let bookInfo = `
        <div class="book">
          <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="Book Cover">
          <div class="book-info">
            <h2>${book.volumeInfo.title}</h2>
            <p>Author: ${book.volumeInfo.authors}</p>
            <p>Publisher: ${book.volumeInfo.publisher}</p>
            <p>Published Date: ${book.volumeInfo.publishedDate}</p>
            <p>Pages: ${book.volumeInfo.pageCount}</p>
            <p>Description: ${book.volumeInfo.description}</p>
            <p><a href="${book.volumeInfo.previewLink}" target="_blank">Preview</a></p>
          </div>
        </div>
      `;
    container.innerHTML += bookInfo;
  });
}

// Function to recommend books based on category
function recommendBooks(category) {
  let url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + category;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBooks(data.items, "recommendedBooks"))
    .catch((error) => console.log(error));
}

// Call the recommendBooks function with a specific category
recommendBooks("engineering");

// Add event listener to detect when the "Enter" key is pressed
let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchBooks();
  }
});
