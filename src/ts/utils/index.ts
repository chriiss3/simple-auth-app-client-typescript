import axios, { AxiosError } from "axios";

import { API_URL } from "../config";
import { CSS_CLASSES, ERROR_MESSAGES } from "../constants";
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

const showToast = (toastNotif: HTMLElement, message: string): void => {
  toastNotif.textContent = message;
  toastNotif.classList.add(CSS_CLASSES.visible);

  setTimeout(() => {
    toastNotif.classList.remove(CSS_CLASSES.visible);
  }, 3000);
};

const redirectToPage = (page: string): void => {
  setTimeout(() => {
    window.location.href = `./${page}.html`;
  }, 3000);
};

const verifyToken = async (redirect: boolean, toastNotif: HTMLElement): Promise<void> => {
  try {
    const res = await api.get("/user/empty");

    if (res) {
      if (redirect) {
        window.location.href = `./home.html`;
      }
    }
  } catch (err) {
    const anyErr = err as any;

    if (!anyErr.response) {
      showToast(toastNotif, ERROR_MESSAGES.unknownError);
      return;
    }

    if (err instanceof AxiosError && err.response) {
      const protectedPages = ["/home.html", "/settings.html"];

      // Redirigit si se intenta acceder a paginas de protectedPages sin estar autenticado
      if (protectedPages.includes(window.location.pathname)) {
        window.location.href = "./login.html";
      }
    }
  }
};

const getUser = async (toastNotif: HTMLElement): Promise<UserTypes | undefined> => {
  try {
    const res = await api.get("/user/getUser");

    return res.data;
  } catch (err) {
    // console.error(err)
    if (err instanceof AxiosError) {
      if (!err.response) {
        showToast(toastNotif, ERROR_MESSAGES.unknownError);
        return;
      }
    }
  }
};

const verifyDateMatch = async (intervalId: any, toastNotif: HTMLElement): Promise<void> => {
  const date = new Date();

  const newTokenRequestDate = localStorage.getItem("newTokenRequestDate");
  const backupToken = localStorage.getItem("backupToken") as string;

  if (!newTokenRequestDate || !backupToken) return clearInterval(intervalId);

  if (date >= new Date(newTokenRequestDate)) {
    if (navigator.onLine) {
      const getNewToken = async () => {
        try {
          const res = await api.post("/auth/getNewToken", JSON.stringify({ backupToken }));

          const date = new Date();
          date.setSeconds(date.getSeconds() + 30);
          localStorage.setItem("newTokenRequestDate", date.toString());
          // date.setMinutes(date.getMinutes() + 55);

          localStorage.setItem("backupToken", res.data.newAccessToken);

          // Aqui modificar para que sea seguro
          const expireTime = 3600000;
          document.cookie = `auth_access_token=${res.data.newAccessToken}; ` + expireTime + `; path=/`;
        } catch (err) {
          clearInterval(intervalId);

          const anyErr = err as any;

          if (!anyErr.response) {
            showToast(toastNotif, ERROR_MESSAGES.unknownError);
            return;
          }

          if (err instanceof AxiosError && err.response) {
            // Aqui cerrar sesion (quitar el accessToken de todos lados) ya que hay un problema con el refreshToken
          }
        }
      };

      await getNewToken();
    }
  }
};

export { api, showToast, redirectToPage, verifyToken, getUser, verifyDateMatch };
