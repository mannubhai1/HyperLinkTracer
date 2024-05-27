document.addEventListener("DOMContentLoaded", () => {
  // console.log("---------You are in details.js file----------");
  // Access table body element
  let tableBody = document
    .getElementById("detailsTable")
    .getElementsByTagName("tbody")[0];

  chrome.storage.local.get(null, (items) => {
    for (let site in items) {
      let siteData = items[site];
      for (let href in siteData.hyperlinks) {
        let rowElement = document.createElement("tr");

        let siteElement = document.createElement("td");
        siteElement.textContent = siteData.site;

        let linkElement = document.createElement("td");
        linkElement.textContent = href;

        let occurenceElement = document.createElement("td");
        occurenceElement.textContent = siteData.hyperlinks[href];

        rowElement.appendChild(siteElement);
        rowElement.appendChild(linkElement);
        rowElement.appendChild(occurenceElement);

        tableBody.appendChild(rowElement);
      }
    }
  });
});
