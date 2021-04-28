
// $("#document").ready(function(){
// $("#mabout").click(function () {
//     var about = document.getElementById("about_div");
//     about.style.display = "block";})
    

// $(".close").click(function(){
//     var about = document.getElementById("about_div");
//     about.style.display = "none";
// } )   
   
	
// window.onclick = function (e) {
// 	if (e.target == document.getElementById("about_div")) {
// 	about.style.display = "none";
// 		}}
	
let modal = document.getElementById('about_div');

function showAbout() {
    modal.style.display = 'block';
    // stop the game ?!
  }
  function closeAbout() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {  // press outside About window to close About
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.addEventListener('keydown', function(event) {  // user can press Esc on Keyboard and close about
    if (event.key == 'Escape') {
        modal.style.display = "none";
    }
})