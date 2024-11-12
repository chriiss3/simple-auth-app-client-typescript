import { api, showToast, redirectToPage, verifyAccessToken } from "../utils";
import {
  validateEmail,
  validateFields,
  removeFieldsError,
  validatePasswordLength,
  addFormError,
  removeFormErrors
} from "../utils/formValidations";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CSS_CLASSES, PAGES, SELECTORS } from "../constants";

import { AxiosError } from "axios";

const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
const eyeIcon = document.querySelector(SELECTORS.eyeIcon) as HTMLElement;
const eyeOffIcon = document.querySelector(SELECTORS.eyeOffIcon) as HTMLElement;
const form = document.querySelector(SELECTORS.form) as HTMLFormElement;
const toastNotif = document.querySelector(SELECTORS.toastNotif) as HTMLElement;


verifyAccessToken(true, toastNotif);

const handleFormSubmit = (e: Event) => {
  e.preventDefault();

  const labels = document.querySelectorAll<HTMLInputElement>(SELECTORS.label);
  const inputs = document.querySelectorAll<HTMLInputElement>(SELECTORS.input);
  const nameInput = document.querySelector(SELECTORS.nameInput) as HTMLInputElement;
  const emailInput = document.querySelector(SELECTORS.emailInput) as HTMLInputElement;
  const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
  const fieldsError = document.querySelectorAll(SELECTORS.fieldError) as NodeList;
  const dataError = document.querySelector(SELECTORS.dataError) as HTMLInputElement;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const emailLabel = labels[1] as HTMLElement;
  const passwordValue = passwordInput.value.trim();
  const passwordLabel = labels[2] as HTMLElement;

  removeFieldsError(fieldsError, inputs, labels);
  removeFormErrors(dataError,inputs,labels )

  if (validateFields(labels, inputs, fieldsError)) return;
  if (validateEmail(emailValue, dataError, emailInput, emailLabel)) return;
  if (validatePasswordLength(passwordValue, dataError, passwordInput, passwordLabel)) return;

  const register = async () => {
    const submitButton = document.querySelector(SELECTORS.submitButton) as HTMLButtonElement;

    submitButton.classList.add(CSS_CLASSES.loading);

    const formData = JSON.stringify({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    });

    try {
      const res = await api.post("/auth/register", formData);

      submitButton.classList.remove(CSS_CLASSES.loading);

      showToast(toastNotif, res.data.message);

      redirectToPage(PAGES.home);
    } catch (err) {
      submitButton.classList.remove(CSS_CLASSES.loading);

      if (err instanceof AxiosError) {
        if (!err.response) {
          showToast(toastNotif, "Ocurrio un error desconocido");
  
          return;
        }

        const errorMessage: string = err.response.data.error;
        addFormError(dataError, emailInput, emailLabel, errorMessage);
      }
    }
  };

  register();
};

eyeIcon.addEventListener("click", () => handleEyeIcon(passwordInput, eyeIcon, eyeOffIcon));
eyeOffIcon.addEventListener("click", () => handleEyeOffIcon(passwordInput, eyeIcon, eyeOffIcon));
form.addEventListener("submit", handleFormSubmit);
