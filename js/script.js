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
  let checkboxs = document.querySelectorAll('.todo-list-input');

  function counterUpdate() {
    let totalTask = counterAllTask.textContent = items.length
    let completedTask = counterCompletedTask.textContent = toggleClassCompleted()
    counterWaitTask.textContent = totalTask - completedTask
  }

  counterUpdate()

  function updateCheckboxsCollection() {
    checkboxs = document.querySelectorAll('.todo-list-input');
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
      counterUpdate();
    });
  }

  Object.keys(items).forEach(function (el) {
    removingTaskOnButton(items[el]);
  });
  
  
  function toggleClassCompleted() {
    let countCompleted = 0
    Object.keys(checkboxs).forEach(function (el) {
        if (checkboxs[el].checked) {
          items[el].classList.add('completed')
          countCompleted++
        } else {
          items[el].classList.remove('completed')
        }
      });
      return countCompleted
    };

  toggleClassCompleted()

  list.addEventListener('change', function(evt) {
    if (evt.target.className != items) toggleClassCompleted();
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
  });
})();