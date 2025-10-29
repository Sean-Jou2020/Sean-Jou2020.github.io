// Post loader and markdown parser
(async function () {
  let postContent = "";

  // Get filename from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const filename = urlParams.get("file");

  if (!filename) {
    document.getElementById("post-content").innerHTML =
      "<p>게시글을 찾을 수 없습니다.</p>";
    return;
  }

  try {
    // Load markdown file
    const response = await fetch(`pages/${filename}`);
    if (!response.ok) {
      throw new Error("Failed to load markdown file");
    }
    postContent = await response.text();

    // Parse Front Matter
    const frontMatterMatch = postContent.match(
      /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    );
    let metadata = {};
    let markdown = postContent;

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      markdown = frontMatterMatch[2];

      frontMatter.split("\n").forEach((line) => {
        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();

          // Remove quotes
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }

          // Parse arrays
          if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
            try {
              value = JSON.parse(value);
            } catch {
              value = value
                .slice(1, -1)
                .split(",")
                .map((t) => t.trim().replace(/^['"]|['"]$/g, ""));
            }
          }

          metadata[key] = value;
        }
      });
    }

    // Set page title
    document.getElementById("post-title").textContent =
      metadata.title || "Post";

    // Convert markdown to HTML
    const html = marked.parse(markdown);

    // Render post
    const postContainer = document.getElementById("post-content");
    postContainer.innerHTML = `
      <article class="post-header">
        <h1>${metadata.title || ""}</h1>
        <div class="post-meta-detail">
          ${metadata.date || ""} 
          ${metadata.category ? "• " + metadata.category : ""}
        </div>
        ${
          metadata.tags && metadata.tags.length > 0
            ? `<div class="post-tags-detail">
               ${metadata.tags
                 .map((tag) => `<span class="post-tag">${tag}</span>`)
                 .join("")}
             </div>`
            : ""
        }
      </article>
      <div class="post-body">
        ${html}
      </div>
    `;

    // Highlight code blocks
    if (typeof Prism !== "undefined") {
      Prism.highlightAll();
    }

    // Load Giscus
    loadGiscus();
  } catch (error) {
    console.error("Error loading post:", error);
    document.getElementById("post-content").innerHTML =
      "<p>게시글을 불러올 수 없습니다.</p>";
  }
})();

// Load Giscus comments
function loadGiscus() {
  const giscusContainer = document.getElementById("giscus-comments");
  if (!giscusContainer) return;

  // Create script element
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "YOUR_USERNAME/YOUR_REPO"); // 사용자가 업데이트 필요
  script.setAttribute("data-repo-id", ""); // 사용자가 업데이트 필요
  script.setAttribute("data-category", "General");
  script.setAttribute("data-category-id", ""); // 사용자가 업데이트 필요
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "1");
  script.setAttribute("data-input-position", "bottom");
  script.setAttribute(
    "data-theme",
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light"
  );
  script.setAttribute("data-lang", "ko");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;

  giscusContainer.appendChild(script);
}
