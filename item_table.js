
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

        cell0.textContent = item.item;
        cell1.textContent = item.quantity;
        cell2.textContent = item.price;
        const span1 = document.createElement('span');
        span1.textContent = item.column1;
        const span2 = document.createElement('span');
        span2.textContent = item.column2;
        divInCell3.appendChild(span1);
        divInCell3.appendChild(span2);

        cell3.appendChild(divInCell3);

        cell4.textContent = item.total;
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