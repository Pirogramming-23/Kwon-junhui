// static/js/adjust_level.js
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".card").forEach((card) => {
    const ideaId = card.getAttribute("data-id");
    const levelValue = card.querySelector(".level-value");

    card.querySelectorAll(".level-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const action = this.getAttribute("data-action");
        const levelValue = card.querySelector(".level-value");

        fetch(toggleLevelUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": csrfToken,
          },
          body: `idea_id=${ideaId}&action=${action}`,
        })
          .then((res) => res.json())
          .then((data) => {
            levelValue.textContent = data.level;
          })
          .catch((err) => {
            console.error("Error adjusting level:", err);
          });
      });
    });
  });
});
