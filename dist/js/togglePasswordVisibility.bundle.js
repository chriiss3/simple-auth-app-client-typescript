/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/ts/constants.ts":
      /*!*****************************!*\
  !*** ./src/ts/constants.ts ***!
  \*****************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CLIENT_ERROR_MESSAGES: () => /* binding */ CLIENT_ERROR_MESSAGES,
          /* harmony export */ CLIENT_SUCCESS_MESSAGES: () => /* binding */ CLIENT_SUCCESS_MESSAGES,
          /* harmony export */ COLORS: () => /* binding */ COLORS,
          /* harmony export */ CSS_CLASSES: () => /* binding */ CSS_CLASSES,
          /* harmony export */ PAGES: () => /* binding */ PAGES,
          /* harmony export */ SELECTORS: () => /* binding */ SELECTORS,
          /* harmony export */
        });
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
          home: "home",
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

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  (() => {
    /*!**************************************************!*\
  !*** ./src/ts/utils/togglePasswordVisibility.ts ***!
  \**************************************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
      /* harmony export */ handleEyeIcon: () => /* binding */ handleEyeIcon,
      /* harmony export */ handleEyeOffIcon: () => /* binding */ handleEyeOffIcon,
      /* harmony export */
    });
    /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../constants */ "./src/ts/constants.ts"
    );

    const handleEyeIcon = (input, eyeIcon, eyeOffIcon) => {
      input.type = "text";
      eyeIcon.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_CLASSES.visible);
      eyeOffIcon.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_CLASSES.visible);
    };
    const handleEyeOffIcon = (input, eyeIcon, eyeOffIcon) => {
      input.type = "password";
      eyeIcon.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_CLASSES.visible);
      eyeOffIcon.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_CLASSES.visible);
    };
  })();

  /******/
})();
//# sourceMappingURL=togglePasswordVisibility.bundle.js.map
