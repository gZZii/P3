"use strict";

//INIT PAGE
// --

// Init nodes
const url = "http://localhost:5678/api/works";
let works; // non utilisable en dehors de getAllWorks sinon

// Page functioning if identify
var token = sessionStorage.getItem("token");


// Init function
//

async function getAllWorks() 
{
  
  // get works from api
  const response = await fetch(url);
  works = await response.json();
  console.log(works);
  generateWorks(works);
};

  // Calling the function getAllWorks immediately 
(async function () {
  await getAllWorks();
})();


function generateWorks(works) 
{
  
  //create des works depuis JSON
  
  for (let i = 0; i < works.length; i++) {
    const article = works[i];

    //tag creation
    const img = document.createElement("img");
    img.src = article.imageUrl;

    const label = document.createElement("p");
    label.textContent = article.title;

    //work Tag
    const workElement = document.createElement("article");
    workElement.appendChild(img);
    workElement.appendChild(label);

    //get the DOM area to stock works
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(workElement);
  };
};




// FILTERS BUTTONS
// --

//Buttons nodes
const btn_all = document.querySelector("#btnAll");
const btn_filter_object = document.querySelector("#btnObjects");
const btn_filter_flats = document.querySelector("#btnAppartments");
const btn_filter_hotels = document.querySelector("#btnHotelsAndRestaurants");

//Buttons actions
//
btn_all.addEventListener("click", (event) => {
  getWorks("all");
});
btn_filter_object.addEventListener("click", (event) => {
  getWorks("Objets");
});
btn_filter_flats.addEventListener("click", (event) => {
  getWorks("Appartements");
});
btn_filter_hotels.addEventListener("click", (event) => {
  getWorks("Hotels & restaurants");
});


//Buttons functions
//

//clean every works in the gallery
function resetGalleryView() {
  document.querySelector(".gallery").innerHTML = "";
}

function filterWorks(category) {
  return works.filter((work) => work.category.name === category);
}

//filter works by category
function getWorks(category) {
  resetGalleryView();

  let _works;

  if (category === "all") _works = works;
  else _works = filterWorks(category);

  //Looping the works by category
  for (let i = 0; i < works.length; i++) {
    const article = _works[i];

    const img = document.createElement("img");
    img.src = article.imageUrl;

    const label = document.createElement("p");
    label.textContent = article.title;

    const workElement = document.createElement("article");
    workElement.appendChild(img);
    workElement.appendChild(label);

    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(workElement);
  };
};




//ADMINISTRATOR MODE
//--
// token is set in the early code line 11


// token conditions
if (token) {

  //Condition n° 1 
  //Suppress Filter Buttons
  document.querySelector(".filter").innerHTML = "";


  //Condition n° 2 
  //MODIFY BUTTONS CREATION
  
      //Portfolio Button 

  const iconPortfolio = document.createElement("i");
  iconPortfolio.classList.add("fa-regular", "fa-pen-to-square");

  const btnPortfolio = document.createElement("button");
  btnPortfolio.innerText = "modifier";
  btnPortfolio.prepend(iconPortfolio);


  const sectionPortfolio = document.querySelector(".portfolioTitleAndButton");
  sectionPortfolio.appendChild(btnPortfolio);




      //Introduction Button

  const iconIntroduction = document.createElement("i");
  iconIntroduction.classList.add("fa-regular", "fa-pen-to-square");

  const btnIntroduction = document.createElement("button");
  btnIntroduction.innerText = "modifier";
  btnIntroduction.prepend(iconIntroduction);

  const sectionProfile = document.querySelector(".introductionButton");
  sectionProfile.appendChild(btnIntroduction);



  //Buttons Action

  btnPortfolio.addEventListener("click", openModal);



  //Condition n°3
  //EDITION BANNER
  //--

  const icon = document.createElement("i");
  icon.classList.add("fa-regular", "fa-pen-to-square");

  const label = document.createElement("p");
  label.innerText = "Mode édition";

  const btnBanner = document.createElement("button");
  btnBanner.innerText = "publier les changements";

  const banner = document.querySelector(".editionBanner");
  banner.appendChild(icon);
  banner.appendChild(label);
  banner.appendChild(btnBanner);
  
  } else {


  //STYLE CORRECTION
  //--

  //editionBanner adjustment 
  const editionBanner = document.querySelector(".editionBanner");
  editionBanner.style.display = "none";
  
  //portFolio adjusment

  const portfolioTitleAndButton = document.querySelector(
    ".portfolioTitleAndButton"
  );
  portfolioTitleAndButton.style.marginRight = "0";

};



//MODALS CREATION
//--

//Modals Function

let modal = null;

function openModal(event) {
  event.preventDefault();
  const target = document.querySelector(".modal");
  target.style.display = "flex";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".modalCloser").addEventListener("click", closeModal);
  modal
    .querySelector("#modalStopPropagation")
    .addEventListener("click", stopPropagation);
}

function closeModal(event) {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modalCloser").removeEventListener("click", closeModal);
  modal
    .querySelector("#modalStopPropagation")
    .removeEventListener("click", stopPropagation);
  modal = null;
}

function openModal2(event) {
  event.preventDefault();
  closeModal(event);
  const target = document.querySelector(".modal2");
  target.style.display = "flex";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal2);
  modal.querySelector(".modalCloser").addEventListener("click", closeModal2);
  modal
    .querySelector("#modalStopPropagation")
    .addEventListener("click", stopPropagation);
  modal.querySelector(".backButton").addEventListener("click", () => {
    closeModal2(event);
    openModal(event);
  });
}

function closeModal2(event) {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal2);
  modal.querySelector(".modalCloser").removeEventListener("click", closeModal2);
  modal
    .querySelector("#modalStopPropagation")
    .removeEventListener("click", stopPropagation);
  modal.querySelector(".backButton").removeEventListener("click", () => {
    closeModal2(event);
    openModal(event);
  });
  modal = null;
}


//Stop Modal close by clicking on it
const stopPropagation = function (event) {
  event.stopPropagation();
};

//Modal exit (Keyboard)
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal(event);
  }
});

//Modal "switch"

document.querySelector("#addPicture").addEventListener("click", openModal2);

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal2(event);
  }
});


//MODAL GALLERY
//--

async function getModalContent() {
  // Récuperation des piéces depuis l'API
  const response = await fetch(url);
  works = await response.json();
  generateModalContent(works);
}

(async function () {
  await getModalContent();
})();

function generateModalContent(works) {
  //create works in modal from json
  for (let i = 0; i < works.length; i++) {
    const article = works[i];

    //création des balises
    const img = document.createElement("img");
    img.src = article.imageUrl;

    const label = document.createElement("p");
    label.textContent = "éditer";

    //création des boutons sur chaque article
    const btn = document.createElement("button");
    btn.dataset.workId = article.id;
    btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btn.addEventListener("click", deleteWork);

    const btnMove = document.createElement("button");
    btnMove.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';
    btnMove.style.display = "none";

    //création d'une balise dédiée à un projet
    const workElement = document.createElement("article");
    workElement.appendChild(img);
    workElement.appendChild(label);
    workElement.appendChild(btn);
    workElement.appendChild(btnMove);

    //recuperation de l'élément du DOM qui acceuillera les travaux
    const modalGallery = document.querySelector(".modalGallery");
    modalGallery.appendChild(workElement);

    // Gestion de l'affichage du bouton de suppression au survol de l'article
    workElement.addEventListener("mouseenter", () => {
      btnMove.style.display = "flex";
      btnMove.style.right = "30px";
    });
    workElement.addEventListener("mouseleave", () => {
      btnMove.style.display = "none";
    });
  }
}

//DELETE WORKS
//--

async function deleteWork(event) {
  event.preventDefault();

  //identify closest work to the button
  const btn = event.target.parentNode;
  const workId = btn.dataset.workId;

  //suppress work in api
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //sucess conditions
  if (response.ok) {
    console.log("le projet a été supprimé avec succès !");
    event.target.closest("article").remove();
  } else {
    alert("Une erreur s'est produite lors de la suppression du projet !");
  }
}


//ADD WORKS
//--

//Form nodes

const form = document.querySelector(".form");
const iconForm = document.getElementById("iconForm");
const label = document.querySelector(".addWorkImage");
const pForm = document.querySelector(".txtImgUpload");
const image = document.getElementById("image"); // = nvFichier
const formTitle = document.getElementById("titre");
const formCategory = document.getElementById("category");
const btnValidate = document.getElementById("btnValidate"); // "Add Work" button
const previewImage = document.getElementById("previewImage"); // = imgDw

// Event listeners for form input fields to track changes

image.addEventListener("input", validateForm);
formTitle.addEventListener("input", validateForm);
formCategory.addEventListener("input", validateForm);

//Function to show the chosen img in the form

image.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const analyzer = new FileReader();

    pForm.style.display = "none";
    label.style.display = "none";
    iconForm.style.display = "none";
    previewImage.style.display = "flex";

    analyzer.readAsDataURL(file);

    analyzer.addEventListener("load", function () {
      previewImage.setAttribute("src", this.result);
    });
  }
});

// Function to check form state and enable/disable the "Add Work" button accordingly

function validateForm() {
  if (
    image.value.trim() !== "" &&
    formTitle.value.trim() !== "" &&
    formCategory.value.trim() !== ""
  ) {
    btnValidate.disabled = false;
    btnValidate.style.backgroundColor = "#1D6154";
  } else {
    btnValidate.disabled = true;
    btnValidate.style.backgroundColor = "#A7A7A7";
  }
  console.log("Fonction validateForm appelée !");
}

async function createWorks(event) {
  event.preventDefault();

  const selectedImage = image.files[0];
  const titre = formTitle.value;
  const category = parseInt(formCategory.value, 10);

  const formData = new FormData();
  formData.append("image", selectedImage);
  formData.append("title", titre);
  formData.append("category", category);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.status === 201) {
    console.log("Le projet a été créé avec succès !");
    form.reset();
    closeModal2(event); // Fermer le modal après la création réussie
    await getAllWorks(); // Mettre à jour la galerie avec le nouveau travail
  } else {
    alert("Une erreur s'est produite lors de la création du projet !");
    console.error(response.status);
    console.error(await response.text());
  }
}

form.addEventListener("submit", createWorks);
