const booksContainerEl = document.querySelector('.books-container');
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const btnAddEl = document.querySelector('.btn-submit');

if (!localStorage.getItem('booksInfo')) {
  localStorage.setItem('booksInfo', JSON.stringify([]));
}
const books = JSON.parse(localStorage.getItem('booksInfo'));

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

    /* eslint-disable no-use-before-define */
    btnRemove.addEventListener('click', removeBook.bind(index));

    booksContainerEl.insertAdjacentElement('beforeend', btnRemove);

    const lineBreak = document.createElement('hr');
    booksContainerEl.insertAdjacentElement('beforeend', lineBreak);
  });
}

function removeBook() {
  books.splice(this, 1);
  uploadToStorage(books);
  loadFromStorage();
}

function uploadToStorage(books) {
  localStorage.setItem('booksInfo', JSON.stringify(books));
}

function loadFromStorage() {
  const books = JSON.parse(localStorage.getItem('booksInfo'));
  displayBooks(books);
}
loadFromStorage();

btnAddEl.addEventListener('click', (e) => {
  e.preventDefault();
  const title = titleEl.value;
  const author = authorEl.value;

  const book = { title, author };
  books.push(book);

  uploadToStorage(books);
  loadFromStorage();
});
