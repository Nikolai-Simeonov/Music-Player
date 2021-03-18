function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"rick-astley.jpg",
		audio:"never gonna give you up.mp3",
		songname:"Never Gonna Give You Up",
		artistname:"Rick Astley"
	},
	{
		thumbnail:"queen.jpg",
		audio:"bohemian rhapsody.mp3",
		songname:"Bohemian Rhapsody",
		artistname:"Queen"
	},
	{
		thumbnail:"journey.jpg",
		audio:"don't stop believin.mp3",
		songname:"Don't Stop Believin'",
		artistname:"Journey"
	},
	{
		thumbnail:"michael-jackson-thriller.jpg",
		audio:"billie jean.mp3",
		songname:"Billie Jean",
		artistname:"Michael Jackson"
	},
	{
		thumbnail:"michael-jackson-dangerous.jpg",
		audio:"give in to me.mp3",
		songname:"Give In To Me",
		artistname:"Michael Jackson"
	},
	{
		thumbnail:"guns-n-roses.jpg",
		audio:"sweet child o' mine.mp3",
		songname:"Sweet Child O' Mine",
		artistname:"Guns N' Roses"
	},
	{
		thumbnail:"bon-jovi.jpg",
		audio:"it's my life.mp3",
		songname:"It's My Life",
		artistname:"Bon Jovi"
	},
	{
		thumbnail:"bon-jovi.jpg",
		audio:"livin on a prayer.mp3",
		songname:"Livin' On A Prayer",
		artistname:"Bon Jovi"
	},
	{
		thumbnail:"charlie-puth.jpg",
		audio:"attention.mp3",
		songname:"Attention",
		artistname:"Charlie Puth"
	},
	{
		thumbnail:"ariana-grande.jpg",
		audio:"breathin.mp3",
		songname:"Breathin'",
		artistname:"Ariana Grande"
	},
	{
		thumbnail:"panic!-at-the-disco.jpg",
		audio:"high hopes.mp3",
		songname:"High Hopes",
		artistname:"Panic! At The Disco"
	},
	{
		thumbnail:"mark-ronson.jpg",
		audio:"uptown funk.mp3",
		songname:"Uptown Funk ft Bruno Mars",
		artistname:"Mark Ronson"
	},
	{
		thumbnail:"backstreet-boys.jpg",
		audio:"i want it that way.mp3",
		songname:"I Want It That Way",
		artistname:"Backstreet Boys"
	},
	{
		thumbnail:"ed-sheeran.jpg",
		audio:"shape of you.mp3",
		songname:"Shape Of You",
		artistname:"Ed Sheeran"
	},
	{
		thumbnail:"the-weeknd.jpg",
		audio:"save your tears.mp3",
		songname:"Save Your Tears",
		artistname:"The Weeknd"
	},
	{
		thumbnail:"spice-girls.jpg",
		audio:"wannabe.mp3",
		songname:"Wannabe",
		artistname:"Spice Girls"
	},
	{
		thumbnail:"britney-spears.jpg",
		audio:"baby one more time.mp3",
		songname:"Baby one more time",
		artistname:"Britney Spears"
	},
	{
		thumbnail:"gloria-gaynor.jpg",
		audio:"i will survive.mp3",
		songname:"I Will Survive",
		artistname:"Gloria Gaynor"
	},
	{
		thumbnail:"nsync.jpg",
		audio:"bye bye bye.mp3",
		songname:"Bye Bye Bye",
		artistname:"NSYNC"
	},
	{
		thumbnail:"lady-gaga.jpg",
		audio:"bad romance.mp3",
		songname:"Bad Romance",
		artistname:"Lady Gaga"
	},
	{
		thumbnail:"luis-fonsi.jpg",
		audio:"despacito.mp3",
		songname:"Despacito ft Daddy Yankee",
		artistname:"Luis Fonsi"
	},
	{
		thumbnail:"toto.jpg",
		audio:"africa.mp3",
		songname:"Africa",
		artistname:"Toto"
	},
	{
		thumbnail:"whitney-houston.jpg",
		audio:"i will always love you.mp3",
		songname:"I Will Always Love You",
		artistname:"Whitney Houston"
	},
	{
		thumbnail:"eminem.jpg",
		audio:"without me.mp3",
		songname:"Without Me",
		artistname:"Eminem"
	},
	{
		thumbnail:"o-zone.jpg",
		audio:"dragostea din tei.mp3",
		songname:"Dragostea din tei",
		artistname:"O-Zone"
	}
];
 
let currentSongIndex = 0;
 
let player = _(".player"),
	toggleSongList = _(".player .toggle-list");
 
let main = {
	audio:_(".player .main audio"),
	thumbnail:_(".player .main img"),
	seekbar:_(".player .main input"),
	songname:_(".player .main .details h2"),
	artistname:_(".player .main .details p"),
	prevControl:_(".player .main .controls .prev-control"),
	playPauseControl:_(".player .main .controls .play-pause-control"),
	nextControl:_(".player .main .controls .next-control"),
	timeTracker:_(".player .main .current-time")
}
 
toggleSongList.addEventListener("click", function(){
	toggleSongList.classList.toggle("active");
	player.classList.toggle("activeSongList");
});
 
_(".player .player-list .list").innerHTML = (songList.map(function(song,songIndex){
	return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img style=background:url(logo/${song.thumbnail});background-size:cover;background-position:center;background-repeat:no-repeat;>
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));
 
let songListItems = _all(".player .player-list .list .item");
for(let svg=0;svg<songListItems.length;svg++){
	songListItems[svg].addEventListener("click",function(){
		currentSongIndex = parseInt(songListItems[svg].getAttribute("songIndex"));
		loadSong(currentSongIndex);
	});
}
 
function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("style","background:linear-gradient(to right bottom, rgba(255,255,255, 0),rgba(255,255,255, 0)), url(logo/"+song.thumbnail+");"+"background-size:cover;"+"background-position:center;"+"background-repeat:no-repeat;");
	main.songname.innerText = song.songname;
	main.artistname.innerText = song.artistname;
	main.audio.setAttribute("src","./music/"+song.audio);
	main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
	main.audio.addEventListener("canplay",function(){
		main.audio.play();
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
		}
		main.seekbar.setAttribute("max",parseInt(main.audio.duration));
		main.audio.onended = function(){
			main.nextControl.click();
		}
	})
}
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);


main.prevControl.addEventListener("click",function(){
	currentSongIndex--;
	if(currentSongIndex < 0){
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click",function(){
	currentSongIndex = (currentSongIndex+1) % songList.length;
	loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click",function(){
	if(main.audio.paused){
		main.playPauseControl.classList.remove("paused");
		main.audio.play();
	} else {
		main.playPauseControl.classList.add("paused");
		main.audio.pause();
	}
});
main.seekbar.addEventListener("change",function(){
	main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);
	          	
const audio = document.querySelector('audio');
const currentTimeContainer = document.getElementById('current-time');
const durationContainer = document.getElementById('duration');

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
  durationContainer.textContent = calculateTime(main.audio.duration);
}

if (main.audio.readyState > 0) {
  displayDuration();
} else {
  main.audio.addEventListener('loadedmetadata', () => {
    displayDuration();
  });
}

main.audio.volume = 0.2;

const volumeSlider = document.getElementById('volume-slider');
const outputContainer = document.getElementById('volume-output');
	volumeSlider.addEventListener('input', (e) => {
	const value = e.target.value;

	outputContainer.textContent = value;
	main.audio.volume = value / 100;
});




