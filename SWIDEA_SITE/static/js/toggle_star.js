document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".card").forEach((card) => {
    const ideaId = card.getAttribute("data-id");
    const starIcon = card.querySelector(".star-icon");

    starIcon.addEventListener("click", function (e) {
      e.stopPropagation();

      fetch(toggleStarUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": csrfToken,
        },
        body: `idea_id=${ideaId}`,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "starred") {
            starIcon.textContent = "★";
            starIcon.classList.add("starred");
          } else {
            starIcon.textContent = "☆";
            starIcon.classList.remove("starred");
          }
        });
    });
  });
});
