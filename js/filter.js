'use strict';
(function () {
  var PINS_ON_MAP = 5;
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRoom = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var featuresContainer = filterForm.querySelector('.map__features');
  var bookingMap = document.querySelector('.map');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFeatures = filterForm.querySelectorAll('fieldset');

  var disableSelects = function (classSelector) {
    classSelector.forEach(function (item) {
      if (bookingMap.classList.contains('map--faded')) {
        item.setAttribute('disabled', true);
      } else {
        item.removeAttribute('disabled');
      }
    });
  };


  var priceRange = {
    'low': {
      from: 0,
      to: 10000
    },
    'middle': {
      from: 10000,
      to: 50000
    },
    'high': {
      from: 50001,
      to: 100000
    }
  };

  var filterHousingType = function (pin) {
    return housingType.value === pin.offer.type || housingType.value === 'any';
  };

  var filterHousingPrice = function (pin) {
    var priceRangeValue = priceRange[housingPrice.value];
    return housingPrice.value === 'any' ||
      pin.offer.price >= priceRangeValue.from && pin.offer.price < priceRangeValue.to;
  };

  var filterHousingRoom = function (pin) {
    return housingRoom.value === 'any' ||
      pin.offer.rooms === Number(housingRoom.value);
  };

  var filterHousingGuests = function (pin) {
    return housingGuests.value === 'any' ||
      pin.offer.guests === Number(housingGuests.value);
  };

  var filterByFeatures = function (pin, features) {
    var pinFeatures = pin.offer.features;

    return features.every(function (feature) {
      return pinFeatures.includes(feature);
    });
  };

  var filterPins = function (pins) {
    var newPins = [];
    var features = Array.from(
        featuresContainer.querySelectorAll('input:checked'))
      .map(function (feature) {
        return feature.value;
      });
    var i = 0;
    while (newPins.length < PINS_ON_MAP && i < pins.length) {
      var pin = pins[i];
      if (filterHousingType(pin) &&
        filterHousingPrice(pin) &&
        filterHousingRoom(pin) &&
        filterHousingGuests(pin) &&
        filterByFeatures(pin, features)) {
        newPins.push(pin);
      }
      i++;
      window.card.onSheetClickClose();
    }
    return newPins;
  };

  window.filter = {
    pins: filterPins,
    disableSelects: disableSelects,
    servicesSelects: filterSelects,
    servicesFeatures: filterFeatures,
    servicesForm: filterForm,
  };
})();
