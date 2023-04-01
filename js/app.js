
//Add Book


function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//constructor for adding book
let s_no = 0;
function Book(name, author, number) {
  this.name = name;
  this.author = author;
  this.number = number;

}

function Display() {

}

// prototype for displaying book list
Display.prototype.add = function (booklist) {
  let table = document.getElementById('tableBody');
  let listofbook = "";
  for (let i = 0; i < booklist.length; i++) {
    listofbook += `
       <tr>
        <td>${i + 1}</td>
        <td>${booklist[i][0]}</td>
        <td>${booklist[i][1]}</td>
        <td>${booklist[i][2]}</td>
        
      </tr>
  `;
  }
  table.innerHTML = listofbook;
}


//clear after adding book
Display.prototype.clear = function () {
  let addform = document.getElementById('input_data')
  addform.reset();
}

//adding book to storage
let warning = document.getElementById('warning');
Display.prototype.store = function (book) {
  let out = localStorage.getItem('Booklist');
  let additem;
  if (out == null) {
    additem = [];
  }
  else {
    additem = JSON.parse(out);
  }
  let check = false;
  for (let i = 0; i < additem.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (additem[i][0] == book.name && additem[i][1] == book.author) {
        additem[i][2] = Number(additem[i][2])
        book.number = Number(book.number);
        additem[i][2] += book.number;
        check = true;
        break;
      }
    }
  }
  if (check == false) {
    let newitem = [book.name, book.author, book.number];
    additem.push(newitem);
  }
  let newbook = new Display();
  newbook.add(additem);
  out = JSON.stringify(additem);
  localStorage.setItem('Booklist', out);
  warning.innerHTML = " Successfully added to list";
  warning.setAttribute('class', 'fa fa-check-circle')
  warning.style.color = 'green';
  remove();
  newbook.clear();
}


//  function for take data from form
let addBook = document.getElementById('addForm');
addBook.addEventListener('submit', addBookForm);
function addBookForm(e) {
  e.preventDefault();
  let bookName = document.getElementById('bookname').value;
  let authorName = document.getElementById('authorname').value;
  let num = document.getElementById('numOfBook').value;
  if ((bookName != "") && (authorName != "") && (num > 0)) {
    warning.innerHTML = "";
    let book = new Book(bookName, authorName, num);
    let display = new Display();
    display.store(book);
  }
  else {
    warning.style.color = 'red';
    warning.setAttribute('class', 'fa fa-warning')
    warning.innerHTML = " Sorry you can not add this book";
    remove();
  }
}

//function for removing the response text
function remove() {
  setTimeout(function () {
    warning.innerHTML = "";
    warning.setAttribute('class', 'none')
  }, 2000)
}

// function for delete the book from storage
function deleteBook(x) {
  let listele = document.getElementById('#tableBody:nth-child(x)');
  console.log(listele);
}

//function for showing previous list
let show = document.getElementById('showlist');
show.addEventListener('click', showPrevList);
function showPrevList() {
  let out = localStorage.getItem('Booklist');
  let additem;
  if (out == null) {
    additem = [];
  }
  else {
    additem = JSON.parse(out);
  }
  let displaylist = new Display();
  displaylist.add(additem);
}




//Registration
function stud_info(given_reg_no, given_name, given_email, given_mobile, given_branch, given_session, given_dob) {
  this.reg_no = given_reg_no;
  this.name = given_name;
  this.email = given_email;
  this.mobile = given_mobile;
  this.branch = given_branch;
  this.session = given_session;
  this.dob = given_dob;
}
