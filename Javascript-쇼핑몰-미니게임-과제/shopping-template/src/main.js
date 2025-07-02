// 1) fetch & parse
function loadItems() {
  return fetch("./data/data.json")
    .then((res) => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then((json) => json.items);
}

// 2) render
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// 3) template
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item-thumbnail">
      <span class="item_description">${item.gender}, ${item.size}</span>
    </li>`;
}

// 4) 버튼 클릭 핸들러
function onButtonClick(event, items) {
  const btn = event.target.closest(".btn");
  if (!btn) return;

  const { key, value } = btn.dataset;
  if (!key || !value) return;

  // OR 필터: key/value 중 하나라도 일치하는 아이템만
  const filtered = items.filter((item) => item[key] === value);

  displayItems(filtered);
}

// 5) 이벤트 등록
function setEventListeners(items) {
  // HTML 클래스에 맞춰 .btns 로 선택
  document
    .querySelector(".btns")
    .addEventListener("click", (e) => onButtonClick(e, items));

  // 로고 클릭 시 리셋
  document
    .querySelector(".logo")
    .addEventListener("click", () => displayItems(items));
}

// 6) main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch((err) => console.error(err));
