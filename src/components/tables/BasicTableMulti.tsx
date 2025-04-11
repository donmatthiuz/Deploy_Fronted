import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";
import { Item } from "../../pages/ManifiestoPage/ManifiestoPage";
import Checkbox from "../form/input/Checkbox";
import {DeleteIcon, PrintIcon}  from "../../icons"

interface BasicTableMultiProps {
  tableData: Item[];
  setTableData: (data: Item[]) => void;
  addBulto: (items: Item[], useSameID:boolean) => void;
  addSameBulto: (items: Item[]) => void;

}

export default function BasicTableMulti({ tableData, setTableData, addBulto, addSameBulto }: BasicTableMultiProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [useSameID, setUseSameID] = useState(false);

  const totalPeso = tableData
    .filter((item) => selectedRows.includes(item.id))
    .reduce((sum, item) => sum + parseFloat(item.peso.toString()), 0);

  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleAddBulto = () => {
    const selectedItems = tableData.filter((item) => selectedRows.includes(item.id));
    if (selectedItems.length === 0) return;
    addBulto(selectedItems,useSameID);
    setTableData(tableData.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const handleSameAddBulto = () => {
    const selectedItems = tableData.filter((item) => selectedRows.includes(item.id));
    if (selectedItems.length === 0) return;
    addSameBulto(selectedItems);
    setTableData(tableData.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          Peso Total: {totalPeso} lbs
        </span>
        <Checkbox 
          checked={useSameID} 
          onChange={setUseSameID}
          label="Seguir secuencia" />


        <Button size="sm" onClick={handleAddBulto}>
          Agregar Bulto
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader className="w-1/5 text-center">
                  <input type="checkbox" disabled />
                </TableCell>
                <TableCell isHeader className="w-1/5 text-center">Código</TableCell>
                <TableCell isHeader className="w-1/5 text-center">Descripción</TableCell>
                <TableCell isHeader className="w-1/5 text-center">Peso (Lbs)</TableCell>
                <TableCell isHeader className="w-1/5 text-center">Tipo</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="w-1/5 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                      className="cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="w-1/5 text-center">{item.codigo}</TableCell>
                  <TableCell className="w-1/5 text-center">{item.contenido}</TableCell>
                  <TableCell className="w-1/5 text-center">{item.peso}</TableCell>
                  <TableCell className="w-1/5 text-center">{item.tipo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}


export function BultosTable({ bultos }: { bultos: { id: number; numeroBulto: number; codigo: string; descripcion: string; peso: number; tipo: string }[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-6">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">


        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          Bultos del Manifiesto
        </span>

        <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                
           


                <Button size="sm">
                  Nuevo Bulto
                </Button>
                <Button size="sm">
                  Imprimir en Rango
                </Button>

        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader className="text-center">Bulto</TableCell>
              <TableCell isHeader className="text-center">Código</TableCell>
              <TableCell isHeader className="text-center">Descripción</TableCell>
              <TableCell isHeader className="text-center">Peso (Lbs)</TableCell>
              <TableCell isHeader className="text-center">Tipo</TableCell>
              <TableCell isHeader className="min-w-[140px] text-center">Imprimir</TableCell>
              <TableCell isHeader className="min-w-[140px] text-center">Quitar</TableCell>
            </TableRow>
          </TableHeader>
            <TableBody>
              {bultos.map((bulto) => (
                <TableRow key={`${bulto.numeroBulto}`}>
                  <TableCell className="w-1/5 text-center">{bulto.numeroBulto}</TableCell>
                  <TableCell className="w-1/5 text-center">{bulto.codigo}</TableCell>
                  <TableCell className="w-1/5 text-center">{bulto.descripcion}</TableCell>
                  <TableCell className="w-1/5 text-center">{bulto.peso}</TableCell>
                  <TableCell className="w-1/5 text-center">{bulto.tipo}</TableCell>
                  <TableCell className="w-1/5 text-center">
                  <Button  variant="outline" onClick={() => { } } startIcon={<PrintIcon />} children={undefined}>  
                  </Button>
                  </TableCell>
                  <TableCell className="w-1/5 text-center">
                  <Button size="sm"  variant="outline"  onClick={() => { } } startIcon={<DeleteIcon />} children={undefined}>  
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}


