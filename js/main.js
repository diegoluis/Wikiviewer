$(document).ready(function() { 
//button for searh
var search = document.getElementById("search");
//btn for random
var random = document.getElementById("random");
//input text
var text = document.getElementById("text");
//var to store the result of the search in input
var result;
// store the call to the wiki
var finds;
//div to show the wiki result
var answer = document.getElementById("answer");
//
var temp = document.getElementById("temporal");
//get a random page from wikipedia
random.addEventListener("click", function() {
  window.open("http://en.wikipedia.org/wiki/Special:Random");
});
//store the search
search.addEventListener("click", function() {
  result = 'https://en.wikipedia.org/w//api.php?action=opensearch&format=json&search=' + text.value + '&limit=50&suggest=&format=json&warningsaserror=';
  //console.log(result);
  //return result;
  function readWiki(){
    $.ajax({
        url: result,
        type: 'GET',
        headers: {
          'Api-User-Agent' : 'diego@diegoluis.net'
        },
        dataType: 'jsonp',
      })
      .fail(function() {
        console.log("error");
      })
      .done(function(data){
        //console.log(data);
        finds = data;
        return finds;
      });
  }
  return readWiki();
});

temp.addEventListener("click", function() {
  //finds.forEach()
  console.log(finds);
});
});
