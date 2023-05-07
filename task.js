let form = document.querySelector('#task_form');
let taskinput = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let tasklist = document.querySelector('ul');
let clearbtn = document.querySelector('#clear_task_btn')

form.addEventListener('submit', addtask)
tasklist.addEventListener('click', removetask)
clearbtn.addEventListener('click', cleartask)
filter.addEventListener('keyup', filtertask)
document.addEventListener('DOMContentLoaded', gettask);


// define function
// add task
function addtask(e){
  if (taskinput.value == ''){
    alert('type here')
  }
  else{
     // creat li element
   let li = document.createElement('li');
   li.appendChild(document.createTextNode(taskinput.value + 
    " "))
   let link = document.createElement('a')
   link.setAttribute('href', '#')
   link.innerHTML= 'x'
   li.appendChild(link)
   tasklist.appendChild(li)


 // localstore link code
   storetaskInLocalStorage(taskinput.value)


   taskinput.value= '';

  }
  e.preventDefault();
}


// remove task
function removetask(e){
  if (e.target.hasAttribute('href')){
    let ele = e.target.parentElement;
   // console.log(ele);
    ele.remove()

    removefromls(ele) // local storage clear link
    }
  }

// clear all
function cleartask(e){
  // confirm('are you sure all delet')
  //   tasklist.innerHTML = "";
  while(tasklist.firstChild){
    tasklist.removeChild(tasklist.lastChild)
  }
  localStorage.clear(); //local storage clear task 
  }


// search option filter
function filtertask(e){
  let text = e.target.value.toLowerCase();

  document.querySelectorAll('li').forEach(task =>{
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1 ){
    task.style.display = "block";
    }
    else {
    task.style.display = "none";
    }
  })
}


// local storage use
function storetaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function gettask(e){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(task => {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(task + " "))
   let link = document.createElement('a')
   link.setAttribute('href', '#')
   link.innerHTML= 'x';
   li.appendChild(link)
   tasklist.appendChild(li)
  })
}

function removefromls(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  let li = taskItem;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
    if(li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}




/*
  let form = document.querySelector('#task_form');
  let taskinput = document.querySelector('#new_task');
  let filter = document.querySelector('#task_filter');
  let tasklist = document.querySelector('ul');
  let clearbtn = document.querySelector('#clear_task_btn')
  
  
  
  form.addEventListener('submit', addtask)
  tasklist.addEventListener('click', removetask)
  clearbtn.addEventListener('click', cleartask)
  

// define function
// add task
  function addtask(e){
    if (taskinput.value == ''){
      alert('type here')
    }
   
    else{
       // creat li element
      let li = document.createElement('li')
      li.appendChild(document.createTextNode(taskinput.value + 
      " "))
     tasklist.appendChild(li)
     taskinput.value= '';
  
     let link = document.createElement('a')
     link.setAttribute('href', '#')
     link.innerText= 'x'
     li.appendChild(link)
    }
    e.preventDefault();
  }
  
  // remove task
  function removetask(e){
    if (e.target.hasAttribute('href')){
     if(confirm('are you sure')){
      let ele = e.target.parentElement;
     // console.log(ele);
      ele.remove()
      }
    } 
  }
  
  // clear all
  function cleartask(e){
    // confirm('are you sure all delet')
    //   tasklist.innerHTML = "";
    while(tasklist.firstChild){
      tasklist.removeChild(tasklist.lastChild)
      confirm('are you sure')
    }
    }
  */
