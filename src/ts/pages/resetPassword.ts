import { api, showAlert, redirectToPage } from "../utils/utils";
import {
  validateInputs,
  confirmPasswordMatch,
  validatePasswordLength,
  addFieldError,
  removeFieldsError,
} from "../utils/formValidation";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CSS_CLASSES, PAGES, SELECTORS } from "../constants";

import { AxiosError } from "axios";

const passwordInputs = document.querySelectorAll(SELECTORS.input) as NodeListOf<HTMLInputElement>;
const eyeIcons = document.querySelectorAll(SELECTORS.eyeIcon) as NodeListOf<HTMLElement>;
const eyeOffIcons = document.querySelectorAll(SELECTORS.eyeOffIcon) as NodeListOf<HTMLElement>;
const form = document.querySelector(SELECTORS.form) as HTMLFormElement;

let token: string;

const getUrlToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");

  if (urlToken) {
    token = urlToken;
  } else {
    window.location.href = `./${PAGES.forgotPassword}.html`;
  }
};

getUrlToken();

passwordInputs.forEach((passwordInput, i) => {
  eyeIcons[i].addEventListener("click", () => handleEyeIcon(passwordInput, eyeIcons[i], eyeOffIcons[i]));
  eyeOffIcons[i].addEventListener("click", () => handleEyeOffIcon(passwordInput, eyeIcons[i], eyeOffIcons[i]));
});

const handleFormSubmit = (e: Event) => {
  e.preventDefault();

  const labels = document.querySelectorAll<HTMLInputElement>(SELECTORS.label);
  const inputs = document.querySelectorAll<HTMLInputElement>(SELECTORS.input);
  const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
  const confirmPasswordInput = document.querySelector(SELECTORS.confirmPasswordInput) as HTMLInputElement;
  const alertMessage = document.querySelector(SELECTORS.alertMessage) as HTMLElement;
  const errorMessages = document.querySelectorAll(SELECTORS.errorMessage) as NodeList;

  const passwordValue = passwordInput.value.trim();
  const passwordLabel = labels[0] as HTMLElement;
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const confirmPasswordLabel = labels[1] as HTMLElement;
  const globalError = errorMessages[2] as HTMLElement;

  removeFieldsError(errorMessages, inputs, labels, globalError);

  if (validateInputs(labels, inputs, errorMessages)) return;
  if (
    confirmPasswordMatch(passwordValue, confirmPasswordValue, globalError, confirmPasswordInput, confirmPasswordLabel)
  )
    return;
  if (validatePasswordLength(passwordValue, globalError, passwordInput, passwordLabel)) return;

  const dataFetching = async () => {
    const submitButton = document.querySelector(SELECTORS.submitButton) as HTMLButtonElement;

    const formData = JSON.stringify({
      newPassword: passwordValue,
      confirmNewPassword: confirmPasswordValue,
    });

    submitButton.classList.add(CSS_CLASSES.loading);

    try {
      const res = await api.post("/auth/reset-password", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      submitButton.classList.remove(CSS_CLASSES.loading);

      showAlert(alertMessage, res.data.message);

      passwordInput.value = "";
      confirmPasswordInput.value = "";

      redirectToPage(PAGES.myAccount);
    } catch (err) {
      if (err instanceof AxiosError) {
        submitButton.classList.remove(CSS_CLASSES.loading);

        // console.error(err);
        if (!err.response) {
          return;
        }

        const errorMessage: string = err.response.data.error;

        addFieldError(globalError, passwordInput, errorMessage, true, passwordLabel, true);
      }
    }
  };

  dataFetching();
};

form.addEventListener("submit", handleFormSubmit);
