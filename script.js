document.addEventListener("DOMContentLoaded", function () {
  // Store fetched blogs and current index
  let blogs = [];
  let currentIndex = 0;

  // Function to fetch the RSS feed
  const fetchRSSFeed = async () => {
    try {
      // Fetch the RSS feed from the proxy
      const response = await fetch("https://ashutosh7i.dev/blog-rss-xml");
      //what🤔the address looks changed?
      //Read below to know more

      const rssText = await response.text();

      // Parse the XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssText, "text/xml");
      const items = xmlDoc.querySelectorAll("item");

      // Extract required data from each item and store in 'blogs' array
      blogs = Array.from(items).map((item) => ({
        title: item.querySelector("title").textContent,
        link: item.querySelector("link").textContent,
        coverImage: item.querySelector("cover_image").textContent,
      }));

      // Call the function to render the blog cards once the data is fetched
      renderBlogCards();
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
    }
  };

  // Call the function to fetch the RSS feed
  fetchRSSFeed();

  // Function to render the blog cards
  function renderBlogCards() {
    // Get the grid element
    const grid = document.querySelector(".grid");

    // Empty the grid before adding the blog cards
    grid.innerHTML = "";

    // Iterate through the blogs array and create the blog cards
    blogs.forEach((blog, index) => {
      // Create a card element for each blog
      const card = document.createElement("div");
      card.classList.add("blog-card");

      // Set styles for the card
      card.style.width = "450px";
      card.style.border = `2px solid teal`;
      card.style.borderRadius = "8px";
      card.style.overflow = "hidden";
      card.style.position = "relative";

      // Create the title element
      const title = document.createElement("p");
      title.textContent = blog.title;
      title.style.fontSize = "15px";
      title.style.fontWeight = "bold";
      title.style.marginTop = "2";
      title.style.color = "black";

      // Create the link element
      const link = document.createElement("a");
      link.href = blog.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(title);

      // Create the cover image element
      const coverImage = document.createElement("img");
      coverImage.src = blog.coverImage;
      coverImage.alt = blog.title;
      coverImage.style.height = "240px";
      coverImage.style.width = "100%";
      coverImage.style.objectFit = "cover";

      // Append elements to the card
      card.appendChild(coverImage);
      card.appendChild(link);

      // Add "Latest" badge for the current index
      if (currentIndex === index) {
        const latestBadge = document.createElement("div");
        latestBadge.textContent = "Latest";
        latestBadge.classList.add("latest-badge");
        latestBadge.style.color = "red";
        latestBadge.style.fontSize = "20px";
        latestBadge.style.fontWeight = "bold";

        card.appendChild(latestBadge);
      }

      // Add the card to the grid
      grid.appendChild(card);
    });
  }
});
