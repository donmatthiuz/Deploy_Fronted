import React from 'react';
import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import Button from '../../components/ui/button/Button';

interface HeaderData {
  no: number;
  frios: number;
  seco: number;
  kg: number;
}
interface WordComponentProps {
  initialText?: string;
  backgroundColor?: string;
  headerData: HeaderData;
}

const WordComponent: React.FC<WordComponentProps> = (props) => {
  const {
    
    headerData,
  } = props;
  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString();

  const downloadWord = async () => {
    try {
      // Crear un nuevo documento
      const doc = new Document({
        sections: [{
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
                          new TextRun({ text: headerData.kg.toString()+"KL", bold: true, size: 84, font: "Arial Black" }),
                          
                      ],
                      alignment: AlignmentType.CENTER, 
                    }),
                    
           
          ],
        }],
      });

      // Generar y descargar el documento
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "Bulto.docx");
    } catch (error) {
      console.error("Error al generar el documento Word:", error);
    }
  };

  return (
<Button           onClick={downloadWord}>Descargar Documento Word</Button>
  );
};

export default WordComponent;