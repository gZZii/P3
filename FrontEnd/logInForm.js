export async function logInUser() {
    const formulaireLogIn = document.querySelector(".logInForm");
    formulaireLogIn.addEventListener("submit", async function (event) {
      event.preventDefault();
      const userInfo = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
      };
  
      const userInfoValue = JSON.stringify(userInfo);
  
      try {
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: userInfoValue,
        });
  
        if (response.ok) {
          // La requête a réussi
          const data = await response.json();
  
          // Récupération du token de la réponse
          const token = data.token;
  
          // Stockage du token dans le localStorage
          localStorage.setItem("token", token);
  
          // Redirection vers une autre page
          window.location.href = "index.html";
        } else {
          // La requête a échoué
          throw new Error("Identifiant ou mot de passe incorrect");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert(error.message);
      }
    });
  };