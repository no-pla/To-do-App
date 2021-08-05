const todoList = document.querySelector(".todo-list");
const $input = document.querySelector(".modal input");
const modal = document.querySelector(".open-modal > button");
const $modal = document.querySelector(".modal");
const container = document.querySelector(".modal-container");

const $all = document.querySelector(".see-all");
const $continue = document.querySelector(".see-continue");
const $done = document.querySelector(".see-done");

const todos = [];

// 삭제
function deleteTodo(event) {
  const li = event.target.parentElement;

  li.classList.add("del");
  let location = todos.indexOf("del");

  todos.splice(location, 1);
  li.remove();
}

// 수정
function addEditTodo(event) {
  const text = event.target; // 버튼 클릭 위치
  const input = text.parentNode.querySelector(".change-text"); // 바뀐 텍스트
  const btn = text.parentNode.querySelector(".confirm");
  const btn1 = text.parentNode.querySelector(".edit");

  input.parentElement.innerText = input.value;

  btn.classList.add("hidden");
  btn1.classList.remove("hidden");
}

function editTodo(event) {
  const text = event.target; // 버튼 클릭 위치
  const btn = text.parentNode.querySelector(".confirm");
  const btn1 = text.parentNode.querySelector(".edit");
  const btn2 = text.parentNode.querySelector(".delete");

  btn.classList.remove("hidden");
  btn1.classList.add("hidden");
  btn2.classList.add("hidden");

  let targetLocation = text.previousSibling; // 이전 텍스트 값
  let targetText = targetLocation.innerText; // 텍스트 값 가져오기

  targetLocation.innerHTML = `<input type="text" class="change-text" value="${targetText}" />`;

  let input = text.parentNode.querySelector("input[type='text']");
  input.focus();

  let val = input.value;
  input.value = "";
  input.value = val;
  btn.addEventListener("click", addEditTodo);
}

// 추가
$modal.addEventListener("submit", addTodo);

function addTodo(event) {
  event.preventDefault();

  if ($input.value !== "") {
    makeTodo();
    $input.value = "";
    $modal.classList.replace("set-modal", "hidden");
    container.style.display = "none";
  }
}

function printTodo(elem) {
  for (let i = 0; i < todos.length; i++) {
    todoList.appendChild(elem);
  }
}

// 투두 기본 세팅
function makeTodo() {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const btn = document.createElement("button");
  const editBtn = document.createElement("button");
  const delBtn = editBtn.cloneNode(true);

  input.setAttribute("type", "checkbox");

  li.append(input);
  input.id = Date.now();

  li.append(label);
  label.setAttribute("for", input.id);
  label.innerText = $input.value;
  li.classList.add("continue");

  li.append(editBtn);
  editBtn.innerText = "✏️";
  editBtn.classList.add("edit");

  li.append(delBtn);
  delBtn.innerText = "🗑️";
  delBtn.classList.add("delete", "hidden");

  li.append(btn);
  btn.innerText = "확인";
  btn.classList.add("confirm", "hidden");

  todos.push(li);
  printTodo(li);

  editBtn.addEventListener("click", editTodo);
  delBtn.addEventListener("click", deleteTodo);
  input.addEventListener("change", controlFinishTodo);
}

function controlFinishTodo(event) {
  const editBtn = event.target.parentElement.querySelector(".edit");
  const delBtn = event.target.parentElement.querySelector(".delete");
  const list = event.target.parentElement;
  const text = list.querySelector("label");

  if (!list.classList.contains("done")) {
    list.classList.replace("continue", "done");
    text.classList.add("finish");
    editBtn.classList.add("hidden");
    delBtn.classList.remove("hidden");
  } else {
    list.classList.replace("done", "continue");
    editBtn.classList.remove("hidden");
    delBtn.classList.add("hidden");
    text.classList.remove("finish");
  }
  // 완료한 일 맨 아래로 내리기
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].className === "done") {
      printTodo(todos[i]);
    }
  }
}

// 진행 중인 일/ 완료한 일

// 모달 관련
function openModal() {
  $modal.classList.replace("hidden", "set-modal");
  container.style.display = "block";
  $input.focus();
}

modal.addEventListener("click", openModal);

const cancel = document.querySelector(".cancel");

function closeModal() {
  $input.value = "";
  $modal.classList.replace("set-modal", "hidden");
  container.style.display = "none";
}

cancel.addEventListener("click", closeModal);
