"use strict";

//Execute onSubmit when form is
(() => {
  const form = document.querySelector('form');
  form.addEventListener('submit', onSubmit);
})();

async function onSubmit(event)
{
  //cancel default submit push 
  event.preventDefault();

  //form nodes
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;
  const data = {
    email: email,
    password: password,
  }
  
  
  const response = await fetch(" http://localhost:5678/api/users/login",{
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(data),
  });

  if (response.status === 200)
  {
    const json = await response.json();
    sessionStorage.setItem("token", json.token);
    window.location.href = "index.html"
    console.log(json);
  }
  else
  {
    alert("Email ou mot de passe invalide!");
  }
};
