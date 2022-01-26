import './module/dateSet.js';
import BookApp, { sectionBooks } from './module/classUpdate.js';

const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const addBtn = document.querySelector('.add-btn');
const footer = document.getElementById('footer');

const books = new BookApp();

const findHight = () => {
  if (window.innerHeight > document.body.scrollHeight) {
    footer.style.position = 'fixed';
  } else {
    footer.style.position = 'relative';
  }
};

export default function loadBooks(bookCollection) {
  sectionBooks.innerHTML = '';
  /* eslint-disable */
  if (bookCollection.length > 0) {
    bookCollection.forEach((book, i) => {
      sectionBooks.insertAdjacentHTML(
        'afterbegin',
        books.returnBook(book.title, book.author, i)
      );
    });
  }
  books.colorGiver();
  /* eslint-enable */
}

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
