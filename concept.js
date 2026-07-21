document.documentElement.classList.add("js");

const revealElements = [...document.querySelectorAll(".reveal")];

if (!("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8%",
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const revealVisibleElements = () => {
    revealElements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top >= window.innerHeight || bounds.bottom <= 0) return;

      element.classList.add("is-visible");
      revealObserver.unobserve(element);
    });
  };

  // Anchors can move the page after the observer's first layout pass.
  requestAnimationFrame(revealVisibleElements);
  window.addEventListener("load", revealVisibleElements, { once: true });
  window.addEventListener("hashchange", () => requestAnimationFrame(revealVisibleElements));
  setTimeout(revealVisibleElements, 150);
}
