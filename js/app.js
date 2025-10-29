// Main application logic
let allPosts = [];
let filteredPosts = [];
let allTags = new Set();
let activeTag = null;

// Load posts from posts.json
async function loadPosts() {
  try {
    const response = await fetch("posts.json");
    if (!response.ok) {
      throw new Error("Failed to load posts.json");
    }
    allPosts = await response.json();
    filteredPosts = allPosts;

    // Extract unique tags
    allPosts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => allTags.add(tag));
      }
    });

    renderTags();
    renderPosts();
  } catch (error) {
    console.error("Error loading posts:", error);
    document.getElementById("posts-container").innerHTML =
      "<p>게시글을 불러올 수 없습니다.</p>";
  }
}

// Render tag filter buttons
function renderTags() {
  const tagFilter = document.getElementById("tag-filter");
  if (!tagFilter) return;

  const tagArray = Array.from(allTags).sort();

  tagFilter.innerHTML = tagArray
    .map((tag) => `<button class="tag-btn" data-tag="${tag}">${tag}</button>`)
    .join("");

  // Add event listeners
  document.querySelectorAll(".tag-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag;

      // Toggle active state
      document
        .querySelectorAll(".tag-btn")
        .forEach((b) => b.classList.remove("active"));

      if (activeTag === tag) {
        activeTag = null;
        btn.classList.remove("active");
      } else {
        activeTag = tag;
        btn.classList.add("active");
      }

      filterPosts();
    });
  });
}

// Filter posts based on search and tag
function filterPosts() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

  filteredPosts = allPosts.filter((post) => {
    // Tag filter
    if (activeTag) {
      const hasTag = post.tags && post.tags.includes(activeTag);
      if (!hasTag) return false;
    }

    // Search filter
    if (searchTerm) {
      const searchableText = [
        post.title,
        post.excerpt,
        post.description,
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    }

    return true;
  });

  renderPosts();
}

// Render posts to the page
function renderPosts() {
  const container = document.getElementById("posts-container");
  if (!container) return;

  if (filteredPosts.length === 0) {
    container.innerHTML = "<p>게시글이 없습니다.</p>";
    return;
  }

  container.innerHTML = filteredPosts
    .map((post) => {
      const tagsHtml =
        post.tags && post.tags.length > 0
          ? `<div class="post-tags">
          ${post.tags
            .map((tag) => `<span class="post-tag">${tag}</span>`)
            .join("")}
         </div>`
          : "";

      return `
      <a href="post.html?file=${post.file}" class="post-card">
        <h2 class="post-title">${post.title}</h2>
        <div class="post-meta">
          ${post.date} ${post.category ? "• " + post.category : ""}
        </div>
        <p class="post-excerpt">${post.excerpt || ""}</p>
        ${tagsHtml}
      </a>
    `;
    })
    .join("");
}

// Search input event listener
document.getElementById("search-input")?.addEventListener("input", filterPosts);

// Load posts when page loads
document.addEventListener("DOMContentLoaded", loadPosts);
