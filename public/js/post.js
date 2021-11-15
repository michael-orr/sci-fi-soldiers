
const newProgressPostHandler = async (event) => {
  event.preventDefault();
  const goal_id = document.querySelector("#goal_id").value.trim();
  const question_id = document.querySelector("#question_id").value.trim();
  const answer = document.querySelector("#answer").value.trim();
  const comment_date = new Date();

  if (comment_date, answer, question_id, goal_id) {
   
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ 
        "goal_id": goal_id,
        "date": comment_date,
        "question_id": question_id,
        "answer": answer
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
  .querySelector(".progress-form")
  .addEventListener("submit", newProgressPostHandler);