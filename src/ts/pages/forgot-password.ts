import { AxiosError } from "axios";

import { api, showAlert, redirectToPage, verifyAccessToken } from "../utils/utils";
import { validateEmail, validateInput, addFieldError, removeFieldsError } from "../utils/formValidation";
import { CSS_CLASSES, PAGES, SELECTORS } from "../constants";

const form = document.querySelector(SELECTORS.form) as HTMLFormElement;

verifyAccessToken(true);

const handleFormSubmit = (e: Event) => {
  e.preventDefault();

  const labels = document.querySelectorAll<HTMLInputElement>(SELECTORS.label) as NodeList;
  const inputs = document.querySelectorAll<HTMLInputElement>(SELECTORS.input) as NodeList;
  const alertMessage = document.querySelector(SELECTORS.alertMessage) as HTMLElement;
  const emailInput = document.querySelector(SELECTORS.emailInput) as HTMLInputElement;
  const emailLabel = document.querySelector(SELECTORS.emailLabel) as HTMLInputElement;
  const errorMessages = document.querySelectorAll(SELECTORS.errorMessage) as NodeList;

  const emailValue = emailInput.value.trim();
  const emailError = errorMessages[0] as HTMLElement;
  const globalError = errorMessages[1] as HTMLElement;

  removeFieldsError(errorMessages, inputs, labels, globalError);

  if (validateInput(emailValue, emailError, emailInput, emailLabel)) return;
  if (validateEmail(emailValue, globalError, emailInput, emailLabel)) return;

  const fetchData = async () => {
    const submitButton = document.querySelector(SELECTORS.submitButton) as HTMLButtonElement;

    submitButton.classList.add(CSS_CLASSES.loading);

    const formData = JSON.stringify({ email: emailValue });

    try {
      const res = await api.post("/api/auth/forgot-password", formData);

      submitButton.classList.remove(CSS_CLASSES.loading);

      showAlert(alertMessage, res.data.message);

      emailInput.value = "";

      redirectToPage(PAGES.login);
    } catch (err) {
      if (err instanceof AxiosError) {
        submitButton.classList.remove(CSS_CLASSES.loading);
        // console.error(err);
        if (!err.response) {
          return;
        }

        const errorMessage: string = err.response.data.error;

        addFieldError(globalError, emailInput, errorMessage, true, emailLabel, true);
      }
    }
  };

  fetchData();
};

form.addEventListener("submit", handleFormSubmit);
