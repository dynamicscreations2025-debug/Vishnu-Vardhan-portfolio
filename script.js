if (window.lucide) {
  lucide.createIcons();
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < window.innerHeight - 90) {
      element.style.transitionDelay = `${Math.min(index * 35, 260)}ms`;
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const spotlight = document.getElementById("cursorSpotlight");

if (spotlight && window.matchMedia("(hover: hover)").matches) {
  let mouseX = 0;
  let mouseY = 0;
  let spotX = 0;
  let spotY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  const moveSpotlight = () => {
    spotX += (mouseX - spotX) * 0.12;
    spotY += (mouseY - spotY) * 0.12;

    spotlight.style.left = `${spotX}px`;
    spotlight.style.top = `${spotY}px`;

    requestAnimationFrame(moveSpotlight);
  };

  moveSpotlight();
}

const heroImg = document.getElementById("heroImg");

if (heroImg && window.matchMedia("(hover: hover)").matches) {
  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;

    heroImg.style.transform = `scale(1.04) translate(${x}px, ${y}px)`;
  });
}

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.15}px, ${y * 0.18}px) scale(1.03)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

const startCounters = () => {
  if (countersStarted) return;

  const firstCounter = counters[0];
  if (!firstCounter) return;

  if (firstCounter.getBoundingClientRect().top < window.innerHeight - 100) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 50));

      const update = () => {
        current += increment;

        if (current >= target) {
          counter.textContent = `${target}+`;
          return;
        }

        counter.textContent = `${current}+`;
        requestAnimationFrame(update);
      };

      update();
    });
  }
};

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

const bottomDock = document.getElementById("bottomDock");
let lastScroll = 0;

if (bottomDock) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 420) {
      bottomDock.classList.add("hidden");
    } else {
      bottomDock.classList.remove("hidden");
    }

    lastScroll = currentScroll;
  });
}
