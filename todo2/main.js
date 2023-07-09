const bntNewTodo = document.getElementById('button_new_todo');
const input = document.querySelector('#input');
const todosContainer = document.querySelector('#todosContainer');
const delnet = document.querySelector('.delnet');
arrTodos = [];


// функции

// функция удаления дела из массива 
const deleteTofoInArray = (text) => {
    for (let i = 0; i < arrTodos.length; i++) {
        if (arrTodos[i].name === text) {
            arrTodos.splice(i, 1);
            break;
        }
    }
}

// удаление дела из html и вызов функции deleteTofoInArray
const deleteTodo = (event) => {
    // проверяем что клик был по удалить задачу 
    if (event.target.className === 'delete') {
        // ищем родителя 
        const parent = event.target.closest('.todo');
        //получаем текст дела
        const textTodo = parent.childNodes[1].textContent;
        //удаляем верстку 
        parent.remove();
        // удаляем из массива 
        deleteTofoInArray(textTodo);

        // если дел 0 добавляем надпись дел нет 
        if (arrTodos.length === 0) {
            delnet.classList.remove('none');
        }
    }
}

// показать одно дело 
const showTodo = (taskText) => {
    //разметка нового дела
    const newTodoHTML = `<div class="todo">
<span class="task_title">${taskText}</span>
<div class="todo_buttons">
    <button type="button_done" class="done" data-action="done">
        <img src="./icons8-галочка-50.png" alt="" srcset="">
    </button>
    <button type="button_delete" class="delete" data-action="delete">
        <img src="./icons8-мусор-24.png" alt="" srcset="">
    </button>
</div>
</div>`


    todosContainer.insertAdjacentHTML('afterbegin', newTodoHTML);
}

// конструктор обьектов дела
function TodoConstructor(todoname) {
    this.name = todoname;
    this.done = false;
}

const takogoDelaNet = (text)=>{
    
    for (let item of arrTodos){
        if (item.name === text){
            return false ;
        } 
    }
    return true ;
}


const bntNewTodoClick = () => {
    let inputText = input.value; // отрисовываем новое дело в html
    
    // проверяем что инпут не пустой и такого дела нет 
    if (inputText != '' && takogoDelaNet(inputText)) {

        // Todo это обьект дела 
        const Todo = new TodoConstructor(inputText);

        // подсказка новая задача в инпут 
        input.placeholder = 'новая задача';

        // отрисовываем дело
        showTodo(Todo.name);

        //пихаем в массив дел
        arrTodos.push(Todo);
        // очистим поле инпута
        input.value = '';
        // убираем надпись дел нет 
        if (arrTodos.length >= 1) {
            delnet.classList.add('none');
        }
    } else if (inputText === '') {
        input.placeholder = 'вы ничего не ввели!';
    }else if (takogoDelaNet(inputText) === false){
        input.value = '';
        input.placeholder = 'такое дело уже есть!';
    }
}


const todoIsDoneTogle = (todoText) => {
    for (let i = 0; i < arrTodos.length; i++) {
        if (arrTodos[i].name === todoText) {
            if (arrTodos[i].done === true) {
                arrTodos[i].done = false;
            } else {
                arrTodos[i].done = true;
            }
            return;
        }
    }
}


// возращает булевое значение
const isDone = (text) => {
    for (let i = 0; i < arrTodos.length; i++) {
        if (arrTodos[i].name === text) {
            return arrTodos[i].done;
        }
    }
}

// отрисовывает сделанное дело 
const showTodoDone = (taskText) => {
    //разметка нового дела
    const newTodoHTML = `<div class="todo todoIsDone">
<span class="task_title">${taskText}</span>
<div class="todo_buttons">
    <button type="button_done" class="done" data-action="done">
        <img src="./icons8-галочка-50.png" alt="" srcset="">
    </button>
    <button type="button_delete" class="delete" data-action="delete">
        <img src="./icons8-мусор-24.png" alt="" srcset="">
    </button>
</div>
</div>`


    todosContainer.insertAdjacentHTML('beforeend', newTodoHTML);
}

// отрисовывает все дела заново
const showTodos = () => {
    todosContainer.innerHTML = ''; // очищаем полностью 

    for (let item of arrTodos) {
        if (item.done === false) {
            showTodo(item.name);
        } else {
            // иначе рисуем со стилями 
            showTodoDone(item.name);
        }
    }

}


const sortarr = () => {
    for (let i = 0; i <= arrTodos.length - 2; i++) {
        if (arrTodos[i].done === true && arrTodos[i + 1].done === false) {
            let prom = arrTodos[i + 1];
            arrTodos[i + 1] = arrTodos[i];
            arrTodos[i] = prom;
        }
    }
}


const togleDone = (event) => {
    // если нажата кнопка done

    if (event.target.className === 'done') {
        const parent = event.target.parentNode.parentNode; // получаем родителя
        const todoText = parent.childNodes[1].textContent; // получаем текст дела 
        const checkDone = isDone(todoText); // записываем значение done данного дела в переменную checkDone 

        // если дело не выполнено 
        if (checkDone === false) {
            //добавляем стили 
            parent.classList.add('todoIsDone');
            // меняем на тру
            todoIsDoneTogle(todoText)
            sortarr();
            // //рисуем все заново 
            showTodos();

        } else {
            //добавляем стили 
            parent.classList.remove('todoIsDone');
            // меняем на фолз
            todoIsDoneTogle(todoText)

            sortarr();//сортируем
            showTodos();//рисуем все заново 
        }


    }
}



//обработчики кликов
todosContainer.addEventListener('click', deleteTodo);
todosContainer.addEventListener('click', togleDone);
bntNewTodo.onclick = bntNewTodoClick;



input.addEventListener('click', () => {
    console.log(arrTodos)
})