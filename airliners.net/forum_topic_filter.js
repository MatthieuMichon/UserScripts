// ==UserScript==
// @name         Airliners.net Topic Filter
// @namespace    https://github.com/MatthieuMichon/UserScripts/airliners.net/forum_topic_filter.js
// @copyright    2015+, Matthieu Michon
// @license      GNU GPLv3
// @version      1
// @description  Hides messages posted by users with low RR
// @author       Matthieu Michon
// @match        http://www.airliners.net/aviation-forums/*
// @grant        none
// ==/UserScript==


/**
 * Parameters
 */

var RRThreshold = 10;
var anetTopicRegex = /read\.main/;
var anetPostSelector = "#content > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > a + div";
var anetRRSelector = "font > font > b > a";
var anetRRRegex = /RR: (\d+)/;


/**
 * anetIsTopic - Check if the current page is an airliners.net topic
 *
 * anetPathnameTopicRegex: regex to check against
 * Returns a boolean value.
 */

function anetIsTopic(topicPathnameRegex) {
    "use strict";
    var isTopic = topicPathnameRegex.test(window.location.pathname);
    return isTopic; // boolean
}


/**
 * anetGetPostCollection - Return all the posts in the current topic
 *
 * postSelector: CSS selector for an individual post
 * Returns a node list
 */

function anetGetPostCollection(postSelector){
    "use strict";
    if (!anetIsTopic(anetTopicRegex)) console.error("Error: not a topic");
    var collection = document.querySelectorAll(postSelector);
    return collection; // NodeList
}


/**
 * anetGetRRFromPost - Return the RR value of the given post
 *
 * post: post HTML element
 * RRSelector: CSS selector for the RR value
 * RRRegex: Regex for RR extraction
 */

function anetGetRRFromPost(post, RRSelector, RRRegex){
    "use strict";
    var rrLineString = post.querySelector(RRSelector).textContent;
    var rr = parseInt(rrLineString.replace(RRRegex, '$1'));
    return rr; // Integer
}


/**
 * anetGetIDFromPost - Return the ID of the given post
 *
 * post: post HTML element
 */

function anetGetIDFromPost(post){
    "use strict";
    var postID = post.id;
    return postID; // Integer
}


/**
 * anetHidePost - Hide the given post
 *
 * post: post HTML element
 */
 
function anetHidePost(post){
    "use strict";
    var id = anetGetIDFromPost(post);
    compressPost(id); // native airliners.net
}


/**
 * anetShowPost - Show the given post
 *
 * post: post HTML element
 */

function anetShowPost(){
    "use strict";
    var id = anetGetIDFromPost(post);
    // TBD: replace 'undefined' args
    expandPost(id, 'undefined','undefined','undefined','1'); // native airliners.net
}


/**
 * anetHidePostsLowRR - Main entry point
 *
 * lowestRR: Lowest RR below which posts are not displayed
 */

function anetHidePostsLowRR(lowestRR){
    "use strict";
    var postCollection = anetGetPostCollection(anetPostSelector);
    var postArray = [].slice.call(postCollection);
    var postRRArray = postArray.map(function(post){
        return anetGetRRFromPost(post, anetRRSelector, anetRRRegex);
    });
    for (var i = 0; i < postArray.length; i++) {
        if (postRRArray[i] < lowestRR) anetHidePost(postCollection[i]);
    }
}


/**
 * Main
 */
 
anetHidePostsLowRR(RRThreshold);
