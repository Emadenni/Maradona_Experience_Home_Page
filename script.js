document.addEventListener("DOMContentLoaded", () => {
  fetch("overlay/overlay.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("overlay-container").innerHTML = data;

      const overlay = document.querySelector("#overlay");
      const closeButton = document.querySelector(".close-overlay");
      overlay.classList.remove("hidden");

      closeButton.addEventListener("click", () => {
        overlay.classList.add("hidden");
      });
    })
    .catch((error) => console.error("Errore nel caricamento dell'overlay:", error));
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
  