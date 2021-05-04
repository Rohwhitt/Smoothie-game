"use stricy";
const modalButton = document.querySelector(".show-modal");
const modalPopup = document.querySelector(".overlay");

const modalToggle = function () {
  modalButton.addEventListener("click", function () {
    modalPopup.classList.add("open");
  });

  modalPopup.addEventListener("click", function () {
    modalPopup.classList.remove("open");
  });
};

modalToggle();
