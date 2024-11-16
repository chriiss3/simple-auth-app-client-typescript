const ERROR_MESSAGES = {
  invalidMail: "Correo invalido.",
  requiredField: "Este campo es obligatorio.",
  unknownError: "Error desconocido",
  invalidPasswordLength: "Logitud de contraseña invalida.",
  passwordNotMath: "Las contraseñas no coinciden.",
  incorrectPassword: "Contraseña incorrecta.",
  accountNotFound: "Esta cuenta no existe.",
};

const PAGES = {
  forgotPassword: "forgot-password",
  home: "home",
  login: "login",
  register: "register",
  resetPassword: "reset-password",
  settings: "settings"
};

const CSS_CLASSES = {
  loading: "loading",
  visible: "visible",
};

const SELECTORS = {
  nameLabel: "#name-label",
  nameInput: "#name-input",
  nameFieldError: "#name-field-error",
  emailLabel: "#email-label",
  emailInput: "#email-input",
  emailFieldError: "#email-field-error",
  passwordLabel: "#password-label",
  passwordInput: "#password-input",
  passowrdFieldError: "#password-field-error",
  newPasswordLabel: "",
  newPasswordInput: "#new-password-input",
  confirmNewPasswordLabel: "",
  confirmNewPasswordInput: "#confirm-new-password-input",
  logoutButton: ".logout-button",
  fullName: ".full-name",
  label: ".label",
  input: ".input",
  toastNotif: ".toast-notif",
  formError: ".form-error",
  fieldError: ".field-error",
  submitButton: ".submit-button",
  form: ".form",
  eyeIcon: ".eye-icon",
  eyeOffIcon: ".eye-off-icon",
};

const COLORS = {
  red: "#9A0000",
};

export { ERROR_MESSAGES, PAGES, CSS_CLASSES, SELECTORS, COLORS };
