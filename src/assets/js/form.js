"use strict";

import Inputmask from "inputmask";

window.addEventListener("DOMContentLoaded", function () {
  
  const checkbox = document.querySelector(".consent__btn");
  const button = document.querySelector(".feedback-form__btn");

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", true);
    }
  });

  const tel = document.querySelector("input[type='tel']");
  const telMask = new Inputmask("+7 (999) 999-99-99");
 
  telMask.mask(tel);
});
