"use strict";
//create a game that allows a person to make a set of smoothies and scores them on their performance
// create all the query selectors
const fruit = document.querySelectorAll(".btn-fruit");
const submit = document.querySelector(".btn-submit");
//create smoothie names and the fruits needed and store as array
const bananaSmoothie = ["banana", "milk", "yohgurt"];
const bigBerry = ["blueBerry", "raspberry", "strawberry"];
const fiestyIcy = ["mango", "pinapple", "ice"];
const recipes = [bananaSmoothie, bigBerry, fiestyIcy];

//create score variables.
let totalScore = 0;
let currentScore = 0;

//display the smoothie name and all the ingredients for 3s

//hide recipe

//function which checks what fruit clicked on and checks if its in the recipe array
for (let i = 0; i < fruit.length; i++) {
  fruit[i].addEventListener("click", function () {
    let fruitName = fruit[i].textContent;
    if (recipes[0].includes(fruitName)) {
      currentScore++;
      console.log(currentScore, fruitName);
    } else {
      currentScore--;
      console.log(currentScore, fruitName);
    }
  });
}

//on click submit add current score to total score and move to next recipe
submit.addEventListener("click", function () {
  totalScore += currentScore;
  currentScore = 0;
  console.log(totalScore);
});
//load new recipe
//reset current score and smoothie
