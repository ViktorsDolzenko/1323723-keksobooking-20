'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_ANGLE = 15;
  var pins = [];

  var bookingMap = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPins = document.querySelector('.map__pins');
  var activationButton = mapPins.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var formEnable = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');

  var activationOnClick = function (evt) {
    if (evt.which === 1) {
      activation();
      removeActivationListeners();
    }
  };
  var activationOnKey = function (evt) {
    if (evt.key === 'Enter') {
      activation();
      removeActivationListeners();
    }
  };


  activationButton.addEventListener('mousedown', activationOnClick);
  activationButton.addEventListener('keydown', activationOnKey);

  var removeActivationListeners = function () {
    activationButton.removeEventListener('mousedown', activationOnClick);
    activationButton.removeEventListener('keydown', activationOnKey);
  };

  var activation = function () {
    bookingMap.classList.remove('map--faded');
    formEnable.classList.remove('ad-form--disabled');
    addPins();
    window.form.addressLocation();
    window.form.disabled();
    window.filter.disableSelects(window.filter.servicesSelects);
    window.filter.disableSelects(window.filter.servicesFeatures);
  };

  var renderPins = function (pin) {
    var pinsElement = pinTemplate.cloneNode(true);
    pinsElement.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';
    pinsElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    var getPin = pinsElement.querySelector('img');
    getPin.src = pin.author.avatar;

    pinsElement.addEventListener('click', function (evt) {
      window.card.onSheetClickClose();
      window.card.renderSheets(pin);
      evt.currentTarget.classList.add('map__pin--active');
    });

    return pinsElement;
  };


  var addPins = function () {
    var pinsForDraw = window.filter.pins(pins);
    var fragment = document.createDocumentFragment();
    pinsForDraw.forEach(function (item) {
      fragment.appendChild(renderPins(item));
    });
    removePins();
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

  var removePins = function () {
    var createdpins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    createdpins.forEach(function (item) {
      item.remove();
    });
  };


  filterForm.addEventListener('change', window.debounce(addPins, 500));

  window.pin = {
    position: position,
    angle: PIN_ANGLE,
    request: requestPins,
    activationOnClick: activationOnClick,
    activationOnKey: activationOnKey,
    remove: removePins
  };
})();
