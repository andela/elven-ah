/* eslint-disable no-undef */
const loginData = document.forms.loginForm.elements;

function login(user) {
  fetchData(`${baseURL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  })
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'index.html';
    });
}

function submit(e) {
  const user = {};
  e.preventDefault();
  const username = loginData.username.value;
  if (username.includes('@') && username.includes('.')) {
    user.email = username;
  } else {
    user.username = username;
  }
  user.password = loginData.password.value;

  login(user);
}
document.forms.loginForm.addEventListener('submit', submit);
