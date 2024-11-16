import { api, showToast, redirectToPage, getUser, verifyDateMatch, verifyToken } from "../utils";
import { PAGES, SELECTORS, ERROR_MESSAGES } from "../constants";
import { AxiosError } from "axios";

const elements = {
  toastNotif: document.querySelector(SELECTORS.toastNotif) as HTMLElement,
  passwordInput: document.querySelector(SELECTORS.passwordInput) as HTMLInputElement,
  eyeIcon: document.querySelector(SELECTORS.eyeIcon) as HTMLElement,
  eyeOffIcon: document.querySelector(SELECTORS.eyeOffIcon) as HTMLElement,
  form: document.querySelector(SELECTORS.form) as HTMLFormElement,
  emailInput: document.querySelector(SELECTORS.emailInput) as HTMLInputElement,
  labels: document.querySelectorAll(SELECTORS.label) as NodeList,
  inputs: document.querySelectorAll(SELECTORS.input) as NodeList,
  fieldsError: document.querySelectorAll(SELECTORS.fieldError) as NodeList,
  formError: document.querySelector(SELECTORS.formError) as HTMLElement,
  submitButton: document.querySelector(SELECTORS.submitButton) as HTMLButtonElement,
  logoutButton: document.querySelector(SELECTORS.logoutButton) as HTMLButtonElement,
};

let intervalId: any;

verifyDateMatch(intervalId, elements.toastNotif);

const handleLogoutButton = () => {
  const logout = async () => {
    const backupToken = localStorage.getItem("backupToken") as string;

    try {
      const res = await api.post("/auth/logout", JSON.stringify({ backupToken }));

      localStorage.setItem("newTokenRequestDate", "");
      localStorage.setItem("backupToken", "");

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

const onLoadPage = async () => {
  await verifyDateMatch(undefined, elements.toastNotif);
  await verifyToken(false, elements.toastNotif); 
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
