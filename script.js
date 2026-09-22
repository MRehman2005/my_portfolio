const navbar = document.getElementById("navbar");
const progress = document.querySelector(".progress");
const menu = document.querySelector(".menu-toggle");
const year = document.getElementById("year");
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

const setTheme = (isLightMode) => {
  root.dataset.theme = isLightMode ? "light" : "dark";
};

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
setTheme(prefersLight);

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
});

menu.addEventListener("click", () => navbar.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => navbar.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

themeToggle.addEventListener("click", () => {
  const lightMode = root.dataset.theme === "light";
  setTheme(!lightMode);
});

