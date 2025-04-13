import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";


import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import source_link from "../../../repositori/source_repo";
import useToken, { parseJwt } from "../../../hooks/useToken";




interface Package {
  codigo: string;
  fecha: string;
  contenido: string;
  peso: number;
  tipo: string;
}

// Define the table data with updated descriptions and weight as numbers


export default function BasicTableOne({ fecha_inicio, fecha_fin }: { fecha_inicio: string; fecha_fin: string }) {

  const { token } = useToken();
  const jwt = token ? parseJwt(token) : null;
  const id_oficina = jwt ? jwt.id_oficina : null;

  const {llamado: obtener_paquetes_fecha_oficina} = useApi(`${source_link}/obtener_paquetes_fecha_oficina`)
  const [tableData, setTableData] = useState<Package[]>([]);
  useEffect(()=>{
   

    const gettable_Data = async()=>{

      const body = {
        fecha_inicio,
        fecha_fin,
        oficina: id_oficina

      }

      console.log(body)

      const response_d = await obtener_paquetes_fecha_oficina(body,"POST")

      if (response_d.success===true){
        setTableData(response_d.response)
        
      }

    }

    gettable_Data();

  },[])
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[500px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Codigo
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fecha Paquete
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Descripción
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Peso (Lbs)
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tipo
                </TableCell>
                
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((pkg) => (
                <TableRow key={pkg.codigo}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.codigo}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.fecha}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.contenido}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.peso}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.tipo}
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
