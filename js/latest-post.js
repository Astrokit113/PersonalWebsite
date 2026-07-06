
  document.addEventListener("DOMContentLoaded", () => {
    // Point this to where your RSS file lives (usually the root)
    const rssUrl = "/rss.xml"; 

    fetch(rssUrl)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        // Grab all the 'item' tags (which represent posts)
        const items = data.querySelectorAll("item");
        
        if (items.length > 0) {
          // Get the very first item (the newest post)
          const latestItem = items[0];
          const title = latestItem.querySelector("title").textContent;
          const link = latestItem.querySelector("link").textContent;

          // Inject the title and link into the HTML
          document.getElementById("latest-post-title").textContent = `"${title}"`;
          document.getElementById("latest-post-link").href = link;
        } else {
          document.getElementById("latest-post-title").textContent = `"No posts found."`;
        }
      })
      .catch(err => {
        console.error("Error fetching RSS:", err);
        document.getElementById("latest-post-title").textContent = `"Could not load post."`;
      });
  });
