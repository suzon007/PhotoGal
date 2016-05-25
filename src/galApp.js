(function() {

  'use strict';
  var ENTER_KEY = 13;
  var picTitle = document.getElementById('pTitle');
  var picUrl = document.getElementById('pUrl');
  var button = document.getElementById('submit-image')
  // ==============Database Declaration================================
  var db = new PouchDB('photoGal');
  var remoteCouch = false;

  db.changes({
    since:'now',
    live: true
  }).on('change', showGal);

  // ==============WORK with Events================================
  function addPic(pTitle, pUrl){
    var photoGal = {
      _id: new Date().toISOString(),
      title: pTitle,
      url: pUrl,
      completed:false
    };
    db.put(photoGal, function callback(err, result){
      if (!err) {
        console.log("Success Inserting!");
      }
    });
  }

  function showGal(){
    db.allDocs({include_docs:true, decending:true}, function(err, doc){
      redrawGalUI(doc.rows);
    });
  }
  //===============FUNCTIONS FROM WORK WITH EVENTS================
  function redrawGalUI(galImg){
    var ul = document.getElementById('img-list');
    ul.innerHTML = "";
    galImg.forEach(function(photoGal){

      ul.appendChild(createGalListItem(photoGal.doc));
    });
  }

  function deleteButtonPressed(photoGal){
    db.remove(photoGal);
  }
  //==============FUNCTION FOR CREATING DOM ELEMENT=============
function createGalListItem(photoGal){
  var image = document.createElement('img');
  image.className = 'galImg';
  image.src = photoGal.url;
  image.alt = photoGal.title;

  var delBtn = document.createElement('input');
  delBtn.className = 'delBtn';
  delBtn.setAttribute("type","button");
  delBtn.setAttribute("value", "DELETE");
  delBtn.addEventListener( 'click', deleteButtonPressed.bind(this, photoGal));

  var li = document.createElement('li');
  li.id = 'li_' + photoGal._id;
  li.className = 'listHover';
  li.appendChild(image);
  li.appendChild(delBtn);

  return li;
}
  // ==============Events================================
  function newPicHandler(){
    addPic(picTitle.value, picUrl.value );
    picTitle.value = "";
    picUrl.value = "";
  }

  function addEventListeners(){
    button.addEventListener('click', newPicHandler, false);

  }

  addEventListeners();
  showGal();



})();
