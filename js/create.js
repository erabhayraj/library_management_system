//Create

//Registration
function stud_info(given_reg_no, given_name, given_email, given_mobile, given_branch, given_session, given_dob,given_dues) {
    this.reg_no = given_reg_no;
    this.name = given_name;
    this.email = given_email;
    this.mobile = given_mobile;
    this.branch = given_branch;
    this.session = given_session;
    this.dob = given_dob;
    this.duse=given_dues;
}


function Display() {

}
let warning = document.getElementById('warning');
//prototype for store info in localstorage
Display.prototype.store = function (newStud) {
    let previnfo = localStorage.getItem('studentInfo');
    let arrayInfo;
    if (previnfo == null) {
        arrayInfo = [];
    }
    else {
        arrayInfo = JSON.parse(previnfo);
    }
    let check = false;
    for (let i = 0; i < arrayInfo.length; i++) {
        if (newStud.reg_no == arrayInfo[i][0])
            check = true;
        break;
    }
    if (check == false) {
        let newInfo = [newStud.reg_no, newStud.name, newStud.email, newStud.mobile, newStud.branch, newStud.session, newStud.dob,0];
        arrayInfo.push(newInfo);
        localStorage.setItem('studentInfo', JSON.stringify(arrayInfo));
        localStorage.setItem('newStud.reg_no',"");
        warning.innerHTML = 'Registered Successfully';
        warning.setAttribute('class', 'fa fa-check-circle')
        warning.style.color = 'green';
        let newStudInfo = new Display();
        newStudInfo.clear();
        remove();
    }
    else {
        warning.innerHTML = 'This registration number is already registered';
        warning.setAttribute('class', 'fa fa-warning')
        warning.style.color = 'red';
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


//function prototype for clear the form
Display.prototype.clear = function () {
    let formtext = document.getElementById('input_data');
    formtext.reset();
}


//register function
let create = document.getElementById('register');
create.addEventListener('submit', register_stud);
function register_stud(e) {
    e.preventDefault();
    let reg = document.getElementById('Reg').value;
    let Name = document.getElementById('Name').value;
    let Email = document.getElementById('Email').value;
    let Mobile = document.getElementById('Mobi').value;
    let Branch = document.getElementById('Branch').value;
    let Session = document.getElementById('Session').value;
    let DOB = document.getElementById('Date').value;
    let info = new stud_info(reg, Name, Email, Mobile, Branch, Session, DOB);
    let newStud = new Display();
    newStud.store(info);
}


