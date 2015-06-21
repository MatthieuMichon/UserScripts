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

function main(){
  "use strict";
  var torArray = getTorCntArray(torListQuery);
  var scoreArray = getTorScoreArray(torArray);
  return scoreArray;
}

main();
