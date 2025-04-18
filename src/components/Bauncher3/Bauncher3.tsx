interface InfoProps {
  bulto: number;
  peso: string;
  envia: string;
  direccion_envia: string;
  ciudad_envia: string;
  identif_envia: string;
  telefono_envia: string;
  recibe: string;
  direccion_recibe: string;
  ciudad_recibe: string;
  region: string;
  codigo_postal: string;
  telefono_recibe: string;
  identif_recibe: string;
  descripcion: string[];
  contenido: string;
  codigo: string;
  atendido: string;
  oficina: string;
  tipo: string;
}

interface Bauncher3Props {
  info_list: InfoProps[];
}

import { forwardRef } from "react";

import './Bauncher3.css';


const Bauncher3 = forwardRef<HTMLDivElement, Bauncher3Props>(({ info_list }, ref) => {
  



  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString();

  
  return (
    
      <div className='recuadro' ref={ref}>

    {info_list.map((info) => (
      <div>
        <div className='bauncher-contenido2'>
          <div className='label-display'>
            <p className='label-name'>Envia: </p>
            <div className='descripcion-label'>
              <p className='contained'>{info?.envia || ''}</p>
              <p className='bulto'>BULTO # {info?.bulto || ''}</p>
            </div>
          </div>
          <div className='label-display'>
            <p className='label-name'>Direccion: </p>
            <div className='descripcion-label'>
              <p className='contained'>{`${info?.direccion_envia || ''} ${info?.ciudad_envia || ''}`}</p>
            </div>
          </div>
          <div className='label2-display'>
            <p className='label-name'>Recibe: </p>
            <div className='descripcion-label'>
              <p className='contained'>{info?.recibe || ''}</p>
            </div>
          </div>
          <div className='label-display'>
            <p className='label-name'>Direccion: </p>
            <div className='descripcion-label'>
              <p className='contained'>{`${info?.direccion_recibe || ''} ${info?.ciudad_recibe || ''} ${info?.region || ''} ${info?.codigo_postal || ''}`}</p>
            </div>
          </div>
          <div className='label2-display'>
            <p className='label-name'>Tel: </p>
            <div className='descripcion-label'>
              <p className='contained'>{info?.telefono_recibe}</p>
            </div>
            <p className='label-name-2'>Fecha: </p>
            <div className='descripcion-label-2'>
              <p className='contained'>{fechaFormateada}</p>
            </div>
          </div>
          <table className='info-table'>
            <thead>
              <tr>
                <th className='head' style={{ width: '125px' }}>DESCRIPCION</th>
                <th className='head' style={{ width: '300px' }}>CONTENIDO</th>
                <th className='head' style={{ width: '90px' }}>PESO</th>
                <th className='head'>CODIGO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='paquete'>{info?.descripcion || ''}</td>
                <td className='contenido' style={{fontSize: '12px', minHeight: '120px'}}>{info?.contenido?.toUpperCase() || ''}</td>
                <td className='ctd'>
                  <div className='peso-weight'>
                    <p className='peso-cantidad'>{info?.peso?.split('.')[0] || ''}</p>
                    <p className='peso-cantidad'>lb</p>
                  </div>
                </td>
                <td className='ctd'>
                  <div className='peso-weight'>
                    <p className='titulo'>{info?.codigo || ''}</p>
                    <p className='titulo-22'>{info?.tipo.toUpperCase() || ''}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='footer-data'>
            <p className='label-name'>Atendido por:</p>
            <div className='descripcion-label-3'>
              <p className='contained-3'>{info?.atendido || ''}</p>
            </div>
            <p className='label-name-3'>Oficina:</p>
            <div className='descripcion-label-4'>
              <p className='contained-3'>{info?.ciudad_envia || ''}</p>
            </div>
          </div>
        </div>
        <p className='foot'>NOTA: Si hay un retraso en la Aerolínea, no somos responsables por descomposición y por objetos de valor no</p>
        <div className="page-break" />
        <br/>
        <div className='bauncher-contenido2'>
          <div className='label-display'>
            <p className='label-name'>Envia: </p>
            <div className='descripcion-label'>
              <p className='contained'>{info?.envia || ''}</p>
              <p className='bulto'>BULTO # {info?.bulto || ''}</p>
            </div>
          </div>
          <div className='label-display'>
            <p className='label-name'>Direccion: </p>
            <div className='descripcion-label'>
              <p className='contained'>{`${info?.direccion_envia || ''} ${info?.ciudad_envia || ''}`}</p>
            </div>
          </div>
          <div className='label2-display'>
            <p className='label-name'>Recibe: </p>
            <div className='descripcion-label'>
              <p className='contained'>{info?.recibe || ''}</p>
            </div>
          </div>
          <div className='label-display'>
            <p className='label-name'>Direccion: </p>
            <div className='descripcion-label'>
              <p className='contained'>{`${info?.direccion_recibe || ''} ${info?.ciudad_recibe || ''} ${info?.region || ''} ${info?.codigo_postal || ''}`}</p>
            </div>
          </div>
          <div className='label2-display'>
            <p className='label-name'>Tel: </p>
            <div className='descripcion-label'>
              <p className='contained'>{info?.telefono_recibe}</p>
            </div>
            <p className='label-name-2'>Fecha: </p>
            <div className='descripcion-label-2'>
              <p className='contained'>{fechaFormateada}</p>
            </div>
          </div>
          <table className='info-table'>
            <thead>
              <tr>
                <th className='head' style={{ width: '125px' }}>DESCRIPCION</th>
                <th className='head' style={{ width: '300px' }}>CONTENIDO</th>
                <th className='head' style={{ width: '90px' }}>PESO</th>
                <th className='head'>CODIGO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='paquete'>{info?.descripcion || ''}</td>
                <td className='contenido' style={{fontSize: '12px', minHeight: '120px'}}>{info?.contenido?.toUpperCase() || ''}</td>
                <td className='ctd'>
                  <div className='peso-weight'>
                    <p className='peso-cantidad'>{info?.peso?.split('.')[0] || ''}</p>
                    <p className='peso-cantidad'>lb</p>
                  </div>
                </td>
                <td className='ctd'>
                  <div className='peso-weight'>
                    <p className='titulo'>{info?.codigo || ''}</p>
                    <p className='titulo-22'>{info?.tipo.toUpperCase() || ''}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='footer-data'>
            <p className='label-name'>Atendido por:</p>
            <div className='descripcion-label-3'>
              <p className='contained-3'>{info?.atendido || ''}</p>
            </div>
            <p className='label-name-3'>Oficina:</p>
            <div className='descripcion-label-4'>
              <p className='contained-3'>{info?.ciudad_envia || ''}</p>
            </div>
          </div>
        </div>
        <p className='foot'>NOTA: Si hay un retraso en la Aerolínea, no somos responsables por descomposición y por objetos de valor no</p>
        <div className="page-break" />
      </div>


    ))}

        
        
        
       


      </div>

      

    
    
  );
});

export default Bauncher3;
