const CLIENT_ERROR_MESSAGES = {
  invalidMail: "Correo invalido.",
  requiredField: "Este campo es obligatorio.",
  internetError: "No tienes conexion a internet",
  invalidPasswordLength: "Logitud de contraseña invalida.",
  passwordNotMath: "Las contraseñas no coinciden.",
  incorrectPassword: "Contraseña incorrecta.",
  accountNotFound: "Esta cuenta no existe.",
};

const PAGES = {
  myAccount: "my-account",
  login: "login",
  forgotPassword: "forgot-password",
};

const CSS_CLASSES = {
  loading: "loading",
  visible: "visible",
};

const CLIENT_SUCCESS_MESSAGES = {};

const SELECTORS = {
  confirmPasswordInput: "#confirm-password-input",
  nameInput: "#name-input",
  logoutButton: ".logout-button",
  userName: ".user-name",
  label: ".label",
  input: ".input",
  toastNotif: ".toast-notif",
  emailLabel: "#email-label",
  emailInput: "#email-input",
  passwordInput: "#password-input",
  dataError: ".data-error",
  fieldError: ".field-error",
  submitButton: ".submit-button",
  form: ".form",
  eyeIcon: ".eye-icon",
  eyeOffIcon: ".eye-off-icon",
};

const COLORS = {
  red: "#9A0000",
};

export { CLIENT_ERROR_MESSAGES, PAGES, CSS_CLASSES, CLIENT_SUCCESS_MESSAGES, SELECTORS, COLORS };
