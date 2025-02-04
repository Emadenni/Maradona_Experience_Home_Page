function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function showLoginOverlay(loginOverlay) {
  if (loginOverlay) {
    loginOverlay.style.display = "block";
  }
}

function hideLoginOverlay(loginOverlay) {
  if (loginOverlay) {
    loginOverlay.style.display = "none";
  }
}

function showRegisterOverlayHideLogin(registerOverlay, loginOverlay, registrationForm, isFormOpen) {
  if (registerOverlay && loginOverlay) {
    registerOverlay.classList.remove("hidden");
    loginOverlay.style.display = "none";
    document.getElementById("top").scrollIntoView({ behavior: "smooth", block: "start" });

    if (registrationForm.classList.contains("active")) {
      registerOverlay.style.justifyContent = "space-evenly";
      isFormOpen = true;
    } else {
      registerOverlay.style.justifyContent = "center";
      isFormOpen = false;
    }
  }
}

export function updateLoginButton(loginBtn) {
  const token = sessionStorage.getItem("token");
  if (loginBtn) {
    if (token) {
      loginBtn.textContent = "Logout";
      loginBtn.removeEventListener("click", showLoginOverlay);
      loginBtn.addEventListener("click", logout);
    } else {
      loginBtn.textContent = "Accedi";
      loginBtn.removeEventListener("click", logout);
      loginBtn.addEventListener("click", showLoginOverlay);
    }
  }
}

export function hideRegisterOverlay(registerOverlay) {
  if (registerOverlay) {
    registerOverlay.classList.add("hidden");
    registerOverlay.style.justifyContent = "center";
  }
}

function logout() {
  sessionStorage.removeItem("token");
  updateLoginButton();
  window.location.reload();
}

function logoutFromTournamentsPage() {
  sessionStorage.removeItem("token");
  updateLoginButton();
  window.location.href = "index.html";
}

export function showCustomAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.classList.add("custom-alert");

  const overlay = document.createElement("div");
  overlay.classList.add("alert-overlay");

  document.body.classList.add("no-scroll");

  alertBox.innerHTML = `
    <button class="close-alert close-btn">X</button>
    <img src="./images/logoExperience.png" class="logo-maradona-experience">
    <p>${message}</p>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(alertBox);

  alertBox.querySelector(".close-alert").addEventListener("click", () => {
    alertBox.remove();
    overlay.remove();
    document.body.classList.remove("no-scroll");
  });
}

function handleEvent(selector, eventType, callback) {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener(eventType, callback);
  } else {
    console.log(`Elemento ${selector} non trovato.`);
  }
}

function togglePassword(fieldId, iconClass) {
  const passwordField = document.getElementById(fieldId);
  const passwordToggleIcon = document.querySelector(iconClass);

  if (passwordField && passwordToggleIcon) {
    switch (passwordField.type) {
      case "password":
        passwordField.type = "text";
        passwordToggleIcon.classList.replace("fa-eye", "fa-eye-slash");
        break;
      case "text":
        passwordField.type = "password";
        passwordToggleIcon.classList.replace("fa-eye-slash", "fa-eye");
        break;
    }
  }
}

function init() {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginOverlay = document.querySelector(".login-overlay");
  const registerLink = document.getElementById("register-link");
  const registerOverlay = document.querySelector(".overlay");
  const toggleRegisterButton = document.getElementById("toggle-register");
  const continueLink = document.getElementById("continue-link");
  const registrationForm = document.getElementById("registration-form");
  const arrow = document.querySelector(".register-button .arrow");
  let spinner = document.getElementById("spinner");
  let isFormOpen = false;

  document.addEventListener("DOMContentLoaded", () => {
    setViewportHeight();

    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);
    window.addEventListener("pageshow", () => window.scrollTo(0, 0));

 const token = sessionStorage.getItem("token");
    if (token) {
      hideRegisterOverlay(registerOverlay);
      hideLoginOverlay(loginOverlay);
    }

    updateLoginButton(loginBtn);

    handleEvent("#continue-link", "click", (event) => {
      event.preventDefault();
      const token = sessionStorage.getItem("token");
      if (token) {
        showCustomAlert("Sei già loggato! Leggi il regolamento ed accedi ai tornei");
        setTimeout(() => {
          hideRegisterOverlay(registerOverlay);
          hideLoginOverlay(loginOverlay);
        }, 2000);
      } else {
        hideRegisterOverlay(registerOverlay);
        showLoginOverlay(loginOverlay);
      }
    });

    handleEvent("#loginBtn", "click", () => showLoginOverlay(loginOverlay));
    handleEvent("#logoutBtn", "click", logoutFromTournamentsPage);
    handleEvent("#register-link", "click", (event) => {
      event.preventDefault();
      showRegisterOverlayHideLogin(registerOverlay, loginOverlay, registrationForm, isFormOpen);
    });

    handleEvent("#toggle-register", "click", () => {
      if (registrationForm) {
        registrationForm.classList.toggle("active");
        registrationForm.classList.toggle("hidden");

        if (registrationForm.classList.contains("active")) {
          registerOverlay.style.justifyContent = "space-evenly";
          isFormOpen = true;
        } else {
          registerOverlay.style.justifyContent = "center";
          isFormOpen = false;
        }

        if (arrow) {
          arrow.style.transform = registrationForm.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
        }
      }
    });

    handleEvent(".login-overlay", "click", (event) => {
      if (event.target === loginOverlay) hideLoginOverlay(loginOverlay);
    });

    handleEvent("#card-link-tournaments", "click", (event) => {
      event.preventDefault();
      const token = sessionStorage.getItem("token");
      if (token) {
        window.location.href = "tournaments.html";
      } else {
        showLoginOverlay(loginOverlay);
      }
    });

    handleEvent("#close-btn-login", "click", (event) => {
      event.preventDefault();
      hideLoginOverlay(loginOverlay);
    });

    handleEvent(".card2", "click", (event) => {
      event.preventDefault();
      showCustomAlert(
        "Le lotterie non sono ancora disponibili, ma restate sintonizzati! 🎉 Presto avrete la possibilità di partecipare e vincere fantastici premi."
      );
    });

    handleEvent(".card3", "click", (event) => {
      event.preventDefault();
      showCustomAlert(
        "I giochi non sono ancora disponibili, ma restate sintonizzati! 🎉 Presto avrete la possibilità di partecipare e vincere fantastici premi."
      );
    });

    handleEvent(".password-toggle", "click", () => togglePassword("password", ".password-toggle i"));
    handleEvent(".login-password-toggle", "click", () => togglePassword("login-password", ".login-password-toggle i"));

    const goldCard = document.querySelector(".tournaments_page_card_gold");
    const silverCard = document.querySelector(".tournaments_page_card_silver");

    if (goldCard) {
      goldCard.addEventListener("click", function () {
        window.location.href = "";
      });
    }

    if (silverCard) {
      silverCard.addEventListener("click", function () {
        window.location.href = "";
      });
    }
  });
}

init();
