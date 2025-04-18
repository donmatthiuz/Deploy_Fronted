import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import Insert_Packages from "../../components/form/form-elements/Insert_Packages";
import PAGE_NAME from "../../pronto";

// Función para calcular el rango de fechas de la semana (jueves a miércoles)
const getWeekRange = () => {
  const today_ = new Date();
  const today = new Date(today_.getFullYear(), today_.getMonth(), today_.getDate());

  const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
  
  // Calcular el jueves más cercano (inicio de la semana)
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - ((dayOfWeek + 3) % 7));

  // Calcular el miércoles siguiente (fin de la semana)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  // Formatear las fechas
  const formatDate = (date: Date) => date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const formatISODate = (date: Date) => date.toISOString().split('T')[0];

  const fecha_inicio = formatISODate(startDate);
  const fecha_fin = formatISODate(endDate);

  return {
    range: `${formatDate(startDate)} - ${formatDate(endDate)}`,
    fecha_inicio,
    fecha_fin
  };
};

export default function Packages_Send() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { range, fecha_inicio, fecha_fin } = getWeekRange();

  return (
    <>
      <PageMeta
        title={`${PAGE_NAME} - Paquetes`}
        description="Esta es la página de tablas básicas para el Dashboard de TailAdmin en React.js y Tailwind CSS"
      />
      <PageBreadcrumb pageTitle="Paquetes de Guatemala" />

      <div className="space-y-6">
        <ComponentCard title={`Semana: ${range}`}>
          <Modal isOpen={isModalOpen} onClose={closeModal} showCloseButton={true}>
            <div>
              <Insert_Packages open={true} handleClose={closeModal} />
            </div>
          </Modal>

          <Button onClick={openModal}>Ingresar un Nuevo Paquete</Button>
          <BasicTableOne 
            fecha_inicio={fecha_inicio} fecha_fin={fecha_fin}/>
        </ComponentCard>
      </div>
    </>
  );
}
