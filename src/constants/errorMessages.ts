interface IErrorMessages {
  [key: string]: string;
}

export const errorMessages: IErrorMessages = {
  isValidPassword: "Invalid Password",
  required: "Required",
  arePasswordsEqual: "Passwords don't match",
};
