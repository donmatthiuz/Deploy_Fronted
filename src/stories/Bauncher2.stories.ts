import { Meta, StoryObj } from "@storybook/react";
import Bauncher2 from "../components/Bauncher2/Bauncher2";

const meta: Meta<typeof Bauncher2> = {
  title: "Components/Bauncher2",
  component: Bauncher2,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Bauncher2>;

export const Default: Story = {
  args: {
    info: {
      envia: "Juan Pérez",
      direccion_envia: "Av. Insurgentes 456",

      recibe: "María González",
      direccion_recibe: "Calle Reforma 789",



      contenido: "Ropa",
      codigo: "ABC123",
      tipo: 'SECO'
    },
  },
};
