import { useState } from "react";
import { Modal, Box, Typography, Stepper, Step, StepLabel, Button } from "@mui/material";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import { UploadImage } from "../../UploadImage/UploadImage";

const steps = ["Información Paquete", "Información Cliente", "Método de Pago"];

export default function InsertPackagesStepper({ open, handleClose }) {
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
  const [file, setFile] = useState<File | null>(null);


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

  const handleReset = () => {
    setActiveStep(0);
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
                          value={newClientDpi}
                          onChange={(e) => setNewClientDpi(e.target.value)}
                          placeholder="DPI del Cliente Recibe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          type="text"
                          id="name"
                          value={newClientName}
                          onChange={(e) => setNewClientName(e.target.value)}
                          placeholder="Nombre del Cliente Recibe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          type="text"
                          id="phone"
                          value={newClientPhone}
                          onChange={(e) => setNewClientPhone(e.target.value)}
                          placeholder="Teléfono del Cliente Recibe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          type="text"
                          id="address"
                          value={newClientAddress}
                          onChange={(e) => setNewClientAddress(e.target.value)}
                          placeholder="Dirección del Cliente Recibe"
                        />
                      </div>
                      <div>
                      <Label htmlFor="address">Subir Foto DPI</Label>
                      <UploadImage file={file} setFile={setFile} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

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
                          value={newClientDpi}
                          onChange={(e) => setNewClientDpi(e.target.value)}
                          placeholder="DPI del Cliente Envia"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          type="text"
                          id="name"
                          value={newClientName}
                          onChange={(e) => setNewClientName(e.target.value)}
                          placeholder="Nombre del Cliente Envia"
                        />
                        
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          type="text"
                          id="phone"
                          value={newClientPhone}
                          onChange={(e) => setNewClientPhone(e.target.value)}
                          placeholder="Teléfono del Cliente Envia"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          type="text"
                          id="address"
                          value={newClientAddress}
                          onChange={(e) => setNewClientAddress(e.target.value)}
                          placeholder="Dirección del Cliente Envia"
                        />
                      </div>
                      <div>
                      <Label htmlFor="address">Subir Foto DPI</Label>
                      <UploadImage file={file} setFile={setFile} />
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
            <Typography sx={{ mt: 2, mb: 1 }}>Se ha enviado el paquete exitosamente</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Nuevo Paquete</Button>
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
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    
  );
}
