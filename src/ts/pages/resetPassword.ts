import { api, showToast, redirectToPage } from "../utils/utils";
import {
  validateFields,
  confirmPasswordMatch,
  validatePasswordLength,
  removeFieldsError,
  showDataError,
  removeDataError,
} from "../utils/formValidation";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CSS_CLASSES, PAGES, SELECTORS } from "../constants";

import { AxiosError } from "axios";

const passwordInputs = document.querySelectorAll(SELECTORS.input) as NodeListOf<HTMLInputElement>;
const eyeIcons = document.querySelectorAll(SELECTORS.eyeIcon) as NodeListOf<HTMLElement>;
const eyeOffIcons = document.querySelectorAll(SELECTORS.eyeOffIcon) as NodeListOf<HTMLElement>;
const form = document.querySelector(SELECTORS.form) as HTMLFormElement;

let token: string;

const getParamsToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");

  if (urlToken) {
    token = urlToken;
  } else {
    window.location.href = `./${PAGES.forgotPassword}.html`;
  }
};

getParamsToken();

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const labels = document.querySelectorAll<HTMLInputElement>(SELECTORS.label);
  const inputs = document.querySelectorAll<HTMLInputElement>(SELECTORS.input);
  const newPasswordInput = document.querySelector(SELECTORS.newPasswordInput) as HTMLInputElement;
  const confirmNewPasswordInput = document.querySelector(SELECTORS.confirmNewPasswordInput) as HTMLInputElement;
  const toastNotif = document.querySelector(SELECTORS.toastNotif) as HTMLElement;
  const fieldsError = document.querySelectorAll(SELECTORS.fieldError) as NodeList;
  const dataError = document.querySelector(SELECTORS.dataError) as HTMLInputElement;

  const newPasswordValue = newPasswordInput.value.trim();
  const newPasswordLabel = labels[0] as HTMLElement;
  const confirmNewPasswordValue = confirmNewPasswordInput.value.trim();
  const confirmNewPasswordLabel = labels[1] as HTMLElement;

  removeFieldsError(fieldsError, inputs, labels);
  removeDataError(dataError, inputs, labels);

  if (validateFields(labels, inputs, fieldsError)) return;
  if (
    confirmPasswordMatch(
      newPasswordValue,
      confirmNewPasswordValue,
      dataError,
      confirmNewPasswordInput,
      confirmNewPasswordLabel
    )
  )
    return;
  if (validatePasswordLength(newPasswordValue, dataError, newPasswordInput, newPasswordLabel)) return;

  const resetPassword = async () => {
    const submitButton = document.querySelector(SELECTORS.submitButton) as HTMLButtonElement;

    const formData = JSON.stringify({
      newPassword: newPasswordValue,
      confirmNewPassword: confirmNewPasswordValue,
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

      newPasswordInput.value = "";
      confirmNewPasswordInput.value = "";

      redirectToPage(PAGES.home);
    } catch (err) {
      submitButton.classList.remove(CSS_CLASSES.loading);

      if (err instanceof AxiosError) {
        if (!err.response) {
          return;
        }

        const errorMessage: string = err.response.data.error;

        showDataError(dataError, newPasswordInput, newPasswordLabel, errorMessage);
      }
    }
  };

  resetPassword();
};

passwordInputs.forEach((passwordInput, i) => {
  eyeIcons[i].addEventListener("click", () => handleEyeIcon(passwordInput, eyeIcons[i], eyeOffIcons[i]));
  eyeOffIcons[i].addEventListener("click", () => handleEyeOffIcon(passwordInput, eyeIcons[i], eyeOffIcons[i]));
});
form.addEventListener("submit", handleFormSubmit);
