pl.view.createPhoto = {

  addEventListeners: function(){
    var picTitle = document.getElementById('pTitle');
    var picUrl = document.getElementById('pUrl');
    var button = document.getElementById('submit-image');

    button.addEventListener('click', newPicHandler, false);

    function newPicHandler(){
      addPic(picTitle.value, picUrl.value );
      picTitle.value = "";
      picUrl.value = "";
    }


  },


};
