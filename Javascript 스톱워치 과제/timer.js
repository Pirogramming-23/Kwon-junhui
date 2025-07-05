"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const timeBox = document.getElementById("time-box");
  const startButton = document.querySelector(".btn.start");
  const stopButton = document.querySelector(".btn.stop");
  const resetButton = document.querySelector(".btn.reset");
  const trashButton = document.getElementById("trash-logo");
  const allCheckButton = document.querySelector(".btn-all");
  const footerDown = document.getElementById("footer-down");

  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  let isRunning = false;
  let lapCounter = 0;
  let allChecked = false;

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return (
      String(seconds).padStart(2, "0") +
      ":" +
      String(milliseconds).padStart(2, "0")
    );
  }

  function updateTime() {
    if (isRunning) {
      const currentTime = Date.now();
      elapsedTime = currentTime - startTime;
      timeBox.textContent = formatTime(elapsedTime);
    }
  }

  function startLapTimer() {
    if (!isRunning) {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(updateTime, 10);
      isRunning = true;
      startButton.textContent = "start";
    }
  }

  function stopTimer() {
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
      startButton.textContent = "start";

      recordLap();
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    timeBox.textContent = "00:00";
    startButton.textContent = "start";
  }

  function recordLap() {
    lapCounter++;
    const lapTime = formatTime(elapsedTime);

    const lapItem = document.createElement("div");
    lapItem.classList.add("lap-item");
    lapItem.innerHTML = `
      <i class="ri-checkbox-blank-circle-line" data-checked="false"></i>
      <span class="recorded-time">${lapTime}</span>
    `;

    const lapIcon = lapItem.querySelector("i");
    lapIcon.addEventListener("click", () => {
      toggleLapCheck(lapIcon);
    });

    footerDown.prepend(lapItem);
    updateAllChoiceButtonState();
  }

  function toggleLapCheck(iconElement) {
    const isChecked = iconElement.dataset.checked === "true";

    if (isChecked) {
      iconElement.classList.remove("ri-checkbox-circle-fill");
      iconElement.classList.add("ri-checkbox-blank-circle-line");
      iconElement.dataset.checked = "false";
    } else {
      iconElement.classList.remove("ri-checkbox-blank-circle-line");
      iconElement.classList.add("ri-checkbox-circle-fill");
      iconElement.dataset.checked = "true";
    }
    updateAllChoiceButtonState();
  }

  function toggleAllLapsCheck() {
    const allLapIcons = footerDown.querySelectorAll(".lap-item i");
    if (allLapIcons.length === 0) return;

    allChecked = !allChecked;

    allLapIcons.forEach((icon) => {
      if (allChecked) {
        icon.classList.remove("ri-checkbox-blank-circle-line");
        icon.classList.add("ri-checkbox-circle-fill");
        icon.dataset.checked = "true";
      } else {
        icon.classList.remove("ri-checkbox-circle-fill");
        icon.classList.add("ri-checkbox-blank-circle-line");
        icon.dataset.checked = "false";
      }
    });
    updateAllChoiceButtonAppearance(allChecked);
  }

  function updateAllChoiceButtonAppearance(checkedState) {
    const allChoiceIcon = allCheckButton.querySelector("i");
    if (allChoiceIcon) {
      if (checkedState) {
        allChoiceIcon.classList.remove("ri-checkbox-blank-circle-line");
        allChoiceIcon.classList.add("ri-checkbox-circle-fill");
      } else {
        allChoiceIcon.classList.remove("ri-checkbox-circle-fill");
        allChoiceIcon.classList.add("ri-checkbox-blank-circle-line");
      }
    }
  }

  function updateAllChoiceButtonState() {
    const allLapIcons = footerDown.querySelectorAll(".lap-item i");
    if (allLapIcons.length === 0) {
      allChecked = false;
      updateAllChoiceButtonAppearance(false);
      return;
    }

    let allCurrentlyChecked = true;
    for (const icon of allLapIcons) {
      if (icon.dataset.checked !== "true") {
        allCurrentlyChecked = false;
        break;
      }
    }
    allChecked = allCurrentlyChecked;
    updateAllChoiceButtonAppearance(allChecked);
  }

  function clearLapRecords() {
    const lapItems = footerDown.querySelectorAll(".lap-item");
    let hasDeleted = false;

    for (let i = lapItems.length - 1; i >= 0; i--) {
      const item = lapItems[i];
      const icon = item.querySelector("i");
      if (icon && icon.dataset.checked === "true") {
        item.remove();
        hasDeleted = true;
      }
    }

    if (hasDeleted) {
      updateAllChoiceButtonState();
      if (footerDown.children.length === 0) {
        allChecked = false;
        updateAllChoiceButtonAppearance(false);
        lapCounter = 0;
      }
    }
  }

  timeBox.textContent = "00:00";

  startButton.addEventListener("click", startLapTimer);
  stopButton.addEventListener("click", stopTimer);
  resetButton.addEventListener("click", resetTimer);
  allCheckButton.addEventListener("click", toggleAllLapsCheck);
  trashButton.addEventListener("click", clearLapRecords);
});
