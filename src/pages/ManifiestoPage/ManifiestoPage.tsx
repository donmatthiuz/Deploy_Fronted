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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExcelJS from 'exceljs';
import axios from 'axios';


export interface Item {
  id: number;
  codigo: string;
  contenido: string;
  peso: number;
  tipo: string;
  id_real?: number | null;
}

export default function ManifiestoPage() {

  const { llamado: traducir } = useApi(`${source_link}/translate`);

  const { llamado: getPaquetedata } = useApi(`${source_link}/getPaquetedata`);
  

  const exportToExcel = async () => {
    if (!bultos || bultos.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }
  
    // Map data_bultos from bultos
    const data_bultos = await Promise.all(bultos.map(async (bulto) => {

      const body = {
            text: bulto.descripcion,
            sourceLang: "es",
            targetLang: "en"
      };

      const bodydata = {
        idPaquete:bulto.id_real
      }
      

      const resultado = await traducir(body, "POST");

      const resultado_data = await getPaquetedata(bodydata, "POST");


      const descripcionTraducida = resultado.translatedText.toUpperCase();
      const nombreenvia = resultado_data.response.envia.nombre.toUpperCase();
      const nombrerecibe = resultado_data.response.recibe.nombre.toUpperCase();
      const direnvia = resultado_data.response.envia.direccion.toUpperCase();
      const dirrerecibe = resultado_data.response.recibe.direccion.toUpperCase();

      return {
        "HAWB": bulto.codigo,
        "Origen": "GUA",
        "DESTINO": "JFK",
        "PIEZAS": "1",
        "PESO": (bulto.peso * 0.453592).toFixed(2),
        "NOMBRE DEL SHIPPER": nombreenvia,
        "DIRECCION 1 SHIPPER": dirrerecibe,
        "CIUDAD SHIPPER": "",
        "ESTADO REGION": "GT",
        "PAIS": "GT",
        "CODIGO POSTAL": "",
        "NOMBRE DEL CONSIGNATARIO": nombrerecibe,
        "DIRECCION CONSIGNATARIO": direnvia,
        "CIUDAD CONSIGN": "",
        "ESTADO": "",
        "PAIS CONSIGN": "USA",
        "CODIGO POSTAL CONSIGN": "",
        "DESCRIPCION DE LA CARGA": descripcionTraducida || "", // Si la traducción falla, se coloca un string vacío
        "BAG": bulto.id,
      };
    }));
  
  
    console.log("Datos para exportar:", data_bultos);  // Debugging log to check data
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bultos');
    
  
    // Define columns (headers)
    worksheet.columns = [
      { header: 'HAWB', key: 'HAWB', width: 20 },
      { header: 'Origen', key: 'Origen', width: 10 },
      { header: 'Destino', key: 'DESTINO', width: 10 },
      { header: 'PIEZAS', key: 'PIEZAS', width: 10 },
      { header: 'PESO', key: 'PESO', width: 10 },
      { header: 'NOMBRE DEL SHIPPER', key: 'NOMBRE DEL SHIPPER', width: 20 },
      { header: 'DIRECCION 1 SHIPPER', key: 'DIRECCION 1 SHIPPER', width: 30 },
      { header: 'CIUDAD SHIPPER', key: 'CIUDAD SHIPPER', width: 20 },
      { header: 'ESTADO REGION', key: 'ESTADO REGION', width: 15 },
      { header: 'PAIS', key: 'PAIS', width: 15 },
      { header: 'CODIGO POSTAL', key: 'CODIGO POSTAL', width: 15 },
      { header: 'NOMBRE DEL CONSIGNATARIO', key: 'NOMBRE DEL CONSIGNATARIO', width: 20 },
      { header: 'DIRECCION CONSIGNATARIO', key: 'DIRECCION CONSIGNATARIO', width: 30 },
      { header: 'CIUDAD CONSIGN', key: 'CIUDAD CONSIGN', width: 20 },
      { header: 'ESTADO', key: 'ESTADO', width: 15 },
      { header: 'PAIS CONSIGN', key: 'PAIS CONSIGN', width: 20 },
      { header: 'CODIGO POSTAL CONSIGN', key: 'CODIGO POSTAL CONSIGN', width: 20 },
      { header: 'DESCRIPCION DE LA CARGA', key: 'DESCRIPCION DE LA CARGA', width: 60 },
      { header: 'BAG', key: 'BAG', width: 15 },
    ];
  
    // Add data rows to the worksheet
    data_bultos.forEach(bulto => {
      worksheet.addRow(bulto);
    });
  
    // Set styles for headers (applying different colors to each header)
    const headerColors = [

      "1F4E78","1F4E78", "1F4E78","1F4E78","1F4E78", "2f75b5", "2f75b5","2f75b5","2f75b5","2f75b5","2f75b5", "5b75d5","5b75d5","5b75d5","5b75d5","5b75d5","5b75d5",
      "1F4E78","1F4E78"
    ];
  
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: headerColors[colNumber - 1] } // Apply different color to each header
      };
      cell.font = { bold: false, color: { argb: 'FFFFFF' } }; // White font on headers
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  
    // Save the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, `Bultos_${new Date().toISOString().split("T")[0]}.xlsx`);
    });
  };
  
  

  const [tableData_frios, setTableDataFrios] = useState<Item[]>([]);
  const [tableData_secos, setTableDataSecos] = useState<Item[]>([]);
  const [bultos, setBultos] = useState<{ id: number; numeroBulto: number; codigo: string; descripcion: string; peso: number; tipo: string, id_real: number | null; }[]>([]);
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

      console.log(response)
    };
    get_frios();
  }, []);

  const addBulto = (items: Item[], useSameID = false) => {
    if (items.length === 0) return;
    const codigo = items[0].codigo;
    const id_real = items[0].id; // ✅ Se asigna el id del primer item
    const descripcion = items.map(item => item.contenido).join(", ");
    const peso = items.reduce((sum, item) => parseFloat(sum) + parseFloat(item.peso), 0);
    const tipo = items[0].tipo;

    setBultos([...bultos, { id: bultos.length + 1, numeroBulto: bultoCounter, codigo, descripcion, peso, tipo, id_real }]);
    setBultoCounter(bultoCounter + 1);
    if (!useSameID) {
      setBultoCounter(bultoCounter + 1);
    }else{
      console.log("EL MISMO")
    }

  };

  const addSameBulto = (items: Item[]) => {
    if (items.length === 0) return;
    const codigo = items[0].codigo;
    const descripcion = items.map(item => item.contenido).join(", ");
    const peso = items.reduce((sum, item) => parseFloat(sum) + parseFloat(item.peso), 0);
    const tipo = items[0].tipo;

    setBultos([...bultos, { id: bultos.length + 1, numeroBulto: bultoCounter, codigo, descripcion, peso, tipo }]);
  };

  // Calcular el peso total de los bultos en libras y convertir a kilos
  const totalPesoLibras = bultos.reduce((sum, bulto) => sum + bulto.peso, 0);
  const totalPesoKilos = totalPesoLibras * 0.453592; // 1 libra = 0.453592 kg

  return (
    <>
      <PageMeta
        title={`${PAGE_NAME} - Manifiesto`}
        description="Esta es la página de tablas básicas para el Dashboard de TailAdmin en React.js y Tailwind CSS"
      />
      <PageBreadcrumb pageTitle={`Total: ${totalPesoKilos.toFixed(2)}KG              Manifiesto  ${range}`} />
      
      <div className="space-y-6">
      <button onClick={exportToExcel} className="btn btn-primary">
  Exportar a Excel
</button>
        <ComponentCard title="Bultos">

          <BultosTable bultos={bultos} />
        </ComponentCard>
        <ComponentCard title="Frios">
          <BasicTableMulti tableData={tableData_frios} setTableData={setTableDataFrios} addBulto={addBulto} addSameBulto={addSameBulto} />
        </ComponentCard>
        <ComponentCard title="Secos">
          <BasicTableMulti tableData={tableData_secos} setTableData={setTableDataSecos} addBulto={addBulto} addSameBulto={addSameBulto} />
        </ComponentCard>
      </div>
    </>
  );
}
