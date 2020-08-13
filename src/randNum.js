const rangeForm = document.querySelector(".js-range_form"),
  rangeInput = rangeForm.querySelector("input"),
  description = document.querySelector(".description"),
  result = document.querySelector(".result"),
  span = result.querySelector(".span"),
  winOrNot = result.querySelector(".isWin");

const guessingBox = document.querySelector(".guessing_box"),
  guessingForm = guessingBox.querySelector(".guessing_form"),
  guessingButton = guessingBox.querySelector("button");

function genRandInt() {
  const range = rangeInput.value;
  return Math.floor(Math.random() * range);
}

function paintRangeValue() {
  let value = rangeInput.value;
  description.innerText = `Generate a number between 0 and ${value}`;
}

function paintAnswer(i, j) {
  result.style.display = "flex";
  span.innerText = `You chose: ${i}, the machine Chose: ${j}`;
  if (i === String(j)) {
    winOrNot.innerText = "You win!";
  } else {
    winOrNot.innerText = "You lose!";
  }
  console.log(i);
  console.log(j);
}

function clickHandler(event) {
  const button = event.target;
  const value = button.parentNode.childNodes[3].childNodes[1].value;
  const randNum = genRandInt();
  if (value === String(parseInt(value))) {
    paintAnswer(value, randNum);
  } else {
    alert("정수를 입력하세요");
  }
}

function init() {
  rangeInput.addEventListener("input", paintRangeValue);
  guessingButton.addEventListener("click", clickHandler);
}

init();
