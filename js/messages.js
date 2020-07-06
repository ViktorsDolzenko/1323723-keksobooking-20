'use strict';
(function () {
  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var errorButton = errorMessage.querySelector('.error__button');
  var onClickCloseSuccessMessage = function (evt) {
    if (evt.which === 1) {
      successMessage.remove();
      window.card.pageReset();
    }
  };
  var onKeydownCloseSuccessMessage = function (evt) {
    if (evt.key === 'Escape') {
      successMessage.remove();
      window.card.pageReset();
    }
  };

  var onClickCloseErrorMessage = function (evt) {
    if (evt.which === 1) {
      errorMessage.remove();
      window.card.pageReset();
    }
  };

  var onKeydownCloseErrorMessage = function (evt) {
    if (evt.key === 'Escape') {
      errorMessage.remove();
      window.card.pageReset();
    }
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
