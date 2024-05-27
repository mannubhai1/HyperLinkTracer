function logLinks() {
  // console.log("---------Content script executed----------");
  let links = document.getElementsByTagName("a");
  console.log("Links: ", links);
  let hrefs = Array.from(links).map((link) => link.href);
  let siteHostName = window.location.hostname;

  chrome.runtime.sendMessage(
    {
      action: "logLinks",
      siteHostName: siteHostName,
      hrefs: hrefs,
    },
    (response) => {
      console.log("Response from background script:", response.status);
    }
  );

  // chrome.runtime.connect().onDisconnect.addListener(() => {
  //   console.log("Content script disconnected from background script");
  // });
}

function observeMutations() {
  const observer = new MutationObserver(logLinks);
  observer.observe(document.body, { childList: true, subtree: true });
}

window.addEventListener("load", () => {
  logLinks();
  observeMutations();
});
