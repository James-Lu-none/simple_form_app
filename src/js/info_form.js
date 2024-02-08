function initInfoForm() {
    const handler = document.getElementById('handler');
    handler.value = "盧建良";
}
function getInfo(){
    const date = getElementByIdWithError('date');
    const customerName = document.getElementById('customerName').value;
    const constructionName = document.getElementById('constructionName').value;
    const constructionLocation = document.getElementById('constructionLocation').value;
    const handler = document.getElementById('handler').value;
    if(!date | !customerName | !constructionName | !constructionLocation | !handler){
        throw Error("info form not unsatisfied");
    }
    return {
        date: date,
        customerName: customerName,
        constructionName: constructionName,
        constructionLocation: constructionLocation,
        handler: handler
    }
}

function getElementByIdWithError(id){
    const element = document.getElementById(id);
    const data = element.value;
    if(!data){
        element.style.border = '1px solid red';
        element.addEventListener('click', function resetBorderColor() {
            element.style.border = '1px solid black';
            element.removeEventListener('click', resetBorderColor);
          }, { once: true });
        throw Error(id + 'field not filled');
    }
    else{
        return data;
    }
}