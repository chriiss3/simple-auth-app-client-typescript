import { CSS_CLASSES, CLIENT_ERROR_MESSAGES, COLORS } from "../constants";

const validateEmail = (value: string, dataError: HTMLElement, input: HTMLInputElement, label: HTMLElement) => {
  const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!REGEX.test(value)) {
    showDataError(dataError, input, label, CLIENT_ERROR_MESSAGES.invalidMail);

    return true;
  }

  return false;
};

const validateFields = (labels: NodeList, inputs: NodeList, fieldsError: NodeList) => {
  let emptyInput = false;

  inputs.forEach((input, i) => {
    const inputElement = input as HTMLInputElement;

    if (inputElement.value === "") {
      const label = labels[i] as HTMLElement;
      const errorMessage = fieldsError[i] as HTMLElement;

      showFieldError(errorMessage, inputElement, label);

      emptyInput = true;
    } else {
      const label = labels[i] as HTMLElement;
      const errorMessage = fieldsError[i] as HTMLElement;

      removeFieldError(errorMessage, inputElement, label);
    }
  });

  return emptyInput;
};

const validatePasswordLength = (
  password: string,
  dataError: HTMLElement,
  input: HTMLInputElement,
  label: HTMLElement
) => {
  if (password.length < 8) {
    showDataError(dataError, input, label, CLIENT_ERROR_MESSAGES.invalidPasswordLength);

    return true;
  }

  return false;
};

const confirmPasswordMatch = (
  password: string,
  confirmPassword: string,
  dataError: HTMLElement,
  confirmPasswordInput: HTMLInputElement,
  label: HTMLElement
) => {
  if (password !== confirmPassword) {
    showDataError(dataError, confirmPasswordInput, label, CLIENT_ERROR_MESSAGES.passwordNotMath);

    return true;
  }

  return false;
};

const validateField = (inputValue: string, fieldError: HTMLElement, input: HTMLInputElement, label: HTMLElement) => {
  if (inputValue === "") {
    showFieldError(fieldError, input, label);

    return true;
  }

  return false;
};

const showFieldError = (fieldError: HTMLElement, input: HTMLInputElement, label: HTMLElement) => {
  fieldError.classList.add(CSS_CLASSES.visible);

  label.style.color = COLORS.red;
  input.style.outlineColor = COLORS.red;
  input.style.borderColor = COLORS.red;
};

const removeFieldsError = (fieldsError: NodeList, inputs: NodeList, labels: NodeList) => {
  inputs.forEach((input, index) => {
    const label = labels[index] as HTMLElement;
    const fieldError = fieldsError[index] as HTMLElement;
    const inputElement = input as HTMLInputElement;

    fieldError.classList.remove(CSS_CLASSES.visible);

    label.style.color = "";
    inputElement.style.outlineColor = "";
    inputElement.style.borderColor = "";
  });
};

const removeFieldError = (fieldError: HTMLElement, input: HTMLInputElement, label: HTMLElement) => {
  fieldError.classList.remove(CSS_CLASSES.visible);

  label.style.color = "";
  input.style.outlineColor = "";
  input.style.borderColor = "";
};

const showDataError = (dataError: HTMLElement, input: HTMLInputElement, label: HTMLElement, message: string) => {
  dataError.textContent = message;
  dataError.classList.add(CSS_CLASSES.visible);

  label.style.color = COLORS.red;
  input.style.outlineColor = COLORS.red;
  input.style.borderColor = COLORS.red;
};

const removeDataError = (dataError: HTMLElement, input: HTMLInputElement, label: HTMLElement) => {
  dataError.classList.remove(CSS_CLASSES.visible);

  label.style.color = "";
  input.style.outlineColor = "";
  input.style.borderColor = "";
};

export {
  validateEmail,
  validateFields,
  validatePasswordLength,
  confirmPasswordMatch,
  validateField,
  showFieldError,
  removeFieldsError,
  removeFieldError,
  showDataError,
  removeDataError,
};
