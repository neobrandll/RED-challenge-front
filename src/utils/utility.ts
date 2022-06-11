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

export { onKeyDown };
