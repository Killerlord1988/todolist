'use strict';
(function () {
  const list = document.querySelector('.todo-list');
  const items = list.children;
  const emptyListMessage = document.querySelector('.empty-tasks');
  const newItemForm = document.querySelector('.add-form');
  const newItemTitle = newItemForm.querySelector('.add-form-input');
  const taskTemplate = document.querySelector('#task-template').content;
  const newItemTemplate = taskTemplate.querySelector('.todo-list-item');
  let checkboxs = document.querySelectorAll('.todo-list-input');

  function updateCheckboxsCollection() {
    checkboxs = document.querySelectorAll('.todo-list-input');
    console.log(checkboxs);
  }

  function toggleEmptyMessage() {
    if (items.length === 0) {
      emptyListMessage.classList.remove('hidden');
    } else {
      emptyListMessage.classList.add('hidden');
    }
  };

  function removingTaskOnButton(item) {
    const removeButton = item.querySelector('.todo-list-remove');
    removeButton.addEventListener('click', function () {
      item.remove();
      toggleEmptyMessage();
      updateCheckboxsCollection();
    });
  }

  Object.keys(items).forEach(function (el) {
    removingTaskOnButton(items[el]);
  });
  
  function toggleClassCompleted() {
    Object.keys(checkboxs).forEach(function (el) {
        if (checkboxs[el].checked) {
          items[el].classList.add('completed')
        } else {
          items[el].classList.remove('completed')
        }
    });
  };

  list.addEventListener('change', function(evt) {
    if (evt.target.className != items) toggleClassCompleted();
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
  });
})();