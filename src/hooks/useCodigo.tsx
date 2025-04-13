import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type CodigoContextType = {
  codigo: string | null;
  setCodigo: React.Dispatch<React.SetStateAction<string | null>>;
  isCodigoActivo: boolean;
  getRawCodigo: () => string | null;
};


// Contexto para el manejo del código
const CodigoContext = createContext<CodigoContextType>({
  codigo: null,
  setCodigo: () => {},
  isCodigoActivo: false,
  getRawCodigo: () => null,
});

const CodigoProvider = ({ children }: Props) => {
  const [codigo, setCodigo] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('codigo_value') : null
  );

  // Verifica si es miércoles y resetea el código
  useEffect(() => {
    const hoy = new Date();
    const dia = hoy.getDay(); // Miércoles = 3
  
    const hoyStr = hoy.toISOString().split('T')[0]; // formato 'YYYY-MM-DD'
    const ultimaResetFecha = localStorage.getItem('codigo_reset_date');
  
    if (dia === 3 && ultimaResetFecha !== hoyStr) {
      setCodigo('');
      localStorage.setItem('codigo_reset_date', hoyStr); // marca que ya se reseteó hoy
    }
  }, []);
  

  // Sincroniza el código con localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (codigo) {
        localStorage.setItem('codigo_value', codigo);
      } else {
        localStorage.removeItem('codigo_value');
      }
    }
  }, [codigo]);

  const isCodigoActivo = !!codigo;

  // Devuelve el valor crudo del código (opcional, como el getRawToken)
  const getRawCodigo = useMemo(() => () => codigo, [codigo]);

  // Memoriza el valor del contexto
  const contextValue = useMemo(
    () => ({ codigo, setCodigo, isCodigoActivo, getRawCodigo }),
    [codigo, isCodigoActivo, getRawCodigo]
  );

  return (
    <CodigoContext.Provider value={contextValue}>
      {children}
    </CodigoContext.Provider>
  );
};

CodigoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook para usar el contexto del código
const useCodigo = () => useContext(CodigoContext);

export default useCodigo;
export { CodigoContext, CodigoProvider };
