//=========================================
// TASKFLOW - SCRIPT.JS
// PARTE 1
//=========================================

//---------- ELEMENTOS ----------

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

//---------- DATOS ----------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//=========================================
// GUARDAR
//=========================================

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

//=========================================
// ESTADÍSTICAS
//=========================================

function updateStats(){

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent =
        tasks.length - completed;

}

//=========================================
// AGREGAR
//=========================================

function addNewTask(){

    const title = taskInput.value.trim();

    if(title===""){

        alert("Escribe una tarea.");

        return;

    }

    const task = {

        id: Date.now(),

        title:title,

        priority:priority.value,

        category:category.value,

        completed:false,

        created:new Date().toLocaleDateString()

    };

    tasks.unshift(task);

    saveTasks();

    renderTasks();

    taskInput.value="";

}

//=========================================
// MOSTRAR
//=========================================

function renderTasks(){

    taskList.innerHTML="";

    const text = search.value.toLowerCase();

    const filtered = tasks.filter(task=>{

        return task.title
        .toLowerCase()
        .includes(text);

    });

    filtered.forEach(task=>{

        const li=document.createElement("li");

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML=`

<div class="taskInfo">

<div class="taskTitle">

${task.title}

</div>

<div class="taskCategory">

${task.category}

</div>

<div class="taskPriority">

${task.priority}

</div>

</div>

<div class="actions">

<button
class="completeBtn"
onclick="toggleTask(${task.id})">

✔

</button>

<button
class="deleteBtn"
onclick="deleteTask(${task.id})">

🗑

</button>

</div>

`;

        taskList.appendChild(li);

    });

    updateStats();

}

//=========================================
// EVENTOS
//=========================================

addTask.addEventListener(
"click",
addNewTask
);

search.addEventListener(
"input",
renderTasks
);

//=========================================
// CARGAR
//=========================================

renderTasks();

//=========================================
// COMPLETAR TAREA
//=========================================

function toggleTask(id){

    tasks = tasks.map(task=>{

        if(task.id===id){

            task.completed=!task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

}

//=========================================
// ELIMINAR TAREA
//=========================================

function deleteTask(id){

    if(!confirm("¿Eliminar esta tarea?")) return;

    tasks = tasks.filter(task=>task.id!==id);

    saveTasks();

    renderTasks();

}

//=========================================
// EDITAR TAREA
//=========================================

function editTask(id){

    const task = tasks.find(t=>t.id===id);

    if(!task) return;

    const nuevo = prompt(
        "Editar tarea:",
        task.title
    );

    if(nuevo===null) return;

    if(nuevo.trim()==="") return;

    task.title=nuevo.trim();

    saveTasks();

    renderTasks();

}

//=========================================
// ENTER PARA AGREGAR
//=========================================

taskInput.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        addNewTask();

    }

});

//=========================================
// DOBLE CLICK PARA EDITAR
//=========================================

document.addEventListener("dblclick",e=>{

    const item=e.target.closest("li");

    if(!item) return;

    const titulo=item.querySelector(".taskTitle");

    if(!titulo) return;

    const texto=titulo.textContent;

    const tarea=tasks.find(t=>t.title===texto);

    if(tarea){

        editTask(tarea.id);

    }

});

//=========================================
// ORDENAR POR PRIORIDAD
//=========================================

function sortPriority(){

    const orden={

        "Alta":1,

        "Media":2,

        "Baja":3

    };

    tasks.sort((a,b)=>{

        return orden[a.priority]-orden[b.priority];

    });

    saveTasks();

    renderTasks();

}

//=========================================
// ORDENAR AL C
