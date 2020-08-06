'use strict';
(function () {
  const list = document.querySelector('.todo-list');
  const items = list.children;
  const emptyListMessage = document.querySelector('.empty-tasks');
  const newItemForm = document.querySelector('.add-form');
  const newItemTitle = newItemForm.querySelector('.add-form-input');
  const taskTemplate = document.querySelector('#task-template').content;
  const newItemTemplate = taskTemplate.querySelector('.todo-list-item');

  function toggleEmptyMessage() {
    if (items.length === 0) {
      emptyListMessage.classList.remove('hidden');
    } else {
      emptyListMessage.classList.add('hidden');
    }
  };

  function toggleClassCompleted() {
    let tasks = document.querySelectorAll('.todo-list-item');
    for (let task of tasks) {
      if (task.classList.contains('completed')) {
        task.classList.remove('completed');
      } else {
        task.classList.add('completed')
      }
    }
    // task.classList.toggle('completed')
  }

  function addCheckHandler(item) {
    var checkbox = item.querySelector('.todo-list-input');
    checkbox.addEventListener('change', function () {
      toggleEmptyMessage();
      toggleClassCompleted();
    });
  };

  for (let item of items) {
    addCheckHandler(item);
  }

  newItemForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const taskText = newItemTitle.value;
    const task = newItemTemplate.cloneNode(true);
    const taskDescription = task.querySelector('span');
    taskDescription.textContent = taskText;
    addCheckHandler(task);
    list.appendChild(task);
    toggleEmptyMessage();
    newItemTitle.value = '';
  });
})();
