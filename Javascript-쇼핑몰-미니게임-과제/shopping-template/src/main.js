// 1) Fetch the items from the JSON file
function loadItems() {
  return fetch("./data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // JSON 파싱
    })
    .then((json) => json.items); // json.items 배열 리턴
}

// 2) update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// 3) Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
      <!-- 이미지 src와 alt를 올바른 프로퍼티로 -->
      <img 
        src="${item.image}" 
        alt="${item.type}" 
        class="item-thumbnail"
      >
      <!-- 설명에 gender, size 활용 -->
      <span class="item_description">
        ${item.gender}, ${item.size}
      </span>
    </li>
  `;
}

// 4) main
loadItems()
  .then((items) => {
    console.log("Loaded items:", items);
    displayItems(items);
    // setEventListeners(items);
  })
  .catch((err) => console.error("Error loading items:", err));
