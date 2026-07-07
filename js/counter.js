document.addEventListener("DOMContentLoaded", () => {
  const counterUrl = "https://api.counterapi.dev/v1/roses-atelier/visits/up";

  fetch(counterUrl)
    .then(response => response.json())
    .then(data => {
      // 1. Let's peek at the dictionary the API actually handed us!
      console.log("API Response Data:", data); 

      // 2. The Fail-Safe Net: Search for all the weird ways the API might hide the number
      const actualCount = data.count || data.value || (data.data && data.data.up_count) || data.up_count;

      // 3. Inject it!
      if (actualCount !== undefined) {
          document.getElementById("visit-counter").textContent = actualCount;
      } else {
          document.getElementById("visit-counter").textContent = "Format Error";
      }
    })
    .catch(err => {
      console.error("Counter error:", err);
      document.getElementById("visit-counter").textContent = "Lost count!";
    });
});