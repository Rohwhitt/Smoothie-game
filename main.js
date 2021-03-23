"use strict";
//create a game that allows a person to make a set of smoothies and scores them on their performance
// create all the query selectors
const ingredientBtn = document.querySelectorAll(".btn-ingredient");
const submit = document.querySelector(".btn-submit");
const check = document.querySelector(".btn");
const ingredientsModal = document.querySelector(".recipe-ingredients");
const remake = document.querySelector(".remake");
const bgColor = document.querySelectorAll(".smoothie");
//create smoothie names and the fruits needed and store as array
const bananaSmoothie = ["banana", 2, "milk", 3, "yohgurt", 1];
const bigBerry = ["blueberry", 2, "raspberry", 2, "strawberry", 2];
const fiestyIcy = ["mango", 3, "pinapple", 2, "ice", 1];
const summerSmoothie = ["apple", 3, "orange", 2, "pineapple", 1, "mango", 2];
const dairyDose = ["milk", 3, "yohgurt", 2, "banana", 1, "chocolate", 2];
const funNFruity = [
  "mango",
  2,
  "pineapple",
  1,
  "apple",
  2,
  "orange",
  2,
  "ice",
  1,
];
const extremeTropical = [
  "apple",
  4,
  "orange",
  4,
  "mango",
  3,
  "Pineapple",
  3,
  "ice",
  2,
  "strawberry",
  1,
  "raspberry",
  1,
];
//max score = 60. 1st 3 = 6. 2nd 3 = 8, last = 18
const recipes = [
  bananaSmoothie,
  bigBerry,
  fiestyIcy,
  summerSmoothie,
  dairyDose,
  funNFruity,
  extremeTropical,
];
// calculated using ingredientBtn[i].id as position in array
let ingrAmountAdded = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//if recipe includes ingredient and ingredient amount[i] = ?

//const amountTest = bananaSmoothie[0 + 1];

//create values.
let totalScore = 0;
let currentScore = 0;
let playing = true;

let recipeNumber = 0;

//display the smoothie name and all the ingredients for 3s then hide
const displayRecipe = function () {
  ingredientsModal.textContent = recipes[recipeNumber];
  setTimeout(function () {
    ingredientsModal.classList.add("hidden");
  }, 3000);
};
displayRecipe();
/*
const colorChanger = function (opacity) {
  for (let i = 0; i < bgColor.length; i++) {
    //changes opacity based off number of clicks
    bgColor[i].style.opacity = opacity;
    console.log(opacity);
  }
};

*/
//one possible way is to use the text content to add that class. have all the divs premade
//another way is to remove the hidden class from divs.

//function which checks what fruit clicked on and checks if its in the recipe array
for (let i = 0; i < ingredientBtn.length; i++) {
  ingredientBtn[i].addEventListener("click", function () {
    if (playing) {
      //get current opacity value
      const elementStyle = getComputedStyle(bgColor[i]);
      let opacityValue = new Number(elementStyle.opacity);
      // check opacity value and add opacity (color changer)
      if (opacityValue <= 0.35) {
        opacityValue += 0.1;
        bgColor[i].style.opacity = opacityValue;
        console.log(opacityValue);
      } else {
        console.log("no");
      }
      bgColor[i].classList.remove("hidden");

      //get ingredient id and store in array
      let ingredientNumber = ingredientBtn[i].id;
      //add 1 to that position in the array
      ingrAmountAdded[ingredientNumber]++;
      //
      let fruitName = ingredientBtn[i].textContent;
      let currentRecipe = recipes[recipeNumber];
      //checks postion in recipie based off fruits name and then +1
      let ingrQ = currentRecipe.indexOf(fruitName) + 1;
      // add to the amount to ingrAmountAdded
      if (
        currentRecipe.includes(fruitName) &&
        ingrAmountAdded[ingredientNumber] <= currentRecipe[ingrQ]
      ) {
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
  ingrAmountAdded = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < bgColor.length; i++) {
    bgColor[i].classList.add("hidden");
    bgColor[i].style.opacity = 0.1;
  }
});
