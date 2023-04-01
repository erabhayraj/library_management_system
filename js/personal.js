let id = document.getElementById('personalAccount');
let infostud = localStorage.getItem('studentInfo');
let arrayLoginStudentInfo;
if (infostud == "")
    arrayLoginStudentInfo = [];
else
    arrayLoginStudentInfo = JSON.parse(infostud);
let loginindex = localStorage.getItem('loginindex');
let loginName = arrayLoginStudentInfo[loginindex][1];
id.innerHTML = loginName;
let heading = document.getElementById('accountPageHead');
heading.innerText = loginName;

//display list of book for issue
let arraylist;
function list() {
    let booklist = document.getElementById('list');
    booklist.innerHTML = '<h1 id="booklistforissue" text-align="center">Book List</h1><hr>';
    let listcardinnerhtml = `<h1 id="booklistforissue" text-align="center">Book List</h1><i id="bookEndWarning"></i>
<hr>`;
    let serial_no = 1;
    let listofbook = localStorage.getItem('Booklist')
    if (listofbook == "")
        arraylist = [];
    else
        arraylist = JSON.parse(listofbook);
    for (let i = 0; i < arraylist.length; i++) {
        listcardinnerhtml += `<div class="book" id="${serial_no}">
    <h3 align="left"class="book1">${serial_no}</h3>
    <h3 align="left"class="book1">${arraylist[i][0]}</h3>
    <h3 align="left">${arraylist[i][1]}</h3>
    <button class="btn issuebook" type="click" style="margin-top:3px" id="${serial_no}">issue</button>
</div>`;
        serial_no++;
    }
    booklist.innerHTML = listcardinnerhtml;
}
list();
displayIssuedList();



//Issue Book


let btns = document.getElementsByClassName('issuebook')
for (let i of btns) {
    i.addEventListener('click', function () {
        if (arraylist[i.id - 1][2] == 0) {
            negativeResponse(' All book of this section has issued')
        }
        else {
            addToPersonalId(i.id - 1);
            setTimeout(function () {
                window.location = 'personal.html'
            }, 1000)
        }
    })
}

//positive response function
let warning = document.getElementById('bookEndWarning');

function positiveResponse(successtext) {
    warning.innerHTML = successtext;
    warning.setAttribute('class', 'fa fa-check-circle');
    warning.style.color = 'green';
    warning.style.fontSize = 'small';
    remove();
}


//negative response function
function negativeResponse(warningtext) {
    warning.innerHTML = warningtext;
    warning.setAttribute('class', 'fa fa-warning');
    warning.style.color = 'red';
    warning.style.fontSize = 'small';
    remove();
}

//remove the response
function remove() {
    setTimeout(function () {
        warning.innerHTML = "";
        warning.setAttribute('class', 'none')
    }, 1000)
}

//add book to personal id
function addToPersonalId(index) {
    let personalIdStorage = localStorage.getItem(`${arrayLoginStudentInfo[loginindex][0]}`);
    let arrayOfPersonalIdStorage;
    if (personalIdStorage == null) {
        arrayOfPersonalIdStorage = [];
    }
    else {
        arrayOfPersonalIdStorage = JSON.parse(personalIdStorage);
    }
    //check for max issue book
    if (arrayOfPersonalIdStorage.length < 3) {
        //condition for same book issue
        let check = checkForSameBookIssue(arrayOfPersonalIdStorage, index);
        if (!check) {
            arraylist[index][2] -= 1;
            localStorage.setItem('Booklist', JSON.stringify(arraylist))

            // console.log(arrayOfPersonalIdStorage);
            let date = new Date;
            let newIssuedBook = [arraylist[index][0], arraylist[index][1], `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`];
            arrayOfPersonalIdStorage.push(newIssuedBook);
            localStorage.setItem(`${arrayLoginStudentInfo[loginindex][0]}`, JSON.stringify(arrayOfPersonalIdStorage))
            positiveResponse(' Successfully issued');
            displayIssuedList();
        }
        else {
            negativeResponse(' Cannot issue same book');
        }
    }
    else {
        negativeResponse(' Cannot issue more than 3 book');
    }

}


// displayIssuedList();
function displayIssuedList() {
    let arrayissuedbook;
    let issuedbookstring = localStorage.getItem(`${arrayLoginStudentInfo[loginindex][0]}`)
    if (issuedbookstring == null) {
        arrayissuedbook = [];
    }
    else
        arrayissuedbook = JSON.parse(issuedbookstring);
    let personalpageinnerhtml = document.getElementById('personalPage');
    let personalPageContent = `<h1 id="accountPageHead" text-align="center">${loginName}</h1><i id="warning2"></i><hr>
                    <h2 align="left">Number of issued book: ${arrayissuedbook.length}</h2>
                    <h2 align="left">Dues: ${arrayLoginStudentInfo[loginindex][7]}</h2>`;
    for (let i = 0; i < arrayissuedbook.length; i++) {
        personalPageContent += `
                <div class="book">
                    <h3 align="left">${arrayissuedbook[i][0]}</h3>
                    <h3 align="left">(${arrayissuedbook[i][1]})</h3>
                    <h3 align="left">${arrayissuedbook[i][2]}</h3>
                    <button class="btn returnBtn" id="${i}"style="margin-top:3px">Return</button>
                    <button class="btn reissueBtn" id="${i}" style="margin-top:3px">Re-Issue</button>
                </div>
        `;
    }
    personalpageinnerhtml.innerHTML = personalPageContent;
}

//function for checking same book issue
function checkForSameBookIssue(arrayOfPersonalIdStorage, index) {
    let check = false;
    for (let i = 0; i < arrayOfPersonalIdStorage.length; i++) {
        if (arraylist[index][0] == arrayOfPersonalIdStorage[i][0] && arraylist[index][1] == arrayOfPersonalIdStorage[i][1])
            check = true;
    }
    return check;
}




//Return Book
let issueClassName = document.getElementsByClassName('returnBtn')
for (let i of issueClassName) {
    i.addEventListener('click', function () {
        // console.log(i.id);
        returnBook(i.id);
    })
}

//function for return book
function returnBook(index) {
    let arrayissuedbook;
    let issuedbookstring = localStorage.getItem(`${arrayLoginStudentInfo[loginindex][0]}`)
    if (issuedbookstring == null) {
        arrayissuedbook = [];
    }
    else
        arrayissuedbook = JSON.parse(issuedbookstring);
    for (let i = 0; i < arraylist.length; i++) {

        if (arraylist[i][0] == arrayissuedbook[index][0] && arraylist[i][1] == arrayissuedbook[index][1]) {
            arraylist[i][2] = arraylist[i][2] - 1 + 2;
            localStorage.setItem('Booklist', JSON.stringify(arraylist))
        }
    }
    let prevdate = arrayissuedbook[index][2];
    prevdate = JSON.stringify(prevdate)
    computeDues(prevdate);
    arrayissuedbook.splice(index, 1);
    // console.log(arrayissuedbook)
    localStorage.setItem(`${arrayLoginStudentInfo[loginindex][0]}`, JSON.stringify(arrayissuedbook))
    positiveResponse('Returned successfully');
    displayIssuedList();
    setTimeout(function () {
        window.location = 'personal.html';
    }, 1000)
}


//compute dues function

function computeDues(date) {
    const date1 = new Date(date);
    const date2 = new Date;
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays + " days");
    if (diffDays > 30) {
        arrayLoginStudentInfo[loginindex][7] = (arrayLoginStudentInfo[loginindex][7] - 1 + 1) + 5 * (diffDays - 32);
        localStorage.setItem('studentInfo', JSON.stringify(arrayLoginStudentInfo));
    }
}



//reissue Book
let reissueClassName = document.getElementsByClassName('reissueBtn')
for (let i of reissueClassName) {
    i.addEventListener('click', function () {
        reissue(i.id);
    })
}

function reissue(index) {
    let arrayissuedbook;
    let issuedbookstring = localStorage.getItem(`${arrayLoginStudentInfo[loginindex][0]}`)
    if (issuedbookstring == null) {
        arrayissuedbook = [];
    }
    else
        arrayissuedbook = JSON.parse(issuedbookstring);

    let prevdate = arrayissuedbook[index][2];
    prevdate = JSON.stringify(prevdate)
    computeDues(prevdate);

    let date = new Date;
    let newDateOfReissue = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    arrayissuedbook[index][2] = newDateOfReissue;
    localStorage.setItem(`${arrayLoginStudentInfo[loginindex][0]}`,JSON.stringify(arrayissuedbook))
    displayIssuedList();
    positiveResponse(' Successfully Reissued');
    setTimeout(function(){
        window.location='personal.html';
    },1000);
}