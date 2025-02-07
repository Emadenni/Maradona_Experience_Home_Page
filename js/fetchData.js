import { showCustomAlert } from "./script.js";

/* ↓↓↓↓↓↓↓ FINAL FUNCTION ↓↓↓↓↓ */

window.addEventListener("DOMContentLoaded", async (event) => {
  const currentUrl = window.location.href;
  const registerButton = document.getElementById("toggle-register");
  const registerLink = document.getElementById("register-link");


  function getPlayerParam(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("player");
  }

  const playerId = getPlayerParam(currentUrl);
  const token = sessionStorage.getItem("token");

  if (playerId) {
    
    makeApiCall(playerId);
  } else if (!token) {
    showCustomAlert("Benvenuto! Per registrarti devi arrivare su questa pagina tramite link di benvenuto ricevuto via email. <br/> Se lo hai gia fatto allora fai il login e comincia a giocare.")
    registerButton.style.display = "none";
    registerLink.style.display = "none";
    
  } 

  async function makeApiCall(playerId) {
    const apiUrl = `https://ksqz6pn2ha.execute-api.eu-central-1.amazonaws.com/prod/proxyVerification`;

    try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: playerId,
      }),
    });

    if (response.status === 403) {
      const errorData = await response.json();

      if (errorData.message === "User data is not available.") {
        const token = sessionStorage.getItem("token");

        if (token) {
          showCustomAlert("Bentornato! Hai già effettutato l'accesso. Continua a giocare!");
        } else {
          showCustomAlert("Bentornato! Clicca il link in basso per accedere al tuo account");
        }
        return;
      }
    }

    if (!response.ok) {
      throw new Error("Errore nella chiamata API");
    }

    const data = await response.json();

    document.getElementById("first-name").value = data.data.first_name;
    document.getElementById("name").innerHTML = data.data.first_name;
    document.getElementById("last-name").value = data.data.last_name;
    document.getElementById("email").value = data.data.email;
    document.getElementById("phone").value = data.data.phoneNr;
    document.getElementById("card-type").value = data.data.cardType;
    document.getElementById("nationality").value = data.data.country;

    localStorage.setItem("playerData", JSON.stringify(data));
  } catch (error) {
    console.error("Errore:", error);
    showCustomAlert("Si è verificato un errore. Riprova più tardi.");
    }
    
  }
});  

/* ↓↓↓↓↓↓↓ TESTING FUNCTION ↓↓↓↓↓  I used here a fake URL for to simulate the extraction of the query string */

/* window.addEventListener("DOMContentLoaded", async (event) => {
  const testUrl = "http://localhost/testpage.html?player=**************"; // Insert here parameter for test
  const registerButton = document.getElementById("toggle-register");
  const registerLink = document.getElementById("register-link");
  const registerOverlay = document.getElementsByClassName("overlay")[0]; 

  function getPlayerParam(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("player");
  }

  const playerId = getPlayerParam(testUrl);

  if (!playerId) {
    registerOverlay.classList.remove("hidden");
    registerButton.style.display = "none";
    registerLink.style.display = "none";
    showCustomAlert(
      "Benvenuto! Per registrarti devi arrivare su questa pagina tramite link di benvenuto via email. Se lo hai gia fatto allora fai il login e comincia a giocare"
    );
    return;
  }

  const apiUrl = `https://ksqz6pn2ha.execute-api.eu-central-1.amazonaws.com/prod/proxyVerification`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: playerId,
      }),
    });

    if (response.status === 403) {
      const errorData = await response.json();

      if (errorData.message === "User data is not available.") {
        const token = sessionStorage.getItem("token");

        if (token) {
          showCustomAlert("Bentornato! Hai già effettutato l'accesso. Continua a giocare!");
        } else {
          showCustomAlert("Bentornato! Clicca Login per accedere al tuo account");
          registerButton.style.display = "none";
          registerLink.style.display = "none";
        }
        return;
      }
    }

    if (!response.ok) {
      throw new Error("Errore nella chiamata API");
    }

    const data = await response.json();

    document.getElementById("first-name").value = data.data.first_name;
    document.getElementById("name").innerHTML = data.data.first_name;
    document.getElementById("last-name").value = data.data.last_name;
    document.getElementById("email").value = data.data.email;
    document.getElementById("phone").value = data.data.phoneNr;
    document.getElementById("card-type").value = data.data.cardType;
    document.getElementById("nationality").value = data.data.country;

    localStorage.setItem("playerData", JSON.stringify(data));
  } catch (error) {
    console.error("Errore:", error);
    showCustomAlert("Si è verificato un errore. Riprova più tardi.");
  }
}); */

/* ↑↑↑↑↑↑↑↑ TESTING FUCNTION ↑↑↑↑↑↑ */
