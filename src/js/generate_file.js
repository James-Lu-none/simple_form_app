// import 'mammoth';
document.getElementById('default-export').addEventListener('click', () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    insert_table({c: 0, r: 0},worksheet)
    XLSX.writeFile(workbook, 'output.xlsx');
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
            quoteTotal: getTotal(),
            ...getInfo()
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
        mammoth.extractRawText({ arrayBuffer: content })
            .then(result => {
                const htmlContent = result.value;
                html2pdf().from(htmlContent).outputPdf().then(pdf => {
                    const blob = new Blob([pdf], { type: 'application/pdf' });
                    saveAs(blob, "output.pdf");
                });
            })
            .catch(error => console.log(error));
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

