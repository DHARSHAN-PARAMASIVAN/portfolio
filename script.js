(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const progress = document.querySelector(".progress");
  const topbar = document.querySelector(".top");
  const burger = document.querySelector(".top__burger");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && max > 0) progress.style.width = `${(y / max) * 100}%`;
    if (topbar) topbar.classList.toggle("is-solid", y > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && topbar) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      topbar.classList.toggle("is-open", !open);
    });

    topbar.querySelectorAll(".top__nav a").forEach((a) => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        topbar.classList.remove("is-open");
      });
    });
  }

  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  const animateCount = (el) => {
    const target = Number(el.dataset.count || 0);
    if (!target) return;
    const start = performance.now();
    const dur = 1100;
    const frame = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  if (!reduce && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.45 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
  } else {
    document.querySelectorAll("[data-count]").forEach((el) => {
      el.textContent = el.dataset.count;
    });
  }
})();
