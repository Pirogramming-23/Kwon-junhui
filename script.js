// script.js

// 전역 변수
let answer = [];
let attempts = 9;

// 게임 초기화 함수
function initGame() {
  // 1. 중복 없는 3자리 랜덤 숫자 생성
  answer = [];
  while (answer.length < 3) {
    const n = Math.floor(Math.random() * 9) + 1; // 1~9
    if (!answer.includes(n)) answer.push(n);
  }
  // 2. 시도 횟수 초기화
  attempts = 9;
  document.getElementById("attempts").textContent = attempts;
  // 3. 결과창 초기화
  document.getElementById("results").innerHTML = "";
  // 4. 입력창 초기화
  for (let i = 1; i <= 3; i++) {
    const input = document.getElementById(`number${i}`);
    input.value = "";
    input.disabled = false;
  }
  // 5. 결과 이미지 비우기, 버튼 활성화
  document.getElementById("game-result-img").src = "";
  document.querySelector(".submit-button").disabled = false;
}

// 숫자 확인 클릭 이벤트 핸들러
function check_numbers() {
  const nums = [
    document.getElementById("number1").value,
    document.getElementById("number2").value,
    document.getElementById("number3").value,
  ];

  // 입력 유효성 검사: 빈 값이 있으면 무시
  if (nums.some((v) => v === "")) {
    alert("세 자리 숫자를 모두 입력해주세요.");
    return;
  }

  // 문자열 → 숫자 배열
  const guess = nums.map((v) => parseInt(v, 10));

  // 스트라이크/볼/아웃 계산
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

  // 결과 화면에 추가
  const div = document.createElement("div");
  div.className = "num-result";
  div.textContent = resultText;
  if (strike === 0 && ball === 0) div.classList.add("out");
  else if (strike > 0 && ball === 0) div.classList.add("strike");
  else if (ball > 0 && strike === 0) div.classList.add("ball");
  else div.classList.add("strike"); // S와 B 둘다 있을 땐 strike 스타일 우선

  document.getElementById("results").appendChild(div);

  // 시도 횟수 차감
  attempts--;
  document.getElementById("attempts").textContent = attempts;

  // 승리 조건
  if (strike === 3) {
    endGame(true);
    return;
  }

  // 패배 조건: 0회 남았거나 9번 시도 초과
  if (attempts <= 0) {
    endGame(false);
    return;
  }

  // 다음 입력을 위해 포커스 초기화
  document.getElementById("number1").value = "";
  document.getElementById("number2").value = "";
  document.getElementById("number3").value = "";
  document.getElementById("number1").focus();
}

// 게임 종료 처리
function endGame(won) {
  const img = document.getElementById("game-result-img");
  img.src = won ? "success.png" : "fail.png";

  // 버튼 비활성화
  document.querySelector(".submit-button").disabled = true;
  // 입력창 비활성화
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`number${i}`).disabled = true;
  }
}

// 페이지 로드 시 초기화
window.addEventListener("DOMContentLoaded", initGame);
