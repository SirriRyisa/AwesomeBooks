const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const addBtn = document.querySelector('.add-btn');
const sectionBooks = document.querySelector('.books');
/* eslint-disable */
if (localStorage.getItem('bookCollection')) {
	bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
} else bookCollection = [];
/* eslint-enable */
/* eslint-disable */
function returnBook(title, author, i) {
  const html = `<div class="each-book">
		  <span class="book-title">${title}</span>
		  <span class="author">${author}</span>
		  <button class="remove-btn" data-id=${i}>Remove</button>
	  </div>`;
  return html;
}
/* eslint-enable */

function loadBooks(bookCollection) {
  sectionBooks.innerHTML = '';
  /* eslint-disable */
	if (bookCollection.length > 0) {
		bookCollection.forEach((book, i) => {
			sectionBooks.insertAdjacentHTML(
				'afterbegin',
				returnBook(book.title, book.author, i),
			);
		});
	}
	/* eslint-enable */
}

function addBook(title, author) {
  sectionBooks.insertAdjacentHTML('afterbegin', returnBook(title, author));
  /* eslint-disable */
	localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
	loadBooks(bookCollection);
	/* eslint-enable */
}
/* eslint-disable */
loadBooks(bookCollection);
/* eslint-enable */
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;
  /* eslint-disable */
	bookCollection.push({
		title,
		author
	});
	addBook(title, author);
	inputAuthor.value = inputTitle.value = '';
	/* eslint-enable */
});
/* eslint-disable */
function removeBook(i) {
	bookCollection.splice(i, 1);
	localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
	loadBooks(bookCollection);
};
/* eslint-enable */
sectionBooks.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const num = +e.target.dataset.id;
    removeBook(num);
  }
});