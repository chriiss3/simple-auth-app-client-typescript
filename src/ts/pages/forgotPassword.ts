import { AxiosError } from "axios";

import { api, showToast, redirectToPage, verifyAccessToken } from "../utils/utils";
import {
  validateEmail,
  validateField,
  showDataError,
  removeFieldError,
  removeDataError2,
} from "../utils/formValidation";
import { CSS_CLASSES, PAGES, SELECTORS } from "../constants";

const form = document.querySelector(SELECTORS.form) as HTMLFormElement;

verifyAccessToken(true);

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const toastNotif = document.querySelector(SELECTORS.toastNotif) as HTMLElement;
  const emailInput = document.querySelector(SELECTORS.emailInput) as HTMLInputElement;
  const emailLabel = document.querySelector(SELECTORS.emailLabel) as HTMLInputElement;
  const emailFieldError = document.querySelector(SELECTORS.fieldError) as HTMLElement;
  const dataError = document.querySelector(SELECTORS.dataError) as HTMLInputElement;
  const emailValue = emailInput.value.trim();

  removeFieldError(emailFieldError, emailInput, emailLabel);
  removeDataError2(dataError, emailInput, emailLabel)

  if (validateField(emailValue, emailFieldError, emailInput, emailLabel)) return;
  if (validateEmail(emailValue, dataError, emailInput, emailLabel)) return;

  const sendResetLink = async () => {
    const submitButton = document.querySelector(SELECTORS.submitButton) as HTMLButtonElement;
    submitButton.classList.add(CSS_CLASSES.loading);

    const formData = JSON.stringify({ email: emailValue });

    try {
      const res = await api.post("/auth/forgot-password", formData);

      submitButton.classList.remove(CSS_CLASSES.loading);

      showToast(toastNotif, res.data.message);

      emailInput.value = "";

      redirectToPage(PAGES.login);
    } catch (err) {
      submitButton.classList.remove(CSS_CLASSES.loading);

      if (err instanceof AxiosError) {
        if (!err.response) {
          return;
        }

        const errorMessage: string = err.response.data.error;
        showDataError(dataError, emailInput, emailLabel, errorMessage);
      }
    }
  };

  sendResetLink();
};

form.addEventListener("submit", handleFormSubmit);
