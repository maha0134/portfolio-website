const APP = {
  init: () => {
    document
      .querySelector(".loader")
      .addEventListener("animationend", APP.animationEnd);
    document.getElementById("ham").addEventListener("click", APP.hamClicked);
    // document.addEventListener("scroll", APP.scroll);
  },
  hamClicked: (event) => {
    const nav = document.querySelector(".list-unstyled");
    const ham = event.currentTarget;
    nav.classList.toggle("clicked");
    if (nav.classList.contains("clicked")) {
      ham.textContent = "close";
      nav.style.width = "100vw";
      ham.classList.add("ham-clicked");
      document.body.classList.add("blur");
      if (nav.classList.contains("width")) {
        nav.classList.remove("width");
      }
    } else {
      document.body.classList.remove("blur");
      nav.style.width = "";
      nav.classList.add("width");
      ham.textContent = "menu";
    }
  },
  // scroll: () => {
  //   const nav = document.querySelector(".list-unstyled");
  //   if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
  //     if (nav.classList.contains("off-screen")) {
  //       nav.classList.remove("off-screen");
  //       nav.classList.add("on-screen");
  //     }
  //   } else {
  //     if (nav.classList.contains("on-screen")) {
  //       nav.classList.remove("on-screen");
  //       nav.classList.add("off-screen");
  //     }
  //   }
  // },
  // if (
  //   document.body.scrollTop > 20 ||
  //   document.documentElement.scrollTop > 20
  // ) {
  //   document.querySelector(".home").classList.add("scrolled");
  // } else {
  //   document.querySelector(".home").classList.remove("scrolled");
  // }
  animationEnd: () => {
    document.body.classList.remove("no-scroll");
    // document.querySelector(".nav").classList.add("visible");
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
