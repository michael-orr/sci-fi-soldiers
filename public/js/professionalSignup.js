
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
    const calendly = document.querySelector('#calendly').value.trim();
    const bio = document.querySelector('#bio').value.trim();
    const role_id = document.querySelector('#role-id').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
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

    const response = await fetch('/api/pro-users', {
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
        "professional": {
            "calendly": calendly,
            "bio": bio
          }
        }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      console.log(json.pro.id);
      window.location.replace(`/professionals/${json.pro.id}`);
      
    } else {
      alert('Failed to sign up.');
      return;
    };
    
     
  } catch (error) {
    console.log(error);
  }
};

document
  .querySelector('.prof-signup-form')
  .addEventListener('submit', handleSignupSubmit);
