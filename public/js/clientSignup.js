// Validate user input and send login request
const handleSignupSubmit = async (event) => {
  event.preventDefault();
  try {
    const first_name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const city = document.querySelector('#city').value.trim();
    const state = document.querySelector('#state').value.trim();
    const zip = document.querySelector('#zip').value.trim();
    const email = document.querySelector('#email').value.trim();
    const role_id = document.querySelector('#role-id').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const service = document.getElementsByClassName('service');
    const services = [];
    for (let i=0; i<service.length; i++) {
      if (service[i].checked === true)
      services.push(service[i].value);
    }
    const confirmPassword = document
      .querySelector('#confirm-password')
      .value.trim();

    if (!username || !password) {
      alert('You must provide a username and password.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords to not match.');
      return;
    }
    
    const response = await fetch('/api/client-users', {
      method: 'POST',
      body: JSON.stringify({ 
        "username": username, 
        "password": password, 
        "first_name": first_name, 
        "last_name": last_name, 
        "email": email,
        "city": city, 
        "state": state, 
        "zip": zip,
        "role_id": role_id,
        "client": {
            "client_services": [
              ...services
            ]
          }
        }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
      const json = await response.json();
      // window.location.replace(`/client/${json.client.id}`);
      console.log(json)
    } else {
      alert('Failed to sign up.');
      return;
    };
    
     
  } catch (error) {
    console.log(error);
  }
};

document
  .querySelector('.client-signup-form')
  .addEventListener('submit', handleSignupSubmit);
