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
  document.addEventListener("readystatechange", () => {
    const control = document.getElementById("site-theme");
    const buttons = control.querySelectorAll("[data-set-theme]");

    function updatePressedState() {
      const active = root.dataset.theme || "system";
      for (const button of buttons) {
        button.setAttribute("aria-pressed", String(button.dataset.setTheme === active));
      }
    }

    updatePressedState();
    control.hidden = false;
    for (const button of buttons) {
      button.addEventListener("click", () => {
        const theme = button.dataset.setTheme;
        applyTheme(theme);
        updatePressedState();
        try {
          localStorage.setItem(key, theme);
        } catch {
          // Without storage, the preference lasts for this page.
        }
      });
    }
  }, { once: true });
})();
