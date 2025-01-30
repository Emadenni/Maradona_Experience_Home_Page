document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginOverlay = document.querySelector(".login-overlay");
  const registerLink = document.getElementById("register-link");
  const registerOverlay = document.querySelector(".overlay");
  const toggleRegisterButton = document.getElementById("toggle-register");
  const continueLink = document.getElementById("continue-link");
  const registrationForm = document.getElementById("registration-form");
  const arrow = document.querySelector(".register-button .arrow");
  let isFormOpen = false;

  function showLoginOverlay() {
    if (loginOverlay) {
      loginOverlay.style.display = "block";
    }
  }

  function hideLoginOverlay() {
    if (loginOverlay) {
      loginOverlay.style.display = "none";
    }
  }

  const showRegisterOverlayHideLogin = () => {
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
  };

  function updateLoginButton() {
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

  const hideRegisterOverlay = () => {
    if (registerOverlay) {
      registerOverlay.classList.add("hidden");
      registerOverlay.style.justifyContent = "center";
    }
  };

  function logout() {
    sessionStorage.removeItem("token");
    updateLoginButton();
    window.location.reload();
  }

  // Funzione per creare un messaggio personalizzato in una posizione definita
  function showCustomAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert");
    alertBox.innerHTML = `
      
      <button class="close-alert close-btn">X</button>
      <img src="./images/logoExperience.png" class="logo-maradona-experience">
      <p>${message}</p>
    `;
    document.body.appendChild(alertBox);

    alertBox.style.position = "fixed";
    alertBox.style.bottom = "380px";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translateX(-50%)";
    alertBox.querySelector(".close-alert").addEventListener("click", () => {
      alertBox.remove();
    });
  }

  function handleEvent(selector, eventType, callback) {
    switch (selector) {
      case "#continue-link":
        document.querySelector(selector).addEventListener(eventType, (event) => {
          event.preventDefault();
          hideRegisterOverlay();
        });
        break;

      case "#loginBtn":
        document.querySelector(selector).addEventListener(eventType, showLoginOverlay);
        break;

      case "#register-link":
        document.querySelector(selector).addEventListener(eventType, (event) => {
          event.preventDefault();
          showRegisterOverlayHideLogin();
        });
        break;

      case "#toggle-register":
        document.querySelector(selector).addEventListener(eventType, () => {
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
        break;

      case ".login-overlay":
        document.querySelector(selector).addEventListener(eventType, (event) => {
          if (event.target === loginOverlay) hideLoginOverlay();
        });
        break;

      case "#card-link-tournaments":
        document.querySelector(selector).addEventListener(eventType, (event) => {
          event.preventDefault();
          const token = sessionStorage.getItem("token");
          if (token) {
            window.location.href = "/tournaments.html";
          } else {
            showLoginOverlay();
          }
        });
        break;

      case "#close-btn-login":
        document.querySelector(selector).addEventListener(eventType, (event) => {
          event.preventDefault();
          hideLoginOverlay();
        });
        break;

      case ".card2":
        document.querySelector(selector).addEventListener(eventType, (event) => {
          event.preventDefault();
          showCustomAlert(
            "Le lotterie non sono ancora disponibili, ma restate sintonizzati! 🎉 Presto avrete la possibilità di partecipare e vincere fantastici premi."
          );
        });
        break;
      case ".card3":
        document.querySelector(selector).addEventListener(eventType, (event) => {
          event.preventDefault();
          showCustomAlert(
            "I giochi non sono ancora disponibili, ma restate sintonizzati! 🎉 Presto avrete la possibilità di partecipare e vincere fantastici premi."
          );
        });
        break;

      default:
        console.log(`No action defined for ${selector}`);
    }
  }

  updateLoginButton();

  handleEvent("#continue-link", "click");
  handleEvent("#loginBtn", "click");
  handleEvent("#register-link", "click");
  handleEvent("#toggle-register", "click");
  handleEvent(".login-overlay", "click");
  handleEvent("#card-link-tournaments", "click");
  handleEvent("#close-btn-login", "click");
  handleEvent(".card2", "click");
  handleEvent(".card3", "click");
});
