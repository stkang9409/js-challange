const box = document.querySelector(".box"),
  form = box.querySelector(".js-form"),
  input = form.querySelector(".js-input"),
  pendingList = box.querySelector(".js-pending_list"),
  finishList = box.querySelector(".js-finished_list");

let pendings = [],
  finishes = [];

const PENDING_LS = "pendings",
  FINISH_LS = "finishes";

function savePending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function saveFinish() {
  localStorage.setItem(FINISH_LS, JSON.stringify(finishes));
}

function paintPending(value) {
  const li = document.createElement("li");
  const delButton = document.createElement("delButton");
  const finishButton = document.createElement("finishButton");
  const span = document.createElement("span");
  const newId = pendings.length + 1;

  span.innerText = value;
  delButton.innerText = "❌";
  finishButton.innerText = "✔";
  li.id = newId;

  delButton.addEventListener("click", deleteBtnController);
  finishButton.addEventListener("click", finishBtnController);
  li.appendChild(span);
  li.appendChild(delButton);
  li.appendChild(finishButton);
  pendingList.appendChild(li);

  const pendingObj = {
    value: value,
    id: newId,
  };

  pendings.push(pendingObj);
  savePending();
}

function deleteBtnController(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let i = 1;

  if (li.parentNode === pendingList) {
    const cleanPendings = pendings.filter(function (item) {
      return parseInt(li.id) !== item.id;
    });
    pendings = cleanPendings;
    savePending();
  } else {
    const cleanFinishes = finishes.filter(function (item) {
      return parseInt(li.id) !== item.id;
    });
    finishes = cleanFinishes;
    saveFinish();
  }
  li.parentNode.removeChild(li);
}

function backBtnController(event) {
  const btn = event.target;
  const value = btn.parentNode.childNodes[0].innerText;
  paintPending(value);
  deleteBtnController(event);
}

function paintFinsh(value) {
  const li = document.createElement("li");
  const delButton = document.createElement("delButton");
  const backButton = document.createElement("finishButton");
  const span = document.createElement("span");
  const id = finishes.length + 1;
  const finishObj = {
    value,
    id,
  };

  span.innerText = value;
  delButton.innerText = "👍";
  backButton.innerText = "❌";
  li.id = id;

  delButton.addEventListener("click", deleteBtnController);
  backButton.addEventListener("click", backBtnController);
  li.appendChild(span);
  li.appendChild(backButton);
  li.appendChild(delButton);
  finishList.appendChild(li);
  finishes.push(finishObj);
  saveFinish();
}

function finishBtnController(event) {
  const value = event.target.parentNode.childNodes[0].innerText;
  paintFinsh(value);
  deleteBtnController(event);
}

function submitHandler(event) {
  event.preventDefault();
  const value = input.value;
  paintPending(value);
  input.value = "";
}

function loadPending() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (item) {
      paintPending(item.value);
    });
  }
}

function loadFinish() {
  const loadedFinish = localStorage.getItem(FINISH_LS);
  if (loadedFinish !== null) {
    const parsedfinish = JSON.parse(loadedFinish);
    parsedfinish.forEach(function (item) {
      paintFinsh(item.value);
    });
  }
}

function init() {
  loadPending();
  loadFinish();
  form.addEventListener("submit", submitHandler);
}

init();
