// Function to search for books with sorting option
function searchBooks(sortBy) {
  let searchInput = document.getElementById("searchInput").value;
  let category = document.getElementById("categorySelect").value;
  let url = "https://www.googleapis.com/books/v1/volumes?q=" + searchInput;

  // If a category is selected, add it to the URL
  if (category !== "all") {
    url += "+subject:" + category;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBooks(data.items, "searchResults", sortBy)) // Pass sortBy parameter
    .catch((error) => console.log(error));
}

// Event listener for sorting options in search
let sortSelectSearch = document.getElementById("sortSelect");
sortSelectSearch.addEventListener("change", function () {
  let selectedSort = sortSelectSearch.value;
  if (selectedSort === "latest" || selectedSort === "oldest") {
    searchBooks(selectedSort); // Call searchBooks with sorting option
  }
});

// Event listener for category selection
let categorySelect = document.getElementById("categorySelect");
categorySelect.addEventListener("change", function () {
  searchBooks(); // Call searchBooks when category changes
});

// Function to light/dark mode
function toggleLightMode() {
  var body = document.body;
  body.classList.toggle("light-mode");
}

// Function to display books
function displayBooks(books, containerId, sortBy = "latest") {
  let container = document.getElementById(containerId);
  container.innerHTML = "";

  // Sort books based on sortBy parameter
  if (sortBy === "latest") {
    books.sort(
      (a, b) =>
        new Date(b.volumeInfo.publishedDate) -
        new Date(a.volumeInfo.publishedDate)
    );
  } else if (sortBy === "oldest") {
    books.sort(
      (a, b) =>
        new Date(a.volumeInfo.publishedDate) -
        new Date(b.volumeInfo.publishedDate)
    );
  }

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

// Event listener for sorting options
let sortSelect = document.getElementById("sortSelect");
sortSelect.addEventListener("change", function () {
  let selectedSort = sortSelect.value;
  if (selectedSort === "latest" || selectedSort === "oldest") {
    recommendBooks("engineering", selectedSort);
  }
});

// Function to recommend books based on category and sort option
function recommendBooks(category, sortBy) {
  let url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + category;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBooks(data.items, "recommendedBooks", sortBy))
    .catch((error) => console.log(error));
}
