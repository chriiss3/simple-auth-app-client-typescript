/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/ts/constants.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT_ERROR_MESSAGES: () => (/* binding */ CLIENT_ERROR_MESSAGES),
/* harmony export */   COLORS: () => (/* binding */ COLORS),
/* harmony export */   CSS_CLASSES: () => (/* binding */ CSS_CLASSES),
/* harmony export */   PAGES: () => (/* binding */ PAGES),
/* harmony export */   SELECTORS: () => (/* binding */ SELECTORS)
/* harmony export */ });
const CLIENT_ERROR_MESSAGES = {
    invalidMail: "Correo invalido.",
    requiredField: "Este campo es obligatorio.",
    unknownError: "Error desconocido",
    networkError: "No hay conexion a internet",
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
    newPasswordInput: "#new-password-input",
    confirmNewPasswordInput: "#confirm-new-password-input",
    nameInput: "#name-input",
    logoutButton: ".logout-button",
    userName: ".user-name",
    label: ".label",
    input: ".input",
    toastNotif: ".toast-notif",
    emailLabel: "#email-label",
    emailInput: "#email-input",
    passwordInput: "#password-input",
    dataError: ".form-error",
    fieldError: ".field-error",
    submitButton: ".submit-button",
    form: ".form",
    eyeIcon: ".eye-icon",
    eyeOffIcon: ".eye-off-icon",
};
const COLORS = {
    red: "#9A0000",
};


/******/ })()
;
//# sourceMappingURL=constants.bundle.js.map