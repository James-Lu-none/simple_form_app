function generatePDF() {
    // Code to send data to the server for PDF generation
    const data = { items, total: document.getElementById('total').value };
    console.log(JSON.stringify(data));
    fetch('/generate-pdf', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        // Handle the response from the server (e.g., show a link to download the PDF)
        console.log(result);
    })
    .catch(error => console.error('Error:', error));
}
