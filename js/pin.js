'use strict';
(function () {
  var QUANTITY_OF_ANNOUNCEMENTS = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_ANGLE = 22;


  var bookingMap = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPins = document.querySelector('.map__pins');
  var activationButton = mapPins.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var formEnable = document.querySelector('.ad-form');

  var activationHandlerClick = function (evt) {
    if (evt.which === 1) {
      activation();
      removeActivationListeners();
    }
  };
  var activationHandlerKey = function (evt) {
    if (evt.key === 'Enter') {
      activation();
      removeActivationListeners();
    }
  };

  activationButton.addEventListener('mousedown', activationHandlerClick);
  activationButton.addEventListener('keydown', activationHandlerKey);

  var removeActivationListeners = function () {
    activationButton.removeEventListener('mousedown', activationHandlerClick);
    activationButton.removeEventListener('keydown', activationHandlerKey);
  };

  var activation = function () {
    bookingMap.classList.remove('map--faded');
    formEnable.classList.remove('ad-form--disabled');
    var quantity = window.card.createObjects(QUANTITY_OF_ANNOUNCEMENTS);
    addPins(quantity);
    window.form.addressLocation();
    window.form.disabled();
  };

  var renderPins = function (pins) {
    var pinsElement = pinTemplate.cloneNode(true);
    pinsElement.style.left = pins.location.x - (PIN_WIDTH / 2) + 'px';
    pinsElement.style.top = pins.location.y - PIN_HEIGHT + 'px';
    var getPin = pinsElement.querySelector('img');
    getPin.src = pins.author.avatar;

    pinsElement.addEventListener('click', function () {
      window.card.onCardClickClose();
      window.card.renderCards(pins);
    });

    return pinsElement;
  };


  var addPins = function (quantity) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity.length; i++) {
      fragment.appendChild(renderPins(quantity[i]));
    }
    mapPins.appendChild(fragment);
  };

  var position = function () {
    if (!bookingMap.classList.contains('map--faded')) {
      var top = mainPin.offsetTop + mainPin.offsetHeight + PIN_ANGLE;
      var left = mainPin.offsetLeft + mainPin.offsetWidth / 2;
    } else {
      top = activationButton.offsetTop + activationButton.offsetHeight;
      left = activationButton.offsetLeft + mainPin.offsetWidth / 2;
    }
    return [Math.floor(top), Math.floor(left)];
  };

  window.pin = {
    position: position,
  };
})();
