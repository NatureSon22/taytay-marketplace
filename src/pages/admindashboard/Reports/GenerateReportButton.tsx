import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { vectorUrl, logoUrl, taglineUrl } from "./info.ts";
import { formatDate } from "@/utils/formatDate";

type GenerateReportButtonProps = {
  data: any[];
  reportTitle: string;
};

const getColumnHeaders = (type: string) => {
  switch (type) {
    case "Seller":
      return ["Email", "Full Name", "Store", "Status"];
    case "Admin":
      return ["Email", "Username", "Role", "Status"];
    case "Activity Log":
      return ["Username", "Action", "Date"];
    case "User Growth":
      return ["Month", "Users"];
    default:
      return ["#"];
  }
};

const getRowData = (type: string, data: any[]) => {
  return data.map((item, index) => {
    switch (type) {
      case "Seller":
        return [
          item.email,
          item.firstName + " " + item.lastName,
          item.storeName,
          item.status,
        ];
      case "Admin":
        return [item.id, item.email, item.firstName + " " + item.lastName, item.role, item.status];
      case "Activity Log":
        return [item.username, item.action, formatDate(item.createdAt)];
      case "User Growth":
        return [item.month, item.users];
      default:
        return [index + 1];
    }
  });
};

const getReportTitleXOffset = (reportTitle: string): number => {
  switch (reportTitle) {
    case "Seller":
      return 103; 
    case "Admin":
      return 101.5;
    case "Activity Log":
      return 96;
    case "User Growth":
      return 95;
    default:
      return 100;
  }
};

function GenerateReportButton({ data, reportTitle }: GenerateReportButtonProps) {
  const handleGeneratePDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const today = new Date().toLocaleDateString("en-US");

    const addHeader = () => {
      const imgWidth = 21;
      const imgHeight = 21;

      doc.addImage(logoUrl, "PNG", 138, 24, 52, 12.5);
      // doc.addImage(taglineUrl, "PNG", 40, 22, 67, 13.5);
      doc.addImage(vectorUrl, "PNG", 113, 18, imgWidth, imgHeight);

      doc.setLineWidth(0.1);
      doc.line(15, 47, 285, 47);
      doc.line(15, 46.3, 285, 46.3);

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("TAYTAY TIANGGE", 95 + imgWidth + 10, 55);

      doc.setFontSize(13);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const titleX = getReportTitleXOffset(reportTitle);
      doc.text(`${reportTitle} Report`, titleX + imgWidth + 10, 60);
    };

    const addFooter = (pageNumber: number) => {
      doc.line(14, 195, 285, 195);
      doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(100);
      doc.text(`Page ${pageNumber} | Generated on: ${today}`, 232, 200);
      doc.text(`CONFIDENTIAL - For internal use only`, 14, 200);
    };

    const columnHeaders = getColumnHeaders(reportTitle);
    const rowData = getRowData(reportTitle, data);

    const rowsPerPage = 16;
    const totalPages = Math.ceil(rowData.length / rowsPerPage);

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) {
        doc.addPage();
      }

      addHeader();

      const chunk = rowData.slice(i * rowsPerPage, (i + 1) * rowsPerPage);

      autoTable(doc, {
        head: [columnHeaders],
        body: chunk,
        startY: 65,
        didDrawPage: () => addFooter(doc.getNumberOfPages()),

        styles: {
          fontSize: 10,
          halign: "center",
          valign: "middle",
          lineWidth: 0.2,
          lineColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [51, 153, 204], // teal
          textColor: 255,
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { halign: "center", cellWidth: 40 },
        },
        tableWidth: "auto",
      });
    }

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
  };

  return (
    <Button
      onClick={handleGeneratePDF}
      variant="outline"
      className="gap-2 !border-100 hover:text-100 border text-100 cursor-pointer"
    >
      <FileText size={16} />
      Preview PDF
    </Button>
  );
}

export default GenerateReportButton;
