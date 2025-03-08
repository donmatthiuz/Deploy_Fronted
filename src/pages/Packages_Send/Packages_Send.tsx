import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import Insert_Packages from "../../components/form/form-elements/Insert_Packages";

export default function Packages_Send() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Paquetes de Guatemala" />


      
      <div className="space-y-6">
          <ComponentCard title="Semana 2 de Marzo del 2025">
          <Modal isOpen={isModalOpen} onClose={closeModal} showCloseButton={true}>
           <div>
            <Insert_Packages />
           </div>
          </Modal>

          <Button onClick={openModal}>Ingresar un Nuevo Paquete</Button>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
