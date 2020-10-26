
var SearchSongs = {};

SearchSongs.searchButton = function(query){

    SoundCloudAPI.getTrack(query);



}

var button = document.querySelector(".js-submit");
button.addEventListener('click', function(){
    var searchResults = document.querySelector(".search-results");
    searchResults.innerHTML = "";

    var query = document.querySelector(".input-search").value;
    SearchSongs.searchButton(query);

});

var input = document.querySelector(".input-search")
input.addEventListener('keyup', function(e){

    if (e.which === 13) {
        var searchResults = document.querySelector(".search-results");
        searchResults.innerHTML = "";

        var query = document.querySelector(".input-search").value;
        SearchSongs.searchButton(query);
    }





})




var SoundCloudAPI = {};

SoundCloudAPI.init =  function(){

	SC.initialize({
	  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue){
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  console.log(tracks);
	  SoundCloudAPI.renderTracks(tracks);
	});

}


var play = document.getElementById("playlistBox");
var search = document.getElementById("searchBox");
var btn = document.getElementById("playlistBtn");

SoundCloudAPI.renderTracks = function(tracks){

	tracks.forEach(function(track){

		var card = document.createElement("div");
    card.classList.add('card');

    var imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDiv');

    var image = document.createElement('img');
    image.classList.add('image-img');
    image.src = track.artwork_url || 'https://picsum.photos/290/290';

    imageDiv.appendChild(image);

    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    var header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = '<a href="'+ track.permalink_url +'" target = "_blank">' +track.title+ '</a>';

    var button = document.createElement("div");
    button.classList.add('ui','bottom', 'attached', 'button', 'js-button');

    var icon = document.createElement('i');
    icon.classList.add('add','icon');

    var text = document.createElement('span');
    text.innerHTML = 'Add to playlist';

    contentDiv.appendChild(header);

    button.appendChild(icon);
    button.appendChild(text);

    button.addEventListener('click', function(){
      SoundCloudAPI.getEmbed(track.permalink_url);
      //if the users screen width <= 1000 they are using mobile css
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        // Take the user to a different screen here.
        play.style.display = "block";
        search.style.display = "none";
        btn.innerText = "Back To Search";
        console.log('Click!');
      }
      //if (window.innerWidth <= 1000) {

      //}
    });

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    card.appendChild(button);




	var searchResults = document.querySelector(".search-results");

	searchResults.appendChild(card)

	});


}

SoundCloudAPI.getEmbed = function(trackURL){
	SC.oEmbed(trackURL, {
      auto_play: true
}).then(function(embed){

  console.log("URL = ", embed);
  var sideBar = document.querySelector(".js-playlist");


  var box = document.createElement("div");
  box.innerHTML = embed.html;

  sideBar.insertBefore(box, sideBar.firstChild);
  localStorage.setItem('key',sideBar.innerHTML);
});
};


var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML  = localStorage.getItem("key");


/*
This hides one of the col's when the button is pressed.
Essentially just switches between the two in mobile mode
*/
function hidePlaylist() {
  if (play.style.display === "none") {
    play.style.display = "block";
    search.style.display = "none";
    btn.innerText = "Back To Search";
  } else {
    play.style.display = "none";
    search.style.display = "block";
    btn.innerText = "Back To Playlist";
  }
}

/*
This is to detect when the app goes into fullscreen again
so I can reset the display on both col's
*/
window.addEventListener('resize', function(){
  if(screen.width >= 1001){
    play.style.display = "block";
    search.style.display = "block";
  } else if (screen.width <= 1000) {
    play.style.display = "none";
    search.style.display = "block";
  }
});
