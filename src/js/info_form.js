function initInfoForm() {
    const handler = document.getElementById('handler');
    handler.value = "盧建良";
}
function getInfo(){
    const date = document.getElementById('date').value;
    const customerName = document.getElementById('customerName').value;
    const constructionName = document.getElementById('constructionName').value;
    const constructionLocation = document.getElementById('constructionLocation').value;
    const handler = document.getElementById('handler').value;

    return {
        date: date,
        customerName: customerName,
        constructionName: constructionName,
        constructionLocation: constructionLocation,
        handler: handler
    }
}