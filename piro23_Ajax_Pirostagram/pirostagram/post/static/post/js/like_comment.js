function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

$.ajaxSetup({
  headers: { 'X-CSRFToken': getCookie('csrftoken') }
});

$(document).ready(function () {
  $(".like-btn").click(function () {
    const postDiv = $(this).closest(".post");
    const postId = postDiv.data("post-id");

    const btn = postDiv.find(".like-btn");
    const parts = btn.text().trim().split(" ");
    const currentCount = parseInt(parts[1] || 0); 

    $.post("/like/", { post_id: postId, current_count: currentCount }, function (response) {
      btn.text(`❤️ ${response.like_count}`);
    });
  });



  $(".add-comment-btn").click(function () {
    const postDiv = $(this).closest(".post");
    const postId = postDiv.data("post-id");
    const commentInput = postDiv.find(".comment-input");
    const commentText = commentInput.val();

    if (!commentText.trim()) {
      alert("댓글을 입력하세요.");
      return;
    }

    $.post("/comment/", { post_id: postId, text: commentText }, function (response) {
      const commentHtml = `
        <div class="comment" data-comment-id="${response.id}">
          <strong>${response.username}</strong>: ${response.text}
          <button class="delete-comment-btn">삭제</button>
        </div>`;
      postDiv.find(".comments").append(commentHtml);
      commentInput.val("");
    });
  });

  $(document).on("click", ".delete-comment-btn", function () {
    const commentDiv = $(this).closest(".comment");
    const commentId = commentDiv.data("comment-id");

    $.post("/comment/delete/", { comment_id: commentId }, function (response) {
      if (response.deleted) {
        commentDiv.remove();
      } else {
        alert("삭제 실패");
      }
    });
  });
});
