import { forwardRef } from 'react';
import './Bauncher.css';


// types.ts
export interface InfoProps {
  envia: string;
  direccion_envia: string;
  ciudad_envia?: string;
  identif_envia?: string;
  telefono_envia?: string;
  recibe: string;
  direccion_recibe: string;
  ciudad_recibe?: string;
  region?: string;
  codigo_postal?: string;
  telefono_recibe?: string;
  identif_recibe?: string;
  descripcion?: string[];
  contenido: string;
  codigo: string;
  atendido?: string;
  oficina?: string;
  monto?: number;
  tipo?: string;
  bulto?: number;
  peso?: string;
}



interface BauncherProps {
  info: InfoProps;
}

const Bauncher =  forwardRef<HTMLDivElement, BauncherProps>(({ info }, ref) => {
  


  console.log(info)
  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString();

  
  return (
    <div className='recuadro' ref={ref}>
      <div className='bauncher-contenido'>
      <table className='info-table'>
              <tbody>
                <tr>
                  <td className='paquete'>

                 <div className="contenido_2_2" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: 'row' }}>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <h2 style={{ color: '#9d4d3c', margin: 0 }}>Pronto Express</h2>
                              <span style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '2px' }}>
                                INTERNATIONAL COURIER
                              </span>
                              <span style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '2px' }}>
                                DIRECCION COMPLETA
                              </span>
                              <span style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '2px' }}>
                                Tel: (502) 0000-0000
                              </span>
                            </div>

                            {/* Columna de la imagen */}
                            <div>
                              <img src="/simple_icon.jpeg" alt="Icono simple" style={{ width: '50px', height: '50px' }} />
                            </div>
                          </div>


                      
                      

                 
                  </td>

                 
                  
                  <td className='paquete'>
                  <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0px',
                        justifyContent: 'center',
                      }}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '8px' }}>
                          OFICINAS EN GUATEMALA
                        </span>
                        
                        <div style={{
                          display: 'flex',
                          gap: '20px', // Espacio entre columnas
                        }}>
                          {/* Columna 1 */}
                          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span style={{ fontSize: '10px' }}>Oficina Zona 1: 1234-5678</span>
                            <span style={{ fontSize: '10px' }}>Oficina Zona 5: 2345-6789</span>
                            <span style={{ fontSize: '10px' }}>Oficina Zona 10: 3456-7890</span>
                          </div>

                          {/* Columna 2 */}
                          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span style={{ fontSize: '10px' }}>Oficina Zona 15: 4567-8901</span>
                            <span style={{ fontSize: '10px' }}>Oficina Zona 18: 5678-9012</span>
                            <span style={{ fontSize: '10px' }}>Oficina Mixco: 6789-0123</span>
                          </div>
                        </div>
                      </div>

                    

                  </td>
                  <td className='paquete'>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',

                      alignContent: 'center',
                      justifyContent: 'center'
                      ,alignItems: 'center'


                    }}>

                     <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
                          OFICINAS EN USA
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 'bold'}}>
                          MARYLAND
                        </span>
                        <span style={{ fontSize: '10px'}}>
                          Direccion Completa
                        </span>
                        <span style={{ fontSize: '10px'}}>
                          Tel: 0000000000000
                        </span>
                        <span style={{ fontSize: '10px'}}>
                          {''}
                        </span>
                        
                        <span style={{ fontSize: '12px', fontWeight: 'bold'}}>
                          NEW YORK
                        </span>

                        <span style={{ fontSize: '10px'}}>
                          Direccion Completa
                        </span>
                        <span style={{ fontSize: '10px'}}>
                          Tel: 0000000000000
                        </span>
                        
                    </div>
                       

                        

                        <table className='info-table'>
                        <thead>
                              <tr>
                                <th className='head' style={{ width: '125px' }}>RECIBO</th>

                                
                              </tr>
                         </thead>
                          <tbody>
                            <tr>
                            <td className='valores2'>
                              {info?.codigo || ''}
                            </td>
                            </tr>
                          </tbody>
                        </table>
 
                    </td>

                </tr>
              </tbody>
            </table>

        


        <br/>
        <div className='label2-display'>
          <p className='label-name'>Envia: </p>
          <div className='descripcion-label'>
            <p className='contained'>{info?.envia || ''}</p>
      
          </div>

          <p className='label-name'>Firma: </p>
          <div className='descripcion-label'>
            <p className='contained'>{'\u2063'}</p>
      
          </div>
          
          
        </div>
        
        <div className='label2-display'>
          <p className='label-name'>Direccion: </p>
          <div className='descripcion-label'>
            <p className='contained'>{`${info?.direccion_envia || ''} ${info?.ciudad_envia || ''}`}</p>
          </div>
        </div>

        <div className='label2-display'>
          <p className='label-name'>Tel: </p>
          <div className='descripcion-label'>
            <p className='contained'>{info?.telefono_envia}</p>
          </div>
          <p className='label-name-2'>Identificacion: </p>
          <div className='descripcion-label-2'>
            <p className='contained'>{info?.identif_envia || ''}</p>
          </div>
          <p className='label-name-2'>Fecha: </p>
          <div className='descripcion-label-2'>
            <p className='contained'>{fechaFormateada}</p>
          </div>
        </div>

        <br/>
        <div className='label2-display'>
          <p className='label-name'>Recibe: </p>
          <div className='descripcion-label'>
            <p className='contained'>{info?.recibe || ''}</p>
          </div>
          <p className='label-name'>Firma: </p>
          <div className='descripcion-label'>
            <p className='contained'>{'\u2063'}</p>
      
          </div>
        </div>
        <div className='label2-display'>
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
          <p className='label-name-2'>Identificacion: </p>
          <div className='descripcion-label-2'>
            <p className='contained'>{info?.identif_recibe|| ''}</p>
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
              <th className='head' style={{ width: '125px' }}>VALORADO EN: </th>
              <th className='head' style={{ width: '125px' }}>VALOR DEL SERVICIO:</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
            <td className='paquete'>
            {Array.isArray(info?.descripcion) && info.descripcion.length > 0 ? (
              info.descripcion.map((item, index) => (
                <span key={index}>
                  {item}
                  <br />
                </span>
              ))
            ) : (
              "\u2063"
            )}

            </td>

              <td className='contenido' style={{height: '90px'}}>{info?.contenido?.toUpperCase() || ''}</td>
              <td className='valores'>Q _____</td>
              <td className='valores'>Q {info?.monto || ''}</td>
              
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
            <p className='contained-3'>{info?.oficina || ''}</p>
          </div>
        </div>
      </div>
      <p className='foot'>NOTA: Si hay un retraso en la Aerolínea, no somos responsables por descomposición y por objetos de valor no</p>
    </div>
  );
});

export default Bauncher;
