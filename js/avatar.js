'use strict';
(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserForm = document.querySelector('.ad-form__upload input[type=file]');
  var previewForm = document.querySelector('.ad-form__photo-container');
  var firstLoad = true;


  fileChooserAvatar.addEventListener('change', function () {
    getMatches(fileChooserAvatar, function (reader) {
      previewAvatar.src = reader.result;
    });
  });
  fileChooserForm.addEventListener('change', function () {
    getMatches(fileChooserForm, function (reader) {
      var image = document.createElement('img');
      var imageBlock = document.createElement('div');
      if (firstLoad) {
        previewForm.querySelector('.ad-form__photo:not(.ad-form__photo--container)').remove();
        firstLoad = false;
      }
      image.src = reader.result;
      imageBlock.classList.add('ad-form__photo', 'ad-form__photo--container');
      imageBlock.appendChild(image);
      previewForm.appendChild(imageBlock);
    });
  });


  var getMatches = function (userFile, callback) {
    var file = userFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        callback(reader);
      });
      reader.readAsDataURL(file);
    }
  };
  var deleteFormPhotos = function (formPhotos) {
    formPhotos.forEach(function (item, index) {
      if (index === 0) {
        item.innerHTML = '';
        item.classList.remove('ad-form__photo--container');
      } else {
        item.remove();
      }
    });
    firstLoad = true;
  };

  var reset = function () {
    previewAvatar.src = DEFAULT_AVATAR;
  };
  window.avatar = {
    deleteFormPhotos: deleteFormPhotos,
    reset: reset
  };
})();
