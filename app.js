const progressBar = document.querySelector(".progress span");
const tocLinks = [...document.querySelectorAll(".toc a")];
const sections = tocLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateProgress() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;
  progressBar.style.setProperty("--read-progress", `${progress}%`);
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    tocLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { threshold: [0.24, 0.5, 0.72], rootMargin: "-18% 0px -46% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
document.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();
