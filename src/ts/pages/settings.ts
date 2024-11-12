import { verifyAccessToken } from "../utils";
import { SELECTORS, PAGES } from "../constants";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { api, showToast, redirectToPage } from "../utils";
import { AxiosError } from "axios";

const passwordInputs = document.querySelectorAll(SELECTORS.input) as NodeListOf<HTMLInputElement>;
const eyeIcons = document.querySelectorAll(SELECTORS.eyeIcon) as NodeListOf<HTMLElement>;
const eyeOffIcons = document.querySelectorAll(SELECTORS.eyeOffIcon) as NodeListOf<HTMLElement>;

const logoutButton = document.querySelector(SELECTORS.logoutButton) as HTMLButtonElement;
const toastNotif = document.querySelector(SELECTORS.toastNotif) as HTMLElement;

const updatePasswordLink = document.querySelector(".update-password-link");
const updatePassword = document.querySelector(".update-password");
const updatePasswordArrowIcon = document.querySelector("#update-password-arrow-icon");

const settingsLinks = document.querySelector(".settings-links");
const settingsTitle = document.querySelector(".settings-title");

const deleteAccountLink = document.querySelector(".delete-account-link");
const deleteAccount = document.querySelector(".delete-account");
const deleteAccountArrowIcon = document.querySelector("#delete-account-arrow-icon");

const updateEmailLink = document.querySelector(".update-email-link");
const updateEmail = document.querySelector(".update-email");
const updateEmailArrowIcon = document.querySelector("#update-email-arrow-icon");

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

updatePasswordLink?.addEventListener("click", () => {
  updatePassword?.classList.remove("hidden");

  settingsLinks?.classList.add("hidden");
  settingsTitle?.classList.add("hidden");
});

updatePasswordArrowIcon?.addEventListener("click", () => {
  settingsLinks?.classList.remove("hidden");
  settingsTitle?.classList.remove("hidden");

  updatePassword?.classList.add("hidden");
});

//

deleteAccountLink?.addEventListener("click", () => {
  deleteAccount?.classList.remove("hidden");

  settingsLinks?.classList.add("hidden");
  settingsTitle?.classList.add("hidden");
});

deleteAccountArrowIcon?.addEventListener("click", () => {
  settingsLinks?.classList.remove("hidden");
  settingsTitle?.classList.remove("hidden");

  deleteAccount?.classList.add("hidden");
});

//

updateEmailLink?.addEventListener("click", () => {
  updateEmail?.classList.remove("hidden");

  settingsLinks?.classList.add("hidden");
  settingsTitle?.classList.add("hidden");
});

updateEmailArrowIcon?.addEventListener("click", () => {
  settingsLinks?.classList.remove("hidden");
  settingsTitle?.classList.remove("hidden");

  updateEmail?.classList.add("hidden");
});

passwordInputs?.forEach((passwordInput, i) => {
  eyeIcons[i]?.addEventListener("click", () => handleEyeIcon(passwordInput, eyeIcons[i], eyeOffIcons[i]));
  eyeOffIcons[i]?.addEventListener("click", () => handleEyeOffIcon(passwordInput, eyeIcons[i], eyeOffIcons[i]));
});
