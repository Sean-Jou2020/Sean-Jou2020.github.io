// Theme toggle functionality
(function () {
  const themeToggle = document.getElementById("theme-toggle");

  // Get current theme from localStorage or default to light
  const currentTheme = localStorage.getItem("theme") || "light";

  // Set initial theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentAttr = document.documentElement.getAttribute("data-theme");
      const newTheme = currentAttr === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }
})();
