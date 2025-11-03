// Dynamic year
const yEl = document.getElementById("year");
if (yEl) yEl.textContent = new Date().getFullYear();

/* Typing animation - keep roles as they were (Frontend Developer, ML Enthusiast) */
const typingEl = document.querySelector(".typing");
const words = ["Full Stack Developer", "ML Enthusiast"];
let w = 0, i = 0, deleting = false;

function typeLoop() {
  if (!typingEl) return;
  const current = words[w];
  if (!deleting) {
    typingEl.textContent = current.slice(0, i + 1);
    i++;
    if (i === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, i - 1);
    i--;
    if (i === 0) {
      deleting = false;
      w = (w + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 120);
}
typeLoop();

/* Mobile nav toggle */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".navbar");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    if (nav.style.display === "flex") nav.style.display = "";
    else nav.style.display = "flex";
  });
}

/* Smooth reveal on scroll (fade + slide) */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      // don't unobserve if you want repeat animations; we keep once
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

/* Contact form basic UX (client-only) */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    // allow Formspree to handle POST; show quick UI feedback
    const btn = form.querySelector(".submit-btn");
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = "Sending...";
    // small client-side timeout to let Formspree action proceed; reset after 2s
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
      alert("Thanks — your message was sent (or is being processed).");
    }, 1600);
  });
}
