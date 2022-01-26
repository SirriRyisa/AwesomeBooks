import loadBooks from "../index.js";
export const sectionBooks = document.querySelector('.books');

export default class BookApp {
  height = 0;

  constructor() {
    /* eslint-disable */
    this.bookCollection = localStorage.getItem('bookCollection')
      ? JSON.parse(localStorage.getItem('bookCollection'))
      : [];
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
