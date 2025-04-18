import { Meta, StoryObj } from "@storybook/react";
import Bauncher3 from "../components/Bauncher3/Bauncher3";

const meta: Meta<typeof Bauncher3> = {
  title: "Components/Bauncher3",
  component: Bauncher3,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Bauncher3>;

export const Default: Story = {
  args: {
    info_list: [{
      bulto: 1,
      peso: '60.0',
      envia: "Juan Pérez",
      direccion_envia: "Av. Insurgentes 456",
      ciudad_envia: "CDMX",
      identif_envia: '3620515420101',
      telefono_envia: "555-6789",
      recibe: "María González",
      direccion_recibe: "Calle Reforma 789",
      ciudad_recibe: "Guadalajara",
      region: "Jalisco",
      codigo_postal: "44100",
      telefono_recibe: "555-6789",
      identif_recibe: '3620515420102',
      descripcion: ["1 PAQUETE"],
      contenido: "Ropa",
      codigo: "ABC123",
      atendido: "Empleado",
      oficina: 'Guatemala',
      tipo: 'SECO'
    }],
  },
};
