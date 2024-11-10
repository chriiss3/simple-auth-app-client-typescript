import { api, showToast, redirectToPage, verifyAccessToken } from "../utils/utils";
import { PAGES, SELECTORS } from "../constants";

// import { AxiosError } from "axios";

const logoutButton = document.querySelector(SELECTORS.logoutButton) as HTMLButtonElement;

const getUserData = async () => {
  const userName = document.querySelector(SELECTORS.userName) as HTMLElement;

  const user = await verifyAccessToken(false);

  if (user) {
    userName.textContent = user.name;
  }
};

getUserData();

const handleLogoutButton = () => {
  const logout = async () => {
    const toastNotif = document.querySelector(SELECTORS.toastNotif) as HTMLElement;

    try {
      const res = await api.post("/auth/logout");

      showToast(toastNotif, res.data.message);

      redirectToPage(PAGES.login);
    } catch (err) {
      console.error(err);
      // if (err instanceof AxiosError) {
      // }
    }
  };

  logout();
};

logoutButton.addEventListener("click", handleLogoutButton);
