function extractLinks() {
    const links = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    links.forEach(link => {
      chrome.runtime.sendMessage({
        action: "storeLink",
        url: link.href
      });
    });
  }
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        extractLinks();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });