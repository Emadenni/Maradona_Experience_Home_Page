import { hideRegisterOverlay, showCustomAlert } from "./script.js";
import { loginUser } from "./login.js";

function registerUser() {
  const playerData = JSON.parse(localStorage.getItem("playerData")) || {};
  const userData = playerData.data || {};

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

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
    username: username,
    password: password,
  };

  /*-----------------Mock API------------ */
  fetch("https://reqres.in/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  })
    .then((response) => response.json())
    .then(async (data) => {
      if (data.token) {
        const registerOverlay = document.querySelector(".overlay");

        hideRegisterOverlay(registerOverlay);
        alert("Registrazione avvenuta con successo!");

        if (playerData && playerData.data.registration_nr) {
          try {
            await fetch("https://ksqz6pn2ha.execute-api.eu-central-1.amazonaws.com/prod/flagUser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
              body: JSON.stringify({ registration_nr: playerData.data.registration_nr }),
            });
          } catch (error) {
            console.error("Errore nell'aggiornamento di IsUsed:", error);
          }
        } else {
        }

        localStorage.removeItem("playerData");

        setTimeout(async () => {
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;

          try {
            const token = await loginUser(username, password);
          } catch (error) {
            alert(error.message);
          }
        }, 2000);
      } else {
        alert("Errore nella registrazione! Dati di errore: " + JSON.stringify(data));
      }
    })
    .catch((error) => {
      console.error("Errore nella richiesta:", error);
      alert("Si è verificato un errore nella registrazione");
    });
}

document.getElementById("registration-form").addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});
