'use strict';
(function () {
  const list = document.querySelector('.todo-list');
  const items = list.children;
  const emptyListMessage = document.querySelector('.empty-tasks');
  const newItemForm = document.querySelector('.add-form');
  const newItemTitle = newItemForm.querySelector('.add-form-input');
  const taskTemplate = document.querySelector('#task-template').content;
  const newItemTemplate = taskTemplate.querySelector('.todo-list-item');
  const counter = document.querySelector('.counter');
  const counterAllTask = counter.querySelector('.counter-all span');
  const counterCompletedTask = counter.querySelector('.counter-completed span');
  const counterWaitTask = counter.querySelector('.counter-wait span');
  const raw = localStorage.getItem('tasks')
  const taskJsonArr = JSON.parse(raw)
  let tasksArr = taskJsonArr



  if (localStorage.getItem("tasks") === null) {
    tasksArr = []
  }

  function createTask(id, taskText) {
    const taskObj = {
      id: id,
      taskText: taskText,
      isComplited: false
    }
    return taskObj
  }

  function taskAddArr(object) {
    tasksArr.push(object)
  }

  function renderTask() {
    if (localStorage.getItem("tasks") !== null) {
      Object.keys(taskJsonArr).forEach(el => {
        const task = newItemTemplate.cloneNode(true)
        const taskDescription = task.querySelector('span')
        const checkbox = task.querySelector('.todo-list-input')
        if (taskJsonArr[el].isComplited) {
          checkbox.checked = true
        }
        taskDescription.textContent = taskJsonArr[el].taskText;
        task.setAttribute('id', taskJsonArr[el].id)
        list.appendChild(task)
      })
    }
  }
  renderTask()

  let checkboxs = document.querySelectorAll('.todo-list-input');

  function counterUpdate() {
    let totalTask = counterAllTask.textContent = items.length
    let completedTask = counterCompletedTask.textContent = toggleClassCompleted()
    counterWaitTask.textContent = totalTask - completedTask
  }
  counterUpdate()

  function updateCheckboxsCollection() {
    checkboxs = document.querySelectorAll('.todo-list-input');
    // writeLocalStorage()

  }

  function writeLocalStorage() {
    // const textTaskList = document.querySelectorAll('.todo-list-item span')
    // let taskCollection = []
    localStorage.setItem('tasks', JSON.stringify(tasksArr))
    // return taskCollection
  }



  function toggleEmptyMessage() {
    if (items.length === 0) {
      emptyListMessage.classList.remove('hidden');
    } else {
      emptyListMessage.classList.add('hidden');
    }
  }
  toggleEmptyMessage()

  function removingTaskOnButton(item) {
    const removeButton = item.querySelector('.todo-list-remove')
    const taskCollection = list.querySelectorAll('.todo-list-item')
    const taskCollectionArr = Array.from(taskCollection)


    list.addEventListener('click', evt => {

      // if (el.target === removeButton) 
      // tasksArr.splice(0,1)
      // console.log(el.target)
      if (evt.target === removeButton) {
        console.log(taskCollectionArr)



        // item.remove()
        // toggleEmptyMessage()
        // updateCheckboxsCollection()
        // counterUpdate()
      }
    })
  }

  Object.keys(items).forEach(function (el) {
    removingTaskOnButton(items[el])
  })


  function toggleClassCompleted() {
    let countCompleted = 0
    Object.keys(tasksArr).forEach(function (el) {
      if (tasksArr[el].isComplited) {
        items[el].classList.add('completed')
        countCompleted++
      } else {
        items[el].classList.remove('completed')
      }
    });
    writeLocalStorage()
    return countCompleted
  };
  toggleClassCompleted()

  list.addEventListener('change', function (evt) {
    if (evt.target.className != items) toggleClassCompleted();
    Object.keys(checkboxs).forEach(function (el) {
      if (checkboxs[el].checked) {
        tasksArr[el].isComplited = true
      } else {
        tasksArr[el].isComplited = false
      }
    })
    counterUpdate()
  });

  newItemForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const taskText = newItemTitle.value;
    const task = newItemTemplate.cloneNode(true);
    const taskDescription = task.querySelector('span');
    taskDescription.textContent = taskText;
    list.appendChild(task);
    newItemTitle.value = '';
    removingTaskOnButton(task);
    toggleEmptyMessage();
    updateCheckboxsCollection();
    counterUpdate();
    const taskObj = createTask(items.length, taskText)
    taskAddArr(taskObj)
    writeLocalStorage()
  });
})();