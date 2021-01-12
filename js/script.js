// select taskButton
const taskButton = document.querySelector('.task-button');
// select ul
const todoList = document.querySelector('.todo-list');

// get array(object) with tasks
getData().then(response => {
    console.log(response);
    // loop trough added todo items
    response.forEach(item => {
        // call addTodoItemToDom
        addTodoItemToDom(item);
    });
});

// async function to console.log incoming todo items
const addTodoItems = async () => {
    // get value from task-input
    const addedTodoItem = document.querySelector('#task-input').value;
    // post todoItem to API
    let todoItems = await postItem({
        description: addedTodoItem,
        done: false
    });
    console.log(todoItems);

    // Did we succeed? If not, report error to user
    if (!todoItems) {
        alert('Ojee, api is stuk en/of je hebt geen internettoegang');
        return;
    }
    console.log('List item toegevoegd: ', addedTodoItem);
    addTodoItemToDom(todoItems, true);
};

// function to add todo items with checkbox and trash icon to DOM
const addTodoItemToDom = (item, newItem) => {
    // create todo list item
    const todoItem = document.createElement('li');
    // create span
    const span = document.createElement('span');
    // create img
    const img = document.createElement('img');
    // add src to icon
    img.src = 'trash.svg';
    // add alt to icon
    img.alt = 'trash icon';
    // add classname to icon
    img.className = 'icon';
    // add span to todo item
    todoItem.appendChild(span);
    // add task(text) to todoItem
    span.appendChild(document.createTextNode(item.description));
    // set attribute for todoItem (each item has a unique id)
    todoItem.setAttribute('id', item._id);
    // add img to todo item
    todoItem.appendChild(img);
    // add click handler to icon (img)
    img.addEventListener(`click`, async () => {
        if (window.confirm('Weet je zeker dat je dit todo item wilt verwijderen?')) {
            // delete item to API
            await deleteSingleItem(item._id);
            // remove todo item
            todoItem.remove();
            console.log('todoItem is deleted');
        }
    });
    // create input for checkBox
    const checkBox = document.createElement('input');
    // set type for checkBox
    checkBox.type = 'checkbox';
    // add classname for checkbox
    checkBox.classList.add('checkbox');
    // set checkbox (see) status in DOM  !!=garantie dat het een boolean is
    checkBox.checked = !!item.done;
    if (checkBox.checked === true) {
        todoItem.classList.add(`line-through`);
    }
    // add click handler to checkbox
    checkBox.addEventListener(`click`, async () => {
        // toggle classList line-trough
        todoItem.classList.toggle(`line-through`);
        // to be sure that output checkBox is boolean
        item.done = checkBox.checked === true;
        // put (update) item to API
        await putSingleItem(item._id, item.description, item.done);
    });
    // add checkbox to todoItem
    todoItem.appendChild(checkBox);
    // add todoItem to list(ul) always on top
    if (newItem) {
        todoList.prepend(todoItem);
    }
    else {
        // add todoItem to list(ul) 
        todoList.appendChild(todoItem);
    }
};

// add click handler to 'add task' button
taskButton
    .addEventListener('click', () => {
        console.log('click event happened');
        addTodoItems();
    });