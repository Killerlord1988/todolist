'use strict';
(function () {
  var list = document.querySelector('.todo-list');
  var items = list.children;

  console.log(list);
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

  function removingTaskOnButton(item) {
    var removeButton = item.querySelector('.todo-list-remove');
    removeButton.addEventListener('click', function () {
      item.remove();
      toggleEmptyMessage();
    });
  }
  for (let i = 0; i < items.length; i++) {
    removingTaskOnButton(items[i]);
  }

  var checkboxs = document.querySelectorAll('.todo-list-input');

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
    list.appendChild(task);
    console.log(list);
    newItemTitle.value = '';
    removingTaskOnButton(task);
    toggleEmptyMessage();
  });
})();