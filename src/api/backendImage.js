import axios from "axios";
import getEnvVars from "../../enviroment";

const { apiImage } = getEnvVars();

// Crear una instancia de conexión
const instance = axios.create({
  baseURL: apiImage,
});

export default instance;
