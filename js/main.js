$(document).ready(function() { 
//button for searh
var search = document.getElementById("search");
//btn for random
var random = document.getElementById("random");
//input text
var text = document.getElementById("text");
//var to store the result of the search in input
var result;
// store the json
var finds;
//div to show the wiki result
var answer = document.getElementById("answer");
//title of result
var title;
//definition
var definition;
//url
var urlResult;
//container for each result
var resultContainer;
//-----//
//get a random page from wikipedia
random.addEventListener("click", function() {
  window.open("http://en.wikipedia.org/wiki/Special:Random");
});
//-----//
//at clicking the search
function doTheSearch() {
  //store the search in a variable
  result = 'https://en.wikipedia.org/w//api.php?action=opensearch&format=json&search=' + text.value + '&limit=50&suggest=&format=json&warningsaserror=';
  //console.log(result);
  //send the variable to the api and get an array with the result
  function readWiki(){
    $.ajax({
      //the search of the user
        url: result,
        type: 'GET',
        //a custom header for wikipedia
        headers: {
          'Api-User-Agent' : 'diego@diegoluis.net'
        },
        //type of the data
        dataType: 'jsonp',
      })
      .fail(function() {
        console.log("error");
      })
      //when the data arrives store it in a variable and return
      .done(function(data){
        //console.log(data);
        finds = data;
        //return finds;
        readArray(finds);
      });
  }
  //return the function to get the stored info
  return readWiki();
}
//event listener for the click of the button
search.addEventListener("click", doTheSearch);
text.addEventListener('keypress', function(e){
  if(13 === e.keyCode){
    doTheSearch();
  }
});
//function to read the info inside the array
function readArray(arr){
    //read the interior arrays
    for(var j=0; j<arr[1].length; j++){
      //the container
      resultContainer = document.createElement("div");
      resultContainer.className = "result";
      //the title
      title = document.createElement("h2");
      var titleText = document.createTextNode(arr[1][j]);
      title.appendChild(titleText);
      resultContainer.appendChild(title);
      //the description
      definition = document.createElement("p");
      var defText = document.createTextNode(arr[2][j]);
      definition.appendChild(defText);
      resultContainer.appendChild(definition);
      //the url
      urlResult = document.createElement("a");
      urlResult.href = arr[3][j];
      urlResult.target ="_blank";
      urlResult.appendChild(resultContainer);
      answer.appendChild(urlResult);
      //console.log(arr[3][j]);
    }

}
});
