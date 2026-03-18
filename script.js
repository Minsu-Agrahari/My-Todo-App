

const taskRef = document.getElementById("inputTask");
const addBtnRef = document.getElementById("addBtnRef");

const listBody = document.getElementById("parentListRef");
const totalTaskCount = document.getElementById("totalTask");

let totalTask = 0;

addBtnRef.addEventListener('click', ()=>{

    // Task creation & append
    const newTask = document.createElement("li");
    newTask.innerText = taskRef.value;
    listBody.appendChild(newTask);

    // totalTask-Count increased
    totalTask ++;

    // created & add delete-btn -- dec.totalTask-Count
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    newTask.append(delBtn);

    delBtn.addEventListener("click", ()=>{
        newTask.remove();
        totalTask--; 
    });

    taskRef.value = "";
});

