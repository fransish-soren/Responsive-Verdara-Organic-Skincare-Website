document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    toggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) {
      toggle.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    }
  }));

  let bagCount = 0;
  const bagCounter = document.querySelector(".bag-count");
  const toast = document.querySelector(".toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
  }
  document.querySelectorAll(".quick-add").forEach(button => {
    button.addEventListener("click", () => {
      bagCount += 1;
      if (bagCounter) bagCounter.textContent = bagCount;
      showToast(`${button.dataset.product} added to your bag (demo).`);
    });
  });

  const form = document.querySelector("#newsletter-form");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.querySelector("#email");
    const message = document.querySelector(".form-message");
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }
    message.textContent = "Thank you — you're on the list! (Demo form)";
    form.reset();
  });

  const reviewQuotes = [
    { quote: "“My routine finally feels like me.”", copy: "“Everything feels thoughtful, from the textures to the simple routine. My skin feels soft and cared for, and I actually look forward to using it every morning.”", name: "Amelia M.", initials: "AM" },
    { quote: "“A calmer start to my day.”", copy: "“The products fit so easily into my mornings. I love the gentle feel, the uncomplicated steps, and the care behind the brand.”", name: "Nora L.", initials: "NL" },
    { quote: "“Simple, thoughtful, lovely.”", copy: "“My shelf is less cluttered and my routine feels more intentional. The textures are beautiful and the whole experience feels considered.”", name: "Sofia R.", initials: "SR" }
  ];
  let reviewIndex = 0;
  const quoteTitle = document.querySelector(".testimonial-section h2");
  const quoteCopy = document.querySelector(".testimonial-copy");
  const reviewerName = document.querySelector(".reviewer strong");
  const avatar = document.querySelector(".review-avatar");
  const dots = document.querySelectorAll(".review-dots > *");
  function renderReview() {
    const review = reviewQuotes[reviewIndex];
    quoteTitle.textContent = review.quote;
    quoteCopy.textContent = review.copy;
    reviewerName.textContent = review.name;
    avatar.textContent = review.initials;
    dots.forEach((dot, i) => dot.style.background = i === reviewIndex ? "var(--ink)" : "#a8b8a7");
  }
  document.querySelector(".review-controls .review-arrow:first-child")?.addEventListener("click", () => {
    reviewIndex = (reviewIndex - 1 + reviewQuotes.length) % reviewQuotes.length;
    renderReview();
  });
  document.querySelector(".review-controls .review-arrow:last-child")?.addEventListener("click", () => {
    reviewIndex = (reviewIndex + 1) % reviewQuotes.length;
    renderReview();
  });

  const revealTargets = document.querySelectorAll(".value-card, .about-image-wrap, .about-copy, .product-card, .newsletter-image, .newsletter-copy");
  revealTargets.forEach(el => el.classList.add("reveal"));
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("visible"));
  }
});