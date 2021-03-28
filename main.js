"use strict";
//create a game that allows a person to make a set of smoothies and scores them on their performance
// create all the query selectors
const ingredientBtn = document.querySelectorAll(".btn-ingredient");
const scoreDisplay = document.querySelector("h2");
const submit = document.querySelector(".btn-submit");
const check = document.querySelector(".btn");
const ingredientsModal = document.getElementById("fruitList");
const remake = document.querySelector(".remake");
const bgColor = document.querySelectorAll(".smoothie");
const fruitAmount = document.querySelectorAll(".fruitNumber");
const fruitDisplay = document.querySelectorAll(".fruit");
const listItem = document.querySelectorAll("li");
const recipeProgress = document.querySelector("h3");
const finalScore = document.querySelector(".final-score");
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
const recipeNames = [
  "bananaSmoothie",
  "bigBerry",
  "fiestyIcy",
  "summerSmoothie",
  "dairyDose",
  "funNFruity",
  "extremeTropical",
];
// calculated using ingredientBtn[i].id as position in array
let ingrAmountAdded = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//if recipe includes ingredient and ingredient amount[i] = ?

//create values.
let totalScore = 0;
let currentScore = 0;
let playing = true;
let recipeNumber = 0;
let nHTML = "";
let currentRecipe = "";
//display the smoothie name and all the ingredients for 3s then hide

//taken out of function for submit
const getRecipeName = function () {
  if (playing) {
    let recipeOrder = recipeNames[recipeNumber];
    let recipeConvert = recipeOrder.replace(/([A-Z])/g, " $1");
    let recipeTitle =
      recipeConvert.charAt(0).toUpperCase() + recipeConvert.slice(1);
    scoreDisplay.textContent = recipeTitle;
  }
};

const displayRecipe = function () {
  setTimeout(function () {
    ingredientsModal.classList.add("hidden");
  }, 4000);
};
displayRecipe();

/*      currentRecipe.forEach(function (fruitItem) {
        nHTML += "<li>" + fruitItem + "</li>";
      });
      document.getElementById("recipeIngredients").innerHTML =
        "<ul>" + nHTML + "</ul>";*/
//function which checks what fruit clicked on and checks if its in the recipe array
for (let i = 0; i < ingredientBtn.length; i++) {
  let fruitName = ingredientBtn[i].textContent;

  ingredientBtn[i].addEventListener("click", function () {
    if (playing) {
      //get current opacity value
      const elementStyle = getComputedStyle(bgColor[i]);
      let opacityValue = new Number(elementStyle.opacity);
      // check opacity value and add opacity (color changer)
      if (opacityValue <= 0.35) {
        opacityValue += 0.1;
        bgColor[i].style.opacity = opacityValue;
      } else {
        console.log("no");
      }
      bgColor[i].classList.remove("hidden");

      //get ingredient id and store in array
      let ingredientNumber = ingredientBtn[i].id;
      //add 1 to that position in the array and then change text content
      ingrAmountAdded[ingredientNumber]++;
      fruitAmount[i].textContent = ` x${ingrAmountAdded[ingredientNumber]}`;

      //let fruitName = ingredientBtn[i].textContent;

      //listDisplay();
      //both already defined. - try fix
      currentRecipe = recipes[recipeNumber];
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

const clearAll = function () {
  for (let i = 0; i < bgColor.length; i++) {
    bgColor[i].classList.add("hidden");
    bgColor[i].style.opacity = 0.1;
    currentScore = 0;
    ingrAmountAdded = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // error occurs but still works
    // fruitAmount[i].textContent = "x0";
  }
};
// currentRecipe is the problem. likely in the click function
const recipeDisplay = function () {
  if (playing) {
    for (let i = 0; i < recipes[recipeNumber].length; i += 2) {
      /* let currentRecipeType = typeof currentRecipe[i];
      if (currentRecipeType == "string") {*/
      listItem[i / 2].textContent = `${recipes[recipeNumber][i]} x${
        recipes[recipeNumber][i + 1]
      }`;
      // fruitDisplay[i].textContent = currentRecipe[i];
      //}
    }
  }
};
recipeDisplay();

const playAgain = function () {
  recipeNumber = 0;
  totalScore = 0;
  clearAll();
  finalScore.classList.add("hidden");
  playing = true;
};
//on click submit add current score to total score and move to next recipe
submit.addEventListener("click", function () {
  if (recipeNumber + 1 >= recipeNames.length) {
    playing = false;
    totalScore += currentScore;
    finalScore.classList.remove("hidden");
    finalScore.textContent = `Your Final Score is ${totalScore} / 60`;
  } else {
    totalScore += currentScore;
    recipeNumber++;
    //new recipe Display
    getRecipeName();
    recipeDisplay();
    // recipe progress
    recipeProgress.textContent = `Recipe ${recipeNumber + 1} / ${
      recipes.length
    }`;

    ingredientsModal.classList.toggle("hidden");
    displayRecipe();

    console.log(recipeNumber, recipeNames.length, playing);
    clearAll();

    console.log(totalScore, recipeNumber);
  }
});

//reset current smoothie
remake.addEventListener("click", function () {
  clearAll();
});
