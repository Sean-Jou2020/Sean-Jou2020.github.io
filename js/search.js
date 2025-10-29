// Search functionality (already integrated in app.js)
// This file is kept for future extensibility

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        filterPosts();
      }
    });
  }
});

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
