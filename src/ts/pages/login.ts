import { api, showToast, redirectToPage, verifyToken, verifyDateMatch } from "../utils";
import {
  validateEmail,
  validateFields,
  removeFieldsError,
  addFormError,
  removeFormErrors,
} from "../utils/formValidations";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { ERROR_MESSAGES, CSS_CLASSES, PAGES, SELECTORS } from "../constants";
import { AxiosError } from "axios";

const elements = {
  emailLabel: document.querySelector(SELECTORS.emailLabel) as HTMLElement,
  emailInput: document.querySelector(SELECTORS.emailInput) as HTMLInputElement,
  emailFieldError: document.querySelector(SELECTORS.emailFieldError) as HTMLElement,
  passwordLabel: document.querySelector(SELECTORS.passwordLabel) as HTMLElement,
  passwordInput: document.querySelector(SELECTORS.passwordInput) as HTMLInputElement,
  passwordFieldError: document.querySelector(SELECTORS.passowrdFieldError) as HTMLElement,
  toastNotif: document.querySelector(SELECTORS.toastNotif) as HTMLElement,
  eyeIcon: document.querySelector(SELECTORS.eyeIcon) as HTMLElement,
  eyeOffIcon: document.querySelector(SELECTORS.eyeOffIcon) as HTMLElement,
  form: document.querySelector(SELECTORS.form) as HTMLFormElement,
  labels: document.querySelectorAll(SELECTORS.label) as NodeList,
  inputs: document.querySelectorAll(SELECTORS.input) as NodeList,
  fieldsError: document.querySelectorAll(SELECTORS.fieldError) as NodeList,
  formError: document.querySelector(SELECTORS.formError) as HTMLElement,
  submitButton: document.querySelector(SELECTORS.submitButton) as HTMLButtonElement,
};

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const emailInputValue = elements.emailInput.value.trim() || "";
  const passwordInputValue = elements.passwordInput.value.trim() || "";

  removeFieldsError(elements.fieldsError, elements.inputs, elements.labels);
  removeFormErrors(elements.formError, elements.inputs, elements.labels);

  if (
    validateFields(elements.labels, elements.inputs, elements.fieldsError) ||
    validateEmail(emailInputValue, elements.formError, elements.emailInput, elements.emailLabel)
  ) {
    return;
  }

  login(emailInputValue, passwordInputValue);
};

const login = async (email: string, password: string): Promise<void> => {
  elements.submitButton.classList.add(CSS_CLASSES.loading);

  try {
    const formData = JSON.stringify({ email, password });
    const res = await api.post("/auth/login", formData);

    localStorage.setItem("backupToken", res.data.accessToken);

    const date = new Date();
    date.setSeconds(date.getSeconds() + 30);
    localStorage.setItem("newTokenRequestDate", date.toString());
    // date.setMinutes(date.getMinutes() + 55);

    elements.submitButton.classList.remove(CSS_CLASSES.loading);

    showToast(elements.toastNotif, res.data.message);

    redirectToPage(PAGES.home);
  } catch (err) {
    handleLoginError(err);
  }
};

const handleLoginError = (err: any) => {
  elements.submitButton.classList.remove(CSS_CLASSES.loading);

  if (!err.response) {
    showToast(elements.toastNotif, ERROR_MESSAGES.unknownError);

    return;
  }

  if (err instanceof AxiosError && err.response) {
    const errorMessage = err.response.data.error;

    if (errorMessage === ERROR_MESSAGES.accountNotFound) {
      addFormError(elements.formError, elements.emailInput, elements.emailLabel, errorMessage);
    } else if (errorMessage === ERROR_MESSAGES.incorrectPassword) {
      addFormError(elements.formError, elements.passwordInput, elements.passwordLabel, errorMessage);
    }
  }
};

const onLoadPage = async () => {
  await verifyDateMatch(undefined, elements.toastNotif); // Asegurar que verifyToken() reciba el token correcto y no uno expirado.
  await verifyToken(true, elements.toastNotif); // Verificar el token mas reciente de las cookies.

  let intervalId: any;
  intervalId = setInterval(() => verifyDateMatch(intervalId, elements.toastNotif), 1000);
};

onLoadPage();

elements.eyeIcon.addEventListener("click", () =>
  handleEyeIcon(elements.passwordInput, elements.eyeIcon, elements.eyeOffIcon)
);
elements.eyeOffIcon.addEventListener("click", () =>
  handleEyeOffIcon(elements.passwordInput, elements.eyeIcon, elements.eyeOffIcon)
);
elements.form.addEventListener("submit", handleFormSubmit);
