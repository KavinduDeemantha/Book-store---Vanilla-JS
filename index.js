const routes = {
  "/": `<div class="main-content">
            <p class="book-store">Book Store</p>
            <p class="for-you">For You</p>
            <p class="check-out">Checkout the books from here</p>
            <button class="view-book-btn" id="view-book-btn">View Books</button>
        </div>
        <div class="image-content">
            <img src="./assets/pngtree-students-love-reading-books-with-passion-png-image_11972183.png" alt="" srcset="">
        </div>`,
  "/add_book": `<div class="add-book-container">
          <h3 class="add-books">Add books from here</h3>
          <div class="book-info-container">
            <input
              type="text"
              placeholder="Name of the book"
              name="book_name"
              class="book-info-inputs"
              required
            />
            <input
              type="text"
              placeholder="Author"
              name="book_author"
              class="book-info-inputs"
              required
            />
            <textarea
              name="description"
              id=""
              placeholder="Description"
              class="book-info-inputs"
              required
            ></textarea>
            <input type="number" name="price" placeholder="Price" class="book-info-inputs" required/>
            <div class="book-img-container">
            <label for="book-img" class="book-img-label">Book Image</label>
            <input type="file" name="book-img" accept="image/png, image/jpeg" />
            </div>
          <div class="add-book-btn-container">
            <button class="add-book-btn" id="add-book-btn">Add book</button>
            </div>
            </div>
        </div>`,
  "/books": `<div id="books-container"></div>`,
};

// Function to handle routing
const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  const path = event.target.getAttribute("href");
  window.history.pushState({}, "", path);
  renderContent(path);
};

const renderContent = (path) => {
  const content = routes[path] || `<h1>404 - Page Not Found</h1>`;
  document.getElementById("content_container").innerHTML = content;
  const viewBookBtn = document.getElementById("view-book-btn");
  if (viewBookBtn) {
    viewBookBtn.addEventListener("click", () => {
      window.history.pushState({}, "", "/books");
      renderContent("/books");
    });
  }

  // Adding books
  if (path === "/add_book") {
    const addBookBtn = document.getElementById("add-book-btn");
    if (addBookBtn) {
      addBookBtn.addEventListener("click", () => {
        let bookName = document.querySelector("input[name='book_name']").value;
        let bookAuthor = document.querySelector(
          "input[name='book_author']"
        ).value;
        let description = document.querySelector(
          "textarea[name='description']"
        ).value;
        let price = document.querySelector("input[name='price']").value;
        let img = document.querySelector("input[name='book-img']").value;
        console.log(img);

        function makeid(length) {
          let result = "";
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          const charactersLength = characters.length;
          let counter = 0;
          while (counter < length) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
            counter += 1;
          }
          return result;
        }

        let id = makeid(5);
        const Book = {
          id: id,
          bookName: bookName,
          bookAuthor: bookAuthor,
          description: description,
          price: price,
          img: img,
        };
        if (
          bookName !== "" &&
          bookAuthor !== "" &&
          description !== "" &&
          price !== "" &&
          img !== ""
        ) {
          let books = JSON.parse(localStorage.getItem("book"));
          if (!Array.isArray(books)) {
            books = [];
          }
          books.push(Book);
          localStorage.setItem("book", JSON.stringify(books));
          alert(Book.bookName + " saved!");
        } else {
          alert("Please fill all details!!!");
        }
      });
    }
  }

  // Loading books
  if (path === "/books") {
    let books = JSON.parse(localStorage.getItem("book"));
    if (books) {
      let bookCard = "";
      books.forEach((book) => {
        bookCard += `<div class="book-card">
          <div class="book-card-img">
          </div>
          <p class="bookName"><b>${book.bookName}</b></p>
          <p class="bookAuthor">${book.bookAuthor}</p>
          <p>Rs.<span class="bookPrice">${book.price}</span></p>
          <div class="updateDelete-container">
            <button>Update</button>
            <button>Delete</button>
          </div>
        </div>`;
      });
      document.getElementById("books-container").innerHTML = bookCard;
    }
  }
};

window.addEventListener("popstate", () => {
  renderContent(window.location.pathname);
});

renderContent(window.location.pathname);
window.route = route;
