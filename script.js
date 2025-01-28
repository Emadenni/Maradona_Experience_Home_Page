document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("blur");
  

      const overlay = document.querySelector(".overlay");
      const closeButton = document.querySelector(".close-overlay");
      const toggleRegisterButton = document.querySelector("#toggle-register");

      
     

      
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          overlay.classList.add("hidden");
        });
      }


      if (toggleRegisterButton) {
        toggleRegisterButton.addEventListener("click", () => {
          const form = document.getElementById("registration-form");
          const arrow = document.querySelector(".register-button .arrow");

          if (form) {
            form.classList.toggle("active");
            form.classList.toggle("hidden");

            // Cambia la freccia
            if (form.classList.contains("active")) {
              arrow.style.transform = "rotate(180deg)";
            } else {
              arrow.style.transform = "rotate(0deg)";
            }
          }
        });
      }
    })
    .catch((error) =>
      console.error("Errore nel caricamento dell'overlay:", error)
    );


function togglePassword() {
  const passwordInput = document.getElementById("password");
  const passwordToggle = document.querySelector(".password-toggle i");

  if (passwordInput) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordToggle.classList.remove("fa-eye");
      passwordToggle.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      passwordToggle.classList.remove("fa-eye-slash");
      passwordToggle.classList.add("fa-eye");
    }
  }
}

