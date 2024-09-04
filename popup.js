document.addEventListener('DOMContentLoaded', function() {
    const linkList = document.getElementById('linkList');
    const clearButton = document.getElementById('clearLinks');
    const exportButton = document.getElementById('exportCSV');
    const openFullPageButton = document.getElementById('openFullPage');
  
    function displayLinks() {
      chrome.storage.local.get({links: []}, (result) => {
        linkList.innerHTML = '';
        result.links.forEach((link) => {
          const row = document.createElement('tr');
          const dateCell = document.createElement('td');
          const linkCell = document.createElement('td');
          
          dateCell.textContent = new Date(link.timestamp).toLocaleString();
          
          const linkAnchor = document.createElement('a');
          linkAnchor.href = link.url;
          linkAnchor.textContent = link.url;
          linkAnchor.target = '_blank';
          linkCell.appendChild(linkAnchor);
          
          row.appendChild(dateCell);
          row.appendChild(linkCell);
          linkList.appendChild(row);
        });
      });
    }
  
    function exportCSV() {
      chrome.storage.local.get({links: []}, (result) => {
        let csvContent = "data:text/csv;charset=utf-8,Date,Link\n";
        result.links.forEach((link) => {
          csvContent += `${new Date(link.timestamp).toLocaleString()},${link.url}\n`;
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "whatsapp_links.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  
    function openFullPage() {
      chrome.tabs.create({url: 'full-page.html'});
    }
  
    displayLinks();
  
    clearButton.addEventListener('click', () => {
      chrome.storage.local.set({links: []}, () => {
        displayLinks();
      });
    });
  
    exportButton.addEventListener('click', exportCSV);
    openFullPageButton.addEventListener('click', openFullPage);
  });