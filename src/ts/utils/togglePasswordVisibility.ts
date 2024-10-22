import { CSS_CLASSES } from "../constants";

const handleEyeIcon = (input: HTMLInputElement, eyeIcon: HTMLElement, eyeOffIcon: HTMLElement) => {
  input.type = "text";
  eyeIcon.classList.remove(CSS_CLASSES.visible);
  eyeOffIcon.classList.add(CSS_CLASSES.visible);
};

const handleEyeOffIcon = (input: HTMLInputElement, eyeIcon: HTMLElement, eyeOffIcon: HTMLElement) => {
  input.type = "password";
  eyeIcon.classList.add(CSS_CLASSES.visible);
  eyeOffIcon.classList.remove(CSS_CLASSES.visible);
};

export { handleEyeIcon, handleEyeOffIcon };
