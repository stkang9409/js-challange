const weekForm = document.querySelector(".js-form");
const weekTitle = form.querySelector(".js-form_title");

function init() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  weekTitle.innerText = `${year}/${month}/${day}`;
}

init();
