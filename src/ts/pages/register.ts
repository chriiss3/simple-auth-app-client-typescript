import { api, showAlert, redirectToPage, verifyAccessToken } from "../utils/utils";
import {
  validateEmail,
  validateInputs,
  addFieldError,
  removeFieldsError,
  validatePasswordLength,
} from "../utils/formValidation";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CSS_CLASSES, PAGES, SELECTORS } from "../constants";

import { AxiosError } from "axios";

const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
const eyeIcon = document.querySelector(SELECTORS.eyeIcon) as HTMLElement;
const eyeOffIcon = document.querySelector(SELECTORS.eyeOffIcon) as HTMLElement;
const form = document.querySelector(SELECTORS.form) as HTMLFormElement;

verifyAccessToken(true);

const handleFormSubmit = (e: Event) => {
  e.preventDefault();

  const labels = document.querySelectorAll<HTMLInputElement>(SELECTORS.label);
  const inputs = document.querySelectorAll<HTMLInputElement>(SELECTORS.input);
  const nameInput = document.querySelector(SELECTORS.nameInput) as HTMLInputElement;
  const emailInput = document.querySelector(SELECTORS.emailInput) as HTMLInputElement;
  const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
  const errorMessages = document.querySelectorAll(SELECTORS.errorMessage) as NodeList;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const emailLabel = labels[1] as HTMLElement;
  const passwordValue = passwordInput.value.trim();
  const passwordLabel = labels[2] as HTMLElement;
  const globalError = errorMessages[3] as HTMLElement;

  removeFieldsError(errorMessages, inputs, labels, globalError);

  if (validateInputs(labels, inputs, errorMessages)) return;
  if (validateEmail(emailValue, globalError, emailInput, emailLabel)) return;
  if (validatePasswordLength(passwordValue, globalError, passwordInput, passwordLabel)) return;

  const fetchData = async () => {
    const submitButton = document.querySelector(SELECTORS.submitButton) as HTMLButtonElement;
    const alertMessage = document.querySelector(SELECTORS.alertMessage) as HTMLElement;

    submitButton.classList.add(CSS_CLASSES.loading);

    const formData = JSON.stringify({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    });

    try {
      const res = await api.post("/auth/register", formData);

      submitButton.classList.remove(CSS_CLASSES.loading);

      showAlert(alertMessage, res.data.message);

      redirectToPage(PAGES.myAccount);
    } catch (err) {


      if (err instanceof AxiosError) {
        submitButton.classList.remove(CSS_CLASSES.loading);

        if (!err.response) {
          return;
        }

        const errorMessage: string = err.response.data.error;
        addFieldError(globalError, emailInput, errorMessage, true, emailLabel, true);
        // console.error(err);
    
      }
    }
  };

  fetchData();
};

eyeIcon.addEventListener("click", () => handleEyeIcon(passwordInput, eyeIcon, eyeOffIcon));
eyeOffIcon.addEventListener("click", () => handleEyeOffIcon(passwordInput, eyeIcon, eyeOffIcon));
form.addEventListener("submit", handleFormSubmit);

