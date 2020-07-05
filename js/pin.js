'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_ANGLE = 20;
  var pins = [];

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
    addPins();
    window.form.addressLocation();
    window.form.disabled();
  };

  var renderPins = function (pin) {
    var pinsElement = pinTemplate.cloneNode(true);
    pinsElement.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';
    pinsElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    var getPin = pinsElement.querySelector('img');
    getPin.src = pin.author.avatar;

    pinsElement.addEventListener('click', function () {
      window.card.onCardClickClose();
      window.card.renderCards(pin);
    });

    return pinsElement;
  };


  var addPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPins(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  var position = function (top, left) {
    if (!bookingMap.classList.contains('map--faded')) {
      top = mainPin.offsetTop + mainPin.offsetHeight + PIN_ANGLE;
      left = mainPin.offsetLeft + mainPin.offsetWidth / 2;
    } else {
      top = mainPin.offsetTop + mainPin.offsetHeight;
      left = mainPin.offsetLeft + mainPin.offsetWidth / 2;
    }
    return [Math.ceil(top), Math.ceil(left)];
  };


  var onSuccess = function (response) {
    pins = response;
  };

  var requestPins = function () {
    window.backend.load(onSuccess);
  };

  window.pin = {
    position: position,
    PIN_ANGLE: PIN_ANGLE,
    addPins: addPins,
    requestPins: requestPins,
  };
})();
