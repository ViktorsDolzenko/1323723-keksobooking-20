'use strict';
(function () {
  var onInit = function () {
    window.form.disabled();
    window.form.addressLocation();
  };

  window.onload = function () {
    onInit();
  };
})();
