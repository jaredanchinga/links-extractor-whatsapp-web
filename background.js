chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "storeLink") {
    chrome.storage.local.get({links: []}, (result) => {
      let links = result.links;
      
      // Check if the link already exists
      const linkExists = links.some(link => link.url === request.url);
      
      if (!linkExists) {
        links.push({
          url: request.url,
          timestamp: new Date().toISOString()
        });
        
        chrome.storage.local.set({links: links}, () => {
          console.log("New link stored:", request.url);
        });
      } else {
        console.log("Duplicate link not stored:", request.url);
      }
    });
  }
  return true;  // Indicates that the response is asynchronous
});
