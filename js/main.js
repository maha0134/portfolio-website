const APP = {
  //global variables
  nav: document.querySelector(".list-unstyled"),
  ham: document.getElementById("ham"),
  loader: document.querySelector(".loader"),
  text: document.querySelector(".text-part"),
  email: document.getElementById("email"),
  headings: document.querySelector(".headings"),
  list: document.querySelector(".portfolio .card-container"),
  scrolling: false,

  //initial functions
  init: () => {
    if (!location.hash) {
      APP.setPage(false);
    } else {
      APP.setNav(false);
    }
    APP.loader.addEventListener("animationend", APP.animationEnd);
  },

  addListenersAndEffects: () => {
    APP.bigScreenEffects(false);
    document.addEventListener("scroll", APP.scrollThrottle);
    window.addEventListener("resize", APP.bigScreenEffects);
    APP.ham.addEventListener("click", APP.hamClicked);
    APP.nav.addEventListener("click", APP.setNav);
    APP.email.addEventListener("click", APP.emailClicked);
    APP.headings.addEventListener("click", APP.headingClicked);
  },

  bigScreenEffects: (event) => {
    const cards = document.querySelectorAll(".card-md");
    if (window.innerWidth > 640) {
      APP.typeWriter(true);
      cards.forEach((card) => {
        VanillaTilt.init(card, {
          speed: 400,
          glare: true,
          "max-glare": 0.4,
          scale: 1.1,
        });
      });
    } else {
      if (event) {
        APP.typeWriter(false);
        cards.forEach((card) => card.vanillaTilt.destroy());
      } else {
        APP.text.textContent =
          "Hi! My name is Akshay and I love to solve problems. Here are a few things that I can create:";
      }
    }
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
    APP.ham.children[0].classList.add("rotate-left");
    APP.ham.children[1].classList.add("vanish");
    APP.ham.children[2].classList.add("rotate-right");
    APP.nav.style.width = "100vw";
    APP.nav.ariaHidden = "false";
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
    APP.nav.ariaHidden = "true";
    APP.ham.children[0].classList.remove("rotate-left");
    APP.ham.children[1].classList.remove("vanish");
    APP.ham.children[2].classList.remove("rotate-right");
    APP.nav.classList.remove("clicked");
    document.body.classList.remove("blur");
    APP.nav.style.width = "";
    APP.nav.classList.add("width");
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
    APP.addListenersAndEffects();
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

  typeWriter: (status) => {
    let typeWriter = new Typewriter(APP.text, {
      autoStart: false,
    });
    if (status) {
      typeWriter
        .pauseFor(2000)
        .typeString("Hi! My name is Akshay and I love to solve problems.")
        .pauseFor(1500)
        .deleteAll()
        .typeString("Here are a few things that I can create:")
        .start();
    } else {
      typeWriter.stop();
      APP.text.textContent =
        "Hi! My name is Akshay and I love to solve problems. Here are a few things that I can create:";
    }
  },

  //function to prevent bots from scrapping personal email
  emailClicked: (event) => {
    event.preventDefault();
    location.href = "mailto:akshaymahajan81@gmail.com";
  },

  headingClicked: (event) => {
    const clickedHeading = event.target.closest("h3");
    if (clickedHeading) {
      if (clickedHeading.classList.contains("selected")) return;
      document.querySelector("h3.selected").classList.remove("selected");
      clickedHeading.classList.add("selected");
      if (clickedHeading.id === "web") {
        APP.list.classList.remove("show-mobile");
      } else {
        APP.list.classList.add("show-mobile");
      }
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
