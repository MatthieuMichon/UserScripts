var torListQuery = "#main > div.content > table.tlist > tbody > tr.tlistrow";
var torQueries = ["td.tlistsn", "td.tlistln", "td.tlistdn", "td.tlistmn"];
var cntCoef = [4, 3, 1, 10];


function getCntFromTor(tor){
  "use strict";
  var retArray = torQueries.map(function(query){
    var txt = tor.querySelector(query).textContent;
    return parseInt(txt);
  });
  return retArray;
}

function getTorCntArray(query){
  "use strict";
  var torCol = document.querySelectorAll(query);
  var torArray = [].slice.call(torCol);
  var torCntArray = torArray.map(function(tor){
    return getCntFromTor(tor);
  });
  return torCntArray;
}

function getTorScoreArray(array){
  "use strict";
  var torScoreArray = array.map(function(cntArray){
    return cntArray.reduce(function(prev, curr, index){
      return prev + curr*cntCoef[index];
    });
  }); 
  return torScoreArray;
}

function max(array){
  "use strict";
  return array.reduce(function (prev, curr){
    return (prev > curr ? prev : curr);
  });
}

function normalize(array, maxValue){
  "use strict";
  var maxScore = max(array);
  var normArray = array.map(function(value){
    return Math.round(maxValue*value/maxScore);
  });
  return normArray;
}

function getColorArray(array){
  "use strict";
  var colorArray = array.map(function(value){
    return "rgb("+(value).toString(10)+", "+(value).toString(10)+", "+(value).toString(10)+")";
  });
  return colorArray;
}

function applyColorArray(torArray, colorArray){
  "use strict";
  //debugger;
  torArray.map(function(tor, index){
    tor.style.backgroundColor = colorArray[index];
    return;
  });
}

function main(){
  "use strict";
  var torCntArray = getTorCntArray(torListQuery);
  var scoreArray = getTorScoreArray(torCntArray);
  var scoreNormArray = normalize(scoreArray, 255);
  var colorArray = getColorArray(scoreNormArray);
  
  var torArray = [].slice.call(document.querySelectorAll(torListQuery));
  applyColorArray(torArray, colorArray);
  return colorArray;
}

main();
