'use strict';
(function () {
  const list = document.querySelector('.todo-list');
  const items = list.children;
  
  console.log(list);
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
  function removingTaskOnButton() {
    for (let i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener('click', function () {
        items[i].remove();
      });
    }
  }
  removingTaskOnButton();


  var checkboxs = document.querySelectorAll('.todo-list-input');
  var tasks = document.querySelectorAll('.todo-list-item');

  console.log(items.length);
  function toggleClassCompleted() {
    for (let i = 0; i < items.length; i++) {
      for (let i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          items[i].classList.add('completed')
        } else {
          items[i].classList.remove('completed')
        }
      };
    };
  };
  Object.keys(items).forEach(function (el) {
    items[el].addEventListener('change', toggleClassCompleted);
  });

  newItemForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const taskText = newItemTitle.value;
    const task = newItemTemplate.cloneNode(true);
    const taskDescription = task.querySelector('span');
    taskDescription.textContent = taskText;
    console.log(task);
    list.appendChild(task);
    newItemTitle.value = '';
    console.log(list);
  });
})();