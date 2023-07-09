"use strict"

const url = "http://localhost:5678/api/works"; 
let works // non utilisable en dehors de getAllWorks sinon
async function getAllWorks ()
{
    // Récuperation des piéces depuis l'API
    const response = await fetch (url);
    works = await response.json();
    generateWorks(works);
}

(async function(){
    await getAllWorks();
})();

function generateWorks(works)
{
    //creéation des works depuis JSON
    for (let i=0; i < works.length; i++)
    {
        const article = works[i];
        
        //création des balises
        const imageElement = document.createElement("img");
              imageElement.src = article.imageUrl;

        const nameElement = document.createElement("p");
              nameElement.textContent = article.title;

        //création d'une balise dédiée à un projet
        const workElement = document.createElement("article");
              workElement.appendChild(imageElement);
              workElement.appendChild(nameElement);

        //recuperation de l'élément du DOM qui acceuillera les travaux
        const sectionGallery = document.querySelector(".gallery");
              sectionGallery.appendChild(workElement);
    }
};

//gestion des boutons filtres

const buttonAll = document.querySelector("#btnAll");
      buttonAll.addEventListener("click", function () 
{
      document.querySelector(".gallery").innerHTML = "";
      getAllWorks();
});

const buttonObjects = document.querySelector("#btnObjects");
      buttonObjects.addEventListener("click", function () 
{
    const worksFilterObjects = works.filter(function (work) 
{
        return work.category.name === "Objets"; 
});
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksFilterObjects);
});

const buttonApartments = document.querySelector("#btnApartments");
      buttonApartments.addEventListener("click", function () 
{
    const worksFilterApartments = works.filter(function (work) 
{
        return work.category.name === "Appartements"; 
});
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksFilterApartments);
});

const buttonHotelsAndRestaurants = document.querySelector("#btnHotelsAndRestaurants");
      buttonHotelsAndRestaurants.addEventListener("click", function () 
{
    const worksFilterHotelsAndRestaurants = works.filter(function (work) 
{
        return work.category.name === "Hotels & restaurants"; 
});
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksFilterHotelsAndRestaurants);
});

//gestion de la page si le token est stocké dans le local storage
var getToken = sessionStorage.getItem('token');
console.log(getToken);

if (getToken)
{
   //supprimer les boutons
   document.querySelector(".filter").innerHTML = "";
   
   //ajouter les boutons modifier 
   //1ere possibilité sur la création des boutons 
    const imageButtonModify = document.createElement("img");
          imageButtonModify.src = "P3/FrontEnd/assets/icons/Group.svg";

    const nameButtonModify = document.createElement("p");
          nameButtonModify.innerText = "modifier";

    const buttonModify = document.createElement("button");
          buttonModify.appendChild(imageButtonModify);
          buttonModify.appendChild(nameButtonModify);

    const sectionPortfolio = document.querySelector("#portfolio");
          sectionPortfolio.appendChild(buttonModify);
          

   //ajouter le bandeau d'édition  

} else {
    //on supprimes les boutons modifier déja présent sur la page 
    //2eme possibilités (plus pratique a mes yeux)
    document.querySelector(".btnModifyProfile").innerHTML = "";
    document.querySelector(".btnModifyProjects").innerHTML = "";
    //j'ai crée 2 class différentes car autrement seulement un seul bouton disparaissait
}

//créer la modale

let modal = null;

const openModal = function (event)
{
    event.preventDefault()
    const target = document.querySelector(".modal");
          target.style.display = "flex";
          target.removeAttribute("aria-hidden");
          target.setAttribute("aria-modal", "true");
          modal = target;
          modal.addEventListener("click", closeModal);
          modal.querySelector(".modalCloser").addEventListener("click", closeModal);
          modal.querySelector("#modalStopPropagation").addEventListener("click", stopPropagation);
};


const closeModal = function (event)
{
        if (modal === null) return;
          event.preventDefault();
          modal.style.display = "none";
          modal.setAttribute("aria-hidden", "true");
          modal.removeAttribute("aria-modal");
          modal.removeEventListener("click", closeModal);
          modal.querySelector(".modalCloser").removeEventListener("click", closeModal);
          modal.querySelector("#modalStopPropagation").removeEventListener("click", stopPropagation);
          modal = null;
};

const stopPropagation = function (event)
{
    event.stopPropagation()
}

document.querySelector(".btnModifyProjects").addEventListener("click", openModal);

// coder une partie pour supprimer le token du localStorage (se deconnecter)