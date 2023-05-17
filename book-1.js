let form = document.querySelector("#book-form");
let booklist = document.querySelector("#book-list")

// solve it object programing
class Book {
  constructor (title, author, isbn){
    this.title= title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // add to td icon
  static addtobooklist (book) {
    let list = document.querySelector('#book-list');
    let row = document.createElement('tr');
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>`
    
    list.appendChild(row)
  }
  // search field clear
  static clearfields(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showAlert(message, className){
    let div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    let add = document.querySelector("#book-form");
    container.insertBefore(div, add);
  
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000)
}

   static deleteformbook(target){
    if (target.hasAttribute("href")){
     target.parentElement.parentElement.remove();
     store.removebook(target.parentElement.
     previousElementSibling.textContent.trim())
     UI.showAlert("book removed!", "success")
    }
  }
}


// localstorage use  
class store{
  static getbooks() {
    let books;
    if (localStorage.getItem('books') === null){
      books = [];
    }
    else {
      books = JSON.parse(localStorage.getItem("books"))
    }
    return books;
  }
  static addbook(book){
    let books = store.getbooks();
    books.push(book);
    
    localStorage.setItem("books", JSON.stringify(books));
  }
  static displaybook(){
    let books = store.getbooks();

    books.forEach(book => {
      UI.addtobooklist(book);
    });
  }
  static removebook(isbn){
    let books = store.getbooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    }) 
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// submit to output shoing
form.addEventListener('submit', newbook);
booklist.addEventListener("click", removebooklist);
document.addEventListener("DOMcontentLoaded", store.displaybook());


function newbook(e) {
  // title & author & isbn value pabo
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let isbn = document.querySelector("#isbn").value;


  if (title === '' || author === '' || isbn === ''){
    UI.showAlert("please fill all the fields", "error");
  }
  else {
    let book = new Book(title, author, isbn);
    UI.addtobooklist(book);
  
    UI.clearfields()  // search part clear link
   // console.log(book);
    UI.showAlert("success all!", "success");
    
    store.addbook(book)
  }
  e.preventDefault();
}

function removebooklist(e) {
  UI.deleteformbook(e.target);
  e.preventDefault();
}
