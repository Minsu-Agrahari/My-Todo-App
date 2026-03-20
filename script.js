const inputTask_ref = document.getElementById("inputTask"); // Input field for entering a new task
const addBtn_Ref = document.getElementById("addBtnRef");    // 'Add' button to add a new task
const listBody = document.getElementById("parentListRef");  // The <ol> element that holds all tasks
const totalTaskCount = document.getElementById("totalTask"); // Span to display total number of tasks

let totalTask = 0; // Keeps track of the total number of tasks

// Function to add a new task to the list
function addTask(){

    // Get the value from the input, and trim whitespace
    // Why: Prevents empty or whitespace-only tasks from being added
    const value = inputTask_ref.value.trim();
    if(!value) return;

    // Create a new <li> element for the task
    const newTask = document.createElement("li");

    // [style] Set up horizontal layout for the task and its controls
    newTask.style.display = "flex";
    newTask.style.alignItems = "center";
    newTask.style.gap = "1rem";

    // Create a <span> to hold the task text
    const taskSpan = document.createElement("span");
    taskSpan.innerText = value;

    taskSpan.style.flex = "1"; // Makes the text take up available space

    // Add double-click event to enable editing the task
    taskSpan.addEventListener('dblclick', function(e) {
        e.stopPropagation(); // Prevents event from bubbling up
        enableEdit(taskSpan, newTask); // Switch to edit mode
    });

    // Create a Delete button for the task
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";

    // When clicked, remove the task from the list and update the counter
    delBtn.addEventListener("click", ()=>{
        if(totalTask > 0){
            totalTask--;
        }
        updateTotal();

        // [style] Add animation class for removal effect
        newTask.classList.add("removing");

        setTimeout(() => {
            newTask.remove();
        }, 300); // Wait for animation before removing
    });

    // Add the text and delete button to the task <li>
    newTask.appendChild(taskSpan);
    newTask.appendChild(delBtn);

    // Add the new task to the list in the DOM
    listBody.appendChild(newTask);

    // Increment the total task count and update the display
    totalTask ++;
    updateTotal();

    // Clear the input field for the next task
    inputTask_ref.value = "";
}

// Function to update the total task counter in the UI
function updateTotal(){
    totalTaskCount.innerText = totalTask;
}

// Function to enable editing of a task :- Replaces the task's <span> with an <input> for editing
function enableEdit(taskSpan, liElement){
    const oldValue = taskSpan.innerText; // Store current task text

    const input = document.createElement("input"); // Create input for editing
    input.type = "text";
    input.value = oldValue;
    input.className = "edit-input";
    input.style.flex = "1"; // Keep horizontal layout
    
    liElement.classList.add("editing");
    
    taskSpan.replaceWith(input);
    input.focus();

    // Function to save the edited task
    function save(){
        // Get new value, default to 'Empty Task' if blank
        const newValue = input.value.trim() || "Empty Task";
        
        // Create a new <span> for the updated text
        const newSpan = document.createElement("span");
        newSpan.innerText = newValue;
        newSpan.style.flex = "1";
        
        // Re-attach double-click event for future edits
        newSpan.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            enableEdit(newSpan, liElement);
        });
        
        // Replace input with updated text
        input.replaceWith(newSpan);
        liElement.classList.remove("editing");
    }

    // Save the edit when Enter is pressed
    input.addEventListener('keyup', (e) => {
        if(e.key === "Enter"){
            save();
        }
    });
    // Also save if input loses focus
    input.addEventListener('blur', save);
}

// Add button click event: triggers addTask()
addBtn_Ref.addEventListener('click', addTask);

// Enter key in input field: triggers addTask()
inputTask_ref.addEventListener('keyup', (e) => {
    if(e.key === "Enter"){
        addTask();
    }
});


