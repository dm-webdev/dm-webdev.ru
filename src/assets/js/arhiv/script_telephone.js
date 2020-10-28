$(function(){
    //функции отключения скролов
    const disableScroll = function(){
    $('html, body').addClass ('stop-scrolling');
    $('html, body').bind('touchmove', function(e){e.preventDefault()});
    };

    const enableScroll = function(){
    $('html, body').removeClass ('stop-scrolling');
    $('html, body').unbind('touchmove')
    };
        //открытие и закрытие "узнать больше"
    $('.get-call').on('click', function(){
    $('.call-container').fadeIn(400, disableScroll);
    });

    $('.close').on('click', function(){
    $('.call-container').fadeOut(400, enableScroll);
    });

        //проверка ввода номера телефона
    $('input[type="tel"]').inputmask({ "mask": "+7 (999) 999-9999" });

        //валидация форм        
    $(function(){
      $('.call-form').validate({
        rules: {
          name: {
            required: true,
            minlength: 3,
            maxlength: 30
          },

          telephone: {
            required: true
          },
    
          question: {
            required: true,
            minlength: 50,
            maxlength: 1500
          },

          consent: {
            required: false
          }
        },

        messages: {
          name: {
            required: 'Для заказа звонка необходимо ввести Ваше имя или обращение',
            minlength: 'Минимальная длина не менее трех символов'
            },
      
          telephone: {
            required: 'Для обратного звонка необходимо ввести ваш номер'
          },
      
          question: {
            required: 'Необходимо ввести интересующий вас вопрос',
            minlength: 'Минимальная длина не менее пятидесяти символов'
          }
        },

        // submitHandler(form) {
        //   let th = $(form);
      
        //   $.ajax({
        //   type: 'POST',
        //   url: 'mail.php',
        //   data: th.serialize(),
        //   // eslint-disable-next-line func-names
        //   }).done(() => {
      
        //   th.trigger('reset');
        //   });
      
        //   return false;
        // }

      });
    });


          //отключение кнопки без согласия на обработку персональных данных
      $('body').on('click', '.checkbox', function(){
        if($(this).is(':checked')) $('.call-form__button').attr('disabled', false);
       else $('.call-form__button').attr('disabled', true);
      });
    
       

    




    // $('form').each(function () {
      
    //   $(this).validate({

    //     errorPlacement(error, element) {
    //       return true;
    //     },
    //       focusInvalid: false,
                
    //       rules: {
    //         name: {
    //           required: true,
    //           minlength: 3,
    //           maxlength: 30
    //         },

    //         telephone: {
    //           required: true
    //         },

    //         question: {
    //           required: true,
    //           minlength: 50,
    //           maxlength: 1500
    //         }
    //        },

    //       messages: {
    //         name: {
    //           required: 'Необходимо ввести ваше имя',
    //           minlength: 'Минимальная длина 3 символа'
    //         },

    //         telephone: {
    //           required: 'Для обратного звонка необходимо ввести ваш номер'
    //         },

    //         question: {
    //           required: 'Необходимо ввести интересующий вас вопрос',
    //           minlength: 'Минимальная длина 50 символов'
    //         }
    //       },


         



    //       submitHandler(form) {
    //       let th = $(form);

    //       $.ajax({
    //       type: 'POST',
    //       url: 'mail.php',
    //       data: th.serialize(),
    //       // eslint-disable-next-line func-names
    //   }).done(() => {

    //        th.trigger('reset');
    //   });

    //   return false;
    //   }
    //  });

    // });

});