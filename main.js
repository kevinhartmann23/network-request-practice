//PAGES
const mainPage = document.querySelector(".main-poster")
const addTeamPage = document.querySelector(".team-form")
const savedPage = document.querySelector(".saved-cards")
const cardsGrid = document.querySelector(".saved-cards-grid")
let miniCards = document.querySelector(".mini-card")

//BUTTONS
const showForm = document.querySelector(".show-form")
const showMain = document.querySelector(".show-main")
const addTeam = document.querySelector(".make-card")
const showSaved = document.querySelector(".show-saved")
const backToMain = document.querySelector(".back-to-main")
const makeCard = document.querySelector(".make-card")

//INPUTS
const teamName = document.querySelector("#team-name")
const teamCoach = document.querySelector("#head-coach")
const teamSport = document.querySelector("#sport")

//EVENT LISTENERS
showForm.addEventListener('click', toggleFormPage)
showMain.addEventListener('click', toggleFormPage)
showSaved.addEventListener('click', toggleSavedPage)
backToMain.addEventListener('click', toggleSavedPage)
makeCard.addEventListener('click', addTeamToSaved)

//Globals

let Promise = fetch('http://localhost:3001/api/v1/sport-teams')
  .then(response => response.json())
  .then(data => data.forEach(obj => {
    if(!currentData.includes(obj)){
      currentData.push(obj);
    }
  }));

let currentData = [];

//EVENT HANDLERS & HELPER FUNCTIONS
// function getData(){
//   let Promise = fetch('http://localhost:3001/api/v1/sport-teams')
//     .then(response => response.json())
//     .then(data => data.forEach(obj => {
//       if(!currentData.includes(obj)){
//         currentData.push(obj);
//       }
//     }));
//     return Promise;
// }

function toggleFormPage(){
  mainPage.classList.toggle('hidden');
  addTeamPage.classList.toggle('hidden')
}

function toggleSavedPage(){
  mainPage.classList.toggle('hidden');
  savedPage.classList.toggle('hidden');
  createGrid();
  interactWithSavedCards();
}

function createGrid(){
  cardsGrid.innerHTML = ""
  currentData.forEach(obj => {
    return cardsGrid.innerHTML +=
      `<section class="mini-card" id="${obj.id}">
          <h3 class="title">Team Name:</h2>
          <h1>${obj.name}</h1>
          <h2>Head Coach: ${obj.head_coach}</h2>
          <h1>${obj.sport}</h4>
        </section>
      `
  })
}

function addTeamToSaved(){
  let newObj = {
    "id": currentData.length + 1,
    "name": teamName.value,
    "head_coach": teamCoach.value,
    "sport": teamSport.value
  };
  const option = {
    method: 'POST',
    body: JSON.stringify(newObj),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  fetch('http://localhost:3001/api/v1/sport-teams', option)
}

function interactWithSavedCards(){
  miniCards = document.querySelectorAll(".mini-card")
  return miniCards.forEach(card => {
    console.log('CONNECTED')
    card.addEventListener("dblclick", deleteMiniCard)
  })
}

function deleteMiniCard(event){
  const cardId = event.target.id || event.target.parentElement.id
  const option2 = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  fetch(`http://localhost:3001/api/v1/sport-teams/${cardId}`, option2)
}
