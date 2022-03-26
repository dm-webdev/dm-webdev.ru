"use strict";

import "wicg-inert";
import { showMenu } from "../../utils/js/showMenu";
import { hideMenu } from "../../utils/js/hideMenu";

window.addEventListener("DOMContentLoaded", function () {
  const showButton = document.querySelector(".burger");
  const hideButton = document.querySelector("#hide-menu");
  const menu = document.querySelector(".menu");

  if (window.innerWidth < 1224) {
    menu.inert = true;
      showButton.addEventListener("click", show);
      menu.addEventListener("click", hideOnClick);
      document.addEventListener("keydown", hideOnPress);    
  } else {
    menu.inert = false;
  }

  window.addEventListener("resize", () => {
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
    showMenu(menu, "menu_show", showButton);
  };

  function hideOnClick(ev) {
    if (
      ev.target == hideButton ||
      ev.target.tagName == "A" ||
      ev.target.tagName == "SPAN"
    ) {
      hideMenu(menu, "menu_show", showButton);
    };
  };

  function hideOnPress(ev) {
    if (ev.code == "Escape") {
      hideMenu(menu, "menu_show", showButton);
    }
  };
});
