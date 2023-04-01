//Login
let warning =document.getElementById('warning')
let loginBtn=document.getElementById('login_data');
loginBtn.addEventListener('submit',login);
function login(e){
    e.preventDefault();
    let loginReg=document.getElementById('login_Reg').value;
    let loginDOB=document.getElementById('login_DOB').value;
    let studentInfo=localStorage.getItem('studentInfo');
    let arrayLoginStudentInfo;
    let check=false;
    let index;
    if(studentInfo==null)
    {
        arrayLoginStudentInfo=[];
    }
    else
    {
        arrayLoginStudentInfo=JSON.parse(studentInfo);
    }
    for(let i=0;i<arrayLoginStudentInfo.length;i++)
    {
        if(loginReg==arrayLoginStudentInfo[i][0]&&loginDOB==arrayLoginStudentInfo[i][6])
        {
            // console.log(i);
            localStorage.setItem('loginindex',i);
            check=true;
            break;
        }
    }
    localStorage.setItem('studentInfo',JSON.stringify(arrayLoginStudentInfo))
    if(check==true)
    {
        //remove();
        window.location='personal.html';
        // console.log('Login Successfull')
    }
    else
    {
        warning.innerHTML="wrong registeration no. or DOB";
        warning.style.color='red';
        warning.setAttribute('class','fa fa-warning');
        remove();
    }
}


function remove() {
    setTimeout(function () {
        // window.location='personal.html';
       warning.innerHTML = "";
       warning.setAttribute('class', 'none')
    }, 2000)
}