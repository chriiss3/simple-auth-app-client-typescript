import { api, showToast, redirectToPage, verifyAccessToken } from "../utils/utils";
import {
  validateEmail,
  validateFields,
  removeFieldsError,
  showDataError,
  removeDataError,
} from "../utils/formValidation";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CLIENT_ERROR_MESSAGES, CSS_CLASSES, PAGES, SELECTORS } from "../constants";

import { AxiosError } from "axios";

verifyAccessToken(true);

const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
const eyeIcon = document.querySelector(SELECTORS.eyeIcon) as HTMLElement;
const eyeOffIcon = document.querySelector(SELECTORS.eyeOffIcon) as HTMLElement;
const form = document.querySelector(SELECTORS.form) as HTMLFormElement;

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const labels = document.querySelectorAll<HTMLInputElement>(SELECTORS.label) as NodeList;
  const inputs = document.querySelectorAll<HTMLInputElement>(SELECTORS.input) as NodeList;
  const emailInput = document.querySelector(SELECTORS.emailInput) as HTMLInputElement;
  const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
  const fieldsError = document.querySelectorAll(SELECTORS.fieldError) as NodeList;
  const dataError = document.querySelector(SELECTORS.dataError) as HTMLInputElement;

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailLabel = labels[0] as HTMLElement;
  const passwordLabel = labels[1] as HTMLElement;

  removeFieldsError(fieldsError, inputs, labels);
  removeDataError(dataError, inputs, labels);

  if (validateFields(labels, inputs, fieldsError)) return;
  if (validateEmail(emailValue, dataError, emailInput, emailLabel)) return;

  const login = async () => {
    const submitButton = document.querySelector(SELECTORS.submitButton) as HTMLButtonElement;
    const toastNotif = document.querySelector(SELECTORS.toastNotif) as HTMLElement;
    const timeoutDuration = 5000;

    submitButton.classList.add(CSS_CLASSES.loading);

    const formData = JSON.stringify({
      email: emailValue,
      password: passwordValue,
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

    try {
      const res = await api.post("/auth/login", formData, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      submitButton.classList.remove(CSS_CLASSES.loading);

      showToast(toastNotif, res.data.message);

      redirectToPage(PAGES.home);
    } catch (err) {
      clearTimeout(timeoutId);

      submitButton.classList.remove(CSS_CLASSES.loading);

      if (err instanceof AxiosError) {
        if (!err.response) {
          showToast(toastNotif, "No hay conexion a internet");

          return;
        }

        const errorMessage: string = err.response.data.error;

        if (errorMessage === CLIENT_ERROR_MESSAGES.accountNotFound) {
          showDataError(dataError, emailInput, emailLabel, errorMessage);
        }

        if (errorMessage === CLIENT_ERROR_MESSAGES.incorrectPassword) {
          showDataError(dataError, passwordInput, passwordLabel, errorMessage);
        }
      } else {
        showToast(toastNotif, "La solicitud ha tardado demasiado, inténtalo nuevamente.");
      }
    }
  };

  login();
};

eyeIcon.addEventListener("click", () => handleEyeIcon(passwordInput, eyeIcon, eyeOffIcon));
eyeOffIcon.addEventListener("click", () => handleEyeOffIcon(passwordInput, eyeIcon, eyeOffIcon));
form.addEventListener("submit", handleFormSubmit);
