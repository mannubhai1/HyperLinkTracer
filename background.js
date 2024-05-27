//init local storage when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ visitedSites: [], hyperlinks: {} });
});

//message passing b/w content script and background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "logLinks") {
    let siteHostName = message.siteHostName;
    let hrefs = message.hrefs;

    chrome.storage.local.get([siteHostName], (result) => {
      let siteData = result[siteHostName] || {
        site: siteHostName,
        hyperlinks: {},
      };

      hrefs.forEach((href) => {
        let newHref = normalise(href);

        if (siteData.hyperlinks[newHref]) {
          siteData.hyperlinks[newHref] += 1;
        } else {
          //href not present in hyperlinks object
          siteData.hyperlinks[newHref] = 1;
        }
      });

      chrome.storage.local.set({ [siteHostName]: siteData }, () => {
        console.log("Data stored in chrome.storage.local:", siteData);
      });
    });
  }
  sendResponse({ status: "success" });
  return true;
});

//just for removing hash and trailng routes
function normalise(href) {
  return href.split("#")[0].replace(/\/$/, "");
}
