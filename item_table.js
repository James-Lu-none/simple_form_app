
function updateItemList() {
    const itemList = document.getElementById('itemList')

    itemList.innerHTML = '';
    console.log(items.length);
    items.forEach((item, index) => {
        const row = itemList.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = item.item;
        cell2.textContent = item.quantity;
        cell3.textContent = `$${item.price.toFixed(2)}`;
        cell4.textContent = `$${item.total.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeItem(index));
        cell5.appendChild(removeButton);
    });
}

function removeItem(index) {
    items.splice(index, 1);
    updateItemList();
    updateTotal();
}