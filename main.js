const booksContainerEl = document.querySelector('.books-container');
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const btnAddEl = document.querySelector('.btn-submit');

class Book {
  #books;

  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.retrieveStorage();
  }

  retrieveStorage() {
    this.#books = JSON.parse(localStorage.getItem('booksInfo')) || [];
  }

  uploadToStorage(node) {
    if (node) {
      localStorage.setItem('booksInfo', JSON.stringify(node));
      return;
    }
    this.retrieveStorage();
    const book = { title: this.title, author: this.author };
    this.#books.push(book);
    localStorage.setItem('booksInfo', JSON.stringify(this.#books));
  }

  displayBooks() {
    booksContainerEl.innerHTML = '';
    if (!this.#books) return;
    this.#books.forEach((book, index) => {
      const builder = `
      <p class="book-info">"${book.title}" by ${book.author}</p>`;

      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.insertAdjacentHTML('beforeend', builder);

      const btnRemove = document.createElement('button');
      btnRemove.classList.add('remove');
      btnRemove.setAttribute('id', index);
      btnRemove.textContent = 'Remove';

      bookDiv.insertAdjacentElement('beforeend', btnRemove);

      booksContainerEl.appendChild(bookDiv);
    });
  }

  loadFromStorage() {
    this.retrieveStorage();
    this.displayBooks();
  }

  removeBook(index) {
    this.retrieveStorage();
    const modified = this.#books.filter((book) => book !== this.#books.at(index));
    this.uploadToStorage(modified);
    this.loadFromStorage();
  }
}

const app = new Book();
app.loadFromStorage();

btnAddEl.addEventListener('click', (e) => {
  e.preventDefault();
  const title = titleEl.value.trim();
  const author = authorEl.value.trim();

  if (!title || !author) return;
  const book = new Book(title, author);

  book.uploadToStorage();
  book.loadFromStorage();
  titleEl.value = '';
  authorEl.value = '';
});

booksContainerEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const targetId = +e.target.getAttribute('id');
    app.removeBook(targetId);
  }
});

const yearEl = document.querySelector('.year');
const navLinksEl = document.querySelector('.nav-links');
const navLinkEl = document.querySelectorAll('.nav-link');
const sectionEl = document.querySelectorAll('.section');

navLinksEl.addEventListener('click', (e) => {
  const clicked = e.target;
  if (!clicked.classList.contains('nav-link')) return;

  const { sect } = clicked.dataset;
  navLinkEl.forEach((link) => link.classList.remove('nav-link--active'));
  clicked.classList.add('nav-link--active');

  sectionEl.forEach((link) => link.classList.remove('section--active'));

  document.querySelector(`.section-${sect}`).classList.add('section--active');
});
