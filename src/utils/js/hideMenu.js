"use strict"

export function hideMenu(element, showClass, showButton) {
  element.classList.remove(showClass);
  element.inert = true;
  showButton.inert = false;
}