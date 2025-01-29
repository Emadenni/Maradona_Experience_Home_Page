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

  const showLoginOverlay = () => {
    if (loginOverlay) {
      loginOverlay.style.display = "block";
    }
  };

  const hideLoginOverlay = () => {
    if (loginOverlay) {
      loginOverlay.style.display = "none";
    }
  };

  const showRegisterOverlayHideLogin = () => {
    if (registerOverlay && loginOverlay) {
      registerOverlay.classList.remove("hidden");
      loginOverlay.style.display = "none";
    }
  };

  const hideRegisterOverlay = () => {
    if (registerOverlay) {
      registerOverlay.classList.add("hidden");
      registerOverlay.style.justifyContent = "center"; 
    }
  };
  
  if (continueLink) {
    continueLink.addEventListener("click", (event) => {
      event.preventDefault();
      hideRegisterOverlay();
    });
  }
  
  if (loginBtn) {
    loginBtn.addEventListener("click", showLoginOverlay);
  }
  
  if (registerLink) {
    registerLink.addEventListener("click", (event) => {
      event.preventDefault();
      showRegisterOverlayHideLogin();
    });
  }
  
  if (toggleRegisterButton) {
    toggleRegisterButton.addEventListener("click", () => {
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
  }
  
  if (loginOverlay) {
    loginOverlay.addEventListener("click", (event) => {
      if (event.target === loginOverlay) hideLoginOverlay();
    });
  }

  if (loginOverlay) {
    loginOverlay.addEventListener("click", (event) => {
      if (event.target === loginOverlay) hideLoginOverlay();
    });
  }

  
});


function togglePassword() {
  var passwordField = document.getElementById("password");
  var passwordToggleIcon = document.querySelector(".password-toggle i");

  if (passwordField.type === "password") {
    passwordField.type = "text"; 
    passwordToggleIcon.classList.remove("fa-eye");
    passwordToggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password"; 
    passwordToggleIcon.classList.remove("fa-eye-slash");
    passwordToggleIcon.classList.add("fa-eye");
  }
}


function toggleLoginPassword() {
  var passwordField = document.getElementById("login-password");
  var passwordToggleIcon = document.querySelector(".login-password-toggle i");

  if (passwordField.type === "password") {
    passwordField.type = "text"; // Mostra la password
    passwordToggleIcon.classList.remove("fa-eye");
    passwordToggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password"; // Nasconde la password
    passwordToggleIcon.classList.remove("fa-eye-slash");
    passwordToggleIcon.classList.add("fa-eye");
  }
}
