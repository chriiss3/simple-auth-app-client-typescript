import { api, showAlert, redirectToPage, verifyAccessToken } from "../utils/utils";
import { validateEmail, validateInputs, addFieldError, removeFieldsError } from "../utils/formValidation";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CSS_CLASSES, PAGES, SELECTORS } from "../constants";

import { AxiosError } from "axios";

// console.log("login ts file");

const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
const eyeIcon = document.querySelector(SELECTORS.eyeIcon) as HTMLElement;
const eyeOffIcon = document.querySelector(SELECTORS.eyeOffIcon) as HTMLElement;
const form = document.querySelector(SELECTORS.form) as HTMLFormElement;

verifyAccessToken(true);

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const labels = document.querySelectorAll<HTMLInputElement>(SELECTORS.label) as NodeList;
  const inputs = document.querySelectorAll<HTMLInputElement>(SELECTORS.input) as NodeList;
  const emailInput = document.querySelector(SELECTORS.emailInput) as HTMLInputElement;
  const passwordInput = document.querySelector(SELECTORS.passwordInput) as HTMLInputElement;
  const errorMessages = document.querySelectorAll(SELECTORS.errorMessage) as NodeList;

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailLabel = labels[0] as HTMLElement;
  const passwordLabel = labels[1] as HTMLElement;
  const responseError = errorMessages[2] as HTMLElement;

  removeFieldsError(errorMessages, inputs, labels, responseError);

  if (validateInputs(labels, inputs, errorMessages)) return;
  if (validateEmail(emailValue, responseError, emailInput, emailLabel)) return;

  const fetchData = async () => {
    const submitButton = document.querySelector(SELECTORS.submitButton) as HTMLButtonElement;
    const alertMessage = document.querySelector(SELECTORS.alertMessage) as HTMLElement;

    submitButton.classList.add(CSS_CLASSES.loading);

    const formData = JSON.stringify({
      email: emailValue,
      password: passwordValue,
    });

    try {
      const res = await api.post("/auth/login", formData);

      submitButton.classList.remove(CSS_CLASSES.loading);

      // console.log(res.data);

      showAlert(alertMessage, res.data.message);

      redirectToPage(PAGES.myAccount);
    } catch (err) {
      submitButton.classList.remove(CSS_CLASSES.loading);

      if (err instanceof AxiosError) {
        if (!err.response) {
          return;
        }

        const errorMessage: string = err.response.data.error;

        // console.log(errorMessage);

        if (errorMessage === "Esta cuenta no existe.") {
          addFieldError(responseError, emailInput, errorMessage, true, emailLabel, true);
        }

        if (errorMessage === "Contraseña incorrecta.") {
          addFieldError(responseError, passwordInput, errorMessage, true, passwordLabel, true);
        }
      }
    }
  };

  fetchData();
};

eyeIcon.addEventListener("click", () => handleEyeIcon(passwordInput, eyeIcon, eyeOffIcon));
eyeOffIcon.addEventListener("click", () => handleEyeOffIcon(passwordInput, eyeIcon, eyeOffIcon));
form.addEventListener("submit", handleFormSubmit);
