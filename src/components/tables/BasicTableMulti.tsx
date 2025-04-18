import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";
import { Item, Item_Bulto } from "../../pages/ManifiestoPage/ManifiestoPage";
import Checkbox from "../form/input/Checkbox";
import {DeleteIcon}  from "../../icons"
import Input from "../form/input/InputField";
import Label from "../form/Label";


interface BasicTableMultiProps {
  tableData: Item[];

  addBulto: (items: Item[]) => void;
  addSameBulto: (items: Item[]) => void;
  setUseSameID: (value: boolean) => void;
  useSameID: boolean;
  handleAtiende: (e: React.ChangeEvent<HTMLInputElement>) => void;
  atiende: string;


}

export default function BasicTableMulti({ tableData,  addBulto , setUseSameID, useSameID, atiende, handleAtiende}: BasicTableMultiProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  

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
    addBulto(selectedItems);
    //setTableData(tableData.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          Peso Total: {totalPeso} lbs
        </span>
        <div style={{display: 'flex', flexDirection: 'column' }}>
        <Label htmlFor="codigo">Nombre de quien atendio</Label>
        <Input 
                  type="text" 
                  id="codigomio"
                  onChange={handleAtiende}
                  value={atiende}
                  name="codigomio"
                
                />


        </div>

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
          <TableCell isHeader className="w-[100px] text-center">
            <input type="checkbox" disabled />
          </TableCell>
          <TableCell isHeader className="w-1/5 text-center">Código</TableCell>
          <TableCell isHeader className="w-1/5 text-center">Descripción</TableCell>
          <TableCell isHeader className="w-1/5 text-center">Peso (Lbs)</TableCell>
          <TableCell isHeader className="w-1/5 text-center">Tipo</TableCell>
          <TableCell isHeader className="w-1/5 text-center">Envio</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item, index) => (
          <TableRow
            key={item.id}
            className={
              index % 2 === 0
                ? "bg-gray-50 dark:bg-gray-800/50"
                : "bg-gray-200 dark:bg-gray-700"
            }
          >
            <TableCell className="w-1/20 text-center">
              <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => handleSelectRow(item.id)}
                className="cursor-pointer"
              />
            </TableCell>

            <TableCell className="w-1/30 text-center">{item.codigo}</TableCell>
            <TableCell className="w-1/3 text-center">{item.contenido}</TableCell>
            <TableCell className="w-1/10 text-center">{item.peso}</TableCell>
            <TableCell className="w-1/10 text-center">{item.tipo}</TableCell>
            <TableCell className="w-1/3 text-center">
            {String(item.direccion_cliente_envia)?.toLowerCase().includes("guatemala") ||
            String(item.direccion_cliente_envia)?.toLowerCase().includes("gt") ||
            String(item.direccion_cliente_envia)?.toLowerCase().includes("gua")
            ? "Guatemala -> USA"
            : "USA -> Guatemala"}

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

interface BultosTableProps {
  bultos: Item_Bulto[];
  delete_id_bulto: (id: number) => void;
  imprimir: () => void;
  openInsert: (value: boolean) => void;

}

export function BultosTable({ bultos, delete_id_bulto, openInsert, imprimir }: BultosTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-6">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">


        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          Bultos del Manifiesto
        </span>

        <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                
           


                <Button size="sm"
                  onClick={() => openInsert(true)
                  }>
                  Nuevo Bulto
                </Button>
                <Button size="sm"
                  onClick={imprimir}>
                  Imprimir
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
             
              <TableCell isHeader className="min-w-[140px] text-center">Quitar</TableCell>
            </TableRow>
          </TableHeader>
            <TableBody>
              {bultos.map((bulto, index) => (
                <TableRow key={`${bulto.id}`}
                className={index % 2 === 0 ? 
                  'bg-gray-50 dark:bg-gray-800/50' : 'bg-gray-200 dark:bg-gray-700'}
>
                  
                  <TableCell className="w-1/10 text-center">{bulto.id}</TableCell>
                  <TableCell className="w-1/11 text-center">{bulto.codigo}</TableCell>
                  <TableCell className="w-1/2 text-center">{bulto.contenido}</TableCell>
                  <TableCell className="w-1/5 text-center">{bulto.peso}</TableCell>
                  <TableCell className="w-1/5 text-center">{bulto.tipo}</TableCell>
                  
 
                  <TableCell className="w-1/5 text-center">
                  <Button size="sm"  variant="outline"    
                    onClick={() => {
                      if (bulto.id_real != null) {
                        delete_id_bulto(bulto.id_real);
                      }
                    }}
                    

                    startIcon={<DeleteIcon />} children={undefined}>  
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


