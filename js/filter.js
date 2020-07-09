'use strict';
(function () {
  var PINS_ON_MAP = 5;
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');

  var filterHousingType = function (pin) {
    return housingType.value === pin.offer.type || housingType.value === 'any';
  };

  var filterPins = function (pins) {
    var newPins = [];
    var i = 0;
    while (newPins.length < PINS_ON_MAP && i < pins.length) {
      var pin = pins[i];
      if (filterHousingType(pin)) {
        newPins.push(pin);
      }
      i++;
      window.card.onCardClickClose();
    }
    return newPins;
  };

  window.filter = {
    filterPins: filterPins,
  };
})();
