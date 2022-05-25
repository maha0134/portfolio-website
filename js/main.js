const APP = {
  init: () => {
    document.querySelector(".icons").addEventListener("animationend", () => {
      document.body.classList.remove("no-scroll");
    });
    document.getElementById("ham").addEventListener("click", APP.hamClicked);
    document.addEventListener("scroll", APP.scroll);
  },
  hamClicked: (event) => {
    const nav = event.currentTarget;
    nav.classList.toggle("clicked");
    if (nav.classList.contains("clicked")) {
      nav.firstElementChild.textContent = "close";
      document.body.classList.add("blur");
    } else {
      document.body.classList.remove("blur");
      nav.firstElementChild.textContent = "menu";
    }
  },
  scroll: () => {
    const nav = document.querySelector(".nav");
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      nav.classList.add("sticky-nav");
    } // else {
    //   if (nav.classList.contains("sticky-nav")) {
    //     nav.classList.remove("sticky-nav");
    //   }
    // }
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.querySelector(".home").classList.add("scrolled");
    } else {
      document.querySelector(".home").classList.remove("scrolled");
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
