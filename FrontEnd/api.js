async function getAllWorks() {
  // Récupération des pièces depuis l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();
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
