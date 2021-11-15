
const newCommentHandler = async (event) => {
  event.preventDefault();
  const comment_body = document.querySelector("#body").value.trim();
  const post_id = document.querySelector("#post_id").value.trim();
  const user_id = document.querySelector("#user_id").value.trim();
  const comment_date = new Date();

  
  console.log(comment_body, post_id, user_id, comment_date)
  if (comment_body && post_id && user_id && comment_date) {
   
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ 
        "body": comment_body, 
        "post_id": post_id,
        "user_id": user_id, 
        "date": comment_date 
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload();
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);