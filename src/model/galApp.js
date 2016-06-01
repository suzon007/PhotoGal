// (function() {

  'use strict';
  var ENTER_KEY = 13;
  // var picTitle = document.getElementById('pTitle');
  // var picUrl = document.getElementById('pUrl');
  // var button = document.getElementById('submit-image');
  // ==============Database Declaration================================
  var db = new PouchDB('photoGal');
  var remoteCouch = false;

  db.changes({
    since:'now',
    live: true
  }).on('change', showGal);

  // ==============INSERTING PIC================================
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
// ==============READING PIC================================
  function showGal(){
    db.allDocs({include_docs:true, decending:true}, function(err, doc){
      redrawGalUI(doc.rows);
    });
  }

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
  function updateButtonPressed(photoGal){
    document.getElementById('edit_' + photoGal._id).style.visibility = 'visible';
  }
  function editTitle(event, photoGal){
    var updatedTitle = document.getElementById('edit_' + photoGal._id);
    if (event.keyCode === ENTER_KEY) {
      photoGal.title = updatedTitle.value;
      db.put(photoGal);
    }
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

  var updateBtn = document.createElement('input');
  updateBtn.className = 'updateBtn';
  updateBtn.setAttribute("type","button");
  updateBtn.setAttribute("value", "UPDATE");
  updateBtn.addEventListener( 'click', updateButtonPressed.bind(this, photoGal));

  var editInput = document.createElement('input');
  editInput.id = 'edit_' + photoGal._id;
  editInput.className = 'editTitle';
  editInput.setAttribute("type","text");
  editInput.setAttribute("value", photoGal.title);

  editInput.addEventListener( 'keypress', editTitle.bind(this, photoGal));
  // var imgSpanHoverText = document.createElement('p');
  // imgSpanHoverText.className = 'imgSpanHoverText';
  // imgSpanHoverText.innerHTML = photoGal.title;


  var imgSpanHover = document.createElement('p');
  imgSpanHover.className = 'imgSpanHover';
  imgSpanHover.innerHTML = photoGal.title;
  // imgSpanHover.appendChild(imgSpanHoverText);

  var anchor = document.createElement('a');
  anchor.className = 'anchorLink';
  anchor.setAttribute("href",photoGal.url);
  anchor.appendChild(image);
  anchor.appendChild(imgSpanHover);
  // anchor.appendChild(delBtn);

  var li = document.createElement('li');
  li.id = 'li_' + photoGal._id;
  li.className = 'listHover';
  li.appendChild(anchor);
  li.appendChild(editInput);
  li.appendChild(delBtn);
  li.appendChild(updateBtn);

  return li;
}
  // ==============Events================================






// })();
