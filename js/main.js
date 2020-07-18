'use strict';
(function () {
  var onInit = function () {
    window.form.disabled();
    window.form.addressLocation();
    window.pin.request();
    window.filter.disableSelects(window.filter.servicesSelects);
    window.filter.disableSelects(window.filter.servicesFeatures);
  };

  window.addEventListener('load', function () {
    onInit();
  });
})();
