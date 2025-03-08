import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface Package {
  codigo: string;
  fechaPaquete: string;
  descripcion: string;
  peso: number;
  tipo: string;
  nombreEnvia: string;
  nombreRecibe: string;
}

// Define the table data with updated descriptions and weight as numbers
const tableData: Package[] = [
  {
    codigo: "001K",
    fechaPaquete: "2025-03-07",
    descripcion: "Queso",
    peso: 3.9,
    tipo: "Seco",
    nombreEnvia: "Lindsey Curtis",
    nombreRecibe: "Carla George",
  },
  {
    codigo: "002K",
    fechaPaquete: "2025-03-08",
    descripcion: "Ropa, Cadena de Oro, Documento de Fe de Edad",
    peso: 2.5,
    tipo: "Frio",
    nombreEnvia: "Kaiya George",
    nombreRecibe: "Zain Geidt",
  },
  {
    codigo: "003K",
    fechaPaquete: "2025-03-09",
    descripcion: "Pulseras, Cacahuates",
    peso: 1.8,
    tipo: "Seco",
    nombreEnvia: "Abram Schleifer",
    nombreRecibe: "Carla George",
  },
  {
    codigo: "004K",
    fechaPaquete: "2025-03-10",
    descripcion: "Cinturones, Cigarros",
    peso: 4.5,
    tipo: "Seco",
    nombreEnvia: "Carla George",
    nombreRecibe: "Lindsey Curtis",
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
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
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nombre Envia
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nombre Recibe
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((pkg) => (
                <TableRow key={pkg.codigo}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {pkg.codigo}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.fechaPaquete}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.descripcion}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.peso}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.tipo}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.nombreEnvia}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pkg.nombreRecibe}
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
