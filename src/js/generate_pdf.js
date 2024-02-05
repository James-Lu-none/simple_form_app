document.getElementById('select-export').addEventListener('click', () => {
    // Assuming you have a file input for selecting the template
    const input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        const cellRef = XLSX.utils.encode_cell({c: 1, r: 8});
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            
            // Access a specific sheet (replace 'Sheet1' with the sheet name in your template)
            const sheetName = 'sheet1';
            const worksheet = workbook.Sheets[sheetName];
            // Convert HTML table to a workbook
            const table = document.getElementById('itemTable');
            const htmlTableWorkbook = XLSX.utils.table_to_book(table);

            // // Get the first sheet from the HTML table workbook
            const htmlTableSheet = htmlTableWorkbook.Sheets[Object.keys(htmlTableWorkbook.Sheets)[0]];
            // console.log(htmlTableSheet);
            // // Append HTML table data to the existing worksheet
            XLSX.utils.sheet_add_aoa(worksheet,  XLSX.utils.sheet_to_json(htmlTableSheet, { header: 1 }), { origin: cellRef });

            // Export the modified workbook

            XLSX.writeFile(workbook, 'modified_template.xlsx');
        };

        reader.readAsBinaryString(file);
    }
    });

    // Trigger the file input
    input.click();
});

document.getElementById('default-export').addEventListener('click', () => {
    fetch('./src/template.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
    const cellRef = XLSX.utils.encode_cell({c: 1, r: 8});
    
    // Access a specific sheet (replace 'Sheet1' with the sheet name in your template)
    const sheetName = 'sheet1';
    const worksheet = workbook.Sheets[sheetName];
    // Convert HTML table to a workbook
    const table = document.getElementById('itemTable');
    const htmlTableWorkbook = XLSX.utils.table_to_book(table);

    // // Get the first sheet from the HTML table workbook
    const htmlTableSheet = htmlTableWorkbook.Sheets[Object.keys(htmlTableWorkbook.Sheets)[0]];
    // console.log(htmlTableSheet);
    // // Append HTML table data to the existing worksheet
    XLSX.utils.sheet_add_aoa(worksheet,  XLSX.utils.sheet_to_json(htmlTableSheet, { header: 1 }), { origin: cellRef });

    // Export the modified workbook

    XLSX.writeFile(workbook, 'modified_template.xlsx');
    })
    .catch(error => console.error('Error fetching template:', error));
});