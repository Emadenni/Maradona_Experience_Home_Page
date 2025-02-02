function registerUser() {
   
    const userData = JSON.parse(localStorage.getItem('playerData')) || {};
  
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    
    const registrationData = {
      first_name: userData.first_name,
      last_name: userData.last_name, 
      email: userData.email,
      phoneNr: userData.phoneNr, 
      registration_nr: userData.registration_nr, 
      serial_nr: userData.serial_nr || 77000, 
      registeredAt: userData.registeredAt , 
      cardType: userData.cardType, 
      country: userData.country,
      username: username,
      password: password,
    };
  
    
    fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Risposta API:', data);
      if (data.token) {
        alert('Registrazione avvenuta con successo!');
      } else {
        alert('Errore nella registrazione! Dati di errore: ' + JSON.stringify(data));
      }
    })
    .catch(error => {
      console.error('Errore nella richiesta:', error);
      alert('Si è verificato un errore nella registrazione');
    });
  }
  
 
  document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    registerUser();  
  });
  