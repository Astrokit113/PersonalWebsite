document.addEventListener("DOMContentLoaded", () => {
  // We use a free counter API. The "/roses-atelier/visits" part creates a unique database just for you!
  const counterUrl = "https://api.counterapi.dev/v1/roses-atelier/visits/up";

  fetch(counterUrl)
    .then(response => response.json())
    .then(data => {
      // Injects the live count into your HTML
      document.getElementById("visit-counter").textContent = data.count;
    })
    .catch(err => {
      console.error("Counter error:", err);
      // Fails gracefully if the API is ever down
      document.getElementById("visit-counter").textContent = "Lost count!";
    });
});