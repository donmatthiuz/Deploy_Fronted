import React from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import Button from '../../components/ui/button/Button';
interface WordComponentProps {
  initialText?: string;
  backgroundColor?: string;
}

const WordComponent: React.FC<WordComponentProps> = (props) => {
  const {
    initialText = "Documento de Word",
    
  } = props;

  const downloadWord = async () => {
    try {
      // Crear un nuevo documento
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(initialText),
              ],
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