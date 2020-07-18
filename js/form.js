'use strict';
(function () {
  var formEnable = document.querySelector('.ad-form');
  var bookingMap = document.querySelector('.map');
  var address = formEnable.querySelector('#address');

  var disabled = function () {
    var disableForm = formEnable.querySelectorAll('fieldset');
    disableForm.forEach(function (item) {
      if (bookingMap.classList.contains('map--faded')) {
        item.setAttribute('disabled', true);
      } else {
        item.removeAttribute('disabled');
      }
    });
  };
  var addressLocation = function () {
    address.value = window.pin.position();
  };

  window.form = {
    disabled: disabled,
    addressLocation: addressLocation,
  };
})();
