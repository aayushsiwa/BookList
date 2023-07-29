class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn = isbn;
    }
}



class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        // create tr element
        const row = document.createElement('tr');
        // Insert column
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message,className){
        // Create div
        const div = document.createElement('div');
        // Add Classes
        div.classList.add(`alert`, className);
        // Add Text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(div, form);

        // Timeout 3s
        setTimeout(function () {
            document.querySelector('.alert').remove();

        }, 3000)
    }

    deleteBook(target){
        if(target.className==='delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


// Local Storage Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach(function(book){
            const ui=new UI;
            // Add book to ui
            ui.addBookToList(book);
        })
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}


// DOM Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
    // Get form values

    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiating a book
    const book = new Book(title, author, isbn);

    // Instantiating UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error 
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);
        // Add to LS
        Store.addBook(book);
        // Success Message
        ui.showAlert('Book added successfully', 'success');
        // Clear Fields
        ui.clearFields();
    }
    e.preventDefault();
});


// Event Listener for delete
document.getElementById('book-list').addEventListener('click',(e)=>{

    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show message
    ui.showAlert('Book Removed','success');

    e.preventDefault();
})