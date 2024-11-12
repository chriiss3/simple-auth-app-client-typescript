import axios, { AxiosError } from "axios";

import { API_URL } from "../config";
import { CSS_CLASSES } from "../constants";
import { UserTypes } from "../interfaces";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
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

const verifyAccessToken = async (redirect: boolean, toastNotif: HTMLElement): Promise<UserTypes | undefined> => {
  try {
    const res = await api.get("/user/user-data");

    if (res) {
      if (redirect) {
        window.location.href = `./home.html`;
      }
    }

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const protectedPages = ["/home.html", "/settings.html"];

      if (!err.response) {
        showToast(toastNotif, "Ocurrio un error desconocido");

        return;
      }

      // Redirigit si se intenta acceder a paginas de protectedPages sin estar autenticado
      if (protectedPages.includes(window.location.pathname)) {
        window.location.href = "./login.html";
      }
    }
  }
};

export { api, showToast, redirectToPage, verifyAccessToken };
