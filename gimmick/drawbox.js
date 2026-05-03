/*
        FILL IN THESE VARIABLES BASED ON THE GUIDE AT https://drawbox.nekoweb.org
        
        IF YOU HAVE ANY QUESTION, SUGGESTIONS, OR NEED HELP, PLEASE EMAIL ME AT drawbox@jhorn.net OR @MONKEYBATION on DISCORD
        
              /`·.¸
             /¸...¸`:·
         ¸.·´  ¸   `·.¸.·´)
         : © ):´;      ¸  {
          `·.¸ `·  ¸.·´\`·¸)
              `\\´´\¸.·´
        
*/
const GOOGLE_FORM_ID = "1FAIpQLSfeABQM1GIHTq_OUQxuegiJ3coOk8lBh7WWF_jUDq6G7lP5OQ";
const ENTRY_ID = "entry.1212312845";
const GOOGLE_SHEET_ID = "1mby0lFRTfyMhZR4UtIdp1pUpztzavFxs6Z_EpvjzO74";
const DISPLAY_IMAGES = true;

/*
        DONT EDIT BELOW THIS POINT IF YOU DONT KNOW WHAT YOU ARE DOING.
*/

const IMGBB_API_KEY = "75db6c7dc4c36ec332c7a370e55d52f4"; // <-- PASTE YOUR TOKEN HERE

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/" + GOOGLE_SHEET_ID + "/export?format=csv";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/" + GOOGLE_FORM_ID + "/formResponse";

let canvas = document.getElementById("drawboxcanvas");
let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let restore_array = [];
let start_index = -1;
let stroke_color = "black";
let stroke_width = "2";
let is_drawing = false;

function change_color(element) {
  stroke_color = element.style.background;
}

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (!is_drawing) return;
  context.lineTo(getX(event), getY(event));
  context.strokeStyle = stroke_color;
  context.lineWidth = stroke_width;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke();
  event.preventDefault();
}

function stop(event) {
  if (!is_drawing) return;
  context.stroke();
  context.closePath();
  is_drawing = false;
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  start_index++;
  event.preventDefault();
}

function getX(event) {
  return event.pageX
    ? event.pageX - canvas.offsetLeft
    : event.targetTouches[0].pageX - canvas.offsetLeft;
}

function getY(event) {
  return event.pageY
    ? event.pageY - canvas.offsetTop
    : event.targetTouches[0].pageY - canvas.offsetTop;
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function Restore() {
  if (start_index <= 0) {
    Clear();
  } else {
    start_index--;
    restore_array.pop();
    context.putImageData(restore_array[start_index], 0, 0);
  }
}

function Clear() {
  context.fillStyle = "white";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  restore_array = [];
  start_index = -1;
}

context.drawImage = function() {
  console.warn("noo >:(");
};

document.getElementById("submit").addEventListener("click", async function () {
  const submitButton = document.getElementById("submit");
  const statusText = document.getElementById("status");

  submitButton.disabled = true;
  statusText.textContent = "Uploading...";

  try {
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));

    const formData = new FormData();
    formData.append("image", blob);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    }).catch(err => {
      throw new Error(`Upload failed: ${err.message}. This might be due to network restrictions. Try allowing api.imgbb.com in your security settings.`);
    });

    const data = await response.json();
    if (!data.success) throw new Error(`ImgBB error: ${data.error?.message || "Upload failed"}`);

    const imageUrl = data.data.url;
    console.log("Uploaded image URL:", imageUrl);

    const googleFormData = new FormData();
    googleFormData.append(ENTRY_ID, imageUrl);

    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: googleFormData,
      mode: "no-cors",
    }).catch(err => {
      console.warn("Form submission error (may still have succeeded):", err);
    });

    statusText.textContent = "Upload successful!";
    alert("Image uploaded and submitted successfully ☻");
    location.reload();
  } catch (error) {
    console.error("Upload error:", error);
    statusText.textContent = `Error: ${error.message}`;
    alert(`Error: ${error.message}`);
  } finally {
    submitButton.disabled = false;
  }
});

async function fetchImages() {
  if (!DISPLAY_IMAGES) {
    console.log("Image display is disabled.");
    return;
  }

  console.log("Fetching from:", GOOGLE_SHEET_URL);

  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    console.log("Fetch response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    console.log("CSV text length:", csvText.length);
    console.log("CSV preview:", csvText.substring(0, 200));

    const rows = csvText.split("\n").slice(1);
    console.log("Total rows:", rows.length);

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    let imageCount = 0;
    rows.reverse().forEach((row) => {
      if (!row.trim()) return;

      const firstCommaIndex = row.indexOf(",");
      if (firstCommaIndex === -1) return;

      const timestamp = row.substring(0, firstCommaIndex).trim();
      let imgUrl = row.substring(firstCommaIndex + 1).trim();
      imgUrl = imgUrl.replace(/^"|"$/g, "");

      console.log("Timestamp:", timestamp, "URL:", imgUrl);

      if (imgUrl.startsWith("http")) {
        const div = document.createElement("div");
        div.classList.add("image-container");

        div.innerHTML = `
                    <img src="${imgUrl}" alt="drawing">
                    <p>${timestamp}</p>
                `;
        gallery.appendChild(div);
        imageCount++;
      }
    });

    console.log("Images loaded:", imageCount);
  } catch (error) {
    console.error("Error fetching images:", error);
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = `<div style="color: var(--font-color); padding: 10px; text-align: center;">
      <p>Unable to load images due to network restrictions.</p>
      <p style="font-size: 0.9em;">If you're behind a firewall or corporate network, try allowing <code>docs.google.com</code> in your security settings.</p>
    </div>`;
  }
}

fetchImages();