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
            
            const sheetName = 'sheet1';
            const worksheet = workbook.Sheets[sheetName];
            insert_table(cellRef,worksheet)
            // Export the modified workbook

            XLSX.writeFile(workbook, 'modified_template.xlsx');
        };

        reader.readAsBinaryString(file);
    }
    });
    input.click();
});

document.getElementById('default-export').addEventListener('click', () => {
    fetch('./src/template.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const cellRef = {c: 1, r: 8};
        const sheetName = 'sheet1';
        const worksheet = workbook.Sheets[sheetName];

        insert_table(cellRef,worksheet)
        XLSX.writeFile(workbook, 'modified_template.xlsx');
    })
    .catch(error => console.error('Error fetching template:', error));
});

function insert_table(cellRef,worksheet){
    const table = document.getElementById('itemTable');
    const htmlTableWorkbook = XLSX.utils.table_to_book(table);

    // // Get the first sheet from the HTML table workbook
    const htmlTableSheet = htmlTableWorkbook.Sheets[Object.keys(htmlTableWorkbook.Sheets)[0]];
    const htmlTableData = XLSX.utils.sheet_to_json(htmlTableSheet, { header: 1 });
    console.log(htmlTableData);

    htmlTableData.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            console.log([cellRef.c, cellRef.r]);

            const updatedCellRef = {
                c: cellRef.c + colIndex,
                r: cellRef.r + rowIndex
            };
            console.log([value,updatedCellRef]);
            const updatedCellAddress = XLSX.utils.encode_cell(updatedCellRef);
            const cell=worksheet[updatedCellAddress];
            if(cell){
               cell.v = value; 
            }
            else{
                XLSX.utils.sheet_add_aoa(worksheet, [[value]], { origin: updatedCellAddress});
            }
            
        });
    });
}