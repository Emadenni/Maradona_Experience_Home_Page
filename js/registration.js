import { hideRegisterOverlay, showCustomAlert } from "./script.js";
import { loginUser } from "./login.js";

async function registerUser(event) {
  event.preventDefault();
  const playerData = JSON.parse(localStorage.getItem("playerData")) || {};
  const userData = playerData.data || {};
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showCustomAlert("Inserisci username e password!");
    return;
  }

  if (!userData.first_name || !userData.last_name || !userData.email || !userData.registration_nr) {
    showCustomAlert("Registrazione non valida! Devi usare il link ricevuto via email.");
    return;
  }

  const registrationData = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phoneNr: userData.phoneNr,
    registration_nr: userData.registration_nr,
    serial_nr: userData.serial_nr,
    registeredAt: userData.registeredAt,
    cardType: userData.cardType,
    country: userData.country,
    username,
    password,
  };

  try {
    const response = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Errore nella registrazione!");
    }

    hideRegisterOverlay(document.querySelector(".overlay"));
    showCustomAlert("Registrazione avvenuta con successo!");

    if (playerData?.data?.registration_nr) {
      try {
        await fetch("https://ksqz6pn2ha.execute-api.eu-central-1.amazonaws.com/prod/flagUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({ registration_nr: playerData.data.registration_nr }),
        });
      } catch (error) {
        console.error("Errore nell'aggiornamento di IsUsed:", error);
      }
    }

    localStorage.removeItem("playerData");

    setTimeout(async () => {
      try {
        await loginUser(username, password);
      } catch (error) {
        showCustomAlert(error.message);
      }
    }, 2000);
  } catch (error) {
    console.error("Errore nella richiesta:", error);
    showCustomAlert(error.message);
  }
}

document.getElementById("registration-form").addEventListener("submit", registerUser);
