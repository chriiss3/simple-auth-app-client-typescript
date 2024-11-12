import { api, showToast, redirectToPage, verifyAccessToken } from "../utils";
import { PAGES, SELECTORS } from "../constants";

const toastNotif = document.querySelector(SELECTORS.toastNotif) as HTMLElement;
const logoutButton = document.querySelector(SELECTORS.logoutButton) as HTMLButtonElement;

import { AxiosError } from "axios";

const getUserData = async () => {
  const userName = document.querySelector(SELECTORS.userName) as HTMLElement;

  const user = await verifyAccessToken(false, toastNotif);

  if (user) {
    userName.textContent = user.name;
  }
};

getUserData();

const handleLogoutButton = () => {
  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");

      showToast(toastNotif, res.data.message);

      redirectToPage(PAGES.login);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          showToast(toastNotif, "Ocurrio un error desconocido");

          return;
        }
      }
    }
  };

  logout();
};

logoutButton.addEventListener("click", handleLogoutButton);
