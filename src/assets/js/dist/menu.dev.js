"use strict";

require("wicg-inert");

var _showMenu = require("../../utils/js/showMenu");

var _hideMenu = require("../../utils/js/hideMenu");

window.addEventListener("DOMContentLoaded", function () {
  var showButton = document.querySelector(".burger");
  var hideButton = document.querySelector("#hide-menu");
  var menu = document.querySelector(".menu");

  if (window.innerWidth < 1224) {
    menu.inert = true;
    showButton.addEventListener("click", show);
    menu.addEventListener("click", hideOnClick);
    document.addEventListener("keydown", hideOnPress);
  } else {
    menu.inert = false;
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth < 1224) {
      if (!menu.classList.contains("menu_show")) {
        menu.inert = true;
        showButton.addEventListener("click", show);
        menu.addEventListener("click", hideOnClick);
        document.addEventListener("keydown", hideOnPress);
      }
    } else {
      menu.inert = false;
      showButton.removeEventListener("click", show);
      menu.removeEventListener("click", hideOnClick);
      document.removeEventListener("keydown", hideOnPress);
    }
  });

  function show() {
    (0, _showMenu.showMenu)(menu, "menu_show", showButton);
  }

  ;

  function hideOnClick(ev) {
    if (ev.target == hideButton || ev.target.tagName == "A" || ev.target.tagName == "SPAN") {
      (0, _hideMenu.hideMenu)(menu, "menu_show", showButton);
    }

    ;
  }

  ;

  function hideOnPress(ev) {
    if (ev.code == "Escape") {
      (0, _hideMenu.hideMenu)(menu, "menu_show", showButton);
    }
  }

  ;
});