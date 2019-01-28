const IdAuthor = 4;
fetch('../json/content.json')
  .then(response => response.json())
  .then((res) => {
    init(res)
  });

function init(arrayOfDataAboutArchitect){
  const listOfProducts = document.getElementById('product-list');
  const builds = arrayOfDataAboutArchitect[IdAuthor].build;

builds.forEach((value) => {
  const item = document.createElement('li');
  item.textContent = value;
  listOfProducts.appendChild(item);
});

  const arrayOfImg = arrayOfDataAboutArchitect[IdAuthor].img;
  const slider = document.getElementById('photo-slider');
  arrayOfImg.forEach((element) => {
    const container = document.createElement('div');
    slider.appendChild(container);
    const photo = document.createElement('img');
    photo.src = element;
    photo.className = 'element-slider';
    container.appendChild(photo);
  });

  const personPhoto = document.getElementById('person-photo');
  personPhoto.src = arrayOfDataAboutArchitect[IdAuthor].photo;
  const name = document.getElementById('name-architect');
  name.textContent = arrayOfDataAboutArchitect[IdAuthor].name;

  const mymap = L.map('mapid').setView(arrayOfDataAboutArchitect[IdAuthor].map, 4);

  L.marker(arrayOfDataAboutArchitect[IdAuthor].map).addTo(mymap);
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoidml0YWxpYnJ5Y2giLCJhIjoiY2pyY2t2ZjFwMGIwajQ5czE4NXY5ZndmdyJ9.5hn49IM_UjX3YEr1PpVAdA', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
      + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
      + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
  }).addTo(mymap);

  const timeline = document.getElementById('timeline-component');
  timeline.src = arrayOfDataAboutArchitect[IdAuthor].link;


  $('#js-overlay').data('url', arrayOfDataAboutArchitect[IdAuthor].video).attr('data-url', arrayOfDataAboutArchitect[IdAuthor].video);
 
  const video = document.getElementById('js-overlay');
  video.innerHTML = arrayOfDataAboutArchitect[IdAuthor].name;
}




$(document).ready(function(){
$('.slider').slick();
});


$('.js-overlay-start').unbind('click').bind('click', function(e) {
  e.preventDefault();
  var src = $(this).attr('data-url');
  $('.overlay-video').show();
  setTimeout(function() {
    $('.overlay-video').addClass('o1');
    $('#player').attr('src', src);
  }, 100);
});

$('.overlay-video').click(function(event) {
  if (!$(event.target).closest('.videoWrapperExt').length) {
    var PlayingVideoSrc = $('#player').attr('src').replace('&autoplay=1', '');
    $('#player').attr('src', PlayingVideoSrc);
    $('.overlay-video').removeClass('o1');
    setTimeout(function() {
      $('.overlay-video').hide();
    }, 600);
  }
});

$('.close').click(function(event) {
  var PlayingVideoSrc = $('#player').attr('src').replace('&autoplay=1', '');
  $('#player').attr('src', PlayingVideoSrc);
  $('.overlay-video').removeClass('o1');
  setTimeout(function() {
    $('.overlay-video').hide();
  }, 600);
});