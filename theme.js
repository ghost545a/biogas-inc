(() => {
  const root = document.documentElement;
  const key = "biogas-theme";
  let preference;
  try {
    preference = localStorage.getItem(key);
  } catch {
    // The current page can still change theme when storage is blocked.
  }

  function applyTheme(value) {
    if (value === "light" || value === "dark") {
      root.dataset.theme = value;
    } else {
      delete root.dataset.theme;
    }
  }

  applyTheme(preference);
  document.addEventListener("DOMContentLoaded", () => {
    const picker = document.getElementById("site-theme");
    picker.value = root.dataset.theme || "system";
    picker.closest("label").hidden = false;
    picker.addEventListener("change", () => {
      applyTheme(picker.value);
      try {
        localStorage.setItem(key, picker.value);
      } catch {
        // Without storage, the preference lasts for this page.
      }
    });
  });
})();
