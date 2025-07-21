$(document).ready(function () {
  $(".like-btn").click(function () {
    const postDiv = $(this).closest(".post");
    const postId = postDiv.data("post-id");

    $.post("/like/", { post_id: postId }, function (response) {
      if (response.liked) {
        alert("좋아요!");
      } else {
        alert("좋아요 취소");
      }
      postDiv.find(".like-btn").text(`❤️ ${response.like_count}`);
    });
  });

  $(".add-comment-btn").click(function () {
    const postDiv = $(this).closest(".post");
    const postId = postDiv.data("post-id");
    const commentInput = postDiv.find(".comment-input");
    const commentText = commentInput.val();

    $.post(
      "/comment/",
      { post_id: postId, text: commentText },
      function (response) {
        const commentHtml = `<div class="comment" data-comment-id="${response.id}">
                <strong>${response.user}</strong>: ${response.text}
                <button class="delete-comment-btn">삭제</button>
            </div>`;
        postDiv.find(".comments").append(commentHtml);
        commentInput.val("");
      }
    );
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
