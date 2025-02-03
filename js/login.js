const API_URL = "https://reqres.in/api/login";
const loginOverlay = document.querySelector(".login-overlay");

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password: password }),
        });

        let data;
        try {
          data = await response.json();
        } catch (error) {
          throw new Error("Risposta non valida dal server");
        }

        if (response.ok) {
          sessionStorage.setItem("token", data.token);
          alert("Login riuscito!");
          window.location.href = "tournaments.html";
        } else {
          alert("Errore: " + (data.message || "Credenziali errate"));
        }
      } catch (error) {
        console.error("Errore nel login:", error);
        alert("Si è verificato un errore durante il login. Riprova.");
      }
    });
  }

  
});

