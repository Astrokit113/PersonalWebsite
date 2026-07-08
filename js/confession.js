document.getElementById("gothic-askbox").addEventListener("submit", async function(event) {
  event.preventDefault(); 
  
  const form = event.target;
  const status = document.getElementById("status-message");
  const btn = document.getElementById("submit-btn");

  // Dims the stamp while waiting
  btn.style.filter = "brightness(0.5)";
  
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json' 
      }
    });

    // Web3Forms sends back a JSON object with a 'success' boolean
    const json = await response.json();

    if (response.status === 200 && json.success) {
      status.style.display = "block";
      status.style.color = "#a30000";
      status.innerHTML = "Your confession has been sealed.";
      form.reset(); 
    } else {
      status.style.display = "block";
      status.style.color = "#ff4444";
      // Displays the specific error Web3Forms provides, or a fallback
      status.innerHTML = json.message || "The void rejected your message. Try again.";
    }
  } catch (error) {
    status.style.display = "block";
    status.style.color = "#ff4444";
    status.innerHTML = "A network error occurred. The seal is broken.";
  } finally {
    // Resets the stamp appearance
    btn.style.filter = "none";
  }
});