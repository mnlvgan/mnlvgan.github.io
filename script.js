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

// Single source of truth for all project card and dialog content.
const projects = [
  {
    category: "Game Project",
    title: "4PICS 1WORD",
    image: "./assets/projects/project_1.jpg",
    overview: "A visual word puzzle game where players connect four images, use hints wisely, and guess the hidden word.",
    technologies: ["Python", "Tkinter"],
    github: "https://github.com/mnlvgan/4pics_1word",
  },
  {
    category: "Web System",
    title: "CareBy",
    image: "./assets/projects/project_2.png",
    overview: "CareBy is a WebForms appointment system for users and therapists. It covers registration, profiles, booking, and schedule management.",
    technologies: ["ASP.NET WebForms", "C#", "SQL Server"],
    github: "https://github.com/IanSalandanan/IT114L-MP-CareBy",
  },
  {
    category: "Capstone Project",
    title: "Streamline",
    image: "./assets/projects/project_3.png",
    overview: "A geospatial monitoring and analytics platform that centralizes environmental, sensor, and administrative data into interactive dashboards and maps. The system enables users to monitor device health, visualize physicochemical readings, analyze geospatial datasets such as LULC, NDVI, AWEI, and DEM layers, access near real-time weather information, and perform spatial analysis through customizable map controls. Additional features include temporal data visualization, report generation, user and device management, audit logging, and announcement publishing, providing a comprehensive solution for environmental monitoring and data-driven decision-making.",
    technologies: ["Python", "Django", "PostgreSQL", "HTML", "CSS", "JavaScript", "Leaflet", "LoRa P2P", "REST API"],
    github: "https://github.com/jp-gerona/Streamline",
  },
];

function initProjects() {
  const grid = document.getElementById("project-grid");
  const modal = document.getElementById("project-modal");
  if (!grid || !modal) return;

  const modalImage = document.getElementById("project-modal-image");
  const modalCategory = document.getElementById("project-modal-category");
  const modalTitle = document.getElementById("project-modal-title");
  const modalOverview = document.getElementById("project-modal-overview");
  const modalTechnologies = document.getElementById("project-modal-technologies");
  const githubButton = document.getElementById("project-modal-github");
  let lastFocusedCard = null;
  let activeProject = null;

  // Render cards once from the project data, avoiding duplicated project markup.
  grid.innerHTML = projects.map((project, index) => `
    <article class="project-card" role="button" tabindex="0" data-project-index="${index}" aria-label="View details for ${project.title}">
      <div class="project-media project-media--soft">
        <img src="${project.image}" alt="${project.title} project preview" class="project-img">
      </div>
      <div class="project-content">
        <p class="project-kicker">${project.category}</p>
        <h2 class="experience-sub-title project-title">${project.title}</h2>
        <p class="project-view-details">Click to view details</p>
      </div>
    </article>
  `).join("");

  function openModal(project, card) {
    activeProject = project;
    lastFocusedCard = card;
    modalImage.src = project.image;
    modalImage.alt = `${project.title} project preview`;
    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalOverview.textContent = project.overview;
    modalTechnologies.innerHTML = project.technologies.map((technology) => `<li>${technology}</li>`).join("");
    githubButton.hidden = !project.github;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("project-modal-open");
    modal.querySelector(".project-modal__close").focus();
  }

  function closeModal() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("project-modal-open");
    activeProject = null;
    lastFocusedCard?.focus();
  }

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-project-index]");
    if (card) openModal(projects[card.dataset.projectIndex], card);
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-project-index]");
    if (!card) return;
    event.preventDefault();
    openModal(projects[card.dataset.projectIndex], card);
  });

  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-modal-close]")) closeModal();
  });

  githubButton.addEventListener("click", () => {
    if (activeProject?.github) window.open(activeProject.github, "_blank", "noopener,noreferrer");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

initProjects();

// Opens any credential or seminar image in one reusable lightbox.
function initCertificateLightbox() {
  const lightbox = document.getElementById("certificate-lightbox");
  const image = document.getElementById("certificate-lightbox-image");
  const title = document.getElementById("certificate-lightbox-title");
  const cards = document.querySelectorAll("[data-lightbox-image]");
  if (!lightbox || !image || !title || !cards.length) return;

  let lastFocusedCard = null;

  function closeLightbox() {
    if (!lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("certificate-lightbox-open");
    lastFocusedCard?.focus();
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      lastFocusedCard = card;
      image.src = card.dataset.lightboxImage;
      image.alt = card.querySelector("img").alt;
      title.textContent = card.dataset.lightboxTitle;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("certificate-lightbox-open");
      lightbox.querySelector(".certificate-lightbox__close").focus();
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target.closest("[data-lightbox-close]")) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

initCertificateLightbox();
