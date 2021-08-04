const todoList = document.querySelector(".todo-list");
const $input = document.querySelector(".modal input");
const modal = document.querySelector(".open-modal > button");
const $modal = document.querySelector(".modal");
const todos = [];

// 투두 관련 (추가/삭제/수정)
// 삭제
function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
}

// 수정
function addEditTodo(event) {
  const text = event.target; // 버튼 클릭 위치
  const input = text.parentNode.querySelector(".change-text"); // 바뀐 텍스트
  const btn = text.parentNode.querySelector(".confirm");
  const btn1 = text.parentNode.querySelector(".edit");
  const btn2 = text.parentNode.querySelector(".delete");

  input.parentElement.innerText = input.value;

  btn.classList.add("hidden");
  btn1.classList.remove("hidden");
  btn2.classList.remove("hidden");
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

  btn.addEventListener("click", addEditTodo);
}

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
  const editBtn = document.createElement("button");
  const delBtn = editBtn.cloneNode(true);

  input.setAttribute("type", "checkbox");

  todoList.appendChild(li);
  li.append(input);
  input.id = Date.now();

  li.append(label);
  label.setAttribute("for", input.id);
  label.innerText = $input.value;

  li.append(editBtn);
  editBtn.innerText = "✏️";
  editBtn.classList.add("edit");

  li.append(delBtn);
  delBtn.innerText = "🗑️";
  delBtn.classList.add("delete");

  li.append(btn);
  btn.innerText = "확인";
  btn.classList.add("confirm", "hidden");

  todos.push(li);

  editBtn.addEventListener("click", editTodo);
  delBtn.addEventListener("click", deleteTodo);
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
