$(function () {
  //включение свайпера
  let mySwiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    loopFillGroupWithBlank: true,
    followFinger: true,
    simulateTouch: true,
    allowTouchMove: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination-my",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next-my",
      prevEl: ".swiper-button-prev-my",
    },

    breakpoints: {
      970: {
        slidesPerView: 2,
        spaceBetween: 30,
      },

      1270: {
        slidesPerView: 3,
        spaceBetween: 29,
      },
    },
  });

  //функции отключения скролов
  const disableScroll = function () {
    $("body").addClass("stop-scrolling");
    $("body").bind("touchmove", function (e) {
      e.preventDefault();
    });
  };

  const enableScroll = function () {
    $("body").removeClass("stop-scrolling");
    $("body").unbind("touchmove");
  };

  //открытие и закрытие "узнать больше"
  $(".get-call").on("click", function () {
    $(".call-container").fadeIn(400, disableScroll);
    $(".call-container").removeClass("off");
    $(".call-container").addClass("on");
    $(".form-container").removeClass("off");
    $(".form-container").addClass("on");
  });

  $(".close").on("click", function () {
    $(".call-container").fadeOut(400, enableScroll);
    $(".call-container").removeClass("on");
    $(".call-container").addClass("off");
    $(".form-container").removeClass("on");
    $(".form-container").addClass("off");
  });

  //проверка ввода номера телефона
  $('input[type="tel"]').inputmask({
    mask: "+7 (999) 999-9999",
  });

  //отключение кнопки без согласия на обработку персональных данных

  $("body").on("click", ".checkbox", function () {
    if ($(this).is(":checked")) $(".form__button").attr("disabled", false);
    else $(".form__button").attr("disabled", true);
  });

  //открытие и закрытие "узнать больше"
  $(".get-offer").on("click", function () {
    $(".offer-container").fadeIn(400, disableScroll);
    $(".offer-container").removeClass("off");
    $(".offer-container").addClass("on");
    $(".form-container").removeClass("off");
    $(".form-container").addClass("on");
  });

  $(".close").on("click", function () {
    $(".offer-container").fadeOut(400, enableScroll);
    $(".offer-container").removeClass("on");
    $(".offer-container").addClass("off");
    $(".form-container").removeClass("on");
    $(".form-container").addClass("off");
  });

  //стилизация выбора файла
  $(function () {
    $(".input__upload").styler();
  });

  $(".get-more").on("click", function () {
    $(".info-more-container").fadeIn(400, disableScroll);
    $(".info-more-container").removeClass("off");
    $(".info-more-container").addClass("on");
    $(".form-container").removeClass("off");
    $(".form-container").addClass("on");
  });

  $(".close").on("click", function () {
    $(".info-more-container").fadeOut(400, enableScroll);
    $(".info-more-container").removeClass("on");
    $(".info-more-container").addClass("off");
    $(".form-container").removeClass("on");
    $(".form-container").addClass("off");
  });

  //открытие и закрытие "узнать больше"
  $(".get-price").on("click", function () {
    $(".info-price-container").fadeIn(400, disableScroll);
    $(".info-price-container").removeClass("off");
    $(".info-price-container").addClass("on");
    $(".form-container").removeClass("off");
    $(".form-container").addClass("on");
  });

  $(".close").on("click", function () {
    $(".info-price-container").fadeOut(400, enableScroll);
    $(".info-price-container").removeClass("on");
    $(".info-price-container").addClass("off");
    $(".form-container").removeClass("on");
    $(".form-container").addClass("off");
  });

  $(".nav-top__mobmenu").on("click", function () {
    $(".mobile-menu-container").fadeIn(400);
  });

  $("main, .mobile-menu-container").on("click", function () {
    $(".mobile-menu-container").fadeOut(100);
  });

  //валидация форм

  $("form").each(function () {
    $(this).validate({
      invalidHandler: function () {
        setTimeout(function () {
          $("input, select").trigger("refresh");
        }, 1);
      },

      rules: {
        name: {
          required: true,
          minlength: 3,
          maxlength: 30,
        },

        telephone: {
          required: true,
        },

        question: {
          required: true,
          minlength: 50,
          maxlength: 1500,
        },

        consent: {
          required: false,
        },
      },

      messages: {
        name: {
          required:
            "Для заказа звонка необходимо ввести Ваше имя или обращение",
          minlength: "Минимальная длина не менее трех символов",
        },

        telephone: {
          required: "Для обратного звонка необходимо ввести ваш номер",
        },

        question: {
          required: "Необходимо ввести интересующий вас вопрос",
          minlength: "Минимальная длина не менее пятидесяти символов",
        },

        mail: {
          required: "Введите действительный E-mail",
          email: "Введите действительный E-mail",
        },
      },

      submitHandler(form) {
        let th = $(form);

        $.ajax({
          type: "POST",
          url: "mail.php",
          data: th.serialize(),
          // eslint-disable-next-line func-names
        }).done(() => {
          alert("Данные отправлены.");
          th.trigger("reset");
        });

        return false;
      },
    });
  });
});
