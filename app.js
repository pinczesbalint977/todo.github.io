const btn = document.getElementById("btn");
const input = document.getElementById("input");
const result = document.getElementById("result");
const btndelet = document.getElementById("delete");
const h2 = document.getElementById("h2text");

btn.addEventListener("click", addtodo);
input.addEventListener("keyup", function(event) {
  if (event.keyCode == "13") {
    addtodo();
  }
});



document.addEventListener("DOMContentLoaded", function() {

  var savedTodos = localStorage.getItem("todos");

  if (savedTodos) {
    var todos = JSON.parse(savedTodos);

    todos.forEach(function(todo) {
      var p = createTodoElement(todo.text, todo.active, todo.checked);
      result.appendChild(p);
    });
  }
});

window.onbeforeunload = function() {
  updateLocalStorage();
};

function addtodo() {
  if (input.value != "") {
    var p = createTodoElement(input.value, false, false);
    result.appendChild(p);
    updateLocalStorage();
    input.value = "";
  }
}

function createTodoElement(text, active, checked) {
  var p = document.createElement("p");
  var checkbox = document.createElement("input");

  p.innerText = text;

  checkbox.type = "checkbox";
  checkbox.checked = checked;
  checkbox.addEventListener("change", handleCheckboxChange);

  p.appendChild(checkbox);
  p.addEventListener("click", handleTodoClick);


  if (active) {
    p.classList.add("active");
  }

  return p;
}

function handleTodoClick(event) {
  var todo = event.target;
  todo.classList.toggle("active");
  updateLocalStorage();
}

function handleCheckboxChange(event) {
  updateLocalStorage();
}

function updateLocalStorage() {
  var todos = document.querySelectorAll("#result p");
  var todoData = [];

  todos.forEach(function(todo) {
    var checkbox = todo.querySelector("input[type=checkbox]");
    var todoItem = {
      text: todo.innerText,
      active: todo.classList.contains("active"),
      checked: checkbox ? checkbox.checked : false
    };
    todoData.push(todoItem);
  });

  localStorage.setItem("todos", JSON.stringify(todoData));
}

function deleteTodo(event) {
  var todo = event.target;
  todo.remove();
  updateLocalStorage();
}

function deleteCheckedTodos() {
  var checkboxes = document.querySelectorAll("#result input[type=checkbox]:checked");

  checkboxes.forEach(function(checkbox) {
    var p = checkbox.closest("p");
    p.remove();
  });

  updateLocalStorage();
}

btndelet.addEventListener("click", deleteCheckedTodos);
