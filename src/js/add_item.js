let items = [];
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
    const windowWidth =document.getElementById("windowWidth").value;
    if(item == '' | windowLength == '' | windowWidth == '') return;
    const pattern = windowLength + "x" + windowWidth; 
    const quantity = document.getElementById('quantity').value;
    
    
    const unitPrice = document.getElementById('unitPrice').value;

    const ft3Value =windowLength*windowWidth/900;

    const unit = unitOptions.get(document.getElementById('windowUnit').value);
    
    const total =  Math.round(quantity * unitPrice * ft3Value);
    items.push({ item, pattern,quantity, unitPrice, unit, total});

    updateItemList();
    updateTotal();
}
