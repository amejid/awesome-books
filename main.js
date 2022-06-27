const booksContainerEl = document.querySelector('.books-container');
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const btnAddEl = document.querySelector('.btn-submit');

const books = [];

function displayBooks() {
  booksContainerEl.innerHTML = '';
  books.forEach((book) => {
    const builder = `
      <div>
        <p>${book.title}</p>
        <p>${book.author}</p>
      </div>`;

    booksContainerEl.insertAdjacentHTML('beforeend', builder);

    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remove';

    booksContainerEl.insertAdjacentElement('beforeend', btnRemove);

    const lineBreak = document.createElement('hr');
    booksContainerEl.insertAdjacentElement('beforeend' ,lineBreak);
  });
}

btnAddEl.addEventListener('click', (e) => {
  e.preventDefault();
  const title = titleEl.value;
  const author = authorEl.value;

  const book = { title, author };
  books.push(book);

  displayBooks();
});
