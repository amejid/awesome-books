const booksContainerEl = document.querySelector('.books-container');
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const btnAddEl = document.querySelector('.btn-submit');

if (!localStorage.getItem('booksInfo')) {
  localStorage.setItem('booksInfo', JSON.stringify([]));
}
const books = JSON.parse(localStorage.getItem('booksInfo'));

function uploadToStorage(books) {
  localStorage.setItem('booksInfo', JSON.stringify(books));
}

/* eslint-disable no-use-before-define */
function loadFromStorage() {
  const books = JSON.parse(localStorage.getItem('booksInfo'));
  displayBooks(books);
}
loadFromStorage();

function removeBook() {
  books.splice(this, 1);
  uploadToStorage(books);
  loadFromStorage();
}

function displayBooks() {
  booksContainerEl.innerHTML = '';
  books.forEach((book, index) => {
    const builder = `
        <div>
          <p>${book.title}</p>
          <p>${book.author}</p>
        </div>`;

    booksContainerEl.insertAdjacentHTML('beforeend', builder);

    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remove';

    btnRemove.addEventListener('click', removeBook.bind(index));

    booksContainerEl.insertAdjacentElement('beforeend', btnRemove);

    const lineBreak = document.createElement('hr');
    booksContainerEl.insertAdjacentElement('beforeend', lineBreak);
  });
}

btnAddEl.addEventListener('click', (e) => {
  e.preventDefault();
  const title = titleEl.value;
  const author = authorEl.value;

  const book = { title, author };
  books.push(book);

  uploadToStorage(books);
  loadFromStorage();
});
