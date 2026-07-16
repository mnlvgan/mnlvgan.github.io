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