chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "storeLink") {
      chrome.storage.local.get({links: []}, (result) => {
        let links = result.links;
        links.push({
          url: request.url,
          timestamp: new Date().toISOString()
        });
        chrome.storage.local.set({links: links}, () => {
          console.log("Link stored:", request.url);
        });
      });
    }
  });