//PAGES
const mainPage = document.querySelector(".main-poster")
const addTeamPage = document.querySelector(".team-form")
const savedPage = document.querySelector(".saved-cards")
const cardsGrid = document.querySelector(".saved-cards-grid")

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
// makeCard.addEventListener('click', addTeamToSaved)

//OPTIONS - POST
const Promise = fetch('http://localhost:3001/api/v1/sport-teams')
  .then(response => response.json())
  .then(data => data.forEach(obj => currentData.push(obj)));

let currentData = []

let newObj = {
    "id": Date.now(),
    "name": teamName.value,
    "head_coach": teamCoach.value,
    "sport": teamSport.value
  }

const option = {
  method: 'POST',
  body: JSON.stringify(this.newObj),
  headers: {
    'Content-Type': 'application/json'
  }
};

//EVENT HANDLERS & HELPER FUNCTIONS
function toggleFormPage(){
  mainPage.classList.toggle('hidden');
  addTeamPage.classList.toggle('hidden')
}

function toggleSavedPage(){
  mainPage.classList.toggle('hidden');
  savedPage.classList.toggle('hidden');
  createGrid();
}

// function addTeamToSaved(){
//   debugger;
//   const promise = fetch('http://localhost:3001/api/v1/sport-teams', this.option)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//   return promise;
//     // .then(joke => renderJoke(joke))
//     // .catch(error => console.log(error));
// }
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
// function populateGrid(){
//   const promise = fetch('http://localhost:3001/api/v1/sport-teams')
//     .then(response => response.json())
//     .then(data => createGrid(data));
//   return promise;
// }
