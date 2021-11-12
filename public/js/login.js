// Validate user input and send login request
const handleLoginSubmit = async (event) => {
  event.preventDefault();
  try {
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!username || !password) {
      alert('You must provide a username and password.');
      return;
    }

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      alert('Failed to sign up.');
      return;
    }

    const json = await response.json();

    if (json.user.role_id === 2)
    window.location.replace(`/client/${json.user.client.id}`);
    
    if (json.user.role_id === 1)
    window.location.replace(`/professionals/${json.user.professional.id}`);

  } catch (error) {
    console.log(error);
  }
};

document
  .querySelector('.signup-inner--form')
  .addEventListener('submit', handleLoginSubmit);
