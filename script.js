// operazioni da fare ad avvio pagina

// recupero gli elementi di interesse dalla pagina
const button = document.getElementById('__button__addActivity');
const resetButton = document.getElementById('__button__reset');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');
const addTodoForm = document.querySelector('form');
const addTodoInput = document.querySelector('input');


//crea key di local storage
const storageKey = '__bool_todo__';

// preparo una lista di attività
let activities = [];
//controllo se per caso c'erano delle attività nel local storage
const storageLocal = localStorage.getItem(storageKey);
if (storageLocal) {
    activities = JSON.parse(storageLocal);
};
 

// cosa mostrare
showContent();

//operazioni dinamiche
//reagisco al click del bottone
button.addEventListener('click', function(){
    //chiedo di aggiungere l'attività
    addActivity();
});

resetButton.addEventListener('click', function(){
    if (confirm("Sei sicuro di voler riavviare la To-do list?")) {
        reset()
    }
});

// funzione che decide cosa mostrate in pagina
function showContent() {
    // clear list
    todoList.innerHTML = '';
    emptyListMessage.innerHTML = '';
    newBlock();
}

function makeCheckClickable() {
    //cerca i check e fa' si che siano cliccabili
    const checks = document.querySelectorAll('.todo-check');
    checks.forEach(function (check, index) {
        check.addEventListener('click', function () {
            activities.splice(index, 1)
            localStorage.setItem(storageKey, JSON.stringify(activities));
            //refresh
            showContent();
        })
    });
}

function addActivity() {
     // recupero testo nel input
     const newActivity = inputField.value.trim();
            
     if (newActivity.length > 0) {
        activities.push(newActivity);
        //aggiorna lo storage
        localStorage.setItem(storageKey, JSON.stringify(activities));
        // svuotare il campo
        inputField.value = '';
        // mostra nuova attività
        showContent();
     }
    
}

function newBlock() {
    if (activities.length > 0) {
        //inserisci in pagina un blocco html 
        activities.forEach(function(activity){
            todoList.innerHTML += `<li class="todo-item">
            <div class="todo-check">
                <img src="./images/check.svg" alt="check icon">
            </div>
            <p class="todo-text">${activity}</p>
        </li>
        `
        });
        makeCheckClickable();
    } else {
        emptyListMessage.innerHTML = 'Sembra non ci siano più game per giocare';
    }

}

function reset() {
    activities = [];
    localStorage.clear();
    showContent();
}


// Press enter to add item to list
addTodoForm.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('submit', addTodoInput.value);
});