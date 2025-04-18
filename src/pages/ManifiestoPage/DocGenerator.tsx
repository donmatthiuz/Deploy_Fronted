// src/components/DocGenerator.tsx
import React from "react";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import Button from "../../components/ui/button/Button";

interface HeaderData {
  no: number;
  frios: number;
  seco: number;
  kg: number;
}

interface Props {
  headerData: HeaderData;
}

const DocGenerator: React.FC<Props> = ({ headerData }) => {
  const generarDocumento = () => {
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString();

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: fechaFormateada, bold: true, size: 48, font: "Arial Black" }),
                new TextRun({ text: "", break: 2 }),
              ],
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "BULTOS EN TOTAL", bold: true, size: 84, font: "Arial Black" }),
                new TextRun({ text: "", break: 2 }),
                new TextRun({ text: headerData.no.toString(), bold: true, size: 84, font: "Arial Black" }),
                new TextRun({ text: "", break: 2 }),
                new TextRun({ text: "BULTOS FRIOS", bold: true, size: 84, font: "Arial Black" }),
                new TextRun({ text: "", break: 2 }),
                new TextRun({ text: headerData.frios.toString(), bold: true, size: 84, font: "Arial Black" }),
                new TextRun({ text: "", break: 2 }),
                new TextRun({ text: "BULTOS SECOS", bold: true, size: 84, font: "Arial Black" }),
                new TextRun({ text: "", break: 2 }),
                new TextRun({ text: headerData.seco.toString(), bold: true, size: 84, font: "Arial Black" }),
                new TextRun({ text: "", break: 2 }),
                new TextRun({ text: "PESO TOTAL", bold: true, size: 84, font: "Arial Black" }),
                new TextRun({ text: "", break: 2 }),
                new TextRun({ text: headerData.kg.toString() + "KL", bold: true, size: 84, font: "Arial Black" }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc)
      .then((blob) => {
        saveAs(blob, "Bultos.docx");
      })
      .catch((err) => {
        console.error("Error al generar el documento:", err);
      });
  };

  return (
    <Button size="sm" onClick={generarDocumento}>
      Descargar Dato de Bultos
    </Button>
  );
  


};

export default DocGenerator;
