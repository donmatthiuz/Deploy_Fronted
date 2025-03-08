import { useState } from 'react';

interface HeadersType {
  title: string;
  value: string;
}

const useApi = (link: string) => {
  const [error, setError] = useState<string>('');

  const llamado = async (body: Record<string, any>, metodo: string): Promise<any | null> => {
    try {
      const fetchOptions: RequestInit = {
        method: metodo,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(link, fetchOptions);
      const data = await response.json();
      console.log("Respuesta del servidor:", response.status, data);
      if (response.ok) {
        return data;
      }
      if (response.status === 401) {
        setError("Credenciales no válidas");
      } else if (response.status >= 500 && response.status < 600) {
        setError("Error en el servidor");
      }
      return null;
    } catch (err) {
      setError("No hay conexión con el servidor");
      return null;
    }
  };

  const llamadowithheader = async (
    headers: HeadersType[],
    body: Record<string, any>,
    metodo: string
  ): Promise<any | null> => {
    try {
      const fetchOptions: RequestInit = {
        method: metodo,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...Object.fromEntries(headers.map((header) => [header.title, header.value])),
        },
      };
      const response = await fetch(link, fetchOptions);
      const data = await response.json();

      if (response.ok) {
        return data;
      }
      setError(JSON.stringify(data));
      return null;
    } catch (err) {
      setError(String(err));
      return null;
    }
  };

  const llamadowithheaderwithoutbody = async (
    headers: HeadersType[],
    metodo: string
  ): Promise<any | null> => {
    try {
      const fetchOptions: RequestInit = {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          ...Object.fromEntries(headers.map((header) => [header.title, header.value])),
        },
      };
      const response = await fetch(link, fetchOptions);
      const data = await response.json();

      if (response.ok) {
        return data;
      }
      setError(JSON.stringify(data));
      return null;
    } catch (err) {
      setError(String(err));
      return null;
    }
  };

  const llamadowithoutbody = async (metodo: string): Promise<any | null> => {
    try {
      const fetchOptions: RequestInit = {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(link, fetchOptions);
      const data = await response.json();

      if (response.ok) {
        return data;
      }
      setError(JSON.stringify(data));
      return null;
    } catch (err) {
      setError(String(err));
      return null;
    }
  };

  const llamadowithFileAndBody = async (
    file: File,
    body: Record<string, any>,
    metodo: string
  ): Promise<any | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const fetchOptions: RequestInit = {
        method: metodo,
        body: formData,
      };

      const response = await fetch(link, fetchOptions);
      const data = await response.json();
      
      if (response.ok) {
        return data;
      }
      setError(JSON.stringify(data));
      return null;
    } catch (err) {
      setError(String(err));
      return null;
    }
  };

  return {
    error,
    llamado,
    llamadowithoutbody,
    llamadowithheader,
    llamadowithheaderwithoutbody,
    llamadowithFileAndBody,
    setError,
  };
};

export default useApi;