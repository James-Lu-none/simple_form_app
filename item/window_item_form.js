
function addItem() {
    const item = document.getElementById('windowItem').value;
    const quantity = parseFloat(document.getElementById('windowQuantity').value);
    const price = parseFloat(document.getElementById('windowUnitPrice').value);

    const total = quantity * price;

    items.push({ item, quantity, price, total });

    updateItemList();
    updateTotal();
}