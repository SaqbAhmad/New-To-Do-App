let form=document.getElementById("form");
let textInput=document.getElementById("textInput");
let dateInput=document.getElementById("dateInput");
let textarea=document.getElementById("textarea");
let msg=document.getElementById("msg");
let tasks=document.getElementById("tasks");
let add=document.getElementById("add");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    // console.log(e.target);
    // console.log(e);
    formValidation();
});
let formValidation= ()=>{
      if(textInput.value===""){
        console.log("failute");
        msg.innerHTML="Task cannot be blank";
      }else{
         console.log("success");
         msg.innerHTML="";
         acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (()=>{
            add.setAttribute("data-bs-dismiss","can write anything except modal");
        })()
      }
};
let data=[];
let acceptData= ()=>{
    // console.log(textInput.value, dateInput.value, textarea.value);
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
};
let createTasks= ()=>{
    tasks.innerHTML="";
    data.map((x,y)=>{
        return (tasks.innerHTML +=`
            <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary"> ${x.date}</span>
                <span>${x.description}</span>
                <span class="options">
                   <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                   <i onClick ="deleteTask(this); createTask()" class="fas fa-trash-alt"></i>    
                </span>
            </div>
        `);
    });
    resetForm();
};
let editTask=(e)=>{
    let selectedTask=e.parentElement.parentElement;
    console.log(selectedTask);
    textInput.value=selectedTask.children[0].innerHTML;
    dateInput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML; 
    deleteTask(e); 
}
let deleteTask=(e)=>{
//    e.parentElement.parentElement.remove();
    // console.log(e.parentElement.parentElement.id);
    // console.log(e.parentElement.parentElement);
    e.parentElement.parentElement.remove();
   data.splice(e.parentElement.parentElement.id,1);
// Now We are adding the updationg data in localStorage. If we don't add
// this data in localStorage then after deletion data in localStorage won't
// be updated.
   localStorage.setItem("data", JSON.stringify(data));
   console.log(data);
}
let resetForm =()=>{
    textInput.value="";
    dateInput.value="";
    textarea.value="";
};
(()=>{
    // We are trying to getting data from empty local storage. So data will contain
    // some garbage value Hence map won't work on this data. In order to avoid this problem
    // I will use an empty arry using OR operator. It will execute when there is 
    // no data in localStorage.
    data=JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})();