import { api, showToast, redirectToPage } from "../utils/utils";
import {
  validateFields,
  confirmPasswordMatch,
  validatePasswordLength,
  removeFieldsError,
  showDataError,
} from "../utils/formValidation";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CSS_CLASSES, PAGES, SELECTORS } from "../constants";

import { AxiosError } from "axios";

const passwordInputs = document.querySelectorAll(SELECTORS.input) as NodeListOf<HTMLInputElement>;
const eyeIcons = document.querySelectorAll(SELECTORS.eyeIcon) as NodeListOf<HTMLElement>;
const eyeOffIcons = document.querySelectorAll(SELECTORS.eyeOffIcon) as NodeListOf<HTMLElement>;
const form = document.querySelector(SELECTORS.form) as HTMLFormElement;

let token: string;

// getParamsToken
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

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const labels = document.querySelectorAll<HTMLInputElement>(SELECTORS.label);
  const inputs = document.querySelectorAll<HTMLInputElement>(SELECTORS.input);
  const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
  const confirmPasswordInput = document.querySelector(SELECTORS.confirmPasswordInput) as HTMLInputElement;
  const toastNotif = document.querySelector(SELECTORS.toastNotif) as HTMLElement;
  const fieldsError = document.querySelectorAll(SELECTORS.fieldError) as NodeList;
  const dataError = document.querySelector(SELECTORS.dataError) as HTMLInputElement;

  const passwordValue = passwordInput.value.trim();
  const passwordLabel = labels[0] as HTMLElement;
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const confirmPasswordLabel = labels[1] as HTMLElement;

  removeFieldsError(fieldsError, inputs, labels);

  if (validateFields(labels, inputs, fieldsError)) return;
  if (confirmPasswordMatch(passwordValue, confirmPasswordValue, dataError, confirmPasswordInput, confirmPasswordLabel))
    return;
  if (validatePasswordLength(passwordValue, dataError, passwordInput, passwordLabel)) return;

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

      showToast(toastNotif, res.data.message);

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

        showDataError(dataError, passwordInput, passwordLabel, errorMessage);
      }
    }
  };

  dataFetching();
};

form.addEventListener("submit", handleFormSubmit);
