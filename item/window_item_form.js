
function addItem() {
    const item = document.getElementById('windowItem').value;
    const pattern = '';
    const quantity = document.getElementById('windowQuantity').value;
    
    const unitPrice = document.getElementById('windowItem').value;
    const unit = document.getElementById('windowItem').value;
    
    const total = quantity * price;
    items.push({ item, pattern,quantity, unitPrice, unit, total});

    updateItemList();
    updateTotal();
}