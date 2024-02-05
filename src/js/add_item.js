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

function addWindowItem() {
    const item = document.getElementById('item').value;
    const windowLength = document.getElementById("windowLength").value;
    const windowWidth = document.getElementById("windowWidth").value;
    const quantity = document.getElementById('quantity').value;
    const unitPrice = document.getElementById('unitPrice').value;
    if(!item | !windowLength | !windowWidth | !quantity | !unitPrice) return;
    
    const pattern = windowLength + "x" + windowWidth;
    const q = quantity*windowLength*windowWidth/900;
    const unitValue = document.getElementById('windowUnit').value;

    const unitOptions=getUnitOptions();
    const unit = unitOptions.get(unitValue);

    const total =  Math.round(unitPrice * q);
    items.push({ item, pattern,quantity, unitPrice, unit, total});

    updateItemList();
    updateTotal();
}
