document.getElementById("gothic-askbox").addEventListener("submit", async function(event) {
  event.preventDefault(); 
  
  const form = event.target;
  const status = document.getElementById("status-message");
  const btn = document.getElementById("submit-btn");

  // Dims the stamp while waiting
  btn.style.filter = "brightness(0.5)";
  status.style.display = "none"; // Hide any previous messages
  
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json' 
      }
    });

    const json = await response.json();
    console.log("Web3Forms Response:", json); // This helps us debug if needed

    // response.ok is a foolproof way to check if the server is happy (Status 200-299)
    if (response.ok) {
      status.style.display = "block";
      status.style.color = "#8b0000";
      status.innerHTML = "Your confession has been sealed.";
      form.reset(); 
    } else {
      status.style.display = "block";
      status.style.color = "#ff0000";
      status.innerHTML = json.message || "The void rejected your message. Try again.";
    }
  } catch (error) {
    console.error("Askbox Error:", error);
    status.style.display = "block";
    status.style.color = "#ff0000";
    status.innerHTML = "A network error occurred. The seal is broken.";
  } finally {
    // Resets the stamp appearance
    btn.style.filter = "none";
  }
});