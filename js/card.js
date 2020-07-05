'use strict';
(function () {
  var placesTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом'
  };
  var formEnable = document.querySelector('.ad-form');
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

  var renderCards = function (cards) {
    var cardsElement = mapCard.cloneNode(true);
    cardsElement.querySelector('.popup__title').textContent = cards.offer.title;
    cardsElement.querySelector('.popup__text--address').textContent = cards.offer.address;
    var cardPrice = cardsElement.querySelector('.popup__text--price');
    cardPrice.textContent = cards.offer.price;
    cardPrice.innerHTML += ' &#x20bd;<span>/ночь</span>';
    cardsElement.querySelector('.popup__type').textContent = placesTypes[cards.offer
      .type];
    cardsElement.querySelector('.popup__text--capacity').textContent = cards.offer.rooms + ' Комнаты для ' + cards.offer.guests + ' Гостей';
    cardsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cards.offer.checkin + ' выезд до ' + cards.offer.checkout;
    cardsElement.querySelector('.popup__avatar').src = cards.author.avatar;
    cardsElement.querySelector('.popup__description').textContent = cards.offer.description;

    var featuresFragment = document.createDocumentFragment();
    var featuresList = cardsElement.querySelector('.popup__features');
    if (cards.offer.features.length > 0) {
      for (var i = 0; i < cards.offer.features.length; i++) {
        var element = document.createElement('li');
        element.classList.add('popup__feature');
        element.classList.add('popup__feature--' + cards.offer.features[i]);
        featuresFragment.appendChild(element);
      }
      featuresList.innerHTML = '';
      featuresList.appendChild(featuresFragment);
    } else {
      featuresList.remove();
    }
    var popupPhotos = cardsElement.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');
    popupPhotos.removeChild(popupPhoto);
    if (cards.offer.photos.length > 0) {
      cards.offer.photos.forEach(function (item) {
        var newPhoto = popupPhoto.cloneNode(false);
        popupPhotos.appendChild(newPhoto);
        newPhoto.src = item;
      });
    } else {
      popupPhotos.remove();
    }
    var cardCloseButton = cardsElement.querySelector('.popup__close');
    bookingMap.insertBefore(cardsElement, filterContainer);


    cardCloseButton.addEventListener('click', onCardClickClose);
    document.addEventListener('keydown', onCardKeyDownClose);
  };


  var onPostSuccess = function () {
    window.form.disabled();
    var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    formEnable.appendChild(successMessage);
    successMessage.addEventListener('click', function () {
      successMessage.remove();
    });
  };

  formEnable.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(formEnable), onPostSuccess);
    evt.preventDefault();
  });


  window.card = {
    onCardClickClose: onCardClickClose,
    renderCards: renderCards,
  };
})();
