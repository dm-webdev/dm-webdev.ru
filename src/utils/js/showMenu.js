"use strict";

export function showMenu(element, showClass, showButton) {
  element.classList.add(showClass);
  element.inert = false;
  showButton.inert = true;
}