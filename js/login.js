APi_URL

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
  
    if (loginForm) {
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
  
        try {
          const response = await fetch("https://api.fake.com/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            sessionStorage.setItem("token", data.token); 
            alert("Login riuscito!");
            window.location.href = "dashboard.html";
          } else {
            alert("Errore: " + data.message);
          }
        } catch (error) {
          console.error("Errore nel login:", error);
        }
      });
    }
  });
  