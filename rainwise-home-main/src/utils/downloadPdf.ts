import jsPDF from "jspdf";

export interface PdfReportData {
  state: string;
  city: string;
  roofArea: number;
  annualRainfall: number | null;
  harvestedWater: number;
}

export const downloadPDF = (data: PdfReportData) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Rainwater Harvesting Report", 20, 20);

  doc.setFontSize(12);
  doc.text("Generated using Rainwise", 20, 30);

  // Divider
  doc.line(20, 35, 190, 35);

  // Content
  doc.text(`State: ${data.state}`, 20, 50);
  doc.text(`City: ${data.city}`, 20, 60);

  doc.text(`Roof Area: ${data.roofArea} sq.m`, 20, 75);

  doc.text(
    `Annual Rainfall: ${
      data.annualRainfall !== null
        ? data.annualRainfall + " mm"
        : "Data not available"
    }`,
    20,
    85
  );

  doc.text(
    `Estimated Harvestable Water: ${data.harvestedWater.toFixed(2)} litres`,
    20,
    100
  );

  // Footer
  doc.line(20, 270, 190, 270);
  doc.setFontSize(10);
  doc.text("This is a system-generated report.", 20, 280);

  doc.save("rainwater-report.pdf");
};
