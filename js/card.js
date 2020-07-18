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
  var mapPins = document.querySelector('.map__pins');
  var activationButton = mapPins.querySelector('.map__pin');
  var resetButton = document.querySelector('.ad-form__reset');
  var main = document.querySelector('main');

  var onCardClickClose = function () {
    var cardPopup = document.querySelector('.popup');
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
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
      cards.offer.features.forEach(function (item) {
        var element = document.createElement('li');
        element.classList.add('popup__feature');
        element.classList.add('popup__feature--' + item);
        featuresFragment.appendChild(element);
      });
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
    main.appendChild(window.messages.successMessage);
    window.messages.successMessage.addEventListener('click', window.messages.onClickCloseSuccessMessage);
    document.addEventListener('keydown', window.messages.onKeydownCloseSuccessMessage);
  };

  var onPostError = function () {
    main.appendChild(window.messages.errorMessage);
    window.messages.errorMessage.addEventListener('click', window.messages.onClickCloseErrorMessage);
    window.messages.errorButton.addEventListener('click', window.messages.onClickCloseErrorMessage);
    document.addEventListener('keydown', window.messages.onKeydownCloseErrorMessage);
  };

  formEnable.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(formEnable), onPostSuccess, onPostError);
    evt.preventDefault();
  });


  var pageReset = function () {
    bookingMap.classList.add('map--faded');
    formEnable.classList.add('ad-form--disabled');
    onCardClickClose();
    formEnable.reset();
    window.filter.servicesForm.reset();
    window.form.disabled();
    window.filter.disableSelects(window.filter.servicesSelects);
    window.filter.disableSelects(window.filter.servicesFeatures);
    window.pin.remove();
    window.form.addressLocation();
    activationButton.addEventListener('mousedown', window.pin.activationOnClick);
    activationButton.addEventListener('keydown', window.pin.activationOnKey);
    var formPhoto = document.querySelectorAll('.ad-form__photo');
    window.avatar.deleteFormPhotos(formPhoto);
    window.avatar.reset();
    window.pin.position();
    window.pinMovement.startCoords();
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    pageReset();
  });

  window.card = {
    onSheetClickClose: onCardClickClose,
    renderSheets: renderCards,
    pageReset: pageReset,
  };
})();
