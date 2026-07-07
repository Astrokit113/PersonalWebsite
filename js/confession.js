// askbox.js
console.log("The void is listening...");

document.getElementById("gothic-askbox").addEventListener("submit", async function (event) {
  event.preventDefault(); 
  
  const form = event.target;
  const status = document.getElementById("status-message");
  const btn = document.getElementById("submit-btn");

  // Dims the stamp while waiting
  btn.style.filter = "brightness(0.5)";
  
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json' 
      }
    });

    if (response.ok) {
      status.style.display = "block";
      status.style.color = "#a30000";
      status.innerHTML = "Your confession has been sealed.";
      form.reset(); 
      btn.style.filter = "none";
    } else {
      const data = await response.json();
      if (Object.hasOwn(data, 'errors')) {
        status.innerHTML = data.errors.map(error => error.message).join(", ");
      } else {
        status.innerHTML = "The void rejected your message. Try again.";
      }
      status.style.display = "block";
      btn.textContent = "Seal & Send";
    }
  } catch (error) {
    status.style.display = "block";
    status.innerHTML = "A network error occurred.";
    btn.textContent = "Seal & Send";
  }
});