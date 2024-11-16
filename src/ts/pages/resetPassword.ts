import { api, showToast, redirectToPage, verifyToken, verifyDateMatch } from "../utils";
import {
  validateFields,
  validatePasswordMatch,
  validatePasswordLength,
  removeFieldsError,
  addFormError,
  removeFormErrors,
} from "../utils/formValidations";
import { handleEyeIcon, handleEyeOffIcon } from "../utils/togglePasswordVisibility";
import { CSS_CLASSES, PAGES, SELECTORS, ERROR_MESSAGES } from "../constants";
import { AxiosError } from "axios";

const elements = {
  newPasswordLabel: document.querySelector("#new-password-label") as HTMLElement,
  newPasswordInput: document.querySelector(SELECTORS.newPasswordInput) as HTMLInputElement,
  newPasswordFieldError: document.querySelector("#new-password-field-error") as HTMLInputElement,
  confirmNewPasswordLabel: document.querySelector("#confirm-new-password-label") as HTMLInputElement,
  confirmNewPasswordInput: document.querySelector(SELECTORS.confirmNewPasswordInput) as HTMLInputElement,
  confirmNewPasswordFieldError: document.querySelector("#confirm-new-password-field-error") as HTMLInputElement,
  updatePasswordLink: document.querySelector(".update-password-link") as HTMLLinkElement,
  updatePassword: document.querySelector(".update-password") as HTMLElement,
  updatePasswordArrowIcon: document.querySelector("#update-password-arrow-icon") as HTMLElement,
  updateEmailLink: document.querySelector(".update-email-link") as HTMLLinkElement,
  updateEmail: document.querySelector(".update-email") as HTMLElement,
  updateEmailArrowIcon: document.querySelector("#update-email-arrow-icon") as HTMLElement,
  deleteAccountLink: document.querySelector(".delete-account-link") as HTMLLinkElement,
  deleteAccount: document.querySelector(".delete-account") as HTMLElement,
  deleteAccountArrowIcon: document.querySelector("#delete-account-arrow-icon") as HTMLElement,
  toastNotif: document.querySelector(SELECTORS.toastNotif) as HTMLElement,
  passwordInputs: document.querySelectorAll(SELECTORS.input) as NodeListOf<HTMLInputElement>,
  eyeIcons: document.querySelectorAll(SELECTORS.eyeIcon) as NodeListOf<HTMLElement>,
  eyeOffIcons: document.querySelectorAll(SELECTORS.eyeOffIcon) as NodeListOf<HTMLElement>,
  logoutButton: document.querySelector(SELECTORS.logoutButton) as HTMLButtonElement,
  labels: document.querySelectorAll(SELECTORS.label) as NodeList,
  inputs: document.querySelectorAll(SELECTORS.input) as NodeList,
  fieldsError: document.querySelectorAll(SELECTORS.fieldError) as NodeList,
  formError: document.querySelector(SELECTORS.formError) as HTMLElement,
  settingsLinks: document.querySelector(".settings-links") as HTMLElement,
  settingsTitle: document.querySelector(".settings-title") as HTMLElement,
  form: document.querySelector(SELECTORS.form) as HTMLFormElement,
  submitButton: document.querySelector(SELECTORS.submitButton) as HTMLButtonElement,
};

let token: string;
let intervalId: any;

verifyDateMatch(intervalId, elements.toastNotif);

const getParamsToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");

  if (urlToken) {
    token = urlToken;
  } else {
    window.location.href = `./${PAGES.forgotPassword}.html`;
  }
};

// getParamsToken();

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  const newPasswordValue = elements.newPasswordInput.value.trim() || "";
  const confirmNewPasswordValue = elements.confirmNewPasswordInput.value.trim() || "";

  //
  removeFieldsError(elements.fieldsError, elements.inputs, elements.labels);
  removeFormErrors(elements.formError, elements.inputs, elements.labels);

  //
  if (validateFields(elements.labels, elements.inputs, elements.fieldsError)) return;
  if (
    validatePasswordMatch(
      newPasswordValue,
      confirmNewPasswordValue,
      elements.formError,
      elements.confirmNewPasswordInput,
      elements.confirmNewPasswordLabel
    )
  )
    return;
  if (
    validatePasswordLength(newPasswordValue, elements.formError, elements.newPasswordInput, elements.newPasswordLabel)
  )
    return;

  resetPassword(newPasswordValue, confirmNewPasswordValue);
};

const resetPassword = async (newPasswordValue: string, confirmNewPasswordValue: string) => {
  const formData = JSON.stringify({
    newPassword: newPasswordValue,
    confirmNewPassword: confirmNewPasswordValue,
  });

  elements.submitButton.classList.add(CSS_CLASSES.loading);

  try {
    const res = await api.post("/auth/resetPassword", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    elements.submitButton.classList.remove(CSS_CLASSES.loading);

    showToast(elements.toastNotif, res.data.message);

    elements.newPasswordInput.value = "";
    elements.confirmNewPasswordInput.value = "";

    redirectToPage(PAGES.home);
  } catch (err) {
    handleResetPasswordError(err);
  }
};

const handleResetPasswordError = (err: any) => {
  elements.submitButton.classList.remove(CSS_CLASSES.loading);

  if (!err.response) {
    showToast(elements.toastNotif, ERROR_MESSAGES.unknownError);
    return;
  }

  if (err instanceof AxiosError && err.response) {
    const errorMessage: string = err.response.data.error;
    addFormError(elements.formError, elements.newPasswordInput, elements.newPasswordLabel, errorMessage);
  }
};

const onLoadPage = async () => {
  await verifyDateMatch(undefined, elements.toastNotif);
  await verifyToken(true, elements.toastNotif);

  let intervalId: any;
  intervalId = setInterval(() => verifyDateMatch(intervalId, elements.toastNotif), 1000);
};

onLoadPage();

elements.passwordInputs.forEach((passwordInput, i) => {
  elements.eyeIcons[i].addEventListener("click", () =>
    handleEyeIcon(passwordInput, elements.eyeIcons[i], elements.eyeOffIcons[i])
  );
  elements.eyeOffIcons[i].addEventListener("click", () =>
    handleEyeOffIcon(passwordInput, elements.eyeIcons[i], elements.eyeOffIcons[i])
  );
});
elements.form.addEventListener("submit", handleFormSubmit);
