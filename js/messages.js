'use strict';
(function () {
  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var errorButton = errorMessage.querySelector('.error__button');
  var onClickCloseSuccessMessage = function (evt) {
    if (evt.which === 1) {
      if (evt.target === evt.currentTarget) {
        successMessage.remove();
        window.card.pageReset();
        removeKeydownMessageListeners();
      }
    }
  };
  var onKeydownCloseSuccessMessage = function (evt) {
    if (evt.key === 'Escape') {
      successMessage.remove();
      window.card.pageReset();
      removeKeydownMessageListeners();
    }
  };

  var onClickCloseErrorMessage = function (evt) {
    if (evt.which === 1) {
      if (evt.target === evt.currentTarget) {
        errorMessage.remove();
        removeKeydownMessageListeners();
      }
    }
  };


  var onKeydownCloseErrorMessage = function (evt) {
    if (evt.key === 'Escape') {
      errorMessage.remove();
      removeKeydownMessageListeners();
    }
  };

  var removeKeydownMessageListeners = function () {
    document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
    document.removeEventListener('keydown', onKeydownCloseErrorMessage);
  };
  window.messages = {
    successMessage: successMessage,
    errorMessage: errorMessage,
    errorButton: errorButton,
    onClickCloseSuccessMessage: onClickCloseSuccessMessage,
    onKeydownCloseSuccessMessage: onKeydownCloseSuccessMessage,
    onClickCloseErrorMessage: onClickCloseErrorMessage,
    onKeydownCloseErrorMessage: onKeydownCloseErrorMessage,
  };
})();
