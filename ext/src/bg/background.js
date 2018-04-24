// ON APP ICON CLICK
//if game has already been started dont load scripts again

chrome.browserAction.onClicked.addListener(function (tab) {
// for the current tab, inject the "inject.js" file & execute it - accessins page DOM
chrome.tabs.executeScript(tab.id, { file: "src/class/class_initGame.js" });
chrome.tabs.executeScript(tab.id, { file: "src/class/class_injector.js"});
chrome.tabs.executeScript(tab.id, { file: "src/class/class_elements_manipulator.js" });
chrome.tabs.executeScript(tab.id, { file: "src/class/class_game.js" });
chrome.tabs.executeScript(tab.id, { file: "src/class/class_gameEvents.js"});
// Needs to be the last - src/inject/inject.js
chrome.tabs.executeScript(tab.id, { file: "src/inject/inject.js" });
});