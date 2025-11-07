import axios from "axios";
import { getApiURL } from "./Shared.service";

const API = axios.create({
  baseURL: getApiURL(),
});

// Interceptor para requests (agrega el token)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.url !== "/login/") {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Interceptor para respuestas (maneja errores)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const data = error.response.data;

      // Estandariza el formato del error
      const details = data?.error?.details;
      const message =
        data?.error?.message ||
        Object.entries(details || {})
          .map(([field, msgs]) =>
            Array.isArray(msgs) ? `${field}: ${msgs.join(", ")}` : `${field}: ${msgs}`
          )
          .join("\n") ||
        "Ocurrió un error inesperado.";

      // Puedes mostrarlo directamente
      console.error(message);

      // O devolverlo en formato uniforme
      return Promise.reject({
        status: error.response.status,
        message,
        details,
      });
    }

    // Error sin respuesta del servidor (por ejemplo, red caída)
    return Promise.reject({
      message: "Error de conexión con el servidor.",
    });
  }
);

export default API;
