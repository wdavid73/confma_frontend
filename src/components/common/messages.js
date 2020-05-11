import { message } from "antd";

export const crud_client = () => {
  message.info("Bienvenido al Registro y Listado de Clientes", 2);
};

export const find_client = () => {
  message.info("Bienvenido al Buscar Cliente", 2);
};

export const crud_cloth = () => {
  message.info("Bienvenido al Registro y Listado de la Prendas Hechas", 2);
};

export const crud_rental = () => {
  message.info("Bienvenido al Registro de Alquileres", 2);
};

export const list_rental = () => {
  message.info("Bienvenido al Listado de los Alquileres", 2);
};

export const popover_edit_quotation = () => {
  return "Esta opcion es para Editar la Cotizacion";
};

export const popover_delete_quotation = () => {
  return "Esta opcion es para Eliminar la Cotizacion";
};

export const popover_add_client_quotation = () => {
  return "Esta opcion es para Seleccionar un Client para la Cotizacion";
};

export const popover_title_edit = () => {
  return "Opcion : Editar";
};

export const popover_title_delete = () => {
  return "Opcion : Eliminar";
};

export const popover_title_add_client = () => {
  return "Opcion : Dar un Cliente";
};
