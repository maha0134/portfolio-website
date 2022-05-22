const APP = {
  init: () => {
    // document.querySelector(".loader").addEventListener("animationend", () => {
    //   document.querySelector(".loader").classList.add("completed");
    // });
    document.getElementById("ham").addEventListener("click", APP.hamClicked);
    document
      .getElementById("backbone")
      .addEventListener("click", APP.dotClicked);
  },
  hamClicked: (event) => {
    const nav = event.currentTarget;
    nav.classList.toggle("clicked");
    if (nav.classList.contains("clicked")) {
      nav.firstElementChild.textContent = "close";
    } else {
      nav.firstElementChild.textContent = "menu";
    }
  },
  dotClicked: (event) => {
    const dot = event.target.closest(".dots");
    if (dot) {
      event.currentTarget.querySelector(".filled").classList.remove("filled");
      dot.classList.add("filled");
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
