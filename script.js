//js 파일
let answer = [];
let attempts = 9;

function initGame() {
  answer = [];
  while (answer.length < 3) {
    const n = Math.floor(Math.random() * 9) + 1;
    if (!answer.includes(n)) answer.push(n);
  }
  attempts = 9;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("results").innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    const input = document.getElementById(`number${i}`);
    input.value = "";
    input.disabled = false;
  }
  document.getElementById("game-result-img").src = "";
  document.querySelector(".submit-button").disabled = false;
}

function check_numbers() {
  const nums = [
    document.getElementById("number1").value,
    document.getElementById("number2").value,
    document.getElementById("number3").value,
  ];

  if (nums.some((v) => v === "")) {
    alert("세 자리 숫자를 모두 입력해주세요.");
    return;
  }

  const guess = nums.map((v) => parseInt(v, 10));

  let strike = 0;
  let ball = 0;
  for (let i = 0; i < 3; i++) {
    if (guess[i] === answer[i]) {
      strike++;
    } else if (answer.includes(guess[i])) {
      ball++;
    }
  }
  const resultText = strike === 0 && ball === 0 ? "O" : `${strike}S ${ball}B`;

  const div = document.createElement("div");
  div.className = "num-result";
  div.textContent = resultText;
  if (strike === 0 && ball === 0) div.classList.add("out");
  else if (strike > 0 && ball === 0) div.classList.add("strike");
  else if (ball > 0 && strike === 0) div.classList.add("ball");
  else div.classList.add("strike");
  document.getElementById("results").appendChild(div);

  attempts--;
  document.getElementById("attempts").textContent = attempts;

  if (strike === 3) {
    endGame(true);
    return;
  }

  if (attempts <= 0) {
    endGame(false);
    return;
  }

  document.getElementById("number1").value = "";
  document.getElementById("number2").value = "";
  document.getElementById("number3").value = "";
  document.getElementById("number1").focus();
}

function endGame(won) {
  const img = document.getElementById("game-result-img");
  img.src = won ? "success.png" : "fail.png";

  document.querySelector(".submit-button").disabled = true;
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`number${i}`).disabled = true;
  }
}

window.addEventListener("DOMContentLoaded", initGame);
