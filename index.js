const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const addBtn = document.querySelector('.add-btn');
const sectionBooks = document.querySelector('.books');
const footer = document.getElementById('footer');

const findHight = () => {
  if (window.innerHeight > document.body.scrollHeight) {
    footer.style.position = 'fixed';
  } else {
    footer.style.position = 'relative';
  }
};

function loadBooks(bookCollection) {
  sectionBooks.innerHTML = '';
  /* eslint-disable */
  if (bookCollection.length > 0) {
    bookCollection.forEach((book, i) => {
      sectionBooks.insertAdjacentHTML(
        'afterbegin',
        books.returnBook(book.title, book.author, i)
      );
    });
    console.log(window.innerHeight);
    console.log(document.body.scrollHeight);
  }
  books.colorGiver();
  /* eslint-enable */
}

class BookApp {
  height = 0;

  constructor() {
    /* eslint-disable */
    this.bookCollection = localStorage.getItem('bookCollection') ?
      JSON.parse(localStorage.getItem('bookCollection')) : [];
    /* eslint-enable */
  }

  addBook(title, author) {
    this.bookCollection.push({
      title,
      author,
    });
    localStorage.setItem('bookCollection', JSON.stringify(this.bookCollection));
    loadBooks(this.bookCollection);
  }

  removeBook(i) {
    this.bookCollection.splice(i, 1);
    localStorage.setItem('bookCollection', JSON.stringify(this.bookCollection));
    loadBooks(this.bookCollection);
  }
  /* eslint-disable */
  returnBook(title, author, i) {
    const html = `<div class="each-book">
      <div class="book-align">
		  <span class="book-title">"${title}" by </span>
		  <span class="author">${author}</span>
      </div>
		  <button class="remove-btn" data-id=${i}>Remove</button>
	  </div>`;
    return html;
  }

  /* eslint-enable */
  colorGiver() {
    if (this.bookCollection.length !== 0) {
      sectionBooks.style.border = '2px solid black';
      const divEl = document.querySelectorAll('.each-book');
      divEl.forEach((div, i) => {
        if (i % 2 === 0) div.style.background = 'white';
        else div.style.background = 'lightgray';
      });
    }
    if (this.bookCollection.length === 0) {
      sectionBooks.style.border = 'none';
    }
  }
}

const books = new BookApp();

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;
  if (title && author) {
    books.addBook(title, author);
    /* eslint-disable */
    inputAuthor.value = inputTitle.value = '';
    /* eslint-enable */
  }
});

sectionBooks.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const num = +e.target.dataset.id;
    books.removeBook(num);
  }
});

loadBooks(books.bookCollection);

const all = document.querySelectorAll('.all');
const lists = document.querySelectorAll('.nav-link');
lists.forEach((list) => {
  list.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.parentElement.id;
    all.forEach((el) => {
      el.classList.add('hidden');
    });
    document.querySelector(`.${target}`).classList.remove('hidden');
    findHight();
  });
});

const dateEl = document.querySelector('.date');

const setDate = function () {
  const now = new Date();
  const options = {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  const date = Intl.DateTimeFormat([], options).format(now);
  return date;
};

setInterval(() => {
  dateEl.textContent = '';
  dateEl.textContent = setDate();
});