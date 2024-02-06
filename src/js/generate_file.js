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

document.getElementById("default-export-word").addEventListener('click',()=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './src/template.docx', true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
        const content = new Uint8Array(xhr.response);
        const zip = new PizZip(content);
        const doc = new docxtemplater(zip,{
            paragraphLoop: true,
            linebreaks: true,
        });
        // Create a data object with your data
        const data = {
            products: items,
            quote_total: getTotal()
            // Add other data as needed
        };
        // Render the document (replace the placeholders with your data)
        doc.render(data);

        // Optionally, you can create a link to download the generated document
        const blob = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });
        saveAs(blob, "output.docx");
    };

    xhr.send();
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

