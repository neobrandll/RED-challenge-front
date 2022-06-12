const onKeyDown = (
  event: React.KeyboardEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLDivElement
  >,
  key: string,
  onKeyPressed: () => any
) => {
  const keyCode = event.key;
  if (keyCode === key) {
    onKeyPressed();
  }
};

const arePasswordsEqual = (password: string, repeatedPassword: string) => {
  return password === repeatedPassword;
};

export { onKeyDown, arePasswordsEqual };
