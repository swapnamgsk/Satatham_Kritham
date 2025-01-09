const express = require("express");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");

const app = express();

// Serve static files from the "public" folder
app.use(express.static("public"));

app.get("/medium-posts", async (req, res) => {
  try {
    const rssFeedUrl = "https://medium.com/feed/@swapna-jtbb";
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssFeedUrl)}`;

    // Fetch the RSS feed
    const response = await axios.get(proxyUrl);
    const xml = response.data.contents;

    // Parse the XML feed
    const result = await parseStringPromise(xml);
    const items = result.rss?.channel?.[0]?.item || [];

    if (!items.length) {
      res.json([]);
      return;
    }

    const blogPosts = items.map((item) => ({
      title: item.title?.[0] || "Untitled",
      link: item.link?.[0] || "#",
      pubDate: item.pubDate?.[0] || "Unknown date",
      description: item.description?.[0] || "No description available.",
    }));

    res.json(blogPosts);
  } catch (error) {
    console.error("Error fetching Medium RSS feed:", error.message);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
