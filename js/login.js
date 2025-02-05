import { hideRegisterOverlay, showCustomAlert, updateLoginButton, hideLoginOverlay, showElevatedCard } from "./script.js";
const API_URL = "https://reqres.in/api/login";
const loginOverlay = document.querySelector(".login-overlay");
const registerOverlay = document.querySelector(".overlay");
const loginBtn = document.getElementById("loginBtn");

// login.js

// Funzione di login
export async function loginUser(username, password) {
  const API_URL = "https://reqres.in/api/login";

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

      updateLoginButton(loginBtn);
      
      const loginOverlay = document.querySelector(".login-overlay");
      if (loginOverlay) {
        hideLoginOverlay(loginOverlay)
      }

      showCustomAlert("Complimenti! Hai effettuato l'accesso!");
      showElevatedCard();
      return data.token; 

    
    } else {
      throw new Error(data.message || "Credenziali errate");
    }
  } catch (error) {
    console.error("Errore nel login:", error);
    throw new Error("Si è verificato un errore durante il login. Riprova.");
  }
}

// Gestione dell'evento DOMContentLoaded per il login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      try {
        const token = await loginUser(username, password); // Usa la funzione di login
        console.log("Token ricevuto:", token);
      } catch (error) {
        alert(error.message); // Mostra l'errore se c'è
      }
    });
  }
});
