'use strict';
(function () {
  var formEnable = document.querySelector('.ad-form');
  var bookingMap = document.querySelector('.map');
  var address = formEnable.querySelector('#address');

  var disabled = function () {
    var disableForm = formEnable.querySelectorAll('fieldset');
    for (var i = 0; i < disableForm.length; i++) {
      if (bookingMap.classList.contains('map--faded')) {
        disableForm[i].setAttribute('disabled', true);
      } else {
        disableForm[i].removeAttribute('disabled');
      }
    }
  };
  var addressLocation = function () {
    address.value = window.pin.position();
  };

  window.form = {
    disabled: disabled,
    addressLocation: addressLocation,
  };
})();
