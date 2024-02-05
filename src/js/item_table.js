const unitOptions = new Map([
    [0, '-'],
    [1, '才'],
    [2, '坪'],
    [3, '米'],
    [4, '式'],
    [5, '個']
]);
function setUnitOptions(element){
    unitOptions.forEach((value, key) => {
        const optionElement = document.createElement('option');
        optionElement.value = key;
        optionElement.textContent = value;
        element.appendChild(optionElement);
    });
}
function updateTotal() {
const totalInput = document.getElementById('total');
const total = items.reduce((acc, item) => acc + item.total, 0);
totalInput.value = `$${total.toFixed(2)}`;
}
function updateItemList() {
    const itemList = document.getElementById('itemList')

    itemList.innerHTML = '';
    console.log(items.length);
    items.forEach((item, index) => {
        const row = itemList.insertRow();
        const cell0 = row.insertCell(0);
        const cell1 = row.insertCell(1);
        const cell2 = row.insertCell(2);
        const cell3 = row.insertCell(3);
        const cell4 = row.insertCell(4);
        const cell5 = row.insertCell(5);
        const cell6 = row.insertCell(6);

        cell0.textContent = item.item;
        cell1.textContent = item.pattern;
        cell2.textContent = item.quantity;
        cell3.textContent = item.unitPrice;
        cell4.textContent = item.unit;

        cell5.textContent = item.total;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeItem(index));
        cell6.appendChild(removeButton);
    });
}

function removeItem(index) {
    items.splice(index, 1);
    updateItemList();
    updateTotal();
}
