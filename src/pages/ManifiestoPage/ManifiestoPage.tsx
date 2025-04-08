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
import Button from "../../components/ui/button/Button";


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

      console.log(bulto.descripcion)
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


    worksheet.mergeCells('A1:E1');

    worksheet.getCell('A1').value = 'MANIFIESTO DE CARGA   SEGUN GUIA';

    worksheet.getCell('A1').font = { 
      name: 'Arial', 
      size: 12 
    };

    worksheet.getCell('A1').alignment = {
      horizontal: 'center',
      vertical: 'middle'   
    };


    // ahora seteamos el valor de NoGUIA

    worksheet.getColumn('F').width = 40; 

    worksheet.getCell('F1').value = '202 - 31115884';

    worksheet.getCell('F1').font = { 
      name: 'Arial', 
      size: 12 
    };

    worksheet.getCell('F1').alignment = {
      vertical: 'bottom'   
    };

    //vamos a setear el widtht del resto

    worksheet.getColumn('A').width = 14.15; 
    worksheet.getColumn('B').width = 14.15; 
    worksheet.getColumn('C').width = 14.15; 
    worksheet.getColumn('D').width = 14.15; 
    worksheet.getColumn('E').width = 14.15; 
    worksheet.getColumn('G').width = 64; 
    worksheet.getColumn('H').width = 52; 
    worksheet.getColumn('I').width = 27; 
    worksheet.getColumn('J').width = 10; 
    worksheet.getColumn('K').width = 25; 
    worksheet.getColumn('L').width = 46; 
    worksheet.getColumn('M').width = 46; 
    worksheet.getColumn('N').width = 28; 
    worksheet.getColumn('O').width = 14.72; 
    worksheet.getColumn('P').width = 9.57; 
    worksheet.getColumn('Q').width = 26.14; 
    worksheet.getColumn('R').width = 110; 
    worksheet.getColumn('S').width = 10;


    //Define columns (headers)
    const miscolumns = [
      { header: 'HAWB', key: 'HAWB', color: '1F4E78', cel: 'A' },
      { header: 'Origen', key: 'Origen', color: '1F4E78', cel: 'B'},
      { header: 'DESTINO', key: 'DESTINO', color: '1F4E78', cel: 'C'},
      { header: 'PIEZAS', key: 'PIEZAS', color: '1F4E78', cel: 'D'},
      { header: 'PESO', key: 'PESO', color: '1F4E78', cel: 'E'},
      { header: 'NOMBRE DEL SHIPPER', key: 'NOMBRE DEL SHIPPER', color: '2f75b5', cel: 'F'},
      { header: 'DIRECCION 1 SHIPPER', key: 'DIRECCION 1 SHIPPER', color: '2f75b5', cel: 'G'},
      { header: 'CIUDAD SHIPPER', key: 'CIUDAD SHIPPER', color: '2f75b5', cel: 'H'},
      { header: 'ESTADO REGION', key: 'ESTADO REGION', color: '2f75b5', cel: 'I'},
      { header: 'PAIS', key: 'PAIS' , color: '2f75b5', cel: 'J'},
      { header: 'CODIGO POSTAL', key: 'CODIGO POSTAL', color: '2f75b5', cel: 'K'},
      { header: 'NOMBRE DEL CONSIGNATARIO', key: 'NOMBRE DEL CONSIGNATARIO', color: '5b75d5', cel: 'L'},
      { header: 'DIRECCION CONSIGNATARIO', key: 'DIRECCION CONSIGNATARIO', color: '5b75d5', cel: 'M'},
      { header: 'CIUDAD CONSIGN', key: 'CIUDAD CONSIGN', color: '5b75d5', cel: 'N'},
      { header: 'ESTADO', key: 'ESTADO' , color: '5b75d5', cel: 'O'},
      { header: 'PAIS', key: 'PAIS CONSIGN', color: '5b75d5', cel: 'P'},
      { header: 'CODIGO POSTAL', key: 'CODIGO POSTAL CONSIGN', color: '5b75d5', cel: 'Q'},
      { header: 'DESCRIPCION DE LA CARGA', key: 'DESCRIPCION DE LA CARGA', color: '1F4E78', cel: 'R'},
      { header: 'BAG', key: 'BAG', color: '1F4E78', cel: 'S'},
    ];


    worksheet.getRow(2).values = miscolumns.map(col => col.header);
    
    miscolumns.forEach((col, index) => {
      const colLetter = String.fromCharCode(65 + index);  // Convertir el índice en letra de columna (A, B, C, etc.)
      const cell = worksheet.getCell(`${colLetter}2`); // Obtener la celda correspondiente (A2, B2, C2, etc.)
      cell.value = col.header; // Asignar el valor del header
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: col.color } // Establecer el color de fondo
      };
      cell.alignment = {
        horizontal: 'center',  // Centrar el texto horizontalmente
        vertical: 'middle'     // Centrar el texto verticalmente
      };
      cell.font = {
        name: 'Arial',
        size: 12,
        color: { argb: 'FFFFFF' } // Blanco
      };

      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
      };
    });
    
    let row_number = 3;
    data_bultos.forEach(bulto => {
      miscolumns.forEach((col, index) => {
        const colLetter = col.cel; // Columna correspondiente (A, B, C, etc.)
        const cell = worksheet.getCell(colLetter + row_number); // Obtener la celda según la letra de columna
        
        const string_cell_name = col.key as string;
    
        // Verificar si la propiedad existe en bulto antes de asignar el valor
        const value = string_cell_name in bulto ? bulto[string_cell_name] : ''; // Si no existe, asigna cadena vacía
        
        // Asignar el valor al cell
        cell.value = value;
        
        // Formatear según el color y el estilo de las columnas definidas en miscolumns
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF' }

        };
        cell.alignment = {
          horizontal: 'center',
          vertical: 'middle'
        };
        cell.font = {
          name: 'Arial',
          size: 11,
          color: { argb: '000000' }
        };
        cell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
      });
      row_number += 1;
    });
    
    
    
  
    // // Set styles for headers (applying different colors to each header)
    // const headerColors = [

    //   "1F4E78","1F4E78", "1F4E78","1F4E78","1F4E78", "2f75b5", "2f75b5","2f75b5","2f75b5","2f75b5","2f75b5", "5b75d5","5b75d5","5b75d5","5b75d5","5b75d5","5b75d5",
    //   "1F4E78","1F4E78"
    // ];
  
    // worksheet.getRow(1).eachCell((cell, colNumber) => {
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: headerColors[colNumber - 1] } // Apply different color to each header
    //   };
    //   cell.font = { bold: false, color: { argb: 'FFFFFF' } }; // White font on headers
    //   cell.alignment = { horizontal: 'center', vertical: 'middle' };
    // });
  
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
    
              <Button size="sm" onClick={exportToExcel}>
              Exportar a Excel
                </Button>
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
