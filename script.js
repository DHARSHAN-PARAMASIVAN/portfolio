(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const progress = document.querySelector(".progress");
  const dock = document.querySelector(".dock");
  const menu = document.querySelector(".dock__menu");
  const links = document.querySelectorAll(".dock__links a");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && max > 0) progress.style.width = `${(y / max) * 100}%`;

    const sections = ["work", "proof", "stack", "hire"];
    let active = "";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.45) active = id;
    });
    links.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("href") === `#${active}`);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menu && dock) {
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!open));
      dock.classList.toggle("is-open", !open);
    });
    links.forEach((a) =>
      a.addEventListener("click", () => {
        menu.setAttribute("aria-expanded", "false");
        dock.classList.remove("is-open");
      })
    );
  }

  // Reveal
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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  // Count-up stats
  const animateCount = (el) => {
    const target = Number(el.dataset.count || 0);
    if (!target) return;
    const start = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!reduce && "IntersectionObserver" in window) {
    const counters = document.querySelectorAll("[data-count]");
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    document.querySelectorAll("[data-count]").forEach((el) => {
      el.textContent = el.dataset.count;
    });
  }

  // Rotating role words
  const swap = document.querySelector(".swap");
  if (swap && !reduce) {
    const words = (swap.dataset.words || "").split(",").map((w) => w.trim()).filter(Boolean);
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      swap.style.opacity = "0";
      swap.style.transform = "translateY(6px)";
      setTimeout(() => {
        swap.textContent = words[i];
        swap.style.opacity = "1";
        swap.style.transform = "none";
      }, 220);
    }, 2400);
    swap.style.transition = "opacity 0.22s ease, transform 0.22s ease";
  }

  // Drag-to-scroll project track
  const track = document.querySelector(".work__track");
  if (track) {
    let down = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener("pointerdown", (e) => {
      down = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener("pointerup", () => {
      down = false;
    });
    track.addEventListener("pointerleave", () => {
      down = false;
    });
    track.addEventListener("pointermove", (e) => {
      if (!down) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });
  }
})();
