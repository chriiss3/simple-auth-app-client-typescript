import { CSS_CLASSES, ERROR_MESSAGES, COLORS } from "../constants";

const validateEmail = (
  emailValue: string,
  errorMessage: HTMLElement,
  emailInput: HTMLInputElement,
  label: HTMLElement
) => {
  const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!REGEX.test(emailValue)) {
    addFieldError(errorMessage, emailInput, ERROR_MESSAGES.invalidMail, true, label, true);

    return true;
  }

  return false;
};

const validateInputs = (labels: NodeList, inputs: NodeList, errorMessages: NodeList) => {
  let emptyInput = false;

  inputs.forEach((input, i) => {
    const inputElement = input as HTMLInputElement;

    if (inputElement.value === "") {
      const label = labels[i] as HTMLElement;
      const errorMessage = errorMessages[i] as HTMLElement;

      addFieldError(errorMessage, inputElement, ERROR_MESSAGES.requiredField, false, label, false);

      emptyInput = true;
    } else {
      const label = labels[i] as HTMLElement;
      const errorMessage = errorMessages[i] as HTMLElement;

      removeFieldError(errorMessage, inputElement, label);
    }
  });

  return emptyInput;
};

const validatePasswordLength = (
  password: string,
  errorMessage: HTMLElement,
  input: HTMLInputElement,
  label: HTMLElement
) => {
  if (password.length < 8) {
    addFieldError(errorMessage, input, ERROR_MESSAGES.invalidPasswordLength, true, label, true);

    return true;
  }

  return false;
};

const confirmPasswordMatch = (
  password: string,
  confirmPassword: string,
  errorMessage: HTMLElement,
  confirmPasswordInput: HTMLInputElement,
  label: HTMLElement
) => {
  if (password !== confirmPassword) {
    addFieldError(errorMessage, confirmPasswordInput, ERROR_MESSAGES.passwordNotMath, true, label, true);

    return true;
  }

  return false;
};

const validateInput = (inputValue: string, errorMessage: HTMLElement, input: HTMLInputElement, label: HTMLElement) => {
  if (inputValue === "") {
    addFieldError(errorMessage, input, ERROR_MESSAGES.requiredField, false, label, false);

    return true;
  }

  return false;
};

const addFieldError = (
  errorMessage: HTMLElement,
  input: HTMLInputElement,
  message: string,
  isBold: boolean,
  label: HTMLElement,
  isFocused: boolean
) => {
  if (isBold) {
    errorMessage.style.fontWeight = "600";
  } else {
    errorMessage.style.fontWeight = "500";
  }

  errorMessage.textContent = message;
  errorMessage.classList.add(CSS_CLASSES.visible);

  if (isFocused) input.focus();

  label.style.color = COLORS.red;
  input.style.outlineColor = COLORS.red;
  input.style.borderColor = COLORS.red;
};

const removeFieldsError = (errorMessages: NodeList, inputs: NodeList, labels: NodeList, globalError: HTMLElement) => {
  inputs.forEach((input, index) => {
    const label = labels[index] as HTMLElement;
    const errorMessage = errorMessages[index] as HTMLElement;
    const inputElement = input as HTMLInputElement;

    errorMessage.textContent = "";
    errorMessage.classList.remove(CSS_CLASSES.visible);

    label.style.color = "";
    inputElement.style.outlineColor = "";
    inputElement.style.borderColor = "";
  });

  globalError.textContent = "";
  globalError.classList.remove(CSS_CLASSES.visible);
};

const removeFieldError = (errorMessage: HTMLElement, input: HTMLInputElement, label: HTMLElement) => {
  errorMessage.textContent = "";
  errorMessage.classList.remove(CSS_CLASSES.visible);

  label.style.color = "";
  input.style.outlineColor = "";
  input.style.borderColor = "";
};

export {
  validateEmail,
  validateInputs,
  validatePasswordLength,
  confirmPasswordMatch,
  validateInput,
  addFieldError,
  removeFieldsError,
  removeFieldError,
};
