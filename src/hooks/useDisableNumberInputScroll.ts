export const useDisableNumberInputScroll = () => {
  document.addEventListener("wheel", () => {
    const inputElement = document?.activeElement as HTMLInputElement;
    if (inputElement?.type === "number") {
      inputElement?.blur();
    }
  });
};
