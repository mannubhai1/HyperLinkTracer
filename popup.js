document.addEventListener("DOMContentLoaded", () => {
  // console.log("----------Popup script executed-----------");
  let totalSites = 0;
  let totalHyperLinks = 0;

  chrome.storage.local.get(null, (items) => {
    for (let site in items) {
      totalSites++;
      let siteData = items[site];
      for (let href in siteData.hyperlinks) {
        totalHyperLinks += siteData.hyperlinks[href];
      }
    }

    // console.log("Total sites:", totalSites);
    // console.log("Total hyperlinks:", totalHyperLinks);

    document.getElementById("totalSites").textContent = totalSites;
    document.getElementById("totalLinks").textContent = totalHyperLinks;
  });

  document.getElementById("clearButton").addEventListener("click", () => {
    chrome.storage.local.clear(() => {
      // console.log("----------Local storage cleared----------");
      document.getElementById("totalSites").textContent = 0;
      document.getElementById("totalLinks").textContent = 0;
    });
  });

  document.getElementById("detailsButton").addEventListener("click", () => {
    //create a new tab to show details
    chrome.tabs.create({ url: chrome.runtime.getURL("details.html") });
  });
});
