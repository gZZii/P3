"use strict"

const url = "http://localhost:5678/api/works"; 
let works // non utilisable en dehors de getAllWorks sinon

//gestion de la page si le token est stocké dans le local storage
var token = sessionStorage.getItem('token');



//INIT PAGE
// --

async function getAllWorks ()
{
    // Récuperation des piéces depuis l'API
    const response = await fetch (url);
    works = await response.json();
    console.log(works)
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
        const img = document.createElement("img");
              img.src = article.imageUrl;

        const label = document.createElement("p");
              label.textContent = article.title;

        //création d'une balise dédiée à un projet
        const workElement = document.createElement("article");
              workElement.appendChild(img);
              workElement.appendChild(label);

        //recuperation de l'élément du DOM qui acceuillera les travaux
        const sectionGallery = document.querySelector(".gallery");
              sectionGallery.appendChild(workElement);
    }
};




// FILTERS BUTTONS
// --

//Buttons nodes
const btn_all = document.querySelector("#btnAll");
const btn_filter_object = document.querySelector("#btnObjects");
const btn_filter_flats =  document.querySelector("#btnAppartments");
const btn_filter_hotels = document.querySelector("#btnHotelsAndRestaurants");

//Buttons actions
btn_all.addEventListener("click", event => {
      getWorks('all')
});
btn_filter_object.addEventListener("click", event => {
      getWorks('Objets')
});
btn_filter_flats.addEventListener("click", event => {
      getWorks('Appartements')
});
btn_filter_hotels.addEventListener("click", event => {
      getWorks('Hotels & restaurants')
});


//Buttons functions
function resetGalleryView()
{
      document.querySelector(".gallery").innerHTML ="";
}

function filterWorks(category)
{
      return works.filter(work => work.category.name === category);
}

function getWorks(category)
{
      resetGalleryView();

      let _works;

      if (category === "all")
            _works = works;
      else
            _works = filterWorks(category);
      
      //creéation des works depuis JSON
    for (let i=0; i < works.length; i++)
    {
        const article = _works[i];
        
        //création des balises
        const img = document.createElement("img");
              img.src = article.imageUrl;

        const label = document.createElement("p");
              label.textContent = article.title;

        //création d'une balise dédiée à un projet
        const workElement = document.createElement("article");
              workElement.appendChild(img);
              workElement.appendChild(label);

        //recuperation de l'élément du DOM qui acceuillera les travaux
        const sectionGallery = document.querySelector(".gallery");
              sectionGallery.appendChild(workElement);
    }
};




//ADMINISTRATOR MODE
//--

    
if (token)
{
   //Suppress Filter Buttons
   document.querySelector(".filter").innerHTML = "";
   
   //MODIFY BUTTONS
   //Porftofolio Button
    const iconPortfolio = document.createElement("i");
          iconPortfolio.classList.add("fa-regular", "fa-pen-to-square");

    const btnPortfolio = document.createElement("button");
          btnPortfolio.innerText = 'modifier';
          btnPortfolio.prepend(iconPortfolio);

    const sectionPortfolio = document.querySelector(".portfolioTitleAndButton");
          sectionPortfolio.appendChild(btnPortfolio);


   //Introduction Button

    const iconIntroduction = document.createElement("i");
          iconIntroduction.classList.add("fa-regular", "fa-pen-to-square");

    const btnIntroduction = document.createElement("button");
          btnIntroduction.innerText = 'modifier';
          btnIntroduction.prepend(iconIntroduction);
  
    const sectionProfile = document.querySelector(".introductionButton")
          sectionProfile.appendChild(btnIntroduction);


   //Buttons Action

   btnPortfolio.addEventListener("click",openModal)


   //EDITION BANNER
   //--

   const icon = document.createElement("i");
         icon.classList.add("fa-regular", "fa-pen-to-square");

   const label = document.createElement("p");
         label.innerText = 'Mode édition';

   const btnBanner = document.createElement ("button");
         btnBanner.innerText = 'publier les changements';

   const banner = document.querySelector(".editionBanner");
         banner.appendChild(icon)
         banner.appendChild(label);
         banner.appendChild(btnBanner);

   
} else {
   //STYLE EDITION
   //--

   //Style nodes
   const editionBanner = document.querySelector(".editionBanner");
   const portfolioTitleAndButton = document.querySelector(".portfolioTitleAndButton");

   //Desired Style if !token

   editionBanner.style.display = "none";
   portfolioTitleAndButton.style.marginRight = "0"
};


//MODALS
//--

//Modals Function
let modal = null;

function openModal(event)
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


function closeModal(event)
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

function openModal2(event) 
{    
      event.preventDefault()
      closeModal(event);
      const target = document.querySelector(".modal2");
      target.style.display = "flex";
      target.removeAttribute("aria-hidden");
      target.setAttribute("aria-modal", "true");
      modal = target;
      modal.addEventListener("click", closeModal2);
      modal.querySelector(".modalCloser").addEventListener("click", closeModal2);
      modal.querySelector("#modalStopPropagation").addEventListener("click", stopPropagation);
      modal.querySelector(".backButton").addEventListener("click", () => {
            closeModal2(event);
            openModal(event);
          });
};

function closeModal2(event)
{
        if (modal === null) return;
          event.preventDefault();
          modal.style.display = "none";
          modal.setAttribute("aria-hidden", "true");
          modal.removeAttribute("aria-modal");
          modal.removeEventListener("click", closeModal2);
          modal.querySelector(".modalCloser").removeEventListener("click", closeModal2);
          modal.querySelector("#modalStopPropagation").removeEventListener("click", stopPropagation);
          modal.querySelector(".backButton").removeEventListener("click", () => {
            closeModal2(event);
            openModal(event);
          });
          modal = null;
};


//Stop Modal close by clicking on it 
const stopPropagation = function (event)
{
    event.stopPropagation()
}


//Modal exit (Keyboard)
window.addEventListener('keydown', function (event){
      if (event.key === "Escape" || event.key === "Esc"){
            closeModal(event)
      }
});

//Modal "switch"

document.querySelector("#addPicture").addEventListener("click", openModal2);

window.addEventListener('keydown', function (event){
      if (event.key === "Escape" || event.key === "Esc"){
            closeModal2(event)
      }
});


//MODAL GALLERY
//--


async function getModalContent ()
{
    // Récuperation des piéces depuis l'API
    const response = await fetch (url);
    works = await response.json();
    generateModalContent(works);
}

(async function(){
    await getModalContent();
})();

function generateModalContent(works)
{
      //create works in modal from json
    for (let i=0; i < works.length; i++)
    {
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
              btnMove.style.display = 'none';
              
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
};




//DELETE WORKS
//--

async function deleteWork (event) 
{
      event.preventDefault();

      //identify closest work to the button
      const btn = event.target.parentNode;
      const workId = btn.dataset.workId

      //suppress work in api
      const response = await fetch(`http://localhost:5678/api/works/${workId}`,
      {
            method: "DELETE",
            headers: {
                  Authorization: `Bearer ${token}`
            },
      });

      //sucess conditions
      if (response.ok
            ) {
            console.log("le projet a été supprimé avec succès !");
            event.target.closest("article").remove();
      }
      else
      {
            alert ("Une erreur s'est produite lors de la suppression du projet !")
      }
};

//DELETE EVERY WORKS
//--



//ADD WORKS
//--


      //Creation de la fonction premettant de valider l'envoi du formulaire
      //Form nodes
      
      const form = document.querySelector('addWorkForm');
      const formPhoto = document.getElementById('formPhoto');
      const formTitle = document.getElementById('title');
      const formCategory = document.getElementById('category');
      const btnValidate = document.getElementById('btnValidate'); // "Add Work" button

      // Event listeners for form input fields to track changes

      formImage.addEventListener('input', validateForm);
      formTitre.addEventListener('input', validateForm);
      formCategory.addEventListener('input', validateForm);

      // Function to check form state and enable/disable the "Add Work" button accordingly

      function validateForm() {
            if (formImage.value.trim() !== '' && formTitre.value.trim() !== '' && formCategory.value.trim() !== '') 
            {
                  btnValidate.disabled = false;
                  btnValidate.style.backgroundColor = "#1D6154";
            } else {
                  btnValidate.disabled = true;
                  btnValidate.style.backgroundColor = "#A7A7A7";
            }
            console.log("Fonction validateForm appelée !");
      };

      // Event listener for form submission

      form.addEventListener('submit', createWorks);


      async function createWorks(event) {
        event.preventDefault();

      const image = form.image.src
      const title = form.title.value
      const category = form.category.value

      const data = {
            image: image,
            titre: titre,
            category: category,
      }

      const response = await fetch("http://localhost:5678/api/works",{
            method: "POST",
            headers: 
            {
                  "content-type": "application/json",
                  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
      });

      if (response.status === 201)
      {
            console.log("le projet a été crée avec succès !");
            form.reset();
      }
      else
      {
            alert ("Une erreur s'est produite lors de la création du projet !")
      }
};
