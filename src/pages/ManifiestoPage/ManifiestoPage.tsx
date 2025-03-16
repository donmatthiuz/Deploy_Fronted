import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PAGE_NAME from "../../pronto";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableMulti from "../../components/tables/BasicTableMulti";
import { BultosTable } from "../../components/tables/BasicTableMulti";
import { useEffect, useState } from "react";
import source_link from "../../repositori/source_repo";
import useApi from "../../hooks/useApi";

export interface Item {
  id: number;
  codigo: string;
  contenido: string;
  peso: number;
  tipo: string;
}

export default function ManifiestoPage() {
  const [tableData_frios, setTableDataFrios] = useState<Item[]>([]);
  const [tableData_secos, setTableDataSecos] = useState<Item[]>([]);
  const [bultos, setBultos] = useState<{ id: number; numeroBulto: number; items: Item[] }[]>([]);
  const { llamado: obtener_paquetes_fecha_paquete } = useApi(`${source_link}/obtener_paquetes_fecha_tipo`);
  const [bultoCounter, setBultoCounter] = useState(1);

  const getWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - ((dayOfWeek + 3) % 7));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const formatISODate = (date: Date) => date.toISOString().split('T')[0];
    return {
      range: `${startDate.toLocaleDateString("es-ES")} - ${endDate.toLocaleDateString("es-ES")}`,
      fecha_inicio: formatISODate(startDate),
      fecha_fin: formatISODate(endDate)
    };
  };

  const { range, fecha_inicio, fecha_fin } = getWeekRange();

  useEffect(() => {
    const get_frios = async () => {
      const body_frio = { fecha_inicio, fecha_fin, tipo: "Frio" };
      const body_seco = { fecha_inicio, fecha_fin, tipo: "Seco" };
      const response = await obtener_paquetes_fecha_paquete(body_frio, "POST");
      const response2 = await obtener_paquetes_fecha_paquete(body_seco, "POST");
      setTableDataFrios(response.response);
      setTableDataSecos(response2.response);
    };
    get_frios();
  }, []);

  const addBulto = (items: Item[]) => {
    setBultos([...bultos, { id: bultos.length + 1, numeroBulto: bultoCounter, items }]);
    setBultoCounter(bultoCounter + 1);
  };

  return (
    <>
      <PageMeta
        title={`${PAGE_NAME} - Manifiesto`}
        description="Esta es la página de tablas básicas para el Dashboard de TailAdmin en React.js y Tailwind CSS"
      />
      <PageBreadcrumb pageTitle={`Manifiesto  ${range}`} />
      <div className="space-y-6">
      <ComponentCard title="Bultos">
          <BultosTable bultos={bultos} />
        </ComponentCard>
        <ComponentCard title="Frios">
          <BasicTableMulti tableData={tableData_frios} setTableData={setTableDataFrios} addBulto={addBulto} />
        </ComponentCard>
        <ComponentCard title="Secos">
          <BasicTableMulti tableData={tableData_secos} setTableData={setTableDataSecos} addBulto={addBulto} />
        </ComponentCard>
       
      </div>
    </>
  );
}