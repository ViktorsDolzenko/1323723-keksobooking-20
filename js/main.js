'use strict';

var MAX_PRICE = 10000;
var PLACE_TYPE = ['flat', 'bungalo', 'house', 'palace'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ALL_DESCRIPTIONS = ['хата на курьих ножках', 'красивый потолок', 'квартирка огонек', 'уютная', 'Лучше вы не видели', 'для мажоров', 'дырявый пол', 'есть кладовка'];
var QUANTITY_OF_ANNOUNCEMENTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_ANGLE = 22;
var placesTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  palace: 'Дворец',
  house: 'Дом'
};
var prices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var bookingMap = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var mapCard = document.querySelector('#card').content.
querySelector('.map__card');
var filterContainer = bookingMap.querySelector('.map__filters-container');
var activationButton = mapPins.querySelector('.map__pin--main');
var formEnable = document.querySelector('.ad-form');
var type = formEnable.querySelector('#type');
var price = formEnable.querySelector('#price');
var address = formEnable.querySelector('#address');
var capacity = formEnable.querySelector('#capacity');
var roomNumber = formEnable.querySelector('#room_number');
var submitButton = document.querySelector('.ad-form__submit');

var init = function () {
  addressLocation();
  disabled();
};
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
  var quantity = createObjects(QUANTITY_OF_ANNOUNCEMENTS);
  addPins(quantity);
  addressLocation();
  disabled();
};


type.addEventListener('change', function (evt) {
  price.min = prices[evt.target.value];
  price.placeholder = prices[evt.target.value];
});

var position = function () {
  if (!bookingMap.classList.contains('map--faded')) {
    var top = activationButton.offsetTop + activationButton.offsetHeight + PIN_ANGLE;
    var left = activationButton.offsetLeft + activationButton.offsetWidth / 2;
  } else {
    top = activationButton.offsetTop + activationButton.offsetHeight;
    left = activationButton.offsetLeft + activationButton.offsetWidth / 2;
  }
  return [Math.floor(top), Math.floor(left)];
};

var addressLocation = function () {
  address.value = position();
};

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

submitButton.addEventListener('click', function () {
  if (+roomNumber.value < +capacity.value || +roomNumber.value === 100 || +capacity.value === 0) {
    capacity.setCustomValidity('Гостям слишком тесно, выберите другое количество комнат.');
  } else {
    capacity.setCustomValidity('');
  }
  if (+roomNumber.value === 100 && +capacity.value === 0) {
    capacity.setCustomValidity('');
  }
});


var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.round(rand);
};


var createObjects = function (quantity) {
  var announcementsObj = [];
  for (var i = 1; i <= quantity; i++) {
    var xPos = randomInteger(0, 1200);
    var yPos = randomInteger(130, 630);
    announcementsObj.push({
      author: {
        avatar: 'img/avatars/user0' + (i) + '.png'
      },
      offers: {
        title: 'Заголовок ' + i,
        type: getRandomArrayElement(PLACE_TYPE),
        address: xPos + ', ' + yPos,
        price: randomInteger(0, MAX_PRICE),
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 10),
        checkin: getRandomArrayElement(CHECK_IN),
        checkout: getRandomArrayElement(CHECK_OUT),
        features: ALL_FEATURES.slice(0, randomInteger(1, ALL_FEATURES.length)),
        photos: PLACE_PHOTOS.slice(0, randomInteger(1, PLACE_PHOTOS.length)),
        descriptions: ALL_DESCRIPTIONS[i],
      },
      location: {
        x: xPos,
        y: yPos,
      }
    });
  }
  return announcementsObj;
};

var renderPins = function (pins) {
  var pinsElement = pinTemplate.cloneNode(true);
  pinsElement.style.left = pins.location.x - (PIN_WIDTH / 2) + 'px';
  pinsElement.style.top = pins.location.y - PIN_HEIGHT + 'px';
  var getPin = pinsElement.querySelector('img');
  getPin.src = pins.author.avatar;
  getPin.alt = pins.offers.title;
  return pinsElement;
};
/* eslint-disable no-unused-vars */
var renderCards = function (cards) {
  var cardsElement = mapCard.cloneNode(true);
  cardsElement.querySelector('.popup__title').textContent = cards.offers.title;
  cardsElement.querySelector('.popup__text--address').textContent = cards.offers.address;
  var cardPrice = cardsElement.querySelector('.popup__text--price');
  cardPrice.textContent = cards.offers.price;
  cardPrice.innerHTML += ' &#x20bd;<span>/ночь</span>';
  cardsElement.querySelector('.popup__type').textContent = placesTypes[cards.offers.type];
  cardsElement.querySelector('.popup__text--capacity').textContent = cards.offers.rooms + ' Комнаты для ' + cards.offers.guests + ' Гостей';
  cardsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cards.offers.checkin + ' выезд до ' + cards.offers.checkout;
  cardsElement.querySelector('.popup__avatar').src = cards.author.avatar;
  cardsElement.querySelector('.popup__description').textContent = cards.offers.descriptions;

  var featuresFragment = document.createDocumentFragment();
  var featuresList = cardsElement.querySelector('.popup__features');

  for (var i = 0; i < cards.offers.features.length; i++) {
    var element = document.createElement('li');
    element.classList.add('popup__feature');
    element.classList.add('popup__feature--' + cards.offers.features[i]);
    featuresFragment.appendChild(element);
  }
  featuresList.innerHTML = '';
  featuresList.appendChild(featuresFragment);

  var popupPhotos = cardsElement.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(popupPhoto);
  if (cards.offers.photos.length > 0) {
    cards.offers.photos.forEach(function (item) {
      var newPhoto = popupPhoto.cloneNode(false);
      popupPhotos.appendChild(newPhoto);
      newPhoto.src = item;
    });
  }

  bookingMap.insertBefore(cardsElement, filterContainer);
};
/* eslint-enable no-unused-vars */
var addPins = function (quantity) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < quantity.length; i++) {
    fragment.appendChild(renderPins(quantity[i]));
  }
  mapPins.appendChild(fragment);
};
init();
