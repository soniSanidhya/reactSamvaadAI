import React from 'react';

function ExportPdf({element}) {
    function exportToPDF(element) {
        console.log(element);
        var element = element; // Choose the element you want to export to PDF
    
        // Specify custom options for PDF generation
        var options = {
            filename: 'webpage.pdf',
            html2canvas: { scale: 2 }, // Scale factor for better quality (optional)
            jsPDF: { format: 'a4', orientation: 'landscape' } // Set orientation to landscape
        };
        console.log('yaya');
        html2pdf()
            .from(element)
            .set(options) // Apply custom options
            .save();
    }

    return (
        <div className=' bg-slate-700 rounded-lg sm:p-2 p-1'>
            <button onClick={()=>{exportToPDF(element)}}>Export PDF</button>
        </div>
    );
}

export default ExportPdf;