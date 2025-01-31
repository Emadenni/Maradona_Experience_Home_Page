/* 
window.addEventListener('DOMContentLoaded', (event) => {
   
    const currentUrl = window.location.href;
    
    
    function getPlayerParam(url) {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('player'); 
    }
  
   
    const playerId = getPlayerParam(currentUrl);
    if (playerId) {
      console.log('Player ID:', playerId);
      makeApiCall(playerId);
    } else {
      console.log('No player parameter found in URL.');
    }
  
    function makeApiCall(playerId) {
      console.log(`Making API call with player ID: ${playerId}`);
      
      fetch('https://your-api-endpoint.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer f132d8d6fcee49efbfa8261946214621',
          'Referer': '76b65cd5-1950-43bb-abc0-6e4ae405f779'
        },
        body: JSON.stringify({
          playerId: playerId,
          
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        
       
        fillForm(data.data);
        
       
        localStorage.setItem('playerData', JSON.stringify(data.data));
      })
      .catch(error => {
        console.error('API Error:', error);
      });
    }
  
    
    function fillForm(data) {
      document.getElementById('first-name').value = data.first_name;
      document.getElementById('last-name').value = data.last_name;
      document.getElementById('email').value = data.email;
      document.getElementById('phone').value = data.phoneNr;
      document.getElementById('card-type').value = data.cardType;
      document.getElementById('nationality').value = data.country;
  
    }
  });
   */ /* Funzione Finale */

  window.addEventListener('DOMContentLoaded', async (event) => {
    // Simuliamo l'URL di test per il parametro 'player'
    const testUrl = "http://localhost/testpage.html?player=558e7146-373a-41e0-8c04-c0e0a6e2bbb2";
    
    // Funzione per estrarre il parametro 'player' dall'URL
    function getPlayerParam(url) {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('player');
    }
  
    // Estraiamo l'ID del player dal test URL
    const playerId = getPlayerParam(testUrl);
  
    // Se non troviamo il parametro 'player', interrompiamo l'esecuzione
    if (!playerId) {
      console.log('Parametro "player" non trovato nell\'URL.');
      return;
    }
  
    console.log('Player ID estratto dalla query string:', playerId);
  
    // Chiamata API per recuperare i dati usando l'ID del player
    const apiUrl = `https://ksqz6pn2ha.execute-api.eu-central-1.amazonaws.com/prod/proxyVerification`; // Sostituisci con l'API reale
  
  
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          playerId: playerId, // Mandiamo l'ID del player nel body della richiesta
        })
      });
  
      if (!response.ok) {
        throw new Error('Errore nella chiamata API');
      }
  
      const data = await response.json(); // Dati restituiti dalla chiamata API
      console.log('Dati ricevuti:', data);
  
      // Riempimento dinamico del form con i dati ricevuti
      document.getElementById('first-name').value = data.first_name;
      document.getElementById('last-name').value = data.last_name;
      document.getElementById('email').value = data.email;
      document.getElementById('phone').value = data.phoneNr;
      document.getElementById('card-type').value = data.cardType;
      document.getElementById('nationality').value = data.country;
  
      // Salviamo i dati nel local storage
      localStorage.setItem('playerData', JSON.stringify(data));
      console.log('Dati salvati nel local storage.');
  
    } catch (error) {
      console.error('Errore:', error);
    }
  });
  