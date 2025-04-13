import { SetStateAction, useEffect, useRef, useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel, Button, Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemButton, ListItemText, ImageListItem } from "@mui/material";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import { UploadImage } from "../../UploadImage/UploadImage";
import { object, string, number } from 'yup';
import useForm from "../../../hooks/useForm";
import useApi from "../../../hooks/useApi";
import source_link from "../../../repositori/source_repo";
import useToken, { parseJwt } from "../../../hooks/useToken";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import Bauncher from "../../Bauncher/Bauncher";
import Bauncher2 from "../../Bauncher2/Bauncher2";

const printStyles = `
  @media print {
    .bauncher-print {
      page-break-inside: avoid;
      page-break-after: auto;
      page-break-before: auto;
      max-height: fit-content;
      max-width: fit-content;
    }

    .total {
      display: none;
    }
  }

  .bauncher-print {
    height: fit-content;
    width: fit-content;
    display: none;
  }

  @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
    }
  }
`;



const schema_paquet = object({
  codigo: string().required('El codigo es obligatorio'),
  contenido: string().required('El contenido es obligatoria'),
  peso: number().required('El peso es obligatorio'),
  tipo: string(),
  dpi_envia_d:  string(),
  dpi_recibe_d:  string(),
  monto: number().required('El monto es obligatorio'),
  metodo_pago: string()



})

const schema_envia = object({
 
  dpi_envia: string(),
  nombre_envia: string(),
  telefono_envia: string(),
  direccion_envia: string(),


})


const schema_recibe = object({
  dpi_recibe: string().required('Dpi es requerido'),
  nombre_recibe: string().required('Nombre requerido'),
  telefono_recibe: string().required('Telefono requerido'),
  direccion_recibe: string().required('Direccion requerido'),
})

type InsertPackagesStepperProps = {
  open: boolean;
  handleClose: (value: boolean) => void;
};

const steps = ["Información Paquete", "Información Cliente", "Método de Pago"];

export default function InsertPackagesStepper({ open, handleClose }: InsertPackagesStepperProps) {

  console.log(open);
  const [info, setInfo] = useState({
    envia: "",
    direccion_envia: "",
    ciudad_envia: "",
    identif_envia: "",
    telefono_envia: "",
    recibe: "",
    direccion_recibe: "",
    ciudad_recibe: "",
    region: "",
    codigo_postal: "",
    telefono_recibe: "",
    identif_recibe: "",
    descripcion: [],
    contenido: "",
    codigo: "",
    atendido: "",
    oficina: "",
    monto: 0,
    tipo: ""
  });

  const handleChange_Info = (key: string, value: string | number | string[] | undefined) => {
    setInfo(prev => ({
      ...prev,
      [key]: value, // Actualiza dinámicamente la propiedad con el nuevo valor
    }));
  };

  

  const component2Ref = useRef<HTMLDivElement | null>(null);

  const handlePrint_sticker = useReactToPrint({
    contentRef: component2Ref,
    documentTitle: "Stiker_Print",
    onAfterPrint: () => console.log("Impresión completada"),
  });

  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Bauncher_Print",
    onAfterPrint: () => {
      console.log("Primera impresión completada, iniciando segunda...");
      handlePrint_sticker(); // Lanza la segunda impresión solo cuando la primera termina
    },
  });

  const handlePrintTwice = async () => {
   
    await handlePrint();
    setTimeout(async () => {
      await handlePrint_sticker();
    }, 1000);
  };
  const print_bauncher = () => {
    handlePrint(); // Lanza la primera impresión; la segunda se ejecuta después automáticamente
  };
  

  const { token } = useToken();
  const jwt = token ? parseJwt(token) : null;
  const id_oficina = jwt ? jwt.id_oficina : null;
  const oficina = jwt ? jwt.oficina : null;
  const usuario = jwt ? jwt.usuario : null;


  const { values: valuesPaquete, setValue: setValuePaquete, errors: errorsPaquete } = useForm(schema_paquet, { 
    codigo: '', 
    contenido: '', 
    peso: 0, 
    tipo:  '',
    dpi_envia_d: null, 
    dpi_recibe_d: null,
    monto: 0,
    metodo_pago: ''
  });


  const handleChangePaquete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = [
      "contenido",
      "codigo",
      "monto",
      "tipo",
      "peso",
      "dpi_envia_d",
      "dpi_recibe_d",
      "metodo_pago"
    ] as const;
    const isValidKey = (key: unknown): key is typeof keys[number] => {
      return typeof key === 'string' && keys.includes(key as typeof keys[number]);
    };
    
    if (isValidKey(name)) {
      setValuePaquete(name, value);
    }
    
  }; 




  const { values: valuesEnvia, setValue: setValueEnvia, errors: errorsEnvia } = useForm(schema_envia, { 
    dpi_envia: '', 
    nombre_envia: '', 
    telefono_envia: '', 
    direccion_envia: '' 
  });


  const handleChangeEnvia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keysEnvia = [
      "dpi_envia",
      "nombre_envia",
      "telefono_envia",
      "direccion_envia"
    ] as const;

    const isValidEnviaKey = (key: unknown): key is typeof keysEnvia[number] => {
      return typeof key === 'string' && keysEnvia.includes(key as typeof keysEnvia[number]);
    };
    if (isValidEnviaKey(name)) {
      setValueEnvia(name, value);
    }
  }; 


  const { values: valuesRecibe, setValue: setValueRecibe, errors: errorsRecibe } = useForm(schema_recibe, { 
    dpi_recibe: '', 
    nombre_recibe: '', 
    telefono_recibe: '', 
    direccion_recibe: '' 
  });

  const handleChangeRecibe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keysRecibe = [
      "dpi_recibe",
      "nombre_recibe",
      "telefono_recibe",
      "direccion_recibe"
    ] as const;

    const isValidRecibeKey = (key: unknown): key is typeof keysRecibe[number] => {
      return typeof key === 'string' && keysRecibe.includes(key as typeof keysRecibe[number]);
    };
    if (isValidRecibeKey(name)) {
      setValueRecibe(name, value);
    }
  }; 


  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  
  const handleOpenImage = (image: SetStateAction<string>) => {
    setSelectedImage(image);
    setOpenImage(true);
  };
  
  const handleCloseImage = () => {
    setOpenImage(false);
  };
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [, setSelectedClientRecibe] = useState<string | null>(null);
  const [, setSelectedClientEnvia] = useState<string | null>(null);
  const [isAddingNewClientRecibe, setIsAddingNewClientRecibe] = useState(false);
  const [isAddingNewClientEnvia, setIsAddingNewClientEnvia] = useState(false);
  const [fileenvia, setFileEnvia] = useState<File | null>(null);
  const [filerecibe, setFileRecibe] = useState<File | null>(null);
  const {llamadowithoutbody: obtener_usuarios}  = useApi(`${source_link}/getClientes`);
  const {llamado: insertar_paquete}  = useApi(`${source_link}/insertar_paquete`);
  const {llamado: clientes_info} = useApi(`${source_link}/getClientePorDpi`);



  const [dpi_recibe, setDPI_recibe] = useState("")
  const [dpi_envia, setDPI_envia] = useState("")



  useEffect(()=>{
    const getUsuarios = async() =>{
      
      const response = await obtener_usuarios("GET");
      
      setClientes(response.response);

    }
    getUsuarios();
  },[])
  const [readyToPrint, setReadyToPrint] = useState(false);
  useEffect(() => {
    if (readyToPrint) {
      handlePrintTwice();
      setReadyToPrint(false); // Reiniciar estado después de imprimir
    }
  }, [readyToPrint]);

  interface Cliente {
    nombre: string;
    dpi: string;
    imagen_dpi: string;
    // Agrega aquí más propiedades si es necesario
  }

  const [open2, setOpen2] = useState(false);
  
  const [search, setSearch] = useState("");

  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  const [tipe_cliente, setTipeCliente]  = useState("ninguno")


  const {llamadowithFileAndBody: insertarCliente } = useApi(`${source_link}/insertarCliente`)
  const filtrarClientes = () => {
    return clientes.filter((c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.dpi.includes(search)
    );
  };

 
  // Opciones para el tipo de paquete
  const options = [
    { value: "Frio", label: "Frio" },
    { value: "Seco", label: "Seco" },
  ];

  // Simulación de clientes disponibles (en un caso real serían obtenidos de una base de datos)
 


  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = async() => {

    let envia, recibe = ""

    if (isAddingNewClientEnvia && valuesEnvia.dpi_envia != ''){
      const body = {
        dpi: valuesEnvia.dpi_envia,
        nombre: valuesEnvia.nombre_envia,
        telefono: valuesEnvia.telefono_envia,
        direccion: valuesEnvia.direccion_envia
      }
      envia = valuesEnvia.dpi_envia
      await insertarCliente(fileenvia!,body,"POST")

      handleChange_Info("direccion_envia", valuesEnvia.direccion_envia)
      handleChange_Info("envia", valuesEnvia.nombre_envia)
      handleChange_Info("telefono_envia", valuesEnvia.telefono_envia)
    }

    if(isAddingNewClientRecibe && valuesRecibe.dpi_recibe != ''){
      const body = {
        dpi: valuesRecibe.dpi_recibe,
        nombre: valuesRecibe.nombre_recibe,
        telefono: valuesRecibe.telefono_recibe,
        direccion: valuesRecibe.direccion_recibe
      }
      recibe = valuesRecibe.dpi_recibe
      await insertarCliente(filerecibe!,body,"POST")

      handleChange_Info("direccion_recibe", valuesRecibe.direccion_recibe)
      handleChange_Info("recibe", valuesRecibe.nombre_recibe)
      handleChange_Info("telefono_recibe", valuesRecibe.telefono_recibe)

    }

    if (dpi_recibe != ""){
      recibe = dpi_recibe
      const body_recibe = {
        dpi: dpi_recibe
      }
      const recibe_ = await clientes_info(body_recibe,"POST")
      console.log(recibe_) 
      handleChange_Info("direccion_recibe", recibe_.response.direccion)
      handleChange_Info("recibe", recibe_.response.nombre)
      handleChange_Info("telefono_recibe", recibe_.response.telefono)
    }
    if (dpi_envia != ""){
      envia = dpi_envia
      const body_envia = {
        dpi: dpi_envia
      }
      const envia_ = await clientes_info(body_envia,"POST") 
      console.log(envia_) 
      handleChange_Info("direccion_envia", envia_.response.direccion)
      handleChange_Info("envia", envia_.response.nombre)
      handleChange_Info("telefono_envia", envia_.response.telefono)
    }


    const body_to_send = {
      codigo: valuesPaquete.codigo,
      contenido: valuesPaquete.contenido,
      peso: valuesPaquete.peso,
      tipo: valuesPaquete.tipo,
      metodo_pago: valuesPaquete.metodo_pago,
      monto: valuesPaquete.monto,
      oficina_id: id_oficina,
      envia,
      recibe
    }

    const respuesta = await insertar_paquete(body_to_send, "POST")


    handleChange_Info("codigo", valuesPaquete.codigo)
    handleChange_Info("contenido", valuesPaquete.contenido)
    handleChange_Info("descripcion", [valuesPaquete.tipo])
    handleChange_Info("oficina", oficina)
    handleChange_Info("atendido", usuario)
    handleChange_Info("monto", valuesPaquete.monto)

    handleChange_Info("identif_envia", envia)
    handleChange_Info("identif_recibe", recibe)
    handleChange_Info("tipo", valuesPaquete.tipo.toUpperCase())

    if (respuesta.success){
      
      setTimeout(() => {
        setReadyToPrint(true);
      }, 0);
      setActiveStep(0);
      setIsAddingNewClientEnvia(false);
      setIsAddingNewClientRecibe(false);
    }else{
      handleClose(false);
     Swal.fire({
             icon: "error",
             title: "Error al insertar",
             text:respuesta.message,
           });
    }
    
  };

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setValuePaquete("tipo",value)
  };

  const handleSelectChange_metodo = (value: string) => {
    console.log("Selected value:", value);
    setValuePaquete("metodo_pago",value)
  };


  const select_Cliente = (cliente_dpi: string) => {
    if (tipe_cliente === "envia"){
      setDPI_envia(cliente_dpi)
    
    }else if (tipe_cliente === "recibe"){
      setDPI_recibe(cliente_dpi)


    }
    setOpen2(false)
  };


  const OpenDialog_Select_Client = (mode: string) => {
    setOpen2(true)
    setTipeCliente(mode)
  };

  const handleAddNewClientRecibe = () => {
    setIsAddingNewClientRecibe(true);
    setSelectedClientRecibe(null);
    setDPI_recibe("")
  };

  const handleAddNewClientEnvia = () => {
    setIsAddingNewClientEnvia(true);
    setSelectedClientEnvia(null);
    setDPI_envia("")
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ComponentCard title="Información Paquete">

            <div className="space-y-6">
              {/* Sección de código */}
              <div>
                <Label htmlFor="codigo">Codigo</Label>
                <Input 
                  type="text" 
                  id="codigo"

                  onChange={handleChangePaquete}
                  name="codigo"
                  error={!!errorsPaquete.codigo}
                  value={valuesPaquete.codigo} />
              </div>

              {/* Sección de contenido */}
              <div>
                <Label>Contenido</Label>
                <TextArea 
                  value={valuesPaquete.contenido} 
                  onChange={(value) => setValuePaquete("contenido",value)}
                   
                  
                  
                  rows={3} />
              </div>

              {/* Sección de Peso y Tipo en la misma fila */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="peso">Peso</Label>
                  <Input 
                    type="number" 
                    id="peso"
                    onChange={handleChangePaquete}
                    name="peso"
                    error={!!errorsPaquete.peso}
                    value={valuesPaquete.peso} />
                </div>

                <div>
                  <Label>Tipo</Label>
                  <Select
                    options={options}
                    placeholder="Seleccione el Tipo del Paquete"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                  />
                </div>
              </div>
            </div>
          </ComponentCard>
        );

      case 1:
        return (
          <ComponentCard title="Información Cliente">
            <div className="grid grid-cols-2 gap-6">
              {/* Sección de Cliente Recibe */}
              

              {/* Sección de Cliente Envia */}
              <div>
                <Label>Cliente Envia</Label>
                {!isAddingNewClientEnvia ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="DPI"
                        value={dpi_envia}
                        disabled={true}
                       
                      />
                      <Button onClick={() => OpenDialog_Select_Client("envia")}>Buscar Cliente</Button>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="text-blue-500 underline"
                        onClick={handleAddNewClientEnvia}
                      >
                        Agregar Nuevo Cliente Envia
                      </button>
                    </div>




                   
                    <Dialog open={open2} onClose={() => setOpen2(false)} fullWidth maxWidth="sm" disablePortal>
                      <DialogTitle>Buscar Cliente</DialogTitle>
                      <DialogContent>
                        <TextField
                          fullWidth
                          margin="dense"
                          label="Ingrese DPI o nombre"
                          variant="outlined"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <List>
                          {filtrarClientes().map((cliente) => (
                            <ListItem key={cliente.dpi} disablePadding>
                              <ListItemButton
                                onClick={() => {
                                  
                                  select_Cliente(cliente.dpi)
                                  setOpen2(false);
                                }}
                              >
                                <ListItemText primary={`${cliente.nombre} - ${cliente.dpi}`} />
                                <ImageListItem sx={{ width: 100, height: 100 }}>
                                  <img
                                    src={`data:image/jpeg;base64,${cliente.imagen_dpi}`}
                                    alt="Descripción de la imagen"
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Evita que se active el ListItemButton
                                      handleOpenImage(cliente.imagen_dpi);
                                    }}
                                  />
                                </ImageListItem>


                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={openImage} onClose={handleCloseImage} maxWidth="md" disablePortal>
                      <DialogContent>
                        <img
                          src={`data:image/jpeg;base64,${selectedImage}`}
                          alt="Imagen ampliada"
                          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <div className="mt-4 space-y-6">
                    <h3 className="text-xl font-semibold">Agregar Nuevo Cliente Envia</h3>
                    <div className="grid grid-cols-2 gap-7">
                      <div>
                        <Label htmlFor="dpi">DPI</Label>
                        <Input
                          type="text"
                          id="dpi"
                          
                          onChange={handleChangeEnvia}
                          name="dpi_envia"
                          error={!!errorsEnvia.dpi_envia}
                          value={valuesEnvia.dpi_envia}

                          placeholder="DPI del Cliente Envia"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          type="text"
                          id="name"
                          onChange={handleChangeEnvia}
                          name="nombre_envia"
                          error={!!errorsEnvia.nombre_envia}
                          value={valuesEnvia.nombre_envia}


                          placeholder="Nombre del Cliente Envia"
                        />
                        
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          type="text"
                          id="phone"
                          
                          onChange={handleChangeEnvia}
                          name="telefono_envia"
                          error={!!errorsEnvia.telefono_envia}
                          value={valuesEnvia.telefono_envia}


                          placeholder="Teléfono del Cliente Envia"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          type="text"
                          id="address"

                          onChange={handleChangeEnvia}
                          name="direccion_envia"
                          error={!!errorsEnvia.direccion_envia}
                          value={valuesEnvia.direccion_envia}


                          placeholder="Dirección del Cliente Envia"
                        />
                      </div>
                      <div>
                      <Label htmlFor="address">Subir Foto DPI</Label>
                      <UploadImage file={fileenvia} setFile={setFileEnvia} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Label>Cliente Recibe</Label>
                {!isAddingNewClientRecibe ? (
                  <>
                  
                  <div className="flex items-center gap-2">
                      <Input
                        placeholder="DPI"
                        value={dpi_recibe}
                        disabled={true}
                       
                      />
                      <Button onClick={() => OpenDialog_Select_Client("recibe")}>Buscar Cliente</Button>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="text-blue-500 underline"
                        onClick={handleAddNewClientRecibe}
                      >
                        Agregar Nuevo Cliente Recibe
                      </button>
                    </div>
                                       
                    <Dialog open={open2} onClose={() => setOpen2(false)} fullWidth maxWidth="sm" disablePortal>
                      <DialogTitle>Buscar Cliente</DialogTitle>
                      <DialogContent>
                        <TextField
                          fullWidth
                          margin="dense"
                          label="Ingrese DPI o nombre"
                          variant="outlined"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <List>
                          {filtrarClientes().map((cliente) => (
                            <ListItem key={cliente.dpi} disablePadding>
                              <ListItemButton
                                onClick={() => {
                                  
                                  select_Cliente(cliente.dpi)
                                  setOpen2(false);
                                }}
                              >
                                <ListItemText primary={`${cliente.nombre} - ${cliente.dpi}`} />
                                <ImageListItem sx={{ width: 100, height: 100 }}>
                                  <img
                                    src={`data:image/jpeg;base64,${cliente.imagen_dpi}`}
                                    alt="Descripción de la imagen"
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Evita que se active el ListItemButton
                                      handleOpenImage(cliente.imagen_dpi);
                                    }}
                                  />
                                </ImageListItem>


                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={openImage} onClose={handleCloseImage} maxWidth="md" disablePortal>
                      <DialogContent>
                        <img
                          src={`data:image/jpeg;base64,${selectedImage}`}
                          alt="Imagen ampliada"
                          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <div className="mt-4 space-y-6">
                    <h3 className="text-xl font-semibold">Agregar Nuevo Cliente Recibe</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="dpi">DPI</Label>
                        <Input
                          type="text"
                          id="dpi"
                          
                          onChange={handleChangeRecibe}
                          name="dpi_recibe"
                          error={!!errorsRecibe.dpi_recibe}
                          value={valuesRecibe.dpi_recibe}

                          placeholder="DPI del Cliente Recibe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          type="text"
                          id="name"

                          onChange={handleChangeRecibe}
                          name="nombre_recibe"
                          error={!!errorsRecibe.nombre_recibe}
                          value={valuesRecibe.nombre_recibe}

                          placeholder="Nombre del Cliente Recibe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          type="text"
                          id="phone"

                          onChange={handleChangeRecibe}
                          name="telefono_recibe"
                          error={!!errorsRecibe.telefono_recibe}
                          value={valuesRecibe.telefono_recibe}

                          placeholder="Teléfono del Cliente Recibe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          type="text"
                          id="address"
                          
                          onChange={handleChangeRecibe}
                          name="direccion_recibe"
                          error={!!errorsRecibe.direccion_recibe}
                          value={valuesRecibe.direccion_recibe}


                          placeholder="Dirección del Cliente Recibe"
                        />
                      </div>
                      <div>
                      <Label htmlFor="address">Subir Foto DPI</Label>
                      <UploadImage file={filerecibe} setFile={setFileRecibe} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ComponentCard>
        );

      case 2:
        return (
          <ComponentCard title="Método de Pago">
            {/* Aquí puedes agregar los campos relacionados con el método de pago */}
            <div>
            <div>
                <Label htmlFor="address">Monto</Label>
                <Input
                  type="number"
                  id="monto"
                  
                  onChange={handleChangePaquete}
                  name="monto"
                  error={!!errorsPaquete.monto}
                  value={valuesPaquete.monto}

                  placeholder="Monto Pagado"
                />
                <br/>
              </div>
              <Label htmlFor="paymentMethod">Método de Pago</Label>
              <Select
                options={[{ value: "Tarjeta", label: "Tarjeta" }, 
                          { value: "Efectivo", label: "Efectivo" },
                          { value: "Pagar en USA", label: "Pagar en USA" },
                          { value: "Deposito", label: "Deposito" }]}
                placeholder="Seleccione el Método de Pago"
                onChange={handleSelectChange_metodo}
                className="dark:bg-dark-900"
              />
            </div>
            
          </ComponentCard>
        );

      default:
        return "Paso desconocido";
    }
  };

  return (
    <>
    <style>{printStyles}</style>
      <Box sx={{ width: 1000, padding: 3 }}>
        <div className="bauncher-print"  >
          <Bauncher  info={info} ref={componentRef}     />
          <Bauncher2 ref={component2Ref} info={info}/>  
        </div>
        
        <Button onClick={print_bauncher}>pRESIONAR</Button>
        <Typography id="modal-modal-title" variant="h5" component="h2" mb={2}>
          Agregar Paquete
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Ha completado los datos del paquete</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Enviar Informacion</Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ mt: 3, mb: 1 }}>{renderStepContent(activeStep)}</Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Atrás
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {"Siguiente"}
              </Button>
            </Box>
          </>
        )}
      </Box>
      </>
  );
}
