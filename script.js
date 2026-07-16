function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

//on scroll animation
function isPartiallyInViewport(element, offsetPercentage = 0) {
  const rect = element.getBoundingClientRect();
  const threshold = offsetPercentage / 100;

  return (
    rect.top <= window.innerHeight * (1 - threshold) &&
    rect.bottom >= window.innerHeight * threshold
  );
}

function handleScrollAnimation() {
  const elements = document.querySelectorAll(".animate");

  elements.forEach((element) => {
    if (isPartiallyInViewport(element, 45)) {
      element.classList.add("animate-in");
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation();

function initProjectCarousels() {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const slides = JSON.parse(carousel.dataset.images || "[]");
    const image = carousel.querySelector("[data-carousel-image]");
    const counter = carousel.querySelector("[data-carousel-counter]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");

    if (!slides.length || !image || !counter || !prevButton || !nextButton) {
      return;
    }

    let currentIndex = 0;

    function renderSlide() {
      const slide = slides[currentIndex];
      image.src = slide.src;
      image.alt = slide.alt;
      counter.textContent = `${currentIndex + 1} / ${slides.length}`;
    }

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      renderSlide();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      renderSlide();
    });

    renderSlide();
  });
}

initProjectCarousels();