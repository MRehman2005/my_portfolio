const initPortfolioScript = () => {
  const navbar = document.getElementById("navbar");
  const progress = document.querySelector(".progress-bar");
  const menu = document.querySelector(".menu-toggle");
  const year = document.getElementById("year");
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");

  const setTheme = (isLightMode) => {
    const nextTheme = isLightMode ? "light" : "dark";
    root.dataset.theme = nextTheme;

    if (themeToggle) {
      const isLight = nextTheme === "light";
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      themeToggle.textContent = isLight ? "☾" : "☼";
    }
  };

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (window.matchMedia) {
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight);
  }

  if (navbar && progress) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    });
  }

  if (menu && navbar) {
    menu.addEventListener("click", () => navbar.classList.toggle("open"));
  }

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navbar) navbar.classList.remove("open");
    });
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const lightMode = root.dataset.theme === "light";
      setTheme(!lightMode);
    });
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolioScript);
} else {
  initPortfolioScript();
}

