// document.addEventListener("DOMContentLoaded", () => {
//     const blogContainer = document.getElementById("blog-container");
//     const username = "swapna-jtbb"; // Replace with your Medium username
//     const rssFeedUrl = `https://medium.com/feed/@swapna-jtbb`;
//     const proxyUrl = `https://api.allorigins.win/get?url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40swapna-jtbb
// `;

//     console.log("Fetching Medium RSS feed from:", proxyUrl);

//     fetch(proxyUrl)
//         .then(response => {
//             console.log("Received response from proxy:", response);
//             return response.json();
//         })
//         .then(data => {
//             console.log("Parsed JSON data:", data);

//             // Debugging: Log raw RSS feed contents
//             console.log("Raw RSS feed contents:", data.contents);

//             if (!data.contents || !data.contents.includes("<item>")) {
//                 console.warn("RSS feed is empty or has no valid blog posts.");
//                 blogContainer.innerHTML = "<p>No blog posts found. Please ensure your Medium account has published posts.</p>";
//                 return;
//             }

//             const parser = new DOMParser();
//             const xml = parser.parseFromString(data.contents, "text/xml");

//             console.log("Parsed XML from RSS feed:", xml);

//             const items = xml.querySelectorAll("item");

//             if (items.length === 0) {
//                 console.warn("No blog posts found in the RSS feed.");
//                 blogContainer.innerHTML = "<p>No blog posts found. Please check your Medium username or RSS feed.</p>";
//                 return;
//             }

//             console.log(`Found ${items.length} blog posts in the RSS feed.`);
//             blogContainer.innerHTML = ""; // Clear loading text

//             items.forEach(item => {
//                 const title = item.querySelector("title").textContent;
//                 const link = item.querySelector("link").textContent;
//                 const description = item.querySelector("description").textContent;

//                 console.log("Processing blog post:", { title, link, description });

//                 const tempDiv = document.createElement("div");
//                 tempDiv.innerHTML = description;
//                 const plainDescription = tempDiv.textContent || tempDiv.innerText || "";

//                 const blogPost = document.createElement("div");
//                 blogPost.className = "blog-post";
//                 blogPost.innerHTML = `
//                     <h2><a href="${link}" target="_blank">${title}</a></h2>
//                     <p>${plainDescription.substring(0, 150)}...</p>
//                 `;

//                 blogContainer.appendChild(blogPost);
//             });
//         })
//         .catch(err => {
//             console.error("Failed to fetch Medium RSS feed:", err);
//             blogContainer.innerHTML = "<p>Unable to load blog posts at this time.</p>";
//         });
// });


document.addEventListener("DOMContentLoaded", () => {
    const rssFeedUrl = "https://medium.com/feed/@swapna-jtbb"; // Replace with your Medium username
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssFeedUrl)}`;

    // Fetch Medium RSS feed
    fetch(proxyUrl)
        .then((response) => response.json())
        .then((data) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "application/xml");

            // Parse RSS feed
            const items = xmlDoc.querySelectorAll("item");
            if (items.length === 0) {
                document.getElementById("blog-posts").innerHTML = "No blog posts found.";
                return;
            }

            // Create HTML for blog posts
            const blogPosts = Array.from(items).map((item) => {
                const title = item.querySelector("title")?.textContent || "Untitled";
                const link = item.querySelector("link")?.textContent || "#";
                const pubDate = item.querySelector("pubDate")?.textContent || "Unknown date";
                const description = item.querySelector("description")?.textContent || "";

                return `<li>
                    <a href="${link}" target="_blank">${title}</a>
                    <p>${pubDate}</p>
                    <p>${description}</p>
                </li>`;
            });

            // Render blog posts on the page
            document.getElementById("blog-posts").innerHTML = `<ul>${blogPosts.join("")}</ul>`;
        })
        .catch((error) => {
            console.error("Error fetching Medium RSS feed:", error);
            document.getElementById("blog-posts").innerHTML =
                "Error loading blog posts. Please try again later.";
        });
});
