let works
async function getAllWorks() {
  // Récupération des pièces depuis l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  works = await reponse.json();
  const valeurWorks = JSON.stringify(works); // Transformation des works en JSON
  console.log(valeurWorks);
  genererWorks(works);
}

async function init() {
  await getAllWorks();
}

init();

function genererWorks(works) {
  // creation des works depuis JSON
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    //Recuperation de l'élement du DOM qui accueuillera les travaux
    const sectionGallery = document.querySelector(".gallery");
    //Création d'une balise dédiée à un projet
    const workElement = document.createElement("article");
    //Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    const nameElement = document.createElement("p");
    nameElement.innerText = article.title;

    sectionGallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(nameElement);
  }
}

//gestion des boutons 

const boutonTous = document.querySelector("#btnTous");
boutonTous.addEventListener("click",function (){
    document.querySelector(".gallery").innerHTML="";
    getAllWorks();
});

const boutonObjets = document.querySelector("#btnObjets");
boutonObjets.addEventListener("click", function (){
    const worksFiltresObjets = works.filter(function(work){
        return work.category.name === "Objets"
    });
    document.querySelector(".gallery").innerHTML="";
    genererWorks(worksFiltresObjets)
});

const boutonAppartements = document.querySelector("#btnAppartements");
boutonAppartements.addEventListener("click", function(){
    const worksFiltresAppartements = works.filter(function(work){
        return work.category.name === "Appartements"
    });
    document.querySelector(".gallery").innerHTML="";
    genererWorks(worksFiltresAppartements)
});

const boutonHotelsEtRestaurants = document.querySelector("#btnHotelsEtRestaurants");
boutonHotelsEtRestaurants.addEventListener("click", function(){
    const worksFiltresHotel = works.filter(function(work){
        return work.category.name === "Hotels & restaurants"
    });
    document.querySelector(".gallery").innerHTML="";
    genererWorks(worksFiltresHotel)
});

//Fonction permettant à l'administrateur de se connecter

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
  }