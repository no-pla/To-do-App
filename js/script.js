const todoList = document.querySelector(".todo-list");
const $input = document.querySelector(".modal input");
const modal = document.querySelector(".open-modal > button");
const $modal = document.querySelector(".modal");

// 투두 관련 (추가/삭제/수정)
// 삭제
function deleteTodo() {}

// 수정
function editTodo() {}

// 추가
$modal.addEventListener("submit", addTodo);

function addTodo(event) {
  event.preventDefault();

  if ($input.value !== "") {
    makeTodo();
    $input.value = "";
    $modal.classList.add("hidden");
    $modal.classList.remove("set-modal");
  }
}

// 투두 기본 세팅
function makeTodo() {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const btn = document.createElement("button");

  input.setAttribute("type", "checkbox");
  todoList.appendChild(li);
  li.append(input);
  input.id = Date.now();
  li.append(label);
  label.setAttribute("for", Date.now());
  label.innerText = $input.value;
  li.append(btn);
  btn.innerText = "✏️";
  btn.id = "edit";

  // 삭제
}

// 일정 관련 (진행 중인 일, 완료한 일 따로 보는 기능 / 완료한 일정 맨 아래로 내리기)
// 모달 관련
function openModal() {
  $modal.classList.remove("hidden");
  $modal.classList.add("set-modal");
  $input.focus();
}

modal.addEventListener("click", openModal);

const cancel = document.querySelector(".cancel");

function closeModal() {
  $input.value = "";
  $modal.classList.add("hidden");
  $modal.classList.remove("set-modal");
}

cancel.addEventListener("click", closeModal);
