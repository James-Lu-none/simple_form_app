const unitOptions = new Map([
    ['0', '-'],
    ['1', '才'],
    ['2', '坪'],
    ['3', '米'],
    ['4', '式'],
    ['5', '個']
]);
let items = [];

function getUnitOptions(){
    return unitOptions;
}
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
        
        cell0.textContent = item.item;
        cell1.textContent = item.pattern;
        cell2.textContent = item.quantity;
        cell3.textContent = item.unitPrice;
        cell4.textContent = item.unit;
        cell5.textContent = item.total;
    });
}

function swapItem(index1,index2){
    const temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
    console.log("swap"+ index1 + "," + index2)
}

function removeItem(index) {
    items.splice(index, 1);
    updateItemList();
    updateTotal();
}
