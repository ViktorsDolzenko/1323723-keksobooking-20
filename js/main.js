'use strict';

var MAX_PRICE = 100000;
var PLACE_TYPE = ['flat', 'bungalo', 'house', 'palace'];
var CHECK_IN = ['12:00', '13;00', '14:00'];
var CHECK_OUT = ['12:00', '13;00', '14:00'];
var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ALL_DESCRIPTIONS = ['хата на курьих ножках', 'красивый потолотк', 'квартирка огонек', 'уютная', 'Лучше вы не видели', 'для мажоров', 'дырявый пол', 'есть кладовка'];
var QUANTITY_OF_ANNOUNCEMENTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var bookingMap = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');

var init = function () {
  bookingMap.classList.remove('map--faded');
  addPins();
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var createObjects = function (quantity) {
  var announcementsObj = [];
  for (var i = 1; i <= quantity; i++) {
    var xPos = randomInteger(0, 1200);
    var yPos = randomInteger(130, 630);
    announcementsObj.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offers: {
        title: 'Заголовок',
        type: getRandomArrayElement(PLACE_TYPE),
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

var addPins = function () {
  var quantity = createObjects(QUANTITY_OF_ANNOUNCEMENTS);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < quantity.length; i++) {
    fragment.appendChild(renderPins(quantity[i]));
  }
  mapPins.appendChild(fragment);
};
init();
