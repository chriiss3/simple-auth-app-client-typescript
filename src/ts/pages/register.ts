import { api, showToast, redirectToPage, verifyToken, verifyDateMatch } from "../utils";
import {
  validateEmail,
  validateFields,
  removeFieldsError,
  validatePasswordLength,
  addFormError,
  removeFormErrors,
} from "../utils/formValidations";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CSS_CLASSES, PAGES, SELECTORS, ERROR_MESSAGES } from "../constants";
import { AxiosError } from "axios";

const elements = {
  emailLabel: document.querySelector("#email-label") as HTMLElement,
  emailInput: document.querySelector(SELECTORS.emailInput) as HTMLInputElement,
  emailFieldError: document.querySelector("#email-field-error") as HTMLElement,
  nameLabel: document.querySelector("#name-label") as HTMLElement,
  nameInput: document.querySelector(SELECTORS.nameInput) as HTMLInputElement,
  nameFieldError: document.querySelector("#name-field-error") as HTMLElement,
  passwordLabel: document.querySelector("#password-label") as HTMLElement,
  passwordInput: document.querySelector(SELECTORS.passwordInput) as HTMLInputElement,
  passwordFieldError: document.querySelector("#password-field-error") as HTMLElement,
  toastNotif: document.querySelector(SELECTORS.toastNotif) as HTMLElement,
  eyeIcon: document.querySelector(SELECTORS.eyeIcon) as HTMLElement,
  eyeOffIcon: document.querySelector(SELECTORS.eyeOffIcon) as HTMLElement,
  form: document.querySelector(SELECTORS.form) as HTMLFormElement,
  labels: document.querySelectorAll(SELECTORS.label) as NodeList,
  inputs: document.querySelectorAll(SELECTORS.input) as NodeList,
  fieldsError: document.querySelectorAll(SELECTORS.fieldError) as NodeList,
  formError: document.querySelector(SELECTORS.formError) as HTMLElement,
  submitButton: document.querySelector(SELECTORS.submitButton) as HTMLButtonElement,
};

let intervalId: any;

verifyDateMatch(intervalId, elements.toastNotif);

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const nameInputValue = elements.nameInput.value.trim() || "";
  const emailInputValue = elements.emailInput.value.trim() || "";
  const passwordInputValue = elements.passwordInput.value.trim() || "";

  //
  removeFieldsError(elements.fieldsError, elements.inputs, elements.labels);
  removeFormErrors(elements.formError, elements.inputs, elements.labels);

  //
  if (validateFields(elements.labels, elements.inputs, elements.fieldsError)) return;
  if (validateEmail(emailInputValue, elements.formError, elements.emailInput, elements.emailLabel)) return;
  if (validatePasswordLength(passwordInputValue, elements.formError, elements.passwordInput, elements.passwordLabel))
    return;

  register(nameInputValue, emailInputValue, passwordInputValue);
};

const register = async (nameInputValue: string, emailInputValue: string, passwordInputValue: string) => {
  elements.submitButton.classList.add(CSS_CLASSES.loading);

  const formData = JSON.stringify({
    name: nameInputValue,
    email: emailInputValue,
    password: passwordInputValue,
  });

  try {
    const res = await api.post("/auth/register", formData);

    elements.submitButton.classList.remove(CSS_CLASSES.loading);

    showToast(elements.toastNotif, res.data.message);

    redirectToPage(PAGES.home);
  } catch (err) {
    handleRegisterError(err, elements.emailLabel);
  }
};

const handleRegisterError = (err: any, emailLabel: HTMLElement) => {
  elements.submitButton.classList.remove(CSS_CLASSES.loading);

  if (!err.response) {
    showToast(elements.toastNotif, ERROR_MESSAGES.unknownError);

    return;
  }

  if (err instanceof AxiosError && err.response) {
    if (!err.response) {
      showToast(elements.toastNotif, ERROR_MESSAGES.unknownError);

      return;
    }

    const errorMessage: string = err.response.data.error;
    addFormError(elements.formError, elements.emailInput, emailLabel, errorMessage);
  }
};

const onLoadPage = async () => {
  await verifyDateMatch(undefined, elements.toastNotif);
  await verifyToken(true, elements.toastNotif);

  let intervalId: any;
  intervalId = setInterval(() => verifyDateMatch(intervalId, elements.toastNotif), 1000);
};

onLoadPage();

elements.eyeIcon.addEventListener("click", () =>
  handleEyeIcon(elements.passwordInput, elements.eyeIcon, elements.eyeOffIcon)
);
elements.eyeOffIcon.addEventListener("click", () =>
  handleEyeOffIcon(elements.passwordInput, elements.eyeIcon, elements.eyeOffIcon)
);
elements.form.addEventListener("submit", handleFormSubmit);
