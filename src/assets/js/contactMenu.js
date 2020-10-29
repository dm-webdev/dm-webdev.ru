"use strict";

import "wicg-inert";
import { showMenu } from "../../utils/js/showMenu";
import { hideMenu } from "../../utils/js/hideMenu";

window.addEventListener("DOMContentLoaded", function () {
  const showButton = document.querySelector(".contact__btn");
  const hideButton = document.querySelector("#hide-contact");
  const menu = document.querySelector(".contact__menu");
  

  if (window.innerWidth < 768) {
    menu.inert = true;
    showButton.addEventListener("click", show);
    menu.addEventListener("click", hideOnClick);
    document.addEventListener("keydown", hideOnPress);
  } else {
    menu.inert = false;
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      menu.inert = true;
      showButton.addEventListener("click", show);
      menu.addEventListener("click", hideOnClick);
      document.addEventListener("keydown", hideOnPress);
    } else {
      menu.inert = false;
      showButton.removeEventListener("click", show);
      menu.removeEventListener("click", hideOnClick);
      document.removeEventListener("keydown", hideOnPress);
    }
  });

  function show() {
    showMenu(menu, "contact_show", showButton);
  }

  function hideOnClick(ev) {
    if (
      ev.target == hideButton ||
      ev.target.tagName == "A" ||
      ev.target.tagName == "SPAN"
    ) {
      hideMenu(menu, "contact_show", showButton);
    }
  }

  function hideOnPress(ev) {
    if (ev.code == "Escape") {
      hideMenu(menu, "contact_show", showButton);
    }
  }
});
