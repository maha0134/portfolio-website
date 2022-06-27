const APP = {
  //global variables
  nav: document.querySelector(".list-unstyled"),
  ham: document.getElementById("ham"),
  loader: document.querySelector(".loader"),
  text: document.querySelector(".text-part"),

  //initial functions
  init: () => {
    APP.loader.addEventListener("animationend", APP.animationEnd);
    APP.ham.addEventListener("click", APP.hamClicked);
    APP.nav.addEventListener("click", APP.navClicked);
    const cards = document.querySelectorAll(".card-md");
    VanillaTilt.init(cards),
      {
        max: 45,
        speed: 400,
      };
    let typeWriter = new Typewriter(APP.text, {
      autoStart: false,
    });
    typeWriter
      .pauseFor(4000)
      .typeString("Hi! My name is Akshay Mahajan and I love to solve problems.")
      .pauseFor(1500)
      .deleteAll(5)
      .typeString("Here are a few things that I can create:")
      .start();
  },

  hamClicked: (event) => {
    APP.nav.classList.toggle("clicked");
    if (APP.nav.classList.contains("clicked")) {
      APP.openDrawer();
    } else {
      APP.closeDrawer();
    }
  },
  openDrawer: () => {
    APP.ham.textContent = "close";
    APP.nav.style.width = "100vw";
    document.body.classList.add("blur");
    if (APP.nav.classList.contains("width")) {
      APP.nav.classList.remove("width");
    }
    APP.nav.addEventListener("click", (ev) => {
      APP.closeDrawer(ev);
    });
  },

  closeDrawer: (ev) => {
    if (ev) {
      APP.nav.removeEventListener("click", (ev) => {
        APP.closeDrawer(ev);
      });
    }
    APP.nav.classList.remove("clicked");
    document.body.classList.remove("blur");
    APP.nav.style.width = "";
    APP.nav.classList.add("width");
    APP.ham.textContent = "menu";
  },

  navClicked: (ev) => {
    const navLink = ev.target.closest("a");
    if (navLink) {
      document.querySelector(".current-page").classList.remove("current-page");
      navLink.classList.add("current-page");
    }
  },

  animationEnd: () => {
    document.body.classList.remove("no-scroll");
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
