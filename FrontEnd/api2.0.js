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

//gestion des boutons 

const buttonAll = document.querySelector("#btnAll");
buttonAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    getAllWorks();
});

const buttonObjects = document.querySelector("#btnObjects");
buttonObjects.addEventListener("click", function () {
    const worksFilterObjects = works.filter(function (work) {
        return work.category.name === "Objets"; 
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksFilterObjects);
});

const buttonApartments = document.querySelector("#btnApartments");
buttonApartments.addEventListener("click", function () {
    const worksFilterApartments = works.filter(function (work) {
        return work.category.name === "Appartements"; 
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksFilterApartments);
});

const buttonHotelsAndRestaurants = document.querySelector("#btnHotelsAndRestaurants");
buttonHotelsAndRestaurants.addEventListener("click", function () {
    const worksFilterHotelsAndRestaurants = works.filter(function (work) {
        return work.category.name === "Hotels & restaurants"; 
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksFilterHotelsAndRestaurants);
});