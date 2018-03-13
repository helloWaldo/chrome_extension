//print EXT console
function printBGconsole(str){
  console.log(str);
}
// SCRIPTS TO EXEXUTE IN PAGE
chrome.browserAction.onClicked.addListener(function (tab) {
  // for the current tab, inject the "inject.js" file & execute it - accessins page DOM
  chrome.tabs.executeScript(tab.id, { file: "src/inject/inject.js" });
});
// SCRIPTS TO EXEC ON PAGE LOAD
var readyStateCheckInterval = setInterval(function(tab) {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    chrome.tabs.executeScript(tab.id, { file: "src/class/class_helloWaldo.js" });
  }
}, 10);
