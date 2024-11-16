import { SELECTORS, PAGES, ERROR_MESSAGES } from "../constants";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { api, showToast, redirectToPage, verifyDateMatch, getUser, verifyToken } from "../utils";
import { AxiosError } from "axios";

const elements = {
  settingsLinks: document.querySelector(".settings-links") as HTMLElement,
  settingsTitle: document.querySelector(".settings-title") as HTMLElement,
  updatePasswordLink: document.querySelector(".update-password-link") as HTMLLinkElement,
  updatePassword: document.querySelector(".update-password") as HTMLElement,
  updatePasswordArrowIcon: document.querySelector("#update-password-arrow-icon") as HTMLElement,
  updateEmailLink: document.querySelector(".update-email-link") as HTMLLinkElement,
  updateEmail: document.querySelector(".update-email") as HTMLElement,
  updateEmailArrowIcon: document.querySelector("#update-email-arrow-icon") as HTMLElement,
  deleteAccountLink: document.querySelector(".delete-account-link") as HTMLLinkElement,
  deleteAccount: document.querySelector(".delete-account") as HTMLElement,
  deleteAccountArrowIcon: document.querySelector("#delete-account-arrow-icon") as HTMLElement,
  toastNotif: document.querySelector(SELECTORS.toastNotif) as HTMLElement,
  passwordInputs: document.querySelectorAll(SELECTORS.input) as NodeListOf<HTMLInputElement>,
  eyeIcons: document.querySelectorAll(SELECTORS.eyeIcon) as NodeListOf<HTMLElement>,
  eyeOffIcons: document.querySelectorAll(SELECTORS.eyeOffIcon) as NodeListOf<HTMLElement>,
  logoutButton: document.querySelector(SELECTORS.logoutButton) as HTMLButtonElement,
};

const handleLogoutButton = () => {
  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");

      showToast(elements.toastNotif, res.data.message);
      redirectToPage(PAGES.login);
    } catch (err) {
      handleLogoutError(err);
    }
  };

  logout();
};

const handleLogoutError = (err: any) => {
  if (err instanceof AxiosError) {
    if (!err.response) {
      showToast(elements.toastNotif, ERROR_MESSAGES.unknownError);

      return;
    }
  }
};

//

elements.updatePasswordLink.addEventListener("click", () => {
  elements.updatePassword.classList.remove("hidden");

  elements.settingsLinks.classList.add("hidden");
  elements.settingsTitle.classList.add("hidden");
});

elements.updatePasswordArrowIcon.addEventListener("click", () => {
  elements.settingsLinks.classList.remove("hidden");
  elements.settingsTitle.classList.remove("hidden");

  elements.updatePassword.classList.add("hidden");
});

//

elements.deleteAccountLink.addEventListener("click", () => {
  elements.deleteAccount.classList.remove("hidden");

  elements.settingsLinks.classList.add("hidden");
  elements.settingsTitle.classList.add("hidden");
});

elements.deleteAccountArrowIcon.addEventListener("click", () => {
  elements.settingsLinks.classList.remove("hidden");
  elements.settingsTitle.classList.remove("hidden");

  elements.deleteAccount.classList.add("hidden");
});

//

elements.updateEmailLink.addEventListener("click", () => {
  elements.updateEmail.classList.remove("hidden");

  elements.settingsLinks.classList.add("hidden");
  elements.settingsTitle.classList.add("hidden");
});

elements.updateEmailArrowIcon.addEventListener("click", () => {
  elements.settingsLinks.classList.remove("hidden");
  elements.settingsTitle.classList.remove("hidden");

  elements.updateEmail.classList.add("hidden");
});

elements.passwordInputs.forEach((passwordInput, i) => {
  elements.eyeIcons[i]?.addEventListener("click", () =>
    handleEyeIcon(passwordInput, elements.eyeIcons[i], elements.eyeOffIcons[i])
  );
  elements.eyeOffIcons[i]?.addEventListener("click", () =>
    handleEyeOffIcon(passwordInput, elements.eyeIcons[i], elements.eyeOffIcons[i])
  );
});

const onLoadPage = async () => {
  await verifyDateMatch(undefined, elements.toastNotif); // Asegurar que verifyToken() reciba el token correcto y no uno expirado.
  await verifyToken(false, elements.toastNotif); // Verificar el token mas reciente de las cookies.
  const user = await getUser(elements.toastNotif);

  if (user) {
    const userFullName = document.querySelector(SELECTORS.fullName) as HTMLElement;
    userFullName.textContent = user.name;
  }

  let intervalId: any;
  intervalId = setInterval(() => verifyDateMatch(intervalId, elements.toastNotif), 1000);
};

onLoadPage();

elements.logoutButton.addEventListener("click", handleLogoutButton);
