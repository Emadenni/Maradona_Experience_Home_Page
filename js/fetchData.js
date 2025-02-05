import { showCustomAlert } from "./script.js";

/* window.addEventListener("DOMContentLoaded", async (event) => {
  const currentUrl = window.location.href;

  function getPlayerParam(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("player");
  }

  const playerId = getPlayerParam(currentUrl);

  if (playerId) {
    console.log("Player ID:", playerId);
    makeApiCall(playerId);
  } else {
    console.log("No player parameter found in URL.");
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

    // Gestione dell'errore 403
    if (response.status === 403) {
      showCustomAlert(
        `L'utente risulta già registrato. Se pensi sia un errore, contattaci a: <a class="mailSupport" href="mailto:support@example.com">info@depzon.com</a>.`,
        false
      );
      return;
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
    console.log("Dati salvati nel local storage.");
  } catch (error) {
    console.error("Errore:", error);
  }
  }
}); */ /* FINAL FUNCTION */

window.addEventListener("DOMContentLoaded", async (event) => {
  const testUrl = "http://localhost/testpage.html?player=1d3f599c-9d07-4e11-adea-b13f7bd14b65";

  function getPlayerParam(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("player");
  }

  const playerId = getPlayerParam(testUrl);

  if (!playerId) {
    console.log('Parametro "player" non trovato nell\'URL.');
    return;
  }

  console.log("Player ID estratto dalla query string:", playerId);

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

    // Gestione dell'errore 403
    if (response.status === 403) {
      showCustomAlert(
        `L'utente risulta già registrato. Se pensi sia un errore, contattaci a: <a class="mailSupport" href="mailto:support@example.com">info@depzon.com</a>.`,
        false
      );
      return;
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
    console.log("Dati salvati nel local storage.");
  } catch (error) {
    console.error("Errore:", error);
  }
});