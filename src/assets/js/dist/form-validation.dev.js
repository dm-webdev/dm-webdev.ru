"use strict";

require("./just-validate");

window.addEventListener("DOMContentLoaded", function () {
  var modal = document.querySelector(".modal");
  new JustValidate(".feedback-form", {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
      phoneNumber: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      text: {
        required: false,
        minLength: 30,
        maxLength: 1500
      },
      checkbox: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста, введите Ваше имя",
        minLength: "Минимальная длина не менее двух символов",
        maxLength: "Максимальная длина не более тридцати символов"
      },
      phoneNumber: {
        required: "Пожалуйста, введите Ваш действующий телефонный номер"
      },
      email: {
        required: "Пожалуйста, введите Ваш действующий E-mail",
        email: "Пожалуйста, введите Ваш действующий E-mail"
      },
      text: {
        required: "Пожалуйста, задайте вопрос",
        minLength: "Минимальная длина не менее 30 символов",
        maxLength: "Минимальная длина не более 1500 символов"
      }
    },
    submitHandler: function submitHandler(form, values, ajax) {
      ajax({
        url: "mail.php",
        method: "POST",
        data: values,
        async: true,
        callback: function callback() {
          modal.classList.remove("hide_modal");
          setTimeout(function () {
            modal.classList.add("hide_modal");
          }, 1300);
          var form = document.forms.contactUs;
          var btn = document.querySelector(".feedback-form__btn");
          form.elements.name.value = "";
          form.elements.phoneNumber.value = "";
          form.elements.email.value = "";
          form.elements.text.value = "";
          form.elements.consent.checked = false;
          btn.setAttribute("disabled", true);
        }
      });
    }
  });
});