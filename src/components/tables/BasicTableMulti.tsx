import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";
import { Item } from "../../pages/ManifiestoPage/ManifiestoPage";

interface BasicTableMultiProps {
  tableData: Item[];
  setTableData: (data: Item[]) => void;
  addBulto: (items: Item[]) => void;
}

export default function BasicTableMulti({ tableData, setTableData, addBulto }: BasicTableMultiProps) {
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
    setTableData(tableData.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          Peso Total: {totalPeso} lbs
        </span>
        <Button size="sm" onClick={handleAddBulto}>
          Agregar Bulto
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>
                  <input type="checkbox" disabled />
                </TableCell>
                <TableCell isHeader>Código</TableCell>
                <TableCell isHeader>Descripción</TableCell>
                <TableCell isHeader>Peso (Lbs)</TableCell>
                <TableCell isHeader>Tipo</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                      className="cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.contenido}</TableCell>
                  <TableCell>{item.peso}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export function BultosTable({ bultos }: { bultos: { id: number; numeroBulto: number; items: Item[] }[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-6">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          Bultos Agregados
        </span>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Bulto</TableCell>
                <TableCell isHeader>Código</TableCell>
                <TableCell isHeader>Descripción</TableCell>
                <TableCell isHeader>Peso (Lbs)</TableCell>
                <TableCell isHeader>Tipo</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bultos.map((bulto) => (
                bulto.items.map((item) => (
                  <TableRow key={`${bulto.numeroBulto}-${item.id}`}>
                    <TableCell>{bulto.numeroBulto}</TableCell>
                    <TableCell>{item.codigo}</TableCell>
                    <TableCell>{item.contenido}</TableCell>
                    <TableCell>{item.peso}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
