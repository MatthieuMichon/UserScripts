// ==UserScript==
// @name         NYAA fast glance
// @namespace    https://github.com/MatthieuMichon/UserScripts/
// @copyright    2015+, Matthieu Michon
// @license      GNU GPLv3
// @version      1
// @description  Colors entries depending on their popularity
// @author       Matthieu Michon
// @match        http://www.nyaa.se
// @grant        none
// ==/UserScript==


/**
 * Parameters
 */

var torListQuery = "#main > div.content > table.tlist > tbody > tr.tlistrow";
var torQueries = ["td.tlistsn", "td.tlistln", "td.tlistdn", "td.tlistmn"];
var cntCoef = [4, 3, 1, 10];



/**
 * getCntFromTor - Get counts (seeders, leechers, dls and msgs) for the given
 * entry.
 *
 * tor: torrent entry
 *
 * Returns an array of counters
 */

function getCntFromTor(tor){
  "use strict";
  var retArray = torQueries.map(function(query){
    /* apply each query in the torQueries array to the given torrent entry */
    var html = tor.querySelector(query);
    if (!html) return 0; // unexpected content
    var txt = html.textContent;
    return parseInt(txt);
  });
  return retArray;
}


/**
 * getTorCntArray - Get an array of the four conters per entry
 *
 * query: query matching all the entries
 *
 * Retruns a 2D array of entries / counters
 */

function getTorCntArray(query){
  "use strict";
  var torCol = document.querySelectorAll(query);
  var torArray = [].slice.call(torCol);
  var torCntArray = torArray.map(function(tor){
    return getCntFromTor(tor);
  });
  return torCntArray;
}


/**
 * getTorScoreArray - Return an array of scores from an array of entry counters
 *
 * array: 2D array (entry / counters)
 *
 * Returns an array of scores
 */

function getTorScoreArray(array){
  "use strict";
  var torScoreArray = array.map(function(cntArray){
    return cntArray.reduce(function(prev, curr, index){
      return prev + curr*cntCoef[index];
    });
  }); 
  return torScoreArray;
}


/**
 * max - Return the highest value in an array
 *
 * array: array of numbers
 *
 * Returns the max
 */

function max(array){
  "use strict";
  return array.reduce(function (prev, curr){
    return (prev > curr ? prev : curr);
  });
}


/**
 * normalize - Normalize the given array against the given max value
 *
 * array: array of numbers to normalize
 * maxValue: target max value
 *
 * Returns an array linearly normalized (max = maxValue)
 */
 
function normalize(array, maxValue){
  "use strict";
  var maxScore = max(array);
  var normArray = array.map(function(value){
    return Math.round(maxValue*value/maxScore);
  });
  return normArray;
}

/**
 * getColorArray - Get CSS color from integer
 *
 * array: array of integers (range 0 to 255)
 *
 * Returns an array of CSS colors "rgb(42, 42, 42)"
 */

function getColorArray(array){
  "use strict";
  var colorArray = array.map(function(value){
    return "rgb("+(value).toString(10)+", "+(value).toString(10)+", "+(value).toString(10)+")";
  });
  return colorArray;
}


/**
 * applyColorArray - Apply CSS backgroundColor properties
 *
 * torArray: array of entries
 * colorArray: array of CSS colors "rgb(42, 42, 42)"
 */

function applyColorArray(torArray, colorArray){
  "use strict";
  //debugger;
  torArray.map(function(tor, index){
    tor.style.backgroundColor = colorArray[index];
  });
}


/**
 * main - Main entry point
 */

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
