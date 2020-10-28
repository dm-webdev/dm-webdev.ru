"use strict";
import { Swiper } from "swiper/bundle";
import "swiper/swiper-bundle.css";

window.addEventListener("DOMContentLoaded", function () {
  const mySwiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      reverseDirection: true,
    },
  });

  window.addEventListener("resize", () => {
    mySwiper.update();
  });
});
