// ON APP ICON CLICK
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it - accessins page DOM
	chrome.tabs.executeScript(tab.id, { file: "src/class/class_hello_waldo.js" });
	chrome.tabs.executeScript(tab.id, { file: "src/class/class_elements_manipulator.js" });
	chrome.tabs.executeScript(tab.id, { file: "src/class/class_game.js" });
	chrome.tabs.executeScript(tab.id, { file: "src/inject/inject.js" });
});