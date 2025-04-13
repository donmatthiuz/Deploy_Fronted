import { forwardRef } from "react";
import './Bauncher2.css';


interface InfoProps {
  envia: string;
  direccion_envia: string;
  recibe: string;
  direccion_recibe: string;
  contenido: string;
  codigo: string;
  tipo: string;
}

interface Bauncher2Props {
  info: InfoProps;
}



const Bauncher2 = forwardRef<HTMLDivElement, Bauncher2Props>(({ info }, ref) => {
  

  return (
    <div className='recuadro2' ref={ref}>
      {/* Marca de agua */}

      <div className="contenido_2_2" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: 'row', justifyContent: 'center' }}>
      <div>
                              <img src="/simple_icon.jpeg" alt="Icono simple" style={{ width: '50px', height: '50px' }} />
                            </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                            
      </div>
                          
      <div className='marca-agua'>{info?.tipo || ''}</div>

      <div className='label2-display'>
        <p className='label-name'>ENVIA: </p>
        <div className='descripcion-label'>
          <p className='contained'>{info?.envia || ''}</p>
        </div>
      </div>

      <div className='label2-display'>
        <p className='label-name'>DIRECCION: </p>
        <div className='descripcion-label'>
          <p className='contained'>{info?.direccion_envia || ''}</p>
        </div>
      </div>

      <div className='label2-display'>
        <p className='label-name'>RECIBE: </p>
        <div className='descripcion-label'>
          <p className='contained'>{info?.recibe || ''}</p>
        </div>
      </div>

      <div className='label2-display'>
        <p className='label-name'>DIRECCION: </p>
        <div className='descripcion-label'>
          <p className='contained'>{info?.direccion_recibe || ''}</p>
        </div>
      </div>

      <div className='codigo_bag'>

        <p>No de Envio:</p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
        
          height:'90px'
        }}>
        <h1
        style={{
          fontSize:'40px',
          height:'10px'
        }}
        >{info?.codigo || ''}</h1>
        </div>
        
      </div>
     
      <div className='label2-display'>
        <p className='label-name'>CONTENIDO: </p>
        <div className='descripcion-label2'>
          <p className='contained2'>{info?.contenido?.toUpperCase() || ''  }</p>
        </div>
      </div>
    </div>
  );
});

export default Bauncher2;
