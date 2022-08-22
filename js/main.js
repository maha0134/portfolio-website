const APP = {
  //global variables
  nav: document.querySelector(".list-unstyled"),
  ham: document.getElementById("ham"),
  loader: document.querySelector(".loader"),
  text: document.querySelector(".text-part"),
  email: document.getElementById("email"),
  scrolling: false,

  //initial functions
  init: () => {
    if (!location.hash) {
      APP.setPage(false);
    } else {
      APP.setNav(false);
    }

    APP.loader.addEventListener("animationend", APP.animationEnd);
    APP.ham.addEventListener("click", APP.hamClicked);
    APP.nav.addEventListener("click", APP.setNav);
    const cards = document.querySelectorAll(".card-md");
    APP.email.addEventListener("click", APP.emailClicked);
    VanillaTilt.init(cards),
      {
        max: 45,
        speed: 400,
      };
  },

  hamClicked: () => {
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

  //highlights the currently on-screen section in the nav bar
  setNav: (ev) => {
    if (!ev) {
      let hash = location.hash.toString().slice(1) + "-link";
      document.querySelector(".current-page").classList.remove("current-page");
      document.querySelector(`.${hash}`).classList.add("current-page");
    } else {
      const navLink = ev.target.closest("a");
      if (navLink) {
        let hash = location.hash.toString().slice(1);
        document.querySelector("." + hash).scrollIntoView();
      }
    }
  },

  //removes window scrolling till the animation completes
  animationEnd: () => {
    document.body.classList.remove("no-scroll");
    document.addEventListener("scroll", APP.scrollThrottle);
    APP.typeWriter();
  },

  //to avoid throttling during scrolling events
  scrollThrottle: () => {
    if (!APP.scrolling) {
      //setting a timeout of 500ms for scrolling events
      setTimeout(APP.scrolled, 500);
      APP.scrolling = true;
    }
  },

  //function that takes care of scrolling
  scrolled: () => {
    let about = document.querySelector(".about").getBoundingClientRect();
    let home = document.querySelector(".home").getBoundingClientRect();
    let portfolio = document
      .querySelector(".portfolio")
      .getBoundingClientRect();
    let contact = document.querySelector(".contact").getBoundingClientRect();
    if (home.top < window.innerHeight && home.bottom >= 0) {
      APP.setPage("home");
    }
    if (about.top < window.innerHeight / 2 && about.bottom >= 0) {
      APP.setPage("about");
    }
    if (portfolio.top < window.innerHeight / 2) {
      if (contact.top < window.innerHeight) {
        APP.setPage("contact");
      } else {
        APP.setPage("portfolio");
      }
    }
    APP.scrolling = false;
  },
  //pushes the current section(hash) to the url
  setPage: (hash) => {
    let url = new URL(location.href);
    //first load or reload
    if (!hash) {
      url.hash = "home";
      history.replaceState({}, "", url);
    } else {
      url.hash = hash;
      history.pushState({}, "", url);
      APP.setNav();
    }
  },

  typeWriter: () => {
    let typeWriter = new Typewriter(APP.text, {
      autoStart: false,
    });
    typeWriter
      .pauseFor(2000)
      .typeString("Hi! My name is Akshay and I love to solve problems.")
      .pauseFor(1500)
      .deleteAll()
      .typeString("Here are a few things that I can create:")
      .start();
  },

  //function to prevent bots from scrapping personal email
  emailClicked: (event) => {
    event.preventDefault();
    location.href = "mailto:akshaymahajan81@gmail.com";
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
