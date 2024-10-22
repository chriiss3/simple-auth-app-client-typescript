import axios, { AxiosError } from "axios";

import { API_URL } from "../config";
import { CSS_CLASSES } from "../constants";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const showAlert = (alertMessageDiv: HTMLElement, message: string) => {
  alertMessageDiv.textContent = message;
  alertMessageDiv.classList.add(CSS_CLASSES.visible);

  setTimeout(() => {
    alertMessageDiv.classList.remove(CSS_CLASSES.visible);
  }, 3000);
};

const redirectToPage = (page: string) => {
  setTimeout(() => {
    window.location.href = `./${page}.html`;
  }, 3000);
};

// interface UserTypes {
//   name: string;
//   email: string;
//   password: string;
//   createdAt: Date;
//   _id: string;
//   updatedAt: Date
// }

const verifyAccessToken = async (redirect: boolean) => {
  try {
    const res = await api.get("/user/user-data");

    // Redirigit si se esta autenticado
    if (redirect) {
      window.location.href = `./my-account.html`;
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

// redirectifNotLogged
// redirectifLogged

// const getUserData = async (page: string) => {
//   try {
//     const res = await api.get("/api/auth/verify");

//     return res.data;
//   } catch (e) {
//     if (isAxiosError(e)) {
//       if (e.response) {
//         console.error(e.response.data);

//         window.location.href = `./${page}.html`;
//       }
//     }
//   }
// };

export { api, showAlert, redirectToPage, verifyAccessToken };
