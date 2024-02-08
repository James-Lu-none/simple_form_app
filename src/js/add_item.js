function addItem() {
    const item = getElementByIdWithError('u_item');
    const pattern = getElementByIdWithError('u_pattern');
    const quantity = getElementByIdWithError('u_quantity');
    const unitPrice = getElementByIdWithError('u_unitPrice');
    const unitKey = getElementByIdWithError('u_unit');
    if(!item | !quantity | !unitPrice) return;

    const description = document.getElementById('u_description').value;
    const unitOptions=getUnitOptions();
    const unit = unitOptions.get(unitKey);
    
    const total = numberWithCommas(quantity * unitPrice);
    items.push({ item, pattern,quantity, unitPrice, unit, total, description});
    
    updateItemList();
    updateTotal();
}

function addWindowItem() {
    const item = getElementByIdWithError('item');
    const windowLength = getElementByIdWithError("windowLength");
    const windowWidth = getElementByIdWithError("windowWidth");
    const quantity = getElementByIdWithError('quantity');
    const unitPrice = getElementByIdWithError('unitPrice');
    if(!item | !windowLength | !windowWidth | !quantity | !unitPrice) return;
    
    const description = document.getElementById('windowDescription').value;
    const pattern = windowLength + "x" + windowWidth;
    const q = quantity*windowLength*windowWidth/900;
    const unitKey = document.getElementById('windowUnit').value;

    const unitOptions=getUnitOptions();
    const unit = unitOptions.get(unitKey);

    const total = numberWithCommas(Math.round(unitPrice * q));
    items.push({ item, pattern,quantity, unitPrice, unit, total, description});

    updateItemList();
    updateTotal();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithoutCommas(x){
    return parseInt(x.replace(/,/g, ''),10);
}