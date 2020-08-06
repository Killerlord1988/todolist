'use strict';
(function () {
  const list = document.querySelector('.todo-list');
  const items = list.children;
  const emptyListMessage = document.querySelector('.empty-tasks');
  const newItemForm = document.querySelector('.add-form');
  const newItemTitle = newItemForm.querySelector('.add-form-input');
  const taskTemplate = document.querySelector('#task-template').content;
  const newItemTemplate = taskTemplate.querySelector('.todo-list-item');
  const removeButton = document.querySelector('.todo-list-remove');
  let isActive = false;

  function toggleEmptyMessage() {
    if (items.length === 0) {
      emptyListMessage.classList.remove('hidden');
    } else {
      emptyListMessage.classList.add('hidden');
    }
  };

  var removeButtons = document.querySelectorAll('.todo-list-remove');
  console.log(removeButtons);
  function removeCheckHandler() {
    for (let i = 0; i < removeButtons.length; i++) {
      tasks[i].remove(tasks[i]);
    }
  }

  Object.keys(removeButtons).forEach(function (el) {
    removeButtons[el].addEventListener('click', removeCheckHandler);
  });

  var checkboxs = document.querySelectorAll('.todo-list-input');
  var tasks = document.querySelectorAll('.todo-list-item');

  function toggleClassCompleted() {
    for (let i = 0; i < tasks.length; i++) {
      for (let i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          tasks[i].classList.add('completed')
        } else {
          tasks[i].classList.remove('completed')
        }
      };
    };
  };
  
  Object.keys(tasks).forEach(function (el) {
    tasks[el].addEventListener('change', toggleClassCompleted);
  });

  newItemForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const taskText = newItemTitle.value;
    const task = newItemTemplate.cloneNode(true);
    const taskDescription = task.querySelector('span');
    taskDescription.textContent = taskText;
    // addCheckHandler(task);
    list.appendChild(task);
    newItemTitle.value = '';
  });
})();