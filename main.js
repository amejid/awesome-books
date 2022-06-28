const booksContainerEl = document.querySelector('.books-container');
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const btnAddEl = document.querySelector('.btn-submit');

let books;
books = JSON.parse(localStorage.getItem('booksInfo')) || [];

function uploadToStorage(book) {
  localStorage.setItem('booksInfo', JSON.stringify(book));
}

function displayBooks() {
  booksContainerEl.innerHTML = '';
  if (!books) return;
  books.forEach((book, index) => {
    const builder = `
      <p>${book.title}</p>
      <p>${book.author}</p>`;

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.insertAdjacentHTML('beforeend', builder);

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('remove');
    btnRemove.setAttribute('id', index);
    btnRemove.textContent = 'Remove';

    bookDiv.insertAdjacentElement('beforeend', btnRemove);

    const lineBreak = document.createElement('hr');

    booksContainerEl.appendChild(bookDiv);
    booksContainerEl.insertAdjacentElement('beforeend', lineBreak);
  });
}

function loadFromStorage() {
  books = JSON.parse(localStorage.getItem('booksInfo')) || [];
  displayBooks();
}
loadFromStorage();

function removeBook(index) {
  const modified = books.filter((book) => book !== books.at(index));
  uploadToStorage(modified);
  loadFromStorage();
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

booksContainerEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const targetId = +e.target.getAttribute('id');
    // removeBook(targetId);
  }
});
