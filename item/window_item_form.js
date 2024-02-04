
function addItem() {
    const item = document.getElementById('item').value;
    const pattern = '';
    const quantity = document.getElementById('quantity').value;
    
    const unitPrice = document.getElementById('unitPrice').value;
    const unit = document.getElementById('unit').value;
    
    const total = quantity * unitPrice;
    items.push({ item, pattern,quantity, unitPrice, unit, total});

    updateItemList();
    updateTotal();
}