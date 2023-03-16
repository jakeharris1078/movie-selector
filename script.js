'use strict';

////////////////////////////////// selectors

const movieDropdown = document.getElementById('movie-selector');
const seatsArr = document.getElementsByClassName('seat');
const movieDetails = document.getElementById('movies-go-here');
const resetBtn = document.getElementById('reset');
const checkoutBtn = document.getElementById('checkout');
const seatsAndCost = document.getElementById('totals-and-cost');

let id;
let title;
let price;
let available;
let selectedSeats;
let costPerTicket;
let costWithoutDollar;
let totalCost;

const hasToggleClass = document
  .getElementById('interactable-seats')
  .getElementsByClassName('toggle-class');

////////////////////////////////// functions

//make seats clickable, add toggle-class on click
for (var i = 0; i < seatsArr.length; i++) {
  let seat = seatsArr[i];
  seat.addEventListener('click', function () {
    seat.classList.toggle('toggle-class');
  });
}

//generate movie data according to user input
const changeMovieDetails = function () {
  selectedSeats = hasToggleClass.length;
  id = movieDropdown.selectedIndex + 1;
  title = document.getElementById(`title-${id}`).textContent;
  price = document.getElementById(`price-${id}`).textContent;

  movieDetails.innerHTML = `
  <div id="movie-${id}-info" class="movie-info">
  <p id="price-${id}">${price}</p>
  <p class="available" id="available-${id}">Available seats: ${
    20 - selectedSeats
  }</p>
  </div>`;
};

//generate selected/cost data according to user input
const changeCostDisplay = function () {
  selectedSeats = hasToggleClass.length;
  id = movieDropdown.selectedIndex + 1;
  price = document.getElementById(`price-${id}`).textContent;
  costPerTicket = price.substring(price.length, price.indexOf(': ') + 2);
  costWithoutDollar = Number(costPerTicket.substring(1));
  totalCost = selectedSeats * costWithoutDollar;

  seatsAndCost.innerHTML = `
  <p class="child" id="seats-num">Seats selected: ${selectedSeats}</p>
  <p class="child" id="cost-num">Total cost: $${totalCost}</p>`;
};

//listen for changes to toggle class; calculate total cost based on price and toggle-class number
for (var i = 0; i < seatsArr.length; i++) {
  let seat = seatsArr[i];
  seat.addEventListener('click', function () {
    changeCostDisplay();
  });
}

//count number of available seats with toggle-class, return & display number
const calcAvailableSeats = function () {
  for (var i = 0; i < seatsArr.length; i++) {
    let seat = seatsArr[i];
    seat.addEventListener('click', function () {
      changeMovieDetails();
    });
  }
};
calcAvailableSeats();

//resets seats to baseline (all clear)
const resetDefaults = function () {
  for (var i = 0; i < seatsArr.length; i++) {
    let seat = seatsArr[i];
    seat.classList.remove('toggle-class');
  }
  seatsAndCost.innerHTML = `
  <p class="child" id="seats-num">Seats selected: 0</p>
  <p class="child" id="cost-num">Total cost: $0</p>`;
};

//display title, price per ticket, and available seats for the selected movie
const displayMovieInfo = function () {
  resetDefaults();
  changeMovieDetails();
};

//listen for form change, clear movieInfo section and replaces it with correct data
movieDropdown.addEventListener('change', function () {
  movieDetails.innerHTML = '';
  displayMovieInfo();
});

//bind clear actions to reset button
resetBtn.addEventListener('click', function () {
  displayMovieInfo();
});

//display alert with cost/tickets data according to user inputs
checkoutBtn.addEventListener('click', function () {
  changeCostDisplay();
  if (!selectedSeats) {
    alert('Please select a seat.');
  }
  if (selectedSeats === 1) {
    alert(`${selectedSeats} ticket for ${title} will cost $${totalCost}.`);
  }
  if (selectedSeats > 1) {
    alert(`${selectedSeats} tickets for ${title} will cost $${totalCost}.`);
  }
});
