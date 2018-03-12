// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

/*
require.config({
    paths: {
        helloWaldo: '../inject/helloWaldo'
    }
});

requirejs(['helloWaldo'],
function   (helloWaldo) {
    helloWaldo.koko();
});

*/



chrome.browserAction.onClicked.addListener(function (tab) {
  // for the current tab, inject the "inject.js" file & execute it - accessins page DOM
  chrome.tabs.executeScript(tab.id, { file: "src/inject/inject.js" });
  
});

var readyStateCheckInterval = setInterval(function(tab) {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    chrome.tabs.executeScript(tab.id, { file: "src/class/class_helloWaldo.js" });

  }
  }, 10);


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
});
/*
import {koko} from './helloWaldo.js';
import {test} from './inject.js';*/

// listen for our browerAction to be clicked
/*chrome.browserAction.onClicked.addListener(function (tab) {
  appIconToggle();
  console.log('backggggg');
});*/