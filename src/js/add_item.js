function addItem() {
    const item = document.getElementById('u_item').value;
    const pattern = document.getElementById('u_pattern').value;
    const quantity = document.getElementById('u_quantity').value;
    const unitPrice = document.getElementById('u_unitPrice').value;
    const unitKey = document.getElementById('u_unit').value;
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
    const item = document.getElementById('item').value;
    const windowLength = document.getElementById("windowLength").value;
    const windowWidth = document.getElementById("windowWidth").value;
    const quantity = document.getElementById('quantity').value;
    const unitPrice = document.getElementById('unitPrice').value;
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