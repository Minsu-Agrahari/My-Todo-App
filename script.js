

const taskRef = document.getElementById("inputTask");
const addBtnRef = document.getElementById("addBtnRef");
const listBody = document.getElementById("parentListRef");
const totalTaskCount = document.getElementById("totalTask");

let totalTask = 0;

function addTask(){

    // remove white space
    const value = taskRef.value.trim();
    
    // validation
    if(!value) return;

    // Task creation & append
    const newTask = document.createElement("li");
    newTask.innerText = value;

    // created & add delete-btn
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";

    delBtn.addEventListener("click", ()=>{
        totalTask--; 
        updateTotal();
        // Add removing animation class
        newTask.classList.add("removing");
        // Wait for animation to complete before removing
        setTimeout(() => {
            newTask.remove();
        }, 300);
    });

    newTask.append(delBtn);
    listBody.appendChild(newTask);

    totalTask ++;
    updateTotal();
    taskRef.value = "";
}

function updateTotal(){
    totalTaskCount.innerText = totalTask;
}
// add btn clicked
addBtnRef.addEventListener('click', addTask);

// Enter Key
taskRef.addEventListener('keyup', (e) => {
    if(e.key === "Enter"){
        addTask();
    }
});

