'use strict';
(function () {
  var MAX_PRICE = 10000;
  var PLACE_TYPE = ['flat', 'bungalo', 'house', 'palace'];
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ALL_DESCRIPTIONS = ['хата на курьих ножках', 'красивый потолок', 'квартирка огонек', 'уютная', 'Лучше вы не видели', 'для мажоров', 'дырявый пол', 'есть кладовка'];
  var placesTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом'
  };

  var bookingMap = document.querySelector('.map');
  var filterContainer = bookingMap.querySelector('.map__filters-container');
  var mapCard = document.querySelector('#card').content.
  querySelector('.map__card');

  var onCardClickClose = function () {
    var cardPopup = document.querySelector('.popup');
    if (cardPopup) {
      cardPopup.remove();
    }
    document.removeEventListener('keydown', onCardKeyDownClose);
  };

  var onCardKeyDownClose = function (evt) {
    if (evt.key === 'Escape') {
      onCardClickClose();
    }
  };
  var createObjects = function (quantity) {
    var announcementsObj = [];
    for (var i = 1; i <= quantity; i++) {
      var xPos = window.util.randomInteger(0, 1200);
      var yPos = window.util.randomInteger(130, 630);
      announcementsObj.push({
        author: {
          avatar: 'img/avatars/user0' + (i) + '.png'
        },
        offers: {
          title: 'Заголовок ' + i,
          type: window.util.getRandomArrayElement(PLACE_TYPE),
          address: xPos + ', ' + yPos,
          price: window.util.randomInteger(0, MAX_PRICE),
          rooms: window.util.randomInteger(1, 5),
          guests: window.util.randomInteger(1, 10),
          checkin: window.util.getRandomArrayElement(CHECK_IN),
          checkout: window.util.getRandomArrayElement(CHECK_OUT),
          features: ALL_FEATURES.slice(0, window.util.randomInteger(1, ALL_FEATURES.length)),
          photos: PLACE_PHOTOS.slice(0, window.util.randomInteger(1, PLACE_PHOTOS.length)),
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
    var cardCloseButton = cardsElement.querySelector('.popup__close');
    bookingMap.insertBefore(cardsElement, filterContainer);


    cardCloseButton.addEventListener('click', onCardClickClose);
    document.addEventListener('keydown', onCardKeyDownClose);
  };
  window.card = {
    createObjects: createObjects,
    onCardClickClose: onCardClickClose,
    renderCards: renderCards,
  };
})();
