(function() {
    
    const windowItemFormContainer = document.getElementById('windowItemFormContainer');
    fetch('src/html/item/window_item_form.html')
    .then(response => response.text())
    .then(html => {
      windowItemFormContainer.innerHTML = html.trim();
    })
    .catch(error => console.error('Error loading window_item_form.html:', error));

    const unknownItemFormContainer = document.getElementById('unknownItemFormContainer');
    fetch('src/html/item/unknown_item_form.html')
    .then(response => response.text())
    .then(html => {
      unknownItemFormContainer.innerHTML = html.trim();
    })
    .catch(error => console.error('Error loading unknown_item_form.html:', error));
})();