//==========================
// ELEMENTOS
//==========================

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//==========================
// GUARDAR
//==========================

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

//==========================
// CREAR TAREA
//==========================

function createTask(){

    if(taskInput.value.trim()==="") return;

    const task ={

        id:Date.now(),

        title:taskInput.value,

        priority:priority.value,

        category:category.value,

        completed:false

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value="";

}

//==========================
// MOSTRAR
//==========================

function renderTasks(){

    taskList.innerHTML="";

    tasks.forEach(task=>{

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

Prioridad: ${task.priority}

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

}

//==========================
// EVENTO
//==========================

addTask.addEventListener(

"click",

createTask

);

//==========================
// CARGAR
//==========================

renderTasks();

//==========================
// COMPLETAR TAREA
//==========================

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

    updateStats();

}

//==========================
// ELIMINAR TAREA
//==========================

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

    updateStats();

}

//==========================
// ESTADÍSTICAS
//==========================

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");

function updateStats(){

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;

}

//==========================
// ACTUALIZAR AL CREAR
//==========================

const oldCreateTask = createTask;

createTask = function(){

    oldCreateTask();

    updateStats();

}

//==========================
// ACTUALIZAR AL CARGAR
//==========================

updateStats();

//==========================
// BUSCADOR Y FILTROS
//==========================

const search = document.getElementById("search");

// Crear filtros dinámicamente
const filterContainer = document.createElement("div");

filterContainer.innerHTML = `

<select id="filterCategory">

<option value="Todas">Todas las categorías</option>

<option value="Personal">Personal</option>

<option value="Trabajo">Trabajo</option>

<option value="Estudio">Estudio</option>

<option value="Trading">Trading</option>

<option value="Contenido">Contenido</option>

</select>

<select id="filterPriority">

<option value="Todas">Todas las prioridades</option>

<option value="Alta">Alta</option>

<option value="Media">Media</option>

<option value="Baja">Baja</option>

</select>

<select id="filterStatus">

<option value="Todas">Todas</option>

<option value="Pendientes">Pendientes</option>

<option value="Completadas">Completadas</option>

</select>

`;

search.parentElement.appendChild(filterContainer);

const filterCategory =
document.getElementById("filterCategory");

const filterPriority =
document.getElementById("filterPriority");

const filterStatus =
document.getElementById("filterStatus");

//==========================
// RENDER CON FILTROS
//==========================

function renderTasks(){

    taskList.innerHTML="";

    let filtered = [...tasks];

    // Buscar

    filtered = filtered.filter(task =>
        task.title.toLowerCase()
        .includes(search.value.toLowerCase())
    );

    // Categoría

    if(filterCategory.value!="Todas"){

        filtered = filtered.filter(task=>

            task.category===filterCategory.value

        );

    }

    // Prioridad

    if(filterPriority.value!="Todas"){

        filtered = filtered.filter(task=>

            task.priority===filterPriority.value

        );

    }

    // Estado

    if(filterStatus.value=="Pendientes"){

        filtered = filtered.filter(task=>

            !task.completed

        );

    }

    if(filterStatus.value=="Completadas"){

        filtered = filtered.filter(task=>

            task.completed

        );

    }

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

Prioridad: ${task.priority}

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

}

//==========================
// EVENTOS
//==========================

search.addEventListener("input",renderTasks);

filterCategory.addEventListener("change",renderTasks);

filterPriority.addEventListener("change",renderTasks);

filterStatus.addEventListener("change",renderTasks);
