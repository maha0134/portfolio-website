const APP = {
  //global variables
  nav: document.querySelector(".list-unstyled"),
  ham: document.getElementById("ham"),
  loader: document.querySelector(".loader"),

  //initial functions
  init: () => {
    APP.loader.addEventListener("animationend", APP.animationEnd);
    APP.ham.addEventListener("click", APP.hamClicked);
    APP.nav.addEventListener("click", APP.navClicked);
    // document.addEventListener("scroll", APP.scroll);
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
