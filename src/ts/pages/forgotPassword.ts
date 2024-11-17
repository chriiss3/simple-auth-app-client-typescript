import { AxiosError } from "axios";
import { api, showToast, redirectToPage, verifyToken, verifyDateMatch } from "../utils";
import {
  validateEmail,
  validateField,
  addFormError,
  removeFieldError,
  removeFormError,
} from "../utils/formValidations";
import { ERROR_MESSAGES, CSS_CLASSES, PAGES, SELECTORS } from "../constants";

const elements = {
  emailLabel: document.querySelector("#email-label") as HTMLElement,
  emailInput: document.querySelector(SELECTORS.emailInput) as HTMLInputElement,
  emailFieldError: document.querySelector("#email-field-error") as HTMLElement,
  toastNotif: document.querySelector(SELECTORS.toastNotif) as HTMLElement,
  form: document.querySelector(SELECTORS.form) as HTMLFormElement,
  formError: document.querySelector(SELECTORS.formError) as HTMLElement,
  submitButton: document.querySelector(SELECTORS.submitButton) as HTMLButtonElement,
};

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const emailInputValue = elements.emailInput.value.trim() || "";

  //
  removeFieldError(elements.emailFieldError, elements.emailInput, elements.emailLabel);
  removeFormError(elements.formError, elements.emailInput, elements.emailLabel);

  //
  if (validateField(emailInputValue, elements.emailFieldError, elements.emailInput, elements.emailLabel)) return;
  if (validateEmail(emailInputValue, elements.formError, elements.emailInput, elements.emailLabel)) return;

  sendLink(emailInputValue);
};

const sendLink = async (emailInputValue: string) => {
  elements.submitButton.classList.add(CSS_CLASSES.loading);

  const formData = JSON.stringify({ email: emailInputValue });

  try {
    const res = await api.post("/auth/forgotPassword", formData);

    elements.submitButton.classList.remove(CSS_CLASSES.loading);
    showToast(elements.toastNotif, res.data.message);
    elements.emailInput.value = "";
    redirectToPage(PAGES.login);
  } catch (err) {
    handleSendLinkError(err);
  }
};

const handleSendLinkError = (err: any) => {
  elements.submitButton.classList.remove(CSS_CLASSES.loading);

  if (!err.response) {
    showToast(elements.toastNotif, ERROR_MESSAGES.unknownError);
    return;
  }

  if (err instanceof AxiosError && err.response) {
    const errorMessage: string = err.response.data.error;
    addFormError(elements.formError, elements.emailInput, elements.emailLabel, errorMessage);
  }
};

const onLoadPage = async () => {
  await verifyDateMatch(undefined, elements.toastNotif);
  await verifyToken(true, elements.toastNotif);

  let intervalId: any;
  intervalId = setInterval(() => verifyDateMatch(intervalId, elements.toastNotif), 1000);
};

onLoadPage();

elements.form.addEventListener("submit", handleFormSubmit);
