import { CSS_CLASSES, CLIENT_ERROR_MESSAGES, COLORS } from "../constants";

const validateEmail = (value: string, dataError: HTMLElement, input: HTMLInputElement, label: HTMLElement): boolean => {
  const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!REGEX.test(value)) {
    addFormError(dataError, input, label, CLIENT_ERROR_MESSAGES.invalidMail);

    return true;
  }

  return false;
};

const validateFields = (labels: NodeList, inputs: NodeList, fieldsError: NodeList): boolean => {
  let emptyInput = false;

  inputs.forEach((input, i) => {
    const inputElement = input as HTMLInputElement;

    if (inputElement.value === "") {
      const label = labels[i] as HTMLElement;
      const errorMessage = fieldsError[i] as HTMLElement;

      addFieldError(errorMessage, inputElement, label);

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
): boolean => {
  if (password.length < 8) {
    addFormError(dataError, input, label, CLIENT_ERROR_MESSAGES.invalidPasswordLength);

    return true;
  }

  return false;
};

const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
  dataError: HTMLElement,
  confirmPasswordInput: HTMLInputElement,
  label: HTMLElement
): boolean => {
  if (password !== confirmPassword) {
    addFormError(dataError, confirmPasswordInput, label, CLIENT_ERROR_MESSAGES.passwordNotMath);

    return true;
  }

  return false;
};

const validateField = (inputValue: string, fieldError: HTMLElement, input: HTMLInputElement, label: HTMLElement): boolean => {
  if (inputValue === "") {
    addFieldError(fieldError, input, label);

    return true;
  }

  return false;
};

const addFieldError = (fieldError: HTMLElement, input: HTMLInputElement, label: HTMLElement): void => {
  fieldError.classList.add(CSS_CLASSES.visible);

  label.style.color = COLORS.red;
  input.style.outlineColor = COLORS.red;
  input.style.borderColor = COLORS.red;
};

const removeFieldsError = (fieldsError: NodeList, inputs: NodeList, labels: NodeList): void => {
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

const removeFieldError = (fieldError: HTMLElement, input: HTMLInputElement, label: HTMLElement): void => {
  fieldError.classList.remove(CSS_CLASSES.visible);

  label.style.color = "";
  input.style.outlineColor = "";
  input.style.borderColor = "";
};

const addFormError = (dataError: HTMLElement, input: HTMLInputElement, label: HTMLElement, message: string): void => {
  dataError.textContent = message;
  dataError.classList.add(CSS_CLASSES.visible);

  label.style.color = COLORS.red;
  input.style.outlineColor = COLORS.red;
  input.style.borderColor = COLORS.red;
  input.focus();
};

const removeFormErrors = (dataError: HTMLElement, inputs: NodeList, labels: NodeList): void => {
  dataError.classList.remove(CSS_CLASSES.visible);

  inputs.forEach((input, index) => {
    const label = labels[index] as HTMLElement;
    const inputElement = input as HTMLInputElement;

    label.style.color = "";
    inputElement.style.outlineColor = "";
    inputElement.style.borderColor = "";
  });
};

const removeFormError = (dataError: HTMLElement, input: HTMLInputElement, label: HTMLElement): void => {
  dataError.classList.remove(CSS_CLASSES.visible);

  label.style.color = "";
  input.style.outlineColor = "";
  input.style.borderColor = "";
};

export {
  validateEmail,
  validateFields,
  validatePasswordLength,
  validatePasswordMatch,
  validateField,
  addFieldError,
  removeFieldsError,
  removeFieldError,
  addFormError,
  removeFormErrors,
  removeFormError,
};