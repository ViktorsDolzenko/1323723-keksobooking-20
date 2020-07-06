'use strict';
(function () {
  var onInit = function () {
    window.form.disabled();
    window.form.addressLocation();
    window.pin.requestPins();
  };

  window.onload = function () {
    onInit();
  };
})();
