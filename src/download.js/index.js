import React from "react";
import html2pdf from "html2pdf.js";

const AppCompo = () => {
  const onButtonClick = () => {
    const content = document.getElementById("pdf-content");

    const options = {
      margin: 10,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(content).set(options).outputPdf().then((pdf) => {
      const link = document.createElement("a");
      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.download = options.filename;
      document.body.appendChild(link);
      link.click();

      // Delay removal of the link to ensure the download has started
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    });
  };

  return (
    <>
      <center>
        <h1>Welcome to Geeks for Geeks</h1>
        <h3>Click on the button below to download the PDF file</h3>
        <button onClick={onButtonClick}>Download PDF</button>
      </center>

      {/* Add an ID to the content you want to convert to PDF */}
      <div id="pdf-content">
          <div>
          <span>ramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramram
          ramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramramram</span></div>
        <h2>This is the content of the PDF</h2>
        <p>More content...</p>
      </div>
    </>
  );
};

export default AppCompo;


// import { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// function MyApp() {
//   const [numPages, setNumPages] = useState();
//   const [pageNumber, setPageNumber] = useState(1);
//   function onDocumentLoadSuccess({ numPages }){
//     setNumPages(numPages);
//   }
//   function downloadPdf(pdfUrl, fileName = 'Sample.pdf') {
//     fetch(pdfUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.blob();
//       })
//       .then(blob => {
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = fileName;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//       })
//       .catch(error => console.error('Error downloading PDF:', error));
//   }
//   // Example usage:
//   const pdfUrl = 'Sample.pdf'; // Update with your PDF file URL
//   const fileName = 'Sample.pdf'; // Optionally, specify the file name
//   downloadPdf(pdfUrl, fileName);
//   // Example: Trigger download when a button is clicked
//   const downloadButton = document.getElementById('downloadButton');
//   downloadButton.addEventListener('click', downloadPdf);
//   return (
//     <div>
//       <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//       <button onClick={downloadPdf}>Download PDF</button>
//     </div>
//   );
// }
// export default MyApp;
