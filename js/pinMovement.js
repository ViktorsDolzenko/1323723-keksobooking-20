'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map__overlay');
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();

      var mapRect = map.getBoundingClientRect();
      var pinRect = mainPin.getBoundingClientRect();
    }
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var pinX = moveEvt.clientX - mapRect.x;
      var pinY = moveEvt.clientY - mapRect.y;
      mainPin.style.top = Math.max(130, Math.min(630, pinY)) - pinRect.height - window.pin.PIN_ANGLE + 'px';
      mainPin.style.left = Math.max(0, Math.min(1200, pinX)) - pinRect.width / 2 + 'px';
      window.form.addressLocation();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
