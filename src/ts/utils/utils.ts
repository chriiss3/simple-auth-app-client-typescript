import axios, { AxiosError } from "axios";

import { API_URL } from "../config";
import { CSS_CLASSES } from "../constants";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const showToast = (alertMessage: HTMLElement, message: string): void => {
  alertMessage.textContent = message;
  alertMessage.classList.add(CSS_CLASSES.visible);

  setTimeout(() => {
    alertMessage.classList.remove(CSS_CLASSES.visible);
  }, 3000);
};

const redirectToPage = (page: string): void => {
  setTimeout(() => {
    window.location.href = `./${page}.html`;
  }, 3000);
};

const verifyAccessToken = async (redirect: boolean) => {
  try {
    const res = await api.get("/user/user-data");

    if (res) {
      // console.log("res:", res)
      
      // Redirigit si se esta autenticado
      if (redirect) {
        window.location.href = `./my-account.html`;
      }
    }

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err);

      // Redirigit si se intenta acceder a una ruta sin estar autenticado
      if (window.location.pathname === "/my-account.html") {
        window.location.href = `./login.html`;
      }
    }
  }
};

export { api, showToast, redirectToPage, verifyAccessToken };
