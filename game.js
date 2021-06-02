"use strict";

const ingredientBtn = document.querySelectorAll(".btn-ingredient");
const scoreDisplay = document.querySelector("h2");
const submit = document.querySelector(".btn-submit");
const ingredientsModal = document.querySelector(".modal-container");
const remake = document.querySelector(".remake");
const bgColor = document.querySelectorAll(".smoothie");
const bgGlassColor = document.querySelector(".bg-glass");
const liquidBox = document.querySelector(".liquid-box");
const fruitAmount = document.querySelectorAll(".fruitNumber");
const fruitAmountStyle = document.querySelectorAll("#fruits-added li");
const listItem = document.querySelectorAll("#fruitList li");
const modalPopup = document.querySelector(".overlay");
const recipeProgress = document.querySelector(".recipe-progress");
const finalScore = document.querySelector(".final-score");
const playAgainBtn = document.querySelector(".play-again");

//create smoothie names and the fruits needed and store as array
const bananaSmoothie = ["banana", 2, "milk", 3, "yogurt", 1];
const bigBerry = ["blueberry", 2, "raspberry", 2, "strawberry", 2];
const fiestyIcy = ["mango", 3, "pineapple", 2, "ice", 1];
const summerSmoothie = ["apple", 3, "orange", 2, "pineapple", 1, "mango", 2];
const dairyDose = ["milk", 3, "yogurt", 2, "banana", 1, "chocolate", 2];
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
  "pineapple",
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
let ingrAmountAdded = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//create values.
let totalScore = 0;
let currentScore = 0;
let playing = true;
let recipeNumber = 0;
let nHTML = "";
let timeDisplay = 6000;
let currentRecipe = recipes[recipeNumber];

// function uses recipeNames[recipeNumber] and converts them to have caps and spaces
const getRecipeName = function () {
  if (playing) {
    let recipeOrder = recipeNames[recipeNumber];
    let recipeConvert = recipeOrder.replace(/([A-Z])/g, " $1");
    let recipeTitle =
      recipeConvert.charAt(0).toUpperCase() + recipeConvert.slice(1);
    scoreDisplay.textContent = recipeTitle;
  }
};

//function which loops through arrays when fruit is clicked
for (let i = 0; i < ingredientBtn.length; i++) {
  let fruitName = ingredientBtn[i].textContent;

  ingredientBtn[i].addEventListener("click", function () {
    if (playing) {
      //get current opacity value
      const elementStyle = getComputedStyle(bgColor[i]);
      let opacityValue = new Number(elementStyle.opacity);
      // check opacity value and add opacity (color changer)
      if (opacityValue <= 0.6) {
        opacityValue += 0.1;
        bgColor[i].style.opacity = opacityValue;
      } else {
        console.log("no");
      }
      // adds or removes liquid animation classes
      if (liquidBox.classList.contains("clicked")) {
        liquidBox.classList.remove("fill-animation");
        liquidBox.classList.add("splash-animation");
      } else {
        liquidBox.classList.add("clicked");
        liquidBox.classList.remove("splash-animation");
        liquidBox.classList.add("fill-animation");
        bgGlassColor.style.opacity = "1";
      }
      //shows the appropriate color
      bgColor[i].classList.remove("hidden");

      //get ingredient id and store in array
      let ingredientNumber = ingredientBtn[i].id;
      //add 1 to that position in the array and then change text content
      ingrAmountAdded[ingredientNumber]++;
      //display fruit amounts and change color
      fruitAmount[i].textContent = ` x${ingrAmountAdded[ingredientNumber]}`;
      fruitAmountStyle[i].style.color = "rgb(173, 255, 144)";

      //checks postion in recipie based off fruits name and then +1
      let ingrQ = currentRecipe.indexOf(fruitName) + 1;
      // check if current recipe includes the fruit clicked and add to currentScore
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

//Reset all visual styling and amounts added
const clearAll = function () {
  for (let i = 0; i < ingredientBtn.length; i++) {
    bgColor[i].classList.add("hidden");
    bgColor[i].style.opacity = 0.1;
    liquidBox.classList.remove("clicked");
    liquidBox.classList.remove("fill-animation");
    liquidBox.classList.remove("splash-animation");
    bgGlassColor.style.opacity = "0";
    currentScore = 0;
    ingrAmountAdded = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    fruitAmount[i].textContent = "x0";
    fruitAmountStyle[i].style.color = "white";
  }
};

//function to display current recipe for limited time
const displayRecipe = function (timeDisplay) {
  currentRecipe = recipes[recipeNumber];
  if (playing) {
    for (let i = 0; i < currentRecipe.length; i += 2) {
      // creates a list item and displays fruit and amount
      listItem[i / 2].textContent = `${currentRecipe[i]} x${
        currentRecipe[i + 1]
      }`;
    }
  }
  // timer for display based of timeDisplay (time calculated with submit)
  setTimeout(function () {
    ingredientsModal.classList.add("hidden");
  }, timeDisplay);
};
displayRecipe(timeDisplay);

// Function which resets everything on play again clicked
const playAgain = function () {
  playAgainBtn.addEventListener("click", function () {
    recipeNumber = 0;
    totalScore = 0;
    clearAll();
    getRecipeName();
    //reset all list items for recipes to -
    for (let i = 0; i < recipes[recipeNumber].length + 1; i++) {
      listItem[i].textContent = "-";
    }
    // reset text content for recipe number
    recipeProgress.textContent = `Recipe ${recipeNumber + 1} / ${
      recipes.length
    }`;
    // close modal and set playing to true
    ingredientsModal.classList.remove("hidden");
    displayRecipe();
    modalPopup.classList.remove("open");
    playing = true;
    currentRecipe = recipes[recipeNumber];
  });
};
playAgain();

//Function for send smoothie. Also handles final score
submit.addEventListener("click", function () {
  //check if all recipes have been played
  if (recipeNumber + 1 >= recipeNames.length) {
    playing = false;
    totalScore += currentScore;
    modalPopup.classList.add("open");
    clearAll();
    playAgain();
    finalScore.textContent = `Your Final Score is ${totalScore} / 60`;
  } else {
    totalScore += currentScore;
    recipeNumber++;
    clearAll();
    getRecipeName();
    currentRecipe = recipes[recipeNumber];

    //Check recipeNumber and set time to display
    if (recipeNumber <= 2) {
      timeDisplay = 6000;
    } else if (recipeNumber > 2 && recipeNumber <= 5) {
      timeDisplay = 10000;
    } else {
      timeDisplay = 15000;
    }
    displayRecipe(timeDisplay);
    recipeProgress.textContent = `Recipe ${recipeNumber + 1} / ${
      recipes.length
    }`;
    ingredientsModal.classList.toggle("hidden");
  }
});

//Function for remaking smoothie
remake.addEventListener("click", function () {
  clearAll();
});
