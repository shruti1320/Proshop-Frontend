import React from "react";
import html2pdf from "html2pdf.js";
import { Image } from "react-bootstrap";

const PdfDownload = () => {
  const onButtonClick = () => {
    const content = document.getElementById("pdf-content");
    const options = {
      margin: 10,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf()
      .from(content)
      .set(options)
      .save();
  };

  return (
    <>
      <center>
        <h3>Click on the button below to download the PDF file</h3>
        <button onClick={onButtonClick}>Download PDF</button>
      </center>
      {/* Add an ID to the content you want to convert to PDF */}
      <div id="pdf-content">
        <div>
          <span>Content to convert in pdf </span>
        </div>
        <h2>This is the content of the PDF</h2>
        <p>More content...</p>
        
      </div>
    </>
  );
};

export default PdfDownload;
