'use strict';

var MAX_PRICE = 5000;
var PLACE_TYPE = ['flat', 'bungalo', 'house', 'palace'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ALL_DESCRIPTIONS = ['хата на курьих ножках', 'красивый потолок', 'квартирка огонек', 'уютная', 'Лучше вы не видели', 'для мажоров', 'дырявый пол', 'есть кладовка'];
var QUANTITY_OF_ANNOUNCEMENTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var placesTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  palace: 'Дворец',
  house: 'Дом'
};
var bookingMap = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var mapCard = document.querySelector('#card').content.
querySelector('.map__card');
var filterContainer = bookingMap.querySelector('.map__filters-container');

var init = function () {
  var quantity = createObjects(QUANTITY_OF_ANNOUNCEMENTS);
  bookingMap.classList.remove('map--faded');
  addPins(quantity);
  renderCards(quantity[0]);
};

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

var addPins = function (quantity) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < quantity.length; i++) {
    fragment.appendChild(renderPins(quantity[i]));
  }
  mapPins.appendChild(fragment);
};


init();
