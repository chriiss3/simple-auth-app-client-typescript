/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/constants.ts":
/*!*****************************!*\
  !*** ./src/ts/constants.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLORS: () => (/* binding */ COLORS),
/* harmony export */   CSS_CLASSES: () => (/* binding */ CSS_CLASSES),
/* harmony export */   ERROR_MESSAGES: () => (/* binding */ ERROR_MESSAGES),
/* harmony export */   PAGES: () => (/* binding */ PAGES),
/* harmony export */   SELECTORS: () => (/* binding */ SELECTORS),
/* harmony export */   SUCCESS_MESSAGES: () => (/* binding */ SUCCESS_MESSAGES)
/* harmony export */ });
const ERROR_MESSAGES = {
    invalidMail: "Correo invalido.",
    requiredField: "Este campo es obligatorio.",
    internetError: "No tienes conexion a internet",
    invalidPasswordLength: "Logitud de contraseña invalida.",
    passwordNotMath: "Las contraseñas no coinciden.",
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
const SUCCESS_MESSAGES = {};
const SELECTORS = {
    confirmPasswordInput: "#confirm-password-input",
    nameInput: "#name-input",
    logoutButton: ".logout-button",
    userName: ".user-name",
    label: ".label",
    input: ".input",
    alertMessage: ".alert-message",
    emailLabel: "#email-label",
    emailInput: "#email-input",
    passwordInput: "#password-input",
    errorMessage: ".error-message",
    submitButton: ".submit-button",
    form: ".form",
    eyeIcon: ".eye-icon",
    eyeOffIcon: ".eye-off-icon",
};
const COLORS = {
    red: "#9A0000",
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/*!*****************************************!*\
  !*** ./src/ts/utils/form-validation.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addFieldError: () => (/* binding */ addFieldError),
/* harmony export */   confirmPasswordMatch: () => (/* binding */ confirmPasswordMatch),
/* harmony export */   removeFieldError: () => (/* binding */ removeFieldError),
/* harmony export */   removeFieldsError: () => (/* binding */ removeFieldsError),
/* harmony export */   validateEmail: () => (/* binding */ validateEmail),
/* harmony export */   validateInput: () => (/* binding */ validateInput),
/* harmony export */   validateInputs: () => (/* binding */ validateInputs),
/* harmony export */   validatePasswordLength: () => (/* binding */ validatePasswordLength)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/ts/constants.ts");

const validateEmail = (emailValue, errorMessage, emailInput, label) => {
    const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!REGEX.test(emailValue)) {
        addFieldError(errorMessage, emailInput, _constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.invalidMail, true, label, true);
        return true;
    }
    return false;
};
const validateInputs = (labels, inputs, errorMessages) => {
    let emptyInput = false;
    inputs.forEach((input, i) => {
        const inputElement = input;
        if (inputElement.value === "") {
            const label = labels[i];
            const errorMessage = errorMessages[i];
            addFieldError(errorMessage, inputElement, _constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.requiredField, false, label, false);
            emptyInput = true;
        }
        else {
            const label = labels[i];
            const errorMessage = errorMessages[i];
            removeFieldError(errorMessage, inputElement, label);
        }
    });
    return emptyInput;
};
const validatePasswordLength = (password, errorMessage, input, label) => {
    if (password.length < 8) {
        addFieldError(errorMessage, input, _constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.invalidPasswordLength, true, label, true);
        return true;
    }
    return false;
};
const confirmPasswordMatch = (password, confirmPassword, errorMessage, confirmPasswordInput, label) => {
    if (password !== confirmPassword) {
        addFieldError(errorMessage, confirmPasswordInput, _constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.passwordNotMath, true, label, true);
        return true;
    }
    return false;
};
const validateInput = (inputValue, errorMessage, input, label) => {
    if (inputValue === "") {
        addFieldError(errorMessage, input, _constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.requiredField, false, label, false);
        return true;
    }
    return false;
};
const addFieldError = (errorMessage, input, message, isBold, label, isFocused) => {
    if (isBold) {
        errorMessage.style.fontWeight = "600";
    }
    else {
        errorMessage.style.fontWeight = "500";
    }
    errorMessage.textContent = message;
    errorMessage.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_CLASSES.visible);
    if (isFocused)
        input.focus();
    label.style.color = _constants__WEBPACK_IMPORTED_MODULE_0__.COLORS.red;
    input.style.outlineColor = _constants__WEBPACK_IMPORTED_MODULE_0__.COLORS.red;
    input.style.borderColor = _constants__WEBPACK_IMPORTED_MODULE_0__.COLORS.red;
};
const removeFieldsError = (errorMessages, inputs, labels, globalError) => {
    inputs.forEach((input, i) => {
        const label = labels[i];
        const errorMessage = errorMessages[i];
        const inputElement = input;
        errorMessage.textContent = "";
        errorMessage.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_CLASSES.visible);
        label.style.color = "";
        inputElement.style.outlineColor = "";
        inputElement.style.borderColor = "";
    });
    globalError.textContent = "";
    globalError.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_CLASSES.visible);
};
const removeFieldError = (errorMessage, input, label) => {
    errorMessage.textContent = "";
    errorMessage.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_CLASSES.visible);
    label.style.color = "";
    input.style.outlineColor = "";
    input.style.borderColor = "";
};


/******/ })()
;
//# sourceMappingURL=formValidation.bundle.js.map