"use stricy";
const modalButton = document.querySelector(".show-modal");
const modalPopup = document.querySelector(".overlay");

modalButton.addEventListener("click", function () {
  modalPopup.classList.add("open");
});

modalPopup.addEventListener("click", function () {
  modalPopup.classList.remove("open");
});
