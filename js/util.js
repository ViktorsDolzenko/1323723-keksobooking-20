'use strict';
(function () {
  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var randomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.round(rand);
  };
  window.util = {
    getRandomArrayElement: getRandomArrayElement,
    randomInteger: randomInteger,
  };
})();
