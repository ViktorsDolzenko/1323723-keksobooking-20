'use strict';
(function () {
  var TIMEOUT_IN_MS = 10000;
  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking/'
  };
  var StatusCode = {
    OK: 200,
    DISCONNECTED: 500,
  };

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      if (xhr.status === StatusCode.DISCONNECTED) {
        onError('Произошла ошибка соединения');
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  window.backend = {
    load: load,
    upload: upload,
  };
})();
