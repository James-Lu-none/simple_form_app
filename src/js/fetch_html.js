(function() {
    
  const windowItemFormContainer = document.getElementById('windowItemFormContainer');
  fetch('src/html/item/window_item_form.html')
  .then(response => response.text())
  .then(html => {
    windowItemFormContainer.innerHTML = html.trim();
    const windowItemUnit=document.getElementById('windowUnit');
    setUnitOptions(windowItemUnit);
  })
  .catch(error => console.error('Error loading window_item_form.html:', error));

  const unknownItemFormContainer = document.getElementById('unknownItemFormContainer');
  fetch('src/html/item/unknown_item_form.html')
  .then(response => response.text())
  .then(html => {
    unknownItemFormContainer.innerHTML = html.trim();
    const unknownItemUnit=document.getElementById('u_unit');
    setUnitOptions(unknownItemUnit);
  })
  .catch(error => console.error('Error loading unknown_item_form.html:', error));

  const itemTableContainer = document.getElementById('itemTableContainer');
  fetch('src/html/item_table.html')
  .then(response => response.text())
  .then(html => {
    itemTableContainer.innerHTML = html.trim();
    updateItemList();
    init();
  })
  .catch(error => console.error('Error loading unknown_item_form.html:', error));
})();