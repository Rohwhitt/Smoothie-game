"use strict";
//create a game that allows a person to make a set of smoothies and scores them on their performance
// create all the query selectors
const fruit = document.querySelectorAll(".btn-ingredient");
const submit = document.querySelector(".btn-submit");
const check = document.querySelector(".btn");
const ingredientsModal = document.querySelector(".recipe-ingredients");
const remake = document.querySelector(".remake");

//create smoothie names and the fruits needed and store as array
const bananaSmoothie = ["banana", "milk", "yohgurt"];
const bigBerry = ["blueberry", "raspberry", "strawberry"];
const fiestyIcy = ["mango", "pinapple", "ice"];
const summerSmoothie = ["apple", "orange", "pineapple", "mango"];
const dairyDose = ["milk", "yohgurt", "banana", "chocolate"];
const funNFruity = ["mango", "pineapple", "apple", "orange", "ice"];
const tropical = [
  "apple",
  "orange",
  "mango",
  "Pineapple",
  "ice",
  "strawberry",
  "raspberry",
];
const recipes = [
  bananaSmoothie,
  bigBerry,
  fiestyIcy,
  summerSmoothie,
  dairyDose,
  funNFruity,
  tropical,
];

//create values.
let totalScore = 0;
let currentScore = 0;
let playing = true;
let ingredientAmount = 0;

let recipeNumber = 0;

//display the smoothie name and all the ingredients for 3s then hide
const displayRecipe = function () {
  ingredientsModal.textContent = recipes[recipeNumber];
  setTimeout(function () {
    ingredientsModal.classList.add("hidden");
  }, 3000);
};
displayRecipe();

//function which checks what fruit clicked on and checks if its in the recipe array
for (let i = 0; i < fruit.length; i++) {
  fruit[i].addEventListener("click", function () {
    if (playing) {
      let fruitName = fruit[i].textContent;
      //document.querySelector(fruitName).textContent = "test";
      // add to the amount to ingredientAmount
      ingredientAmount++;
      if (recipes[recipeNumber].includes(fruitName)) {
        currentScore++;
        console.log(currentScore, fruitName);
      } else {
        currentScore--;
        console.log(currentScore, fruitName);
      }
    }
  });
}

const inAmount = function () {};
//on click submit add current score to total score and move to next recipe
submit.addEventListener("click", function () {
  totalScore += currentScore;
  currentScore = 0;
  recipeNumber++;
  ingredientsModal.classList.toggle("hidden");
  displayRecipe();
  if (recipeNumber >= recipes.length) {
    playing = false;
  }
  console.log(totalScore, recipeNumber);
});

//reset current smoothie
remake.addEventListener("click", function () {
  currentScore = 0;
});
