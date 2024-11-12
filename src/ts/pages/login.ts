import { api, showToast, redirectToPage, verifyAccessToken } from "../utils";
import {
  validateEmail,
  validateFields,
  removeFieldsError,
  addFormError,
  removeFormErrors,
} from "../utils/formValidations";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CLIENT_ERROR_MESSAGES, CSS_CLASSES, PAGES, SELECTORS } from "../constants";
import { AxiosError } from "axios";

// console.log("login");

let intervalId: any;

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
  dataError: document.querySelector(SELECTORS.dataError) as HTMLElement,
  submitButton: document.querySelector(SELECTORS.submitButton) as HTMLButtonElement,
};

// Ejecutar validateDateMatch antes de verifyAccessToken()
// En todas las paginas irá validateDateMatch

//

// const date = new Date();
// date.setMinutes(date.getMinutes() + 1);
// localStorage.setItem("newTokenRequestDate", date.toString());

// console.log("Fecha objetivo:", date.toString());

const validateDateMatch = () => {
  const date = new Date();

  const newTokenRequestDate = localStorage.getItem("newTokenRequestDate") as string;

  if (date >= new Date(newTokenRequestDate)) {
    if (navigator.onLine) {
      console.log("Fecha objetivo alcanzada!");
      clearInterval(intervalId);

      const getNewToken = async () => {
        try {
          const token = localStorage.getItem("backupToken") as string;

          console.log(token)

          const res = await api.post("/auth/getNewAccessToken", JSON.stringify({ token }))

          console.log(res)

          // const date = new Date();
          // date.setMinutes(date.getMinutes() + 55);
          // localStorage.setItem("newTokenRequestDate", date.toString());

          // localStorage.setItem("backupToken", res.data.accessToken);

          // Poner el nuevo token a la cookie auth_access_token
          // Volver a iniciar el intervalo
        } catch (err) {
          console.error(err);
        }
      };

      getNewToken();
    }
  } else {
    console.log("Esperando la fecha objetivo...");
  }
};

verifyAccessToken(true, elements.toastNotif);

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const emailValue = elements.emailInput.value.trim();
  const passwordValue = elements.passwordInput.value.trim();
  const labels = elements.labels;

  const emailLabel = labels[0] as HTMLElement;
  const passwordLabel = labels[1] as HTMLElement;

  removeFieldsError(elements.fieldsError, elements.inputs, elements.labels);
  removeFormErrors(elements.dataError, elements.inputs, elements.labels);

  if (
    validateFields(elements.labels, elements.inputs, elements.fieldsError) ||
    validateEmail(emailValue, elements.dataError, elements.emailInput, emailLabel)
  ) {
    return;
  }

  login(emailValue, passwordValue, emailLabel, passwordLabel);
};

const login = async (
  email: string,
  password: string,
  emailLabel: HTMLElement,
  passwordLabel: HTMLElement
): Promise<void> => {
  elements.submitButton.classList.add(CSS_CLASSES.loading);

  try {
    const formData = JSON.stringify({ email, password });
    const res = await api.post("/auth/login", formData);

    localStorage.setItem("backupToken", res.data.accessToken);

    const date = new Date();
    // date.setMinutes(date.getMinutes() + 55);
    date.setSeconds(date.getSeconds() + 5);
    localStorage.setItem("newTokenRequestDate", date.toString());

    console.log(date)

    intervalId = setInterval(validateDateMatch, 1000);

    elements.submitButton.classList.remove(CSS_CLASSES.loading);

    showToast(elements.toastNotif, res.data.message);

    // redirectToPage(PAGES.home);
  } catch (err) {
    handleLoginError(err, emailLabel, passwordLabel);
  }
};

const handleLoginError = (err: any, emailLabel: HTMLElement, passwordLabel: HTMLElement) => {
  elements.submitButton.classList.remove(CSS_CLASSES.loading);

  if (!err.response) {
    showToast(elements.toastNotif, "Ocurrio un error desconocido");

    return;
  }

  if (err instanceof AxiosError && err.response) {
    const errorMessage = err.response.data.error;

    if (errorMessage === CLIENT_ERROR_MESSAGES.accountNotFound) {
      addFormError(elements.dataError, elements.emailInput, emailLabel, errorMessage);
    } else if (errorMessage === CLIENT_ERROR_MESSAGES.incorrectPassword) {
      addFormError(elements.dataError, elements.passwordInput, passwordLabel, errorMessage);
    }
  } else {
    showToast(elements.toastNotif, "La solicitud ha tardado demasiado, inténtalo nuevamente.");
  }
};

elements.eyeIcon.addEventListener("click", () =>
  handleEyeIcon(elements.passwordInput, elements.eyeIcon, elements.eyeOffIcon)
);
elements.eyeOffIcon.addEventListener("click", () =>
  handleEyeOffIcon(elements.passwordInput, elements.eyeIcon, elements.eyeOffIcon)
);
elements.form.addEventListener("submit", handleFormSubmit);
