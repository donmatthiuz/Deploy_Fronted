import { Meta, StoryObj } from "@storybook/react";
import Bauncher from "../components/Bauncher/Bauncher";

const meta: Meta<typeof Bauncher> = {
  title: "Components/Bauncher",
  component: Bauncher,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Bauncher>;

export const Default: Story = {
  args: {
    info: {
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
      descripcion: ["1 FRIO",  "1 SECO",  "1 MEDICINA"],
      contenido: "Ropa",
      codigo: "ABC123",
      atendido: "Empleado",
      oficina: 'Guatemala',
      monto: 200
    },
  },
};
