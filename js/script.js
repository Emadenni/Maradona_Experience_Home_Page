document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const closeButton = document.querySelector(".close-overlay");
  const toggleRegisterButton = document.querySelector("#toggle-register");
  const continueLink = document.getElementById("continue-link");
  let isOverlayClosed = false;

  if (continueLink) {
    continueLink.addEventListener("click", (event) => {
      event.preventDefault();

      overlay.classList.add("hidden");
      isOverlayClosed = true;
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      overlay.classList.add("hidden");

      isOverlayClosed = true;
    });
  }

  if (toggleRegisterButton) {
    toggleRegisterButton.addEventListener("click", () => {
      const form = document.getElementById("registration-form");
      const arrow = document.querySelector(".register-button .arrow");

      if (form) {
        form.classList.toggle("active");
        form.classList.toggle("hidden");

        if (form.classList.contains("active")) {
          arrow.style.transform = "rotate(180deg)";
        } else {
          arrow.style.transform = "rotate(0deg)";
        }
      }
    });
  }

  if (isOverlayClosed) {
    overlay.classList.add("hidden");
  }
});


function togglePassword() {
  const passwordInput = document.getElementById('password');
  const passwordToggle = document.querySelector('.password-toggle i');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordToggle.classList.remove('fa-eye');
    passwordToggle.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    passwordToggle.classList.remove('fa-eye-slash');
    passwordToggle.classList.add('fa-eye');
  }
}

const loginBtn = document.getElementById("loginBtn");
const loginOverlay = document.querySelector(".login-overlay");

function showLoginOverlay() {
  loginOverlay.style.display = "block";
}

function hideLoginOverlay() {
  loginOverlay.style.display = "none";
}

loginBtn.addEventListener("click", showLoginOverlay);

loginOverlay.addEventListener("click", (event) => {
  if (event.target === loginOverlay) hideLoginOverlay();
});
