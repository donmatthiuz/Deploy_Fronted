import { useState } from "react";
import { Modal, Box, Typography, Stepper, Step, StepLabel, Button } from "@mui/material";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import { UploadImage } from "../../UploadImage/UploadImage";
import { object, string, number, boolean } from 'yup';
import useForm from "../../../hooks/useForm";
import useApi from "../../../hooks/useApi";
import source_link from "../../../repositori/source_repo";


const schema_paquet = object({
  codigo: string().required('El codigo es obligatorio'),
  contenido: string().required('El contenido es obligatoria'),
  peso: number().required('El peso es obligatorio'),
  tipo: string().required('El tipo es obligatorio'),
  dpi_envia_d:  string(),
  dpi_recibe_d:  string(),
  monto: number().required('El monto es obligatorio'),
  metodo_de_pago: string().required('El metodo de pago es obligatorio'),



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

const steps = ["Información Paquete", "Información Cliente", "Método de Pago"];

export default function InsertPackagesStepper({ open, handleClose }) {


  const { values: valuesPaquete, setValue: setValuePaquete, validate: validatePaquete, errors: errorsPaquete } = useForm(schema_paquet, { 
    codigo: '', 
    contenido: '', 
    peso: 0, 
    tipo: '', 
    dpi_envia_d: null, 
    dpi_recibe_d: null,
    monto: 0,
    metodo_de_pago: 0
  });


  const { values: valuesEnvia, setValue: setValueEnvia, validate: validateEnvia, errors: errorsEnvia } = useForm(schema_envia, { 
    dpi_envia: '', 
    nombre_envia: '', 
    telefono_envia: '', 
    direccion_envia: '' 
  });


  const handleChangeEnvia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueEnvia(name as keyof typeof value, value); // Usa type assertion
  }; 


  const { values: valuesRecibe, setValue: setValueRecibe, validate: validateRecibe, errors: errorsRecibe } = useForm(schema_recibe, { 
    dpi_recibe: '', 
    nombre_recibe: '', 
    telefono_recibe: '', 
    direccion_recibe: '' 
  });

  const handleChangeRecibe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueRecibe(name as keyof typeof value, value); 
  }; 



  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [message, setMessage] = useState("");
  const [newClientDpi, setNewClientDpi] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientAddress, setNewClientAddress] = useState("");
  const [selectedClientRecibe, setSelectedClientRecibe] = useState<string | null>(null);
  const [selectedClientEnvia, setSelectedClientEnvia] = useState<string | null>(null);
  const [isAddingNewClientRecibe, setIsAddingNewClientRecibe] = useState(false);
  const [isAddingNewClientEnvia, setIsAddingNewClientEnvia] = useState(false);
  const [fileenvia, setFileEnvia] = useState<File | null>(null);
  const [filerecibe, setFileRecibe] = useState<File | null>(null);

  
  const {llamadowithFileAndBody: insertarCliente } = useApi(`${source_link}/insertarCliente`)

 
  // Opciones para el tipo de paquete
  const options = [
    { value: "Frio", label: "Frio" },
    { value: "Seco", label: "Seco" },
  ];

  // Simulación de clientes disponibles (en un caso real serían obtenidos de una base de datos)
  const clients = [
    { value: "cliente1", label: "763382110101" },
    { value: "cliente2", label: "449262050101" },
    { value: "cliente3", label: "336206040101" },
    { value: "cliente3", label: "158553620101" },
    { value: "cliente3", label: "736812840101" },
    { value: "cliente3", label: "665885570101" },
    { value: "cliente3", label: "840195020101" },
    { value: "cliente3", label: "377656060101" },
  ];


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
    if (isAddingNewClientEnvia && valuesEnvia.dpi_envia != ''){
      const body = {
        dpi: valuesEnvia.dpi_envia,
        nombre: valuesEnvia.nombre_envia,
        telefono: valuesEnvia.telefono_envia,
        direccion: valuesEnvia.direccion_envia
      }
      const response = await insertarCliente(fileenvia,body,"POST")
    }

    if(isAddingNewClientRecibe && valuesRecibe.dpi_recibe != ''){
      const body = {
        dpi: valuesRecibe.dpi_recibe,
        nombre: valuesRecibe.nombre_recibe,
        telefono: valuesRecibe.telefono_recibe,
        direccion: valuesRecibe.direccion_recibe
      }
      const response = await insertarCliente(filerecibe,body,"POST")

    }
    setActiveStep(0);
    setIsAddingNewClientEnvia(false);
    setIsAddingNewClientRecibe(false);
  };

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleAddNewClientRecibe = () => {
    setIsAddingNewClientRecibe(true);
    setSelectedClientRecibe(null);
  };

  const handleAddNewClientEnvia = () => {
    setIsAddingNewClientEnvia(true);
    setSelectedClientEnvia(null);
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
                <Input type="text" id="codigo" />
              </div>

              {/* Sección de contenido */}
              <div>
                <Label>Contenido</Label>
                <TextArea value={message} onChange={(value) => setMessage(value)} rows={3} />
              </div>

              {/* Sección de Peso y Tipo en la misma fila */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="peso">Peso</Label>
                  <Input type="number" id="peso" />
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
            <div className="space-y-6">
              {/* Sección de Cliente Recibe */}
              

              {/* Sección de Cliente Envia */}
              <div>
                <Label>Cliente Envia</Label>
                {!isAddingNewClientEnvia ? (
                  <>
                    <Select
                      options={clients}
                      placeholder="Seleccione un Cliente Envia"
                      onChange={(value) => setSelectedClientEnvia(value)}
                      className="dark:bg-dark-900"
                    />
                    <div className="mt-4">
                      <button
                        type="button"
                        className="text-blue-500 underline"
                        onClick={handleAddNewClientEnvia}
                      >
                        Agregar Nuevo Cliente Envia
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-4 space-y-6">
                    <h3 className="text-xl font-semibold">Agregar Nuevo Cliente Envia</h3>
                    <div className="grid grid-cols-2 gap-6">
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
                    <Select
                      options={clients}
                      placeholder="Seleccione un Cliente Recibe"
                      onChange={(value) => setSelectedClientRecibe(value)}
                      className="dark:bg-dark-900"
                    />
                    <div className="mt-4">
                      <button
                        type="button"
                        className="text-blue-500 underline"
                        onClick={handleAddNewClientRecibe}
                      >
                        Agregar Nuevo Cliente Recibe
                      </button>
                    </div>
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
                  value={newClientAddress}
                  onChange={(e) => setNewClientAddress(e.target.value)}
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
                onChange={handleSelectChange}
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
    
      <Box sx={{ width: 600, padding: 3 }}>
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
    
  );
}
