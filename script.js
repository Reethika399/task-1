document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const scrollTopButton = document.querySelector(".scroll-top");
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  function updateNavbarOnScroll() {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    const scrollPosition = window.scrollY + 140;
    let currentSection = "home";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (linkHref && linkHref.includes(currentSection)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function handleScrollButton() {
    if (window.scrollY > 500) {
      scrollTopButton.classList.add("visible");
    } else {
      scrollTopButton.classList.remove("visible");
    }
  }

  function initTypedAnimation() {
    const typed = document.querySelector(".typed");

    if (typed) {
      new Typed(typed, {
        strings: [
          "Data Analytics Enthusiast",
          "Python Learner",
          "Computer Science Student",
          "Web Development Enthusiast"
        ],
        typeSpeed: 70,
        backSpeed: 35,
        backDelay: 1200,
        loop: true,
      });
    }
  }

  function setupMobileNav() {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
          const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });
  }

  function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress span");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    skillBars.forEach((bar) => observer.observe(bar));
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const subject = (formData.get("subject") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const inputs = contactForm.querySelectorAll("input, textarea");

    let isValid = true;

    inputs.forEach((input) => {
      input.classList.remove("form-error");
    });

    if (!name) {
      nameField.classList.add("form-error");
      isValid = false;
    }

    if (!validateEmail(email)) {
      emailField.classList.add("form-error");
      isValid = false;
    }

    if (!subject) {
      subjectField.classList.add("form-error");
      isValid = false;
    }

    if (!message) {
      messageField.classList.add("form-error");
      isValid = false;
    }

    if (!isValid) {
      formSuccess.hidden = true;
      return;
    }

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    formSuccess.hidden = false;
    window.location.href = `mailto:reethuchowdary905@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  }

  window.addEventListener("scroll", () => {
    updateNavbarOnScroll();
    handleScrollButton();
  });

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }

  initTypedAnimation();
  initSkillBars();
  setupMobileNav();
  updateNavbarOnScroll();
  handleScrollButton();

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 850,
      once: true,
      offset: 50,
      easing: "ease-out-cubic",
    });
  }
});
