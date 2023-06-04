

const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit',onSubmit);
function onSubmit (e){
    e.preventDefault();
    if(nameInput.value ==="" || emailInput.value ===''){
        msg.classList.add('error');
        msg.innerHTML = "Please enter all fields";
        setTimeout(()=>msg.remove(),3000)
    }else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
        userList.appendChild(li);
        const user={
            name : nameInput.value,
            email : emailInput.value,
        };
        let users =localStorage.getItem('users');
        if(users){
            users=JSON.parse(users);
        }else {
            users=[];
        }
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users))
        

        //clear fields 
        nameInput.value="";
        emailInput.value="";
    }
    
}