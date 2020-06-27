'use strict';
(function () {
  var prices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var formEnable = document.querySelector('.ad-form');
  var type = formEnable.querySelector('#type');
  var price = formEnable.querySelector('#price');
  var capacity = formEnable.querySelector('#capacity');
  var roomNumber = formEnable.querySelector('#room_number');
  var submitButton = formEnable.querySelector('.ad-form__submit');
  var timein = formEnable.querySelector('#timein');
  var timeout = formEnable.querySelector('#timeout');


  timein.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });

  timeout.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
  });


  type.addEventListener('change', function (evt) {
    price.min = prices[evt.target.value];
    price.placeholder = prices[evt.target.value];
  });

  submitButton.addEventListener('click', function () {
    if (+roomNumber.value < +capacity.value || +roomNumber.value === 100 || +capacity.value === 0) {
      capacity.setCustomValidity('Гостям слишком тесно, выберите другое количество комнат.');
    } else {
      capacity.setCustomValidity('');
    }
    if (+roomNumber.value === 100 && +capacity.value === 0) {
      capacity.setCustomValidity('');
    }
  });
})();
