// WordComponent.tsx
import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

interface WordComponentProps {
  initialText?: string;
  backgroundColor?: string;
  textColor?: string;
}

// Definición explícita como componente funcional
const WordComponent: React.FC<WordComponentProps> = (props) => {
  const {
    initialText = "Documento de Word",
    backgroundColor = "bg-blue-100",
    textColor = "text-gray-800"
  } = props;

  const [text, setText] = useState<string>(initialText);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const downloadWord = async () => {
    try {
      // Crear un nuevo documento
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(text),
              ],
            }),
          ],
        }],
      });

      // Generar y descargar el documento
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "documento.docx");
    } catch (error) {
      console.error("Error al generar el documento Word:", error);
    }
  };

  return (
    <div className={`rounded-lg shadow-lg p-6 max-w-2xl mx-auto my-8 ${backgroundColor}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Editor de Texto</h2>
        <div className="space-x-2">
          <button 
            onClick={toggleEdit}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? "Guardar" : "Editar"}
          </button>
          <button 
            onClick={downloadWord}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Descargar .docx
          </button>
        </div>
      </div>
      
      <div className="border border-gray-300 bg-white rounded p-4 min-h-[300px]">
        {isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            className={`w-full h-full min-h-[280px] resize-none focus:outline-none ${textColor}`}
          />
        ) : (
          <div className={`w-full h-full whitespace-pre-wrap ${textColor}`}>
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

// Exportación explícita como default
export default WordComponent;